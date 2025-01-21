import React from 'react';
import {Form, Input, Button, Card, message} from 'antd';
import {Link} from 'react-router';
import { useNavigate } from 'react-router-dom';
import {MailOutlined, LockOutlined, SmileOutlined, UserOutlined} from '@ant-design/icons';
import {useCreateUserMutation, useGetUsersQuery} from '../../api/usersApi.js';

export function RegistrPage() {
    const [form] = Form.useForm();
    const [createUser, {isLoading}] = useCreateUserMutation();
    const navigate = useNavigate();

    const registrationFormSubmit = async (values) => {
        try {
            await createUser(values).unwrap();
            message.success('Пользователь успешно создан!');
            form.resetFields();
            navigate('/login');
        } catch (error) {
            message.error(error.data.message);
        }
    };

    return (
        <div className='h-full flex flex-col py-[30px] justify-between gap-6'>
            <div className='flex flex-auto flex-col justify-center mx-auto w-[360px]'>
                <Link to={'/'} className='mx-auto mt-0 mb-[40px]'>
                    <img src={'./logo.svg'} className='w-[124px] h-[32px]'/>
                </Link>
                <div>
                    <div className='flex justify-between px-3 mb-3'>
                        <div>Создать аккаунт</div>
                        <UserOutlined/>
                    </div>
                    <div className='text-center flex flex-col gap-5'>
                        <Card className='w-full bg-gray-50'>
                            <Form form={form} onFinish={registrationFormSubmit}>
                                <div className='grid grid-cols-2 gap-2'>
                                    <Form.Item
                                        name="firstName"
                                        rules={[
                                            {required: true, message: 'Пожалуйста, введите ваше имя!'},
                                            {min: 2, message: 'Имя должно быть не короче 2 символов!'},
                                        ]}
                                    >
                                        <Input
                                            placeholder='Имя'
                                            prefix={<SmileOutlined/>}
                                            size={'large'}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="lastName"
                                        rules={[
                                            {required: true, message: 'Пожалуйста, введите вашу фамилию!'},
                                            {min: 2, message: 'Фамилия должна быть не короче 2 символов!'},
                                        ]}
                                    >
                                        <Input
                                            placeholder='Фамилия'
                                            size={'large'}
                                        />
                                    </Form.Item>
                                </div>

                                <Form.Item
                                    name="email"
                                    rules={[
                                        {required: true, message: 'Пожалуйста, введите ваш email!'},
                                        {type: 'email', message: 'Введите корректный email!'},
                                    ]}
                                >
                                    <Input
                                        placeholder='Электронная почта'
                                        prefix={<MailOutlined/>}
                                        size={'large'}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {required: true, message: 'Пожалуйста, введите пароль!'},
                                        {min: 6, message: 'Пароль должен быть не короче 6 символов!'},
                                    ]}
                                >
                                    <Input.Password
                                        placeholder='Введите пароль'
                                        prefix={<LockOutlined/>}
                                        size={'large'}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        className='h-[40px] w-full'
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Создание...' : 'Создать аккаунт'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>

                        <div>
                            <div className='text-gray-400'>У вас уже есть аккаунт?</div>
                            <Button type='link'>
                                <Link to={'/login'} className='block text-blue-400'>
                                    Войти в систему
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-gray-400 text-center w-[360px] mx-auto text-xs'>
                <div>Используя Tasker, Вы подтверждаете,</div>
                <div>что прочитали и поняли, а также соглашаетесь с правилами</div>
            </div>
        </div>
    );
}
