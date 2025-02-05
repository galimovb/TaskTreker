import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MyTaskListItem } from "../item/MyTaskListItem.jsx";

export function MyTaskList({ group }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTasks = group.tasks.filter(task =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="border shadow-lg bg-white p-4">
            <div className='flex justify-between items-center border-b border-b-gray-200 pb-2'>
                <h1 className='font-bold text-xl'>
                    {group.status}
                </h1>
                <Input
                    placeholder='Введите название задачи'
                    prefix={<SearchOutlined />}
                    size={'large'}
                    className='h-9 w-[300px]'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className='flex flex-col'>
                {filteredTasks.map((task) => (
                    <MyTaskListItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}
