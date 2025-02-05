import { useEffect, useState } from "react";
import { useGetTasksQuery } from "../../api/taskApi.js";
import {MyTaskList} from "../../components/list/MyTaskList.jsx";

export function MyTasksPage() {
    const { data: resp, isLoading } = useGetTasksQuery();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (resp) {
            setTasks(resp.tasks);
        }
    }, [resp]);

    if (isLoading) {
        return <div className="p-5">Loading...</div>;
    }

    return (
        <div className="p-5 h-full flex flex-col gap-4">
            {tasks.map((taskGroup, index) => (
                <MyTaskList key={index} group={taskGroup} />
            ))}
        </div>
    );
}
