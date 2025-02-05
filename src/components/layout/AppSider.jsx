import React from 'react';
import {Button, Layout, Menu, message} from 'antd';
import {Link, Navigate, useLocation} from 'react-router-dom';
import {
    LogoutOutlined,
    UserOutlined,
    BookOutlined,
    FolderOutlined
} from '@ant-design/icons';
import {useLogoutUserQuery} from "../../api/usersApi.js";
import Cookies from "js-cookie";

export function AppSider({ collapsed }) {
    const iconStyle = { color: '#1f5cb8' };
    const location = useLocation();

    const menuItems = [
        {
            key: '1',
            label: <Link to="/projects">Мои проекты</Link>,
            icon: <FolderOutlined style={iconStyle} />,
        },
        {
            key: '2',
            label: <Link to="/tasks">Мои задачи</Link>,
            icon: <BookOutlined style={iconStyle} />,
        },

    ];
    const getActiveTab = () => {
        switch (location.pathname) {
            case '/projects':
                return ['1'];
            case '/tasks':
                return ['2'];
            case '/all/projects':
                return ['3'];
            default:
                return ['1'];
        }
    };

    const logoutUser = async () => {
        try {
            document.cookie = 'jwtToken' + '=; Max-Age=0; path=/;';

            window.location.reload();
        } catch (err) {
            message.error('Ошибка при выходе из системы');
        }
    }

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
                selectedKeys={getActiveTab()}
                className="mt-[20px]"
            />
            <div className='absolute bottom-3'>
                <Button
                    color="primary"
                    variant="text"
                    icon={<LogoutOutlined/>}
                    className='w-[223px] h-10 mx-1 justify-normal'
                    onClick={logoutUser}
                >
                    Выйти
                </Button>
            </div>
        </Layout.Sider>
    );
}
