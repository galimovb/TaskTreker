import { Modal, Form, Input, Button, DatePicker, AutoComplete } from "antd";
import dayjs from 'dayjs';
import { useState, useEffect } from "react";

export function NewTaskModal({ onClose, openModal, groupId, authors }) {
    const [form] = Form.useForm();
    const [emailOptions, setEmailOptions] = useState([]);
    const [authorEmails, setAuthorEmails] = useState([]);

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

    const createTaskFormSubmit = (values) => {
        console.log("Данные формы:", values);
        console.log("ID группы:", groupId);

        if (values.dueDate) {
            values.dueDate = values.dueDate.format('YYYY-MM-DD');
        }

        onClose(false);
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
                    name="title"
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
                    name="dueDate"
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
                    label="Кому назначить задачу"
                    name="assigneeEmail"
                    rules={[
                        { required: true, message: "Введите почту исполнителя" },
                        { validator: validateEmail }
                    ]}
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
                    <Button type="primary" htmlType="submit">
                        Создать задачу
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
