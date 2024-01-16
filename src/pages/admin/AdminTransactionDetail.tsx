import { Alert, Button, Card, Col, Divider, Flex, Modal, Row, Space, Spin, Tag, Typography } from "antd"
import { useParams } from "react-router-dom"
import useSWR from "swr";
import { CheckOutlined, CloseCircleOutlined, PhoneOutlined, ShopOutlined } from "@ant-design/icons";
import { api, fetcher } from "../../utillities/api";
import { useEffect, useState } from "react";

export default function AdminTransactionDetail() {
    const { id, shelter_id } = useParams()
    const [list, setList] = useState<any>()
    const [loading, setLoading] = useState(false)

    const { data, isLoading, mutate } = useSWR(`/admin/transaction/${shelter_id}/` + id, fetcher);

    useEffect(() => {
        setList(data?.data)
    }, [setList, data?.data])

    const approvalImg = (idx: number, approval: string) => {
        list[idx].Status = approval
        const payload = list[idx]
        setLoading(true)
        api.put('/shelter/transaction/detail/approval', payload).then(() => {
            Modal.success({
                title: 'Success',
                icon: <CheckOutlined />,
                content: `Success approve for ${payload.AnimalName}`,
            });
            mutate()
        }).catch((err) => {
            Modal.confirm({
                title: 'Error to Register',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        }).finally(() => {
            setLoading(false)
        })
    }

    const StatusTag = ({status}: {status: string}) => {
        if(status === "approve"){
            return <Tag color="success">Approve</Tag>
        }
        else if(status === "reject"){
            return <Tag color="error">Reject</Tag>
        }
        else if(status === "pending"){
            return <Tag color="processing">Waiting approval</Tag>
        }
        return ""
    }

    return (
        <Spin spinning={isLoading}>
            <Typography.Title level={2}>Transaction ID: {id}</Typography.Title>
            <Divider />
            <Alert
                style={{ color: '#91caff' }}
                description={(
                    <Row wrap>
                        <Col span={12}>
                            <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                                <Typography.Title level={4}>User Information</Typography.Title>
                                <Typography.Text>Name: <strong>{data?.user?.Username}</strong></Typography.Text>
                                <Typography.Text>Email: <strong>{data?.user?.Email}</strong></Typography.Text>
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                                <Typography.Title level={4}>Shelter Information</Typography.Title>
                                <Typography.Text>Name: <strong>{data?.shelter?.Name}</strong></Typography.Text>
                                <Typography.Text>Phone: <strong>{data?.shelter?.Phone}</strong></Typography.Text>
                                <Typography.Text>Address: <strong>{data?.shelter?.Address}</strong></Typography.Text>
                            </Space>
                        </Col>
                    </Row>
                )}
                type="info"
            />
            <br />
            <Typography.Title level={4}>List of product</Typography.Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {(data?.data || []).map((item: any, idx: number) => (
                    <Card className="box-shadow">
                        <Flex gap="small" wrap="wrap" justify="space-between" align="center">
                            <Typography.Title level={3}>{item.AnimalName}</Typography.Title>
                            <div>
                                <Typography.Title level={5}>Rp {item.AnimalPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Typography.Title>
                                <Typography.Text>{item.Quantity} Animal</Typography.Text>
                            </div>
                        </Flex>
                        <Divider />
                        <Flex justify="space-between">
                            <Row gutter={12}>
                                <Col>
                                    <div style={{ width: '150px' }}>
                                        <img style={{ width: '100%' }} src={item.AnimalImage} alt="trx_animal_img" />
                                    </div>
                                </Col>
                                <Col>
                                    <Space direction="vertical">
                                        <Typography.Text>Jenis : <strong>{item.AnimalType}</strong> </Typography.Text>
                                        <Typography.Text>Gender : <strong>{item.AnimalGender}</strong> </Typography.Text>
                                        <Typography.Text>Kategori : <strong>{item.AnimalCategory}</strong> </Typography.Text>
                                    </Space>
                                </Col>
                            </Row>
                            <Space direction="vertical">
                                <Typography.Title level={4} style={{ textAlign: 'end' }}>Shelter</Typography.Title>
                                <Flex gap="small" justify="end">
                                    <ShopOutlined />
                                    <Typography.Text strong>{item.ShelterName}</Typography.Text>
                                </Flex>
                                <Flex gap="small" wrap="wrap" className="contact-shelter-transaction">
                                    <Typography.Text> Contact : </Typography.Text>
                                    <Tag icon={<PhoneOutlined />} color="#55acee">
                                        {item.ShelterPhone}
                                    </Tag>
                                </Flex>
                            </Space>
                        </Flex>
                        { item.Status &&
                            <>
                                <Divider />
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    {/* <Typography.Title level={4}>Receipt send by customer</Typography.Title>
                                    <div style={{ maxWidth: '500px', margin: 'auto' }}>
                                        <img style={{ width: '100%' }} src={item.Images} alt="" />
                                    </div> */}
                                    <div
                                        style={{ textAlign: 'center' }}
                                    >
                                        <Space direction="vertical" >
                                            <div>
                                                <Typography.Title level={5}>Status: </Typography.Title>
                                                <StatusTag status={item.Status} />
                                            </div>
                                            {item.Status === "pending" &&
                                                <Spin spinning={isLoading}>
                                                    <Space direction="horizontal">
                                                        <Button type="primary" loading={loading} onClick={() => approvalImg(idx, "approve")}>
                                                            Approve
                                                        </Button>
                                                        <Button type="primary" danger loading={loading} onClick={() => approvalImg(idx, "reject")}>
                                                            Reject
                                                        </Button>
                                                    </Space>
                                                </Spin>

                                            }
                                        </Space>
                                    </div>
                                </Space>
                            </>
                        }
                    </Card>
                ))}
            </Space>
        </Spin>
    )
}