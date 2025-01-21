import React from 'react';
import {Button, Layout, Menu} from 'antd';
import {
    LogoutOutlined,
    UserOutlined,
    BookOutlined,
    FolderOutlined
} from '@ant-design/icons';

export function AppSider({ collapsed }) {
    const iconStyle = { color: '#1f5cb8' };

    const menuItems = [
        {
            key: '1',
            label: 'Мои проекты',
            icon: <FolderOutlined style={iconStyle} />,
        },
        {
            key: '2',
            label: 'Мои задачи',
            icon: <BookOutlined style={iconStyle} />,
        },
        {
            key: '3',
            label: 'Все проекты',
            icon: <FolderOutlined style={iconStyle} />,
        },
    ];

    return (
        <Layout.Sider
            width={231}
            collapsible
            collapsed={collapsed}
            trigger={null}
            className="bg-white max-h-screen"
        >
            <img src={'/logo.svg'} className='mx-auto mt-[30px]' />

            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuItems}
                selectedKeys={['1']}
                className="mt-[20px]"
            />
            <div className='absolute bottom-3'>
                <Button
                    color="primary"
                    variant="text"
                    icon={<UserOutlined/>}
                    className='w-[223px] h-10 mx-1 justify-normal'
                >
                    Профиль
                </Button>
                <Button
                    color="primary"
                    variant="text"
                    icon={<LogoutOutlined/>}
                    className='w-[223px] h-10 mx-1 justify-normal'
                >
                    Выйти
                </Button>
            </div>
        </Layout.Sider>
    );
}
