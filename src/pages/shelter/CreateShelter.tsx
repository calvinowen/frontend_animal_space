import { Button, Card, Form, Input, Modal, Space, Steps, Typography } from "antd";
import { api } from "../../utillities/api";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateShelter() {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm() 

    const onFinish = async (value: any) => {
        setLoading(true)
        await api.post('/signup', form.getFieldValue(['account'])).then( async (res) => {
            const payload = { ...value.shelter, UserID: res.data.id}
            await api.post('/shelter/create', payload).then(() => {
                navigate('/success-signup')
            }).catch((err) => {
                Modal.confirm({
                    title: 'Error to Register shelter',
                    icon: <CloseCircleOutlined />,
                    content: `${err.toString()}`,
                });
            })
        }).catch((err) => {
            Modal.confirm({
                title: 'Error to Register',
                icon: <CloseCircleOutlined />,
                content: `${ err?.response?.data?.error || err.toString()}`,
            });
        }).finally(() => {
            setLoading(false)
        })
    }

    const onFinishAccount = (value: any) => {
        if( value?.account?.password != value?.account?.re_password){
            Modal.confirm({
                title: 'Password not match',
                icon: <CloseCircleOutlined />,
                content: "both password is not match",
            });
            return
        }
        next()
    }

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'Create Account Shelter',
            content: (
                <div>
                    <Typography.Title level={3}>Create account shelter</Typography.Title>
                    <br />
                    <br />
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        onFinish={onFinishAccount}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                    >
                        {/* <Form.Item
                            label="username"
                            name={['account','username']}
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item> */}
                        <Form.Item
                            label="email"
                            name={['account','email']}
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name={['account','password']}
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Re-type password"
                            name={['account','re_password']}
                            rules={[{ required: true, message: 're-type your password!' }]}
                            style={{ marginBottom: 0 }}
                        >
                            <Input.Password />
                        </Form.Item>
                        <br />
                        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="primary" htmlType="submit">
                                Next
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
        {
            title: 'Fill Shelter Information',
            content: (
                <div style={{ width: '100%' }} >
                    <Typography.Title level={3}>Shelter Information</Typography.Title>
                    <br />
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Shelter Name"
                            name={['shelter','name']}
                            rules={[{ required: true, message: 'Please input your Selter Name!' }]}
                        >
                            <Input placeholder="Your shelter name" />
                        </Form.Item>
                        <Form.Item
                            label="phone"
                            name={['shelter','phone']}
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <Input placeholder="Input shlter phone" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name={['shelter','description']}
                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                            <Input.TextArea placeholder="Input your shelter description" />
                        </Form.Item>
                        <Form.Item
                            label="Detail Address"
                            name={['shelter','address']}
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input.TextArea placeholder="write down your detail address" />
                        </Form.Item>

                        <Space size="large">
                            <Button onClick={() => prev()}>
                                Back
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </Space>
                    </Form>
                </div>
            ),
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div style={{ background: '#0174BE', height: '100vh', position: 'relative', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card className="box-shadow" style={{ marginTop: '60px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '600px' }}>
                <Steps current={current} items={items} />
                <br />
                <div style={{ textAlign: 'center', width: '100%' }} >{steps[current].content}</div>
            </Card>
        </div>
    )
}