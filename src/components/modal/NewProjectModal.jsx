import {useState} from "react";
import {Avatar, Button, Form, Input, message, Modal, Upload} from "antd";
import {CameraOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useCreateProjectMutation} from "../../api/projectsApi.js";

const { TextArea } = Input;

export function NewProjectModal({open,setIsNewProjectModal}) {
    const [imageUrl, setImageUrl] = useState(null);
    const [projectAvatar,setProjectAvatar] = useState(null);
    const [createProject, {isLoadingCreateProject}] = useCreateProjectMutation();
    const [form] = Form.useForm();

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Вы можете загрузить только изображение!');
        }
        return isImage;
    };
    const afterChange = (info) => {
        if (info.file.status === 'done') {
            const imageUrl = URL.createObjectURL(info.file.originFileObj);
            setImageUrl(imageUrl);
            setProjectAvatar(info.file.originFileObj)
        }
    };

    const newProjectFormSubmit = async (values) => {
        const formData = new FormData();

        formData.append('name',values.name);
        formData.append('description' , values.description);
        if(projectAvatar){
            formData.append('avatar', projectAvatar)
        }
        try {
            await createProject(formData).unwrap();
            message.success('Проект успешно создан!');
            form.resetFields();
        } catch (error){
            message.error(error.data.message)
        }
    };

    return (
            <Modal
                centered
                open={open}
                onOk={() => setIsNewProjectModal(false)}
                onCancel={() => setIsNewProjectModal(false)}
                footer={null}
            >
                <h1 className='text-center text-2xl mb-4'>Создайте новый проект</h1>
                <Form
                    form={form}
                    onFinish={newProjectFormSubmit}
                >
                    <Form.Item>
                    <div className="flex justify-center">
                        <Upload
                            name="avatar"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={afterChange}
                            customRequest={({onSuccess}) =>{
                                onSuccess('ok');
                            }}
                        >
                            <div className="relative">
                                <Avatar
                                    size={96}
                                    icon={<CameraOutlined />}
                                    src={imageUrl}
                                />
                                <PlusCircleOutlined
                                    className="absolute bottom-0 right-0  p-1 text-2xl"
                                />
                            </div>
                        </Upload>
                    </div>
                    </Form.Item>

                    <Form.Item
                        name="name"
                        rules={[
                            {required: true, message: 'Пожалуйста, введите Название проекта!'},
                            {min: 2, message: 'Название должно быть не короче 2 символов!'},
                        ]}
                    >
                        <Input
                            placeholder='Название проекта'
                            size={'large'}
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите описание проекта!' },
                        ]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Введите описание проекта"
                            maxLength={255}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='h-[40px] w-full text-base'
                        >
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
    )
}
