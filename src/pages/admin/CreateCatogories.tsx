import { CheckOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined,InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Form, Input, Modal, Space, Spin, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { api, fetcher } from "../../utillities/api";
import { useState } from "react";
import UploadImage from "../../components/UploadImage";
import useSWR from "swr";



export default function CreateCatogories() {
    const [loadingEdit,] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    // const [loading, setLoading] = useState()

    const { data, mutate, isLoading } = useSWR('/shelter/category', fetcher);

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields()
    };

    const editCategory = async (rec: any) => {
        setIsModalOpen(true)
        form.setFieldsValue({
            image: rec.Image,
            name: rec.Name,
        })
        setIsEdit(rec)
    }

    const deleteApi = (id: number) => {
        api.delete('/shelter/category/' + id).then(() => {
            mutate()
            Modal.success({
                title: 'Success',
                icon: <CheckOutlined />,
                content: `Success to Delete category`,
                onOk: () => setIsModalOpen(false)
            });
        }).catch((err) => {
            Modal.error({
                title: 'Error',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        })
    }

    const deleteDelete = (id: number) => {
        Modal.confirm({
            title: 'Are you sure to delete this category ?',
            icon: <InfoCircleOutlined />,
            content: `This change will delete category that you choose`,
            onOk: () => deleteApi(id)
        });
    }

    const columns: ColumnsType<any> = [
        {
            title: 'No.',
            key: 'name',
            render: (_: any, __: any, idx: any) => {
                return <div>{idx + 1}</div>
            }
        },
        {
            title: 'Picture',
            dataIndex: 'Image',
            key: 'name',
            render: (val: string) => {
                if (!val) return null
                return (
                    <div style={{ width: '200px' }}>
                        <img style={{ width: '100%' }} src={val} alt="category_img" />
                    </div>
                )
            }
        },
        {
            title: 'Category name',
            dataIndex: 'Name',
            key: 'name',
        },
        {
            title: 'Action',
            render: (_: any, rec: any) => {
                return (
                    <Flex gap="small" wrap="wrap">
                        <Button type="primary" ghost icon={<EditOutlined />} onClick={() => editCategory(rec)}></Button>
                        <Button type="primary" ghost danger icon={<DeleteOutlined />} onClick={() => deleteDelete(rec.ID)}></Button>
                    </Flex>
                )
            }
        },
    ];

    const onFinish = (val: any) => {
        if (isEdit) {
            setLoading(true)
            api.put('/shelter/category/' + isEdit?.ID, val).then(() => {
                Modal.success({
                    title: 'Success',
                    icon: <CheckOutlined />,
                    content: `Success to update category`,
                    onOk: () => setIsModalOpen(false)
                });
                mutate()
            }).catch((err) => {
                Modal.error({
                    title: 'Error to Register',
                    icon: <CloseCircleOutlined />,
                    content: `${err.toString()}`,
                });
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setLoading(true)
            api.post('/shelter/category', val).then(() => {
                Modal.success({
                    title: 'Success',
                    icon: <CheckOutlined />,
                    content: `Success to Create category`,
                });
                mutate()
            }).catch((err) => {
                Modal.error({
                    title: 'Error to Register',
                    icon: <CloseCircleOutlined />,
                    content: `${err.toString()}`,
                });
            }).finally(() => {
                setLoading(false)
            })
        }
        setIsEdit(null)
        form.resetFields()
    }

    return (
        <Card>
            <Modal
                title="Add New Animal"
                open={isModalOpen}
                onCancel={handleCancel}
                okButtonProps={{ htmlType: 'submit', form: 'add-new-category', loading }}
            >
                <Spin spinning={loadingEdit}>
                    <Form
                        layout="horizontal"
                        onFinish={onFinish}
                        onFinishFailed={() => setIsModalOpen(true)}
                        form={form}
                        id="add-new-category"
                        labelCol={{ span: 24 }}
                        preserve={false}
                    >
                        <UploadImage form={form} />
                        <Form.Item
                            label="Category name"
                            name={['name']}
                            rules={[
                                {
                                    required: true,
                                    message: 'name is required',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
            <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                <Typography.Title level={3}>Category List</Typography.Title>
                <div>
                    <Form
                        layout="horizontal"
                        onFinish={onFinish}
                        form={form}
                    >
                        <UploadImage form={form} />
                        <Form.Item
                            label="Category name"
                            name={['name']}
                            rules={[
                                {
                                    required: true,
                                    message: 'name is required',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button loading={loading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
                <Space direction="vertical" size="middle" className="only-on-mobile" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    {(data?.data || []).map((item: any) => (
                        <Card className="box-shadow card-animal-list" style={{ marginBottom: '20px' }} loading={isLoading}>
                            <div style={{ width: '100%' }}>
                                <img style={{ width: '100%' }} src={item.Image} alt="category_img" />
                            </div>
                            <Flex justify="center">
                                <Typography.Title level={4}>{item.Name}</Typography.Title> <br />
                            </Flex>
                            <Divider />
                            <Flex gap="small" >
                                <Button type="primary" style={{ width: '50%' }} ghost icon={<EditOutlined />} onClick={() => editCategory(item)}>Edit</Button>
                                <Button type="primary" style={{ width: '50%' }} ghost danger icon={<DeleteOutlined />} onClick={() => deleteDelete(item.ID)}>Delete</Button>
                            </Flex>
                        </Card>

                    ))}
                </Space>
                <Table
                    className="only-on-desktop"
                    scroll={{ x: 2000 }}
                    loading={isLoading}
                    columns={columns}
                    dataSource={data?.data || []}
                />
            </Space>
        </Card>
    )
}