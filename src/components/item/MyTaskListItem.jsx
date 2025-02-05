import { useState } from "react";
import { Link } from 'react-router-dom';
import { EditTaskModal } from "../modal/EditTaskModal.jsx";
import { Button } from "antd";

function formatDate(dateString) {
    if (!dateString) return "Нет даты";

    const date = new Date(dateString);
    date.setHours(date.getHours() + 3); // Добавляем 3 часа

    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

export function MyTaskListItem({ task }) {
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);

    return (
        <>
            <div
                className='flex justify-between py-2 border-b border-b-gray-200 hover:bg-gray-200'
                onClick={() => setShowEditTaskModal(true)}
            >
                <div>
                    <div>
                        <span className='font-bold text-[16px]'>
                             T{task.id}
                        </span>
                        <span className='ml-3 text-blue-500'>
                            {task.name}
                        </span>
                    </div>
                    <div className='text-gray-400'>
                        Project:
                        <Link
                            to={`/projects/${task.project.id}`}
                            className='text-blue-500 ml-2 text-base'
                        >
                            {task.project.name}
                        </Link>
                    </div>
                </div>
                <div className='text-right'>
                    <div>Срок до: {formatDate(task.finishDate)}</div>
                    <div>Приоритет: {task.priority}</div>
                </div>
            </div>

            <EditTaskModal
                openModal={showEditTaskModal}
                onClose={() => setShowEditTaskModal(false)}
                task={task}
            />
        </>
    );
}
