import {baseApiUrl} from "../../api/config/apiConfig.js";
import {Avatar, Input} from 'antd';
import {BellOutlined} from "@ant-design/icons";


const {Search} = Input;

export function ProjectTasksTopMenu({project}) {
    const iconUrl = project.iconUrl ? `${baseApiUrl}${project.iconUrl}` : "/img.png";
    return (
        <div className='flex justify-between items-center bg-white border-b border-gray-300 p-3'>
            <div className='flex items-center gap-3 '>
                <img src={iconUrl} className='block w-[48px] h-[48px]'/>
                <h1 className='text-[18px] font-bold'>
                    {project.name}
                </h1>
            </div>
            <div className='p-x-2 p-y-1'>
                <Search
                    placeholder="Найти задачи"
                    allowClear
                    className='flex-initial min-w-[400px]'
                    size={'large'}
                />
            </div>
            <div className='flex items-center gap-4'>
                <Avatar.Group shape="square">
                    {project.coauthors.map((author) => (
                        <Avatar style={{backgroundColor: '#fde3cf'}}>
                            {author.firstName.charAt(0)}
                            {author.lastName.charAt(0)}
                        </Avatar>
                    ))}
                </Avatar.Group>

                <BellOutlined className='text-2xl'/>
            </div>

        </div>
    )
}
