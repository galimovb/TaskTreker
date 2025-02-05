import {Button, DatePicker, Form, Input, message, Modal, Select} from "antd";
import dayjs from 'dayjs';
import {useEffect} from "react";
import {useDeleteTaskMutation, useEditTaskMutation} from "../../api/taskApi.js";
import {DeleteOutlined} from "@ant-design/icons";


export function EditTaskModal({ onClose, openModal, task}) {
    const [form] = Form.useForm();
    const [editTask, { isLoading, error }] = useEditTaskMutation();
    const [deleteTask,{isLoadingDelete,deleteError}] = useDeleteTaskMutation();

    useEffect(() => {
        if (task) {
            form.setFieldsValue({
                name: task.name,
                description: task.description,
                finishDate: dayjs(task.finishDate),
                priority: task.priority,
                status: task.status
            });
            console.log(task)
        }
    }, [task, form]);

    const updateTaskFormSubmit = async (values) => {
        if (values.finishDate) {
            values.finishDate = values.finishDate.format('YYYY-MM-DD');
        }

        if (!values.priority) {
            values.priority = null;
        }
        if (!values.description) {
            values.description = null;
        }

        try {
            const response = await editTask({ ...values, id: task.id }).unwrap();
            message.success('Задача успешно обновлена!');
            onClose(false);
        } catch (err) {
            message.error('Не удалось обновить задачу. Попробуйте снова.');
        }
    };

    const deleteTaskMutation = async ()=>{
        try{
            const response = await deleteTask(task.id).unwrap();
            message.success('Задача успешно удалена')
        }
        catch (err){
            message.error('Возникла ошибка при удалении задачи')
        }
    }


    return (
        <Modal
            centered
            footer={null}
            open={openModal}
            onOk={() => onClose(false)}
            onCancel={() => onClose(false)}
        >
            <div className='flex justify-between p-4'>
                <h1 className='font-bold text-xl mb-4'>
                    Редактировать задачу
                </h1>
                <Button
                    link
                    onClick={deleteTaskMutation}
                >
                    <DeleteOutlined/>
                </Button>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={updateTaskFormSubmit}
            >
                <Form.Item
                    label="Название задачи"
                    name="name"
                    rules={[{ required: true, message: "Введите название задачи" }]}
                >
                    <Input placeholder="Введите название задачи" />
                </Form.Item>

                <Form.Item
                    label="Описание задачи"
                    name="description"
                >
                    <Input.TextArea placeholder="Введите описание задачи" />
                </Form.Item>

                <Form.Item
                    label="Дата выполнения"
                    name="finishDate"
                    rules={[{ required: true, message: "Выберите дату выполнения" }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD"
                        disabledDate={(current) => {
                            return current && current < dayjs().startOf('day');
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Приоритет задачи"
                    name="priority"
                >
                    <Select placeholder="Выберите приоритет">
                        <Select.Option value={1}>None</Select.Option>
                        <Select.Option value={2}>Minimal</Select.Option>
                        <Select.Option value={3}>Low</Select.Option>
                        <Select.Option value={4}>Medium</Select.Option>
                        <Select.Option value={5}>High</Select.Option>
                        <Select.Option value={6}>Critical</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Статус задачи"
                    name="status"
                    rules={[{ required: true, message: "Выберите статус задачи" }]}
                >
                    <Select placeholder="Выберите статус задачи">
                        <Select.Option value="NEW">Новая</Select.Option>
                        <Select.Option value="INWORK">В процессе</Select.Option>
                        <Select.Option value="COMPLETED">Завершена</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Обновить задачу
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
