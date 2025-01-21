import { Card } from 'antd';
const { Meta } = Card;
import {PlusCircleOutlined} from '@ant-design/icons';


export function NewProjectCard({setIsNewProjectModal}) {
    return (
        <Card>
            <div className='grid grid-cols-[75%_25%] items-center'>
                <Meta
                    title={'Создать новый проект'}
                    description={'Кликните на кнопку'}
                />
                <PlusCircleOutlined
                    className='justify-end text-2xl'
                    onClick={()=>setIsNewProjectModal(true)}
                />
            </div>


        </Card>
    );
}
