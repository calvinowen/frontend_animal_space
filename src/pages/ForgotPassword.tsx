import { Alert, Button, Card, Flex, Form, Input, Modal, Typography } from "antd";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../utillities/api";
import { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onFinish = (value: any) => {
        api.post('/forgetpassword', value).then(() => {
            setLoading(false)
            navigate('/send-reset-pass')
        }).catch((err) => {
            Modal.confirm({
                title: 'Error to send email',
                icon: <CloseCircleOutlined />,
                content: `${(err?.response?.data?.error || err.toString())}`,
            });
        })
    }

    return (
        <Container>
            <Card className="box-shadow" style={{ marginTop: '60px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '400px' }}>
                <Flex justify="center">
                    <Typography.Title level={3}>Forget Password</Typography.Title>
                </Flex>
                <br />
                <Alert
                    message="We send you an email to next step change to reset your password"
                    type="info"
                    showIcon
                />
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
                        label="email"
                        name={['Email']}
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Container>
    )
}