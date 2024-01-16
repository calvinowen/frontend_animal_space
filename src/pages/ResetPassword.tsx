import { Button, Card, Flex, Form, Input, Modal, Typography } from "antd";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../utillities/api";
import { useState } from "react";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function ResetPassword() {
    const params = new URLSearchParams(document.location.search)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onFinish = (value: any) => {
        const payload ={
            ...value,
            Hash: (params.get('idveas') || '')
        }
        if( value?.Password != value?.re_password){
            Modal.confirm({
                title: 'Password not match',
                icon: <CloseCircleOutlined />,
                content: "both password is not match",
            });
            return
        }
        api.post('/resetpassword', payload).then(() => {
            setLoading(false)
            Modal.success({
                title: 'Success',
                icon: <CheckOutlined />,
                content: `Success to reset password`,
                onOk: () => navigate('/login'),
                onCancel: () => navigate('/login')
            });
        }).catch((err) => {
            Modal.confirm({
                title: 'Error to reset password',
                icon: <CloseCircleOutlined />,
                content: `${(err?.response?.data?.error || err.toString())}`,
            });
        })
    }

    return (
        <Container>
            <Card className="box-shadow" style={{ marginTop: '60px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '400px' }}>
                <Flex justify="center">
                    <Typography.Title level={3}>Reset your Password</Typography.Title>
                </Flex>
                <br />
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Password"
                        name={['Password']}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        style={{ marginBottom: 0 }}
                    >
                        <Input.Password />
                    </Form.Item>
                    <br />
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
                            Reset password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Container>
    )
}