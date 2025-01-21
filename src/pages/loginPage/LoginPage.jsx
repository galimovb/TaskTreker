import {Button, Card, Form, Input, message} from "antd";
import {Link} from "react-router";
import {MailOutlined, LockOutlined, SmileOutlined} from '@ant-design/icons';
import {useLoginUserMutation} from "../../api/usersApi.js";
import React from "react";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

export function LoginPage() {
    const[loginUser,{isLoading}] = useLoginUserMutation();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const loginFormSubmit = async (values) => {
        try {
           const responce = await loginUser(values).unwrap();
            message.success('Вы вошли в систему!');
            form.resetFields();
            Cookies.set('jwtToken', responce.token, {
                expires: 1, // Срок действия
                path: '/',
                domain: 'localhost',
                secure: false, // Для HTTP
                sameSite: 'Lax', // Для кросс-сайтовых запросов
            });
            navigate('/projects');
        } catch (error) {
            message.error(error.data.message);
        }
    };
    return (
        <div className='h-full flex flex-col py-[30px] justify-between gap-6'>
            <div className='flex flex-auto flex-col justify-center mx-auto w-[360px] '>
                <Link to={'/'} className='mx-auto mt-0 mb-[40px]'>
                    <img src={'./logo.svg'} className='w-[124px] h-[32px] '/>
                </Link>
                <div>
                    <div className='flex justify-between px-3 mb-3'>
                        <div>
                            Вход
                        </div>

                        <Button type="link" className='p-0'>
                            <Link to={''} className='text-gray-400'>
                                Забыли пароль?
                            </Link>
                        </Button>
                    </div>
                    <div className='text-center flex flex-col gap-5 '>
                        <Card className=' w-full bg-gray-50  '>
                            <Form form={form} onFinish={loginFormSubmit}>
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
                                        {isLoading ? 'Подождите..' : 'Войти'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>

                        <div>
                            <div className='text-gray-400'>
                                У вас еще нет аккаунта?
                            </div>
                            <Button type="link">
                                <Link to={'/reg'} className='block text-blue-400 '>
                                    Зарегистрируйтесь в системе
                                </Link>
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
            <div className="text-gray-400 text-center w-[360px] mx-auto text-xs">
                <div>
                    Используя Tasker, Вы подтверждаете,
                </div>
                <div>
                    что прочитали и поняли, а также соглашаетесь с правилами
                </div>
            </div>
        </div>
    );
}
