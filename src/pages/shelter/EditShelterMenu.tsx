import { Button, Card, Form, Input, Modal, Spin, Typography } from "antd";
import { Container } from "react-bootstrap";
import { api } from "../../utillities/api";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";

export default function EditShelterMenu() {
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
        api.put('/shelter/'+getUser().shelter_id, {...value, direct_edit: true}).then(() => {
            Modal.success({
                title: 'Success',
                icon: <CheckOutlined />,
                content: `Success edit shelter`,
            });
            getData()
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
        api.get('/shelter/'+getUser().shelter_id).then((res) => {
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
    },[setLoading, setData])

    useEffect(() => {
        getData()
    }, [getData])

    

    return (
        <Container>
            <Spin spinning={loading}>
                <Card>
                    <Typography.Title level={3}>Edit Your Shelter</Typography.Title>
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

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        </Container>
    )
}