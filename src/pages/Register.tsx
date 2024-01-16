import { Card, Form, Input, Button, Typography, Flex, Modal } from "antd";
import { api } from "../utillities/api";
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

function Register() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onFinish = (value: any) => {
        if( value?.password != value?.re_password){
            Modal.confirm({
                title: 'Password not match',
                icon: <CloseCircleOutlined />,
                content: "both password is not match",
            });
            return
        }
        setLoading(true)
        api.post('/signup', value).then(() => {
            navigate('/success-signup')
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

    return (
        <div style={{ background: '#0174BE', height: '100vh', position: 'relative', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card className="box-shadow" style={{ marginTop: '60px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '400px' }}>
                <Flex justify="center">
                    <Typography.Title level={3}>Register</Typography.Title>
                </Flex>
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="username"
                        name={['username']}
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="email"
                        name={['email']}
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name={['password']}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Re-type password"
                        name={['re_password']}
                        rules={[{ required: true, message: 're-type your password!' }]}
                        style={{ marginBottom: 0 }}
                    >
                        <Input.Password />
                    </Form.Item>
                    <br />
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Flex justify="center">
                        <Button type="link" onClick={() => navigate('/login')}>Have an account? login here</Button>
                    </Flex>
                </Form>
            </Card>
        </div>
    )
}

export default Register