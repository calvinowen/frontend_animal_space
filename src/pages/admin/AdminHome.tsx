import { Button, Card, Col, Divider, Flex, Modal, Row, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../utillities/api";
import { CheckOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";

export default function AdminHome() {
    const [data, setData] = useState<any>()

    const getShelter = useCallback(() => {
        api.get('/shelter').then((res) => {
            setData(res?.data?.data || [])
        }).catch((err) => {
            Modal.confirm({
                title: 'Error to get data',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        })
    }, [setData])

    useEffect(() => {
        getShelter()
    }, [getShelter])


    const approve = (id: number) => {
        const payload = {id: id, status: 'approve', note: ''}
        api.put('/shelter/approval', payload).then((res) => {
            Modal.success({
                title: 'Success Reject',
                icon: <CloseCircleOutlined />,
                content: `${res?.data?.messege}`,
            });
            getShelter()
        }).catch((err) => {
            Modal.confirm({
                title: 'Error approval',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        })
    }

    const reject = (id: number) => {
        const payload = {id: id, status: 'reject', note: ''}
        api.put('/shelter/approval', payload).then((res) => {
            Modal.success({
                title: 'Success Approve',
                icon: <CloseCircleOutlined />,
                content: `${res?.data?.messege}`,
            });
            getShelter()
        }).catch((err) => {
            Modal.confirm({
                title: 'Error approval',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        })
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Shelter name',
            dataIndex: 'Name',
            key: 'name',
        },
        {
            title: 'Created by',
            dataIndex: 'Owner_name',
            key: 'Owner_name',
        },
        {
            title: 'Created email',
            dataIndex: 'Email_user',
            key: 'Email_user',
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: 'phone',
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'description',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'address',
        },
        {
            title: 'status',
            dataIndex: 'Status',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, rec: any) => {
                if( rec?.Status === 'pending'){
                    return (
                        <Flex gap="small" wrap="wrap">
                            <Button type="primary" onClick={() => approve(rec.Id)} >Approve</Button>
                            <Button type="primary" onClick={() => reject(rec.Id)} danger>Reject</Button>
                        </Flex>
                    )
                }
                return null
            },
        },
    ];

    return (
        <Card>
            <Space direction="horizontal" align="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography.Title level={3}>List of Approval Shelter</Typography.Title>
            </Space>
            <Divider />
            <Space direction="vertical" size="middle" className="only-on-mobile" style={{ marginTop: '10px', marginBottom: '10px' }}>
                {(data || []).map((item: any) => (
                    <Card className="box-shadow card-animal-list" style={{ marginBottom: '20px' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Row>
                                <Col span={8}><Typography.Text strong>Name : </Typography.Text></Col>
                                <Col span={16}><Typography.Text>{item.Name}</Typography.Text></Col>
                            </Row>
                            <Row>
                                <Col span={8}><Typography.Text strong>Created by : </Typography.Text></Col>
                                <Col span={16}><Typography.Text>{item.Owner_name}</Typography.Text></Col>
                            </Row>
                            <Row>
                                <Col span={8}><Typography.Text strong>Created email : </Typography.Text></Col>
                                <Col span={16}><Typography.Text>{item.Email_user}</Typography.Text></Col>
                            </Row>
                            <Row>
                                <Col span={8}><Typography.Text strong>Phone : </Typography.Text></Col>
                                <Col span={16}><Typography.Text>{item.Phone}</Typography.Text></Col>
                            </Row>
                            <Row>
                                <Col span={8}><Typography.Text strong>Description : </Typography.Text></Col>
                                <Col span={16}><Typography.Text>{item.Description}</Typography.Text></Col>
                            </Row>
                            <Row>
                                <Col span={8}><Typography.Text strong>Status : </Typography.Text></Col>
                                <Col span={16}><Typography.Text>{item.Status}</Typography.Text></Col>
                            </Row>
                        </Space>
                        {
                            item?.Status === 'pending' &&
                            <>
                                <Divider />
                                <Flex gap="small" >
                                    <Button type="primary" style={{ width: '50%' }} ghost icon={<CheckOutlined />} onClick={() => approve(item.Id)}>Approve</Button>
                                    <Button type="primary" style={{ width: '50%' }} ghost danger icon={<CloseOutlined />} onClick={() => reject(item.Id)}>Reject</Button>
                                </Flex>
                            </>
                        }
                    </Card>
                ))}
            </Space>
            <Table
                className="only-on-desktop"
                scroll={{ x: 2000 }}
                columns={columns}
                dataSource={data}
            />
        </Card>
    )
}