import { Alert, Button, Card, Form, Input, Modal, Space, Spin, Typography } from "antd";
import { api } from "../../utillities/api";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export default function EditShelter() {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [, setData] = useState<any>()

    const getUser = () => {
        const auth = window.localStorage.getItem('user');
        if (!auth) {
            return null
        }
        const tmp = JSON.parse(auth)
        return tmp
    }

    const onFinish = (value: any) => {
        api.put('/shelter/' + getUser().shelter_id, value).then(() => {
            Modal.success({
                title: 'Success',
                icon: <CheckOutlined />,
                content: `Success edit shelter`,
                onOk: () => navigate('/'),
                onCancel: () => navigate('/')
            });
        }).catch((err) => {
            Modal.confirm({
                title: 'Error to Register',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        })
    }

    const getData = useCallback(() => {
        setLoading(true)
        api.get('/shelter/' + getUser().shelter_id).then((res) => {
            setData(res?.data?.data || {})
            form.setFieldsValue(res?.data?.data || {})
        }).catch((err) => {
            Modal.error({
                title: 'Error to Get data',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        }).finally(() => {
            setLoading(false)
        })
    }, [setLoading, setData])

    useEffect(() => {
        getData()
    }, [getData])



    return (
        <div style={{ background: '#0174BE', height: '100vh', position: 'relative', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin spinning={loading}>
                <Card className="box-shadow" style={{ marginTop: '60px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '600px' }}>
                    <Typography.Title level={3}>Edit Your Shelter</Typography.Title>
                    <Alert
                        style={{ color: '#91caff' }}
                        message="Informational Notes"
                        description="Your shelter has been rejected, edit your shelter infomation and submit again"
                        type="info"
                        showIcon
                    />
                    <br />
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Shelter Name"
                            name={['Name']}
                            rules={[{ required: true, message: 'Please input your Selter Name!' }]}
                        >
                            <Input placeholder="Your shelter name" />
                        </Form.Item>
                        <Form.Item
                            label="phone"
                            name={['Phone']}
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <Input placeholder="Input shlter phone" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name={['Description']}
                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                            <Input.TextArea placeholder="Input your shelter description" />
                        </Form.Item>
                        <Form.Item
                            label="Detail Address"
                            name={['Address']}
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input.TextArea placeholder="write down your detail address" />
                        </Form.Item>

                        <Space size="middle" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button type="primary" danger htmlType="submit"
                                onClick={() => {
                                    localStorage.clear()
                                    navigate('/login')
                                }}
                            >
                                Logout
                            </Button>
                        </Space>
                    </Form>
                </Card>
            </Spin>
        </div>
    )
}