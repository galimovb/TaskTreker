import {EllipsisOutlined, PlusOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {GroupTasksItem} from "./GroupTasksItem.jsx";
import {useState} from "react";
import {NewTaskModal} from "../modal/NewTaskModal.jsx";

export function GroupListItem({group,authors}){
    const [createTaskModal, setCreateTaskModal] = useState(false);

    return(
        <div className='flex flex-col rounded-[5px] bg-gray-200 w-[350px] max-h-full px-2 py-1 '>
            <div className='flex justify-between items-center'>
                <div
                    className='px-[10px] py-[5px]'
                >
                    {group.name} - {group.tasks.length}
                </div>
                <EllipsisOutlined
                    className='rotate-180 text-[25px]'
                />
            </div>
            <div className='pb-[10px] flex flex-col gap-2'>
                {group.tasks.map((task)=>(
                    <GroupTasksItem
                        task = {task}
                    />
                ))}
            </div>
            <div className='flex justify-center p-[6px]'>
                <Button
                    type='primary'
                    className=''
                    onClick={()=>setCreateTaskModal(true)}
                    icon={<PlusOutlined/>}
                >
                    Добавить задачу
                </Button>
            </div>
            <NewTaskModal
                openModal = {createTaskModal}
                onClose = {setCreateTaskModal}
                groupId={group.id}
                authors={authors}
            />
        </div>
    )
}
