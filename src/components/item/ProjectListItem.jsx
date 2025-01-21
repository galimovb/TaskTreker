import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { baseApiUrl } from '../../api/config/apiConfig.js';

const { Meta } = Card;

export function ProjectListItem({ item }) {
    const iconUrl = item.iconUrl ? `${baseApiUrl}${item.iconUrl}` : '/icon.svg';

    return (
        <Link to={`/projects/${item.id}`}>
            <Card className='h-[110px]'>
                <div className='grid grid-cols-[75%_25%] items-center'>
                    <Meta
                        title={item.name}
                        description={item.description}
                    />
                    <img
                        src={iconUrl}
                        className='justify-self-end w-[40px] h-[40px]'
                        alt="Project Icon"
                    />
                </div>
            </Card>
        </Link>
    );
}
