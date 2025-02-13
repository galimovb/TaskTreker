import { Modal, Form, Input, Button, DatePicker, AutoComplete, Select, message } from "antd";
import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import { useCreateTaskMutation } from "../../api/taskApi.js";

export function NewTaskModal({ onClose, openModal, groupId, authors,onTaskCreated }) {
    const [form] = Form.useForm();
    const [emailOptions, setEmailOptions] = useState([]);
    const [authorEmails, setAuthorEmails] = useState([]);
    const [createTask, { isLoading, error }] = useCreateTaskMutation();

    useEffect(() => {
        if (authors && authors.length > 0) {
            const emails = authors.map(author => author.email);
            setAuthorEmails(emails);
            const options = authors.map(author => ({
                value: author.email,
            }));
            setEmailOptions(options);
        }
    }, [authors]);

    const createTaskFormSubmit = async (values) => {
        if (values.dueDate) {
            values.dueDate = values.dueDate.format('YYYY-MM-DD');
        }

        if (!values.priority) {
            values.priority = null;
        }
        if (!values.description) {
            values.description = null;
        }

        try {
            const response = await createTask({ ...values, groupId }).unwrap();
            const newTask = response.task;

            message.success('Задача успешно создана!');

            onTaskCreated(newTask);
            onClose(false);
        } catch (err) {
            message.error('Не удалось создать задачу. Попробуйте снова.');
        }
    };

    const filterAutocompleteValues = (searchText) => {
        const filteredOptions = emailOptions.filter(option =>
            option.value.toLowerCase().includes(searchText.toLowerCase())
        );
        setEmailOptions(filteredOptions);
    };

    const validateEmail = (rule, value, callback) => {
        if (!authorEmails.includes(value)) {
            callback('Нельзя назначить задачу, если пользователь не является соавтором проекта');
        } else {
            callback();
        }
    };

    return (
        <Modal
            centered
            footer={null}
            open={openModal}
            onOk={() => onClose(false)}
            onCancel={() => onClose(false)}
        >
            <h1 className='font-bold text-xl mb-4'>
                Создайте новую задачу
            </h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={createTaskFormSubmit}
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
                    label="Кому назначить задачу"
                    name="user"
                    rules={[{ required: true, message: "Введите почту исполнителя" }, { validator: validateEmail }]}
                >
                    <AutoComplete
                        options={emailOptions}
                        onSearch={filterAutocompleteValues}
                        placeholder="Введите почту"
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Создать задачу
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
