const getPriorityColor = (priority) => {
    switch (priority) {
        case 0:
            return 'bg-gray-400'; // none
        case 1:
            return 'bg-green-200'; // minimal
        case 2:
            return 'bg-blue-200'; // low
        case 3:
            return 'bg-yellow-200'; // medium
        case 4:
            return 'bg-orange-400'; // high
        case 5:
            return 'bg-red-600'; // critical
        default:
            return 'bg-gray-400'; // default (none)
    }
};

export function GroupTasksItem({ task }) {
    const priorityColor = getPriorityColor(5);

    return (
        <div className='bg-white relative p-[12px]'>
            <div className={`min-w-[6px] h-full absolute left-0 top-0 ${priorityColor}`}></div>

            <div>

            </div>
        </div>
    );
}
