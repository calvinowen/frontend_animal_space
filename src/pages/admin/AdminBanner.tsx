import { CheckOutlined, CloseCircleOutlined, DeleteOutlined, InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Form, Modal, Space, Spin, Typography } from "antd";
import UploadImage from "../../components/UploadImage";
import { useState } from "react";
import { api, fetcher } from "../../utillities/api";
import useSWR from "swr";

export default function AdminBanner() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [, setIsEdit] = useState<any>();
    const [, setIsModalOpen] = useState(false);

    const { data, mutate, isLoading } = useSWR('/admin/banner', fetcher);

    const onFinish = (val: any) => {
        api.post('/admin/banner', val).then(() => {
            Modal.success({
                title: 'Success',
                icon: <CheckOutlined />,
                content: `Success to add banner`,
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
        setIsEdit(null)
        form.resetFields()
    }

    const deleteApi = (id: number) => {
        api.delete('/admin/banner/'+ id).then(() => {
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
            title: 'Are you sure to delete this banner slide show ?',
            icon: <InfoCircleOutlined />,
            content: `This change will delete banner that you choose`,
            onOk: () => deleteApi(id)
        });
    }

    return (
        <Spin spinning={isLoading}>
            <Card>
                <Typography.Title level={3}>Add Slide Show Banner</Typography.Title>
                <Divider />
                <div>
                    <Form
                        layout="horizontal"
                        onFinish={onFinish}
                        form={form}
                    >
                        <UploadImage form={form} />
                        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button loading={loading} type="primary" htmlType="submit" icon={<PlusOutlined/>}>
                                Add Banner
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
                <br />
                <Divider />
                <Typography.Title level={3}>List Slide Show Banner</Typography.Title>
                <Divider />
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    { (data?.data || []).map((item: any, idx: number) => (
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Flex gap="small" wrap="wrap">
                                <Button type="primary" ghost danger icon={<DeleteOutlined />} onClick={() => { deleteDelete(item?.ID) }}>Delete Banner</Button>
                            </Flex>
                            <div style={{ textAlign: 'center', width: '100%' }}>
                                <img style={{ width: '100%' }} src={item?.image} alt={'bg_'+idx} />
                            </div>
                        </Space>
                    ))}
                </Space>
            </Card>
        </Spin>
    )
}