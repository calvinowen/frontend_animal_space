import { Card, Form, Input, Button, Typography, Modal, Flex } from "antd";
import { api } from "../utillities/api";
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from '@ant-design/icons';
import { useState } from "react";

const { confirm } = Modal;

function storeToken(res: any) {
    const authStorage = {
        token: res?.data?.token
    }
    localStorage.setItem('auth', JSON.stringify(authStorage))
}

const getUser = async (navigate: Function) => {
    await api.get('/user').then((res) => {
        localStorage.setItem('user', JSON.stringify(res?.data || ''))
        if(res?.data?.role === 'admin'){
            navigate('/admin/home')
        }else{
            navigate('/')
        }
    }).catch((err) => {
        confirm({
            title: 'Error to login',
            icon: <CloseCircleOutlined />,
            content: `${err.toString()}`,
        });
    })
}

export default function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const onFinish = async (val: any) => {
        setLoading(true)
        await api.post('/login', val).then((res) => {
            storeToken(res)
            getUser(navigate);
        }).catch((err) => {
            confirm({
                title: 'Error to login',
                icon: <CloseCircleOutlined />,
                content: `${(err?.response?.data?.error)}`,
            });
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div style={{ background: '#0174BE', height: '100vh', position: 'relative', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card className="box-shadow" style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '400px' }}>
                <div style={{ maxWidth: '100px', margin: 'auto' }}>
                    <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/ufxhsmkLSKHLSIbbdjaHlogo.png" alt="logo" />
                </div>
                <Flex justify="center">
                    <Typography.Title level={3}>Login</Typography.Title>
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
                        label="Email"
                        name={['email']}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name={['password']}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        style={{ marginBottom: 0 }}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Flex justify="end">
                        <Button type="link" onClick={() => navigate('/forget-password')} style={{ paddingRight: 0 }}>
                            Forget your password?
                        </Button>
                    </Flex>
                    <br />
                    <Button type="primary" htmlType="submit" loading={loading} block >
                        Login
                    </Button>
                    <br />
                    <br />
                    <Flex justify="center">
                        <Button type="link" onClick={() => navigate('/register')}>Dont't have account? register here</Button>
                    </Flex>
                    <Flex justify="center">
                        <Button type="link" onClick={() => navigate('/create-shelter')}>Or Create your own shelter here</Button>
                    </Flex>
                </Form>
            </Card>
        </div>
    )
}