import { useDrag } from "react-dnd";

const getPriorityColor = (priority) => {
    switch (priority) {
        case 1:
            return "bg-gray-400";
        case 2:
            return "bg-blue-400";
        case 3:
            return "bg-yellow-200";
        case 4:
            return "bg-orange-400";
        case 5:
            return "bg-red-200";
        case 6:
            return "bg-red-600";
        default:
            return "bg-gray-400";
    }
};

export function GroupTasksItem({ task, groupId }) {
    const priorityColor = getPriorityColor(task.priority);

    const [{ isDragging }, drag] = useDrag({
        type: "TASK",
        item: { task, groupId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} className={`bg-white relative p-[12px] flex gap-3 ${isDragging ? "opacity-50" : "opacity-100"}`}>
            <div className={`min-w-[6px] h-full absolute left-0 top-0 ${priorityColor}`} />
            <div className="font-bold">T{task.id}</div>
            <div className="flex-1">{task.name}</div>
            <div className="ml-auto text-gray-400">{task.finishDate}</div>
        </div>
    );
}
