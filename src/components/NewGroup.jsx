import React, {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Button, Card, Input, message, Space} from "antd";
import {useCreateProjectGroupMutation} from "../api/projectsApi.js";


export function NewGroup({projectId = 9,onGroupCreated}) {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [createGroup, {isLoading}] = useCreateProjectGroupMutation();


    const closeForm = () => {
        setIsFormVisible(false);
        setGroupName("");
    };

    const formSend = async () => {
        if (!groupName.trim()) {
            message.warning("Введите название группы");
            return;
        }

        try {
            const newGroup = {
                name: groupName,
                projectId: projectId,
            };

            const response = await createGroup(newGroup).unwrap();
            const createdGroup = response.projectGroup;
            console.log(createdGroup);
            message.success("Группа создана");
            setGroupName("");
            closeForm();
            onGroupCreated(createdGroup)

        } catch (error) {
            message.error(error.data.message || "Произошла ошибка");
        }
    };

    return (
        <div>
            {!isFormVisible && (
                <Button
                    color="primary"
                    variant="outlined"
                    icon={<PlusOutlined />}
                    onClick={()=>{setIsFormVisible(true)}}
                >
                    Добавить группу
                </Button>
            )}

            {isFormVisible && (
                <Card className='w-[300px]'>
                    <Input
                        placeholder="Введите название группы"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <Space className='w-full justify-center mt-4'>
                        <Button onClick={closeForm}>Отменить</Button>
                        <Button type="primary" onClick={formSend}>
                            Создать
                        </Button>
                    </Space>
                </Card>
            )}
        </div>
    );
}
