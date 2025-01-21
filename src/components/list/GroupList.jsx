import {GroupListItem} from "../item/GroupListItem.jsx";
import {NewGroup} from "../NewGroup.jsx";

export function GroupList({groups, authors, onGroupCreated}){
    return(
        <div className='max-w-full h-full overflow-x-auto'>
            <div className='flex flex-row gap-4 items-start p-[10px]'>
                {groups.map((group) => (
                    <GroupListItem
                        group={group}
                        authors={authors}
                    />
                ))}
                <NewGroup
                    onGroupCreated={onGroupCreated}
                />
            </div>
        </div>
    )
}
