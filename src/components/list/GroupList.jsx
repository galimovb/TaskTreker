    import { GroupListItem } from "../item/GroupListItem.jsx";
    import { NewGroup } from "../NewGroup.jsx";
    import { DndProvider } from 'react-dnd';
    import { HTML5Backend } from 'react-dnd-html5-backend';
    import {useEffect, useState} from "react";

    export function GroupList({ projectId, propGroups, authors, onGroupCreated, onGroupDeleted }) {
        const [groups, setGroups] = useState(propGroups);

        useEffect(() => {
            setGroups(propGroups);
        }, [propGroups]);


        const handleTaskMoved = (task, fromGroupId, toGroupId) => {
            setGroups((prevGroups) => {
                const updatedGroups = prevGroups.map((group) => {
                    if (group.id === fromGroupId) {
                        // Удаляем задачу из исходной группы
                        return {
                            ...group,
                            tasks: group.tasks.filter((t) => t.id !== task.id),
                        };
                    }
                    if (group.id === toGroupId) {
                        // Добавляем задачу в новую группу
                        return {
                            ...group,
                            tasks: [...group.tasks, task],
                        };
                    }
                    return group;
                });
                return updatedGroups;
            });
        };

        return (
            <DndProvider backend={HTML5Backend}>
                <div className='max-w-full overflow-x-auto max-h-full min-h-full'>
                    <div className='flex flex-row gap-5 items-start p-[10px]'>
                        {groups.map((group) => (
                            <GroupListItem
                                key={group.id}
                                group={group}
                                authors={authors}
                                onGroupDeleted={onGroupDeleted}
                                onTaskMoved={handleTaskMoved}
                            />
                        ))}
                        <NewGroup
                            projectId={projectId}
                            onGroupCreated={onGroupCreated}
                        />
                    </div>
                </div>
            </DndProvider>
        );
    }
