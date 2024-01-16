import { Alert, Card, Col, Divider, Flex, Row, Space, Spin, Tag, Typography } from "antd"
import { useParams } from "react-router-dom"
import useSWR from "swr";
import { fetcher } from "../utillities/api";
import { PhoneOutlined, ShopOutlined } from "@ant-design/icons";
// import UploadReceiptImage from "../components/UploadReceiptImage";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function TransactionDetail() {
    const { id } = useParams()
    // const [form] = Form.useForm();
    const [list, setList] = useState<any>()
    // const [, setLoading] = useState<any>()

    const { data, isLoading } = useSWR(`/animal-space/transaction/` + id, fetcher);

    useEffect(() => {
        setList(data?.data)
    }, [setList, data?.data])

    // const sendImage = (idx: number) => {
    //     const payload = list[idx]
    //     setLoading(true)
    //     api.post('/animal-space/transaction/receipt', payload).then(() => {
    //         Modal.success({
    //             title: 'Success',
    //             icon: <CheckOutlined />,
    //             content: `Success send receipt for ${payload.AnimalName}`,
    //         });
    //         mutate()
    //     }).catch((err) => {
    //         Modal.confirm({
    //             title: 'Error to Register',
    //             icon: <CloseCircleOutlined />,
    //             content: `${err.toString()}`,
    //         });
    //     }).finally(() => {
    //         setLoading(false)
    //     })
    // }

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
        <Container>
            <Spin spinning={isLoading}>
                <Typography.Title level={2}>Transaction ID: {id}</Typography.Title>
                <Divider />
                <Alert
                    style={{ color: '#91caff' }}
                    message="Informational Notes"
                    description="Hubungi shelter yang ada di setiap item / list hewan untuk melanjutkan transaksi dengan pihak shelter"
                    type="info"
                    showIcon
                />
                <br />
                <Typography.Title level={4}>List of product</Typography.Title>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    {(list || []).map((item: any, _: number) => (
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
                            <Divider />
                            <Space direction="vertical" style={{ width: '100%' }}>
                                {/* <UploadReceiptImage form={form} setList={setList} list={list} index={idx} uploadDisable={item.Status === "pending" || item.Status === "approve"} />
                                <div
                                    style={{ textAlign: 'center' }}
                                > */}
                                    <Space direction="vertical">
                                        <div>
                                            { item?.Status &&
                                                <Typography.Title level={5}>Status: </Typography.Title>
                                            }
                                            <StatusTag status={item.Status} />
                                        </div>
                                        {/* { (!item?.Status || item?.Status === "reject") &&
                                            <Button loading={loading} type="primary" htmlType="submit" onClick={() => sendImage(idx)} disabled={!item?.Images}>
                                                Send Receipt
                                            </Button>
                                        } */}
                                    </Space>
                                {/* </div> */}
                            </Space>
                        </Card>
                    ))}
                </Space>
            </Spin>
        </Container>
    )
}