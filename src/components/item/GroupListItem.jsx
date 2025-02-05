import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Modal, Input } from "antd";
import { GroupTasksItem } from "./GroupTasksItem.jsx";
import { useState, useEffect } from "react";
import { NewTaskModal } from "../modal/NewTaskModal.jsx";
import { useDeleteProjectGroupMutation, useEditProjectGroupMutation } from "../../api/groupApi.js";
import { useDrop } from "react-dnd";
import { useEditTaskProjectGroupMutation } from "../../api/taskApi.js";

export function GroupListItem({ group, authors, onGroupDeleted, onTaskMoved }) {
    const [createTaskModal, setCreateTaskModal] = useState(false);
    const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newGroupName, setNewGroupName] = useState(group.name);
    const [tasks, setTasks] = useState(group.tasks);
    const [groupName, setGroupName] = useState(group.name);

    useEffect(() => {
        setTasks(group.tasks);
    }, [group.tasks]);

    const [deleteGroup, { isLoading }] = useDeleteProjectGroupMutation();
    const [updateGroup, { isLoading: isUpdating }] = useEditProjectGroupMutation();
    const [editTaskGroup] = useEditTaskProjectGroupMutation();

    const onTaskCreated = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setCreateTaskModal(false);
    };

    const toggleShowDeleteModal = () => {
        setShowDeleteTaskModal(!showDeleteTaskModal);
    };

    const deleteGroupSend = async () => {
        try {
            await deleteGroup(group.id).unwrap();
            message.success("Группа удалена");
            onGroupDeleted(group.id);
            toggleShowDeleteModal();
        } catch (err) {
            message.error("Произошла ошибка при удалении");
        }
    };

    const handleGroupNameChange = (e) => {
        setNewGroupName(e.target.value);
    };

    const handleGroupNameSend = async () => {
        try {
            const response = await updateGroup({ id: group.id, name: newGroupName }).unwrap();
            setGroupName(response.group.name);
            message.success("Имя группы обновлено");
            setIsEditing(false);
        } catch (err) {
            message.error("Произошла ошибка при обновлении имени");
        }
    };

    const [, drop] = useDrop({
        accept: "TASK",
        drop: async (item) => {
            if (item.groupId !== group.id) {
                // Отправляем запрос на изменение группы задачи
                await editTaskGroup({ id: item.task.id, newGroupId: group.id }).unwrap();

                // Выполняем перемещение задачи
                onTaskMoved(item.task, item.groupId, group.id);
            }
        },
    });

    return (
        <div ref={drop} className="flex flex-col rounded-[5px] bg-gray-200 min-w-[280px] max-h-full px-2 py-1 ">
            <div className="flex justify-between items-center">
                <div className="px-[10px] py-[5px] font-bold">
                    {isEditing ? (
                        <Input
                            value={newGroupName}
                            onChange={handleGroupNameChange}
                            onBlur={handleGroupNameSend}
                            onPressEnter={handleGroupNameSend}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => setIsEditing(true)}>{groupName}</span>
                    )}
                    {" - "}
                    {tasks.length}
                </div>
                <Dropdown
                    overlay={
                        <Menu
                            items={[
                                {
                                    key: "1",
                                    label: (
                                        <Button type="link" className="text-black" icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
                                            Редактировать
                                        </Button>
                                    ),
                                },
                                {
                                    key: "2",
                                    label: (
                                        <Button type="link" className="text-black" icon={<DeleteOutlined />} onClick={toggleShowDeleteModal}>
                                            Удалить
                                        </Button>
                                    ),
                                },
                            ]}
                        />
                    }
                    placement="bottom"
                    arrow
                >
                    <EllipsisOutlined className="rotate-180 text-[25px]" />
                </Dropdown>
            </div>
            <div className="pb-[10px] flex flex-col gap-2">
                {tasks.map((task) => (
                    <GroupTasksItem key={task.id} task={task} groupId={group.id} />
                ))}
            </div>
            <div className="flex justify-center p-[6px]">
                <Button type="primary" onClick={() => setCreateTaskModal(true)} icon={<PlusOutlined />}>
                    Добавить задачу
                </Button>
            </div>
            <NewTaskModal openModal={createTaskModal} onClose={setCreateTaskModal} groupId={group.id} authors={authors} onTaskCreated={onTaskCreated} />
            <Modal title="Группа и ее задачи будут удалены" centered open={showDeleteTaskModal} onOk={deleteGroupSend} onCancel={toggleShowDeleteModal} okButtonProps={{ loading: isLoading }}>
                <p>Подтверждаете удаление?</p>
            </Modal>
        </div>
    );
}
