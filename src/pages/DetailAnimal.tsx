import { Button, Card, Col, Divider, Flex, Modal, Row, Space, Spin, Tag, Typography, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { api } from "../utillities/api";
import { CheckOutlined, CloseCircleOutlined, EnvironmentOutlined, PhoneOutlined, SendOutlined, ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import "@fontsource/montserrat"

export default function DetailAnimal() {
    const [loading, setLoading] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<any>()
    const { id } = useParams()
    const navigate = useNavigate()
    
    const getUser = () => {
        const auth = window.localStorage.getItem('user');
        if (!auth) {
            return null
        }
        const tmp = JSON.parse(auth)
        return tmp
    }

    const checkout = () => {
        
        // const payload = (data?.data).map((item: any) => ({
        //     AnimalID: item?.AnimalID,
        //     Quantity: item?.Quantity,
        //     Price: item?.Animal?.Price
        // }))
        const payload = [
            {
                AnimalID: data?.Id,
                Quantity: 1,
                Price: data.Price
            }
        ]
        api.post('/animal-space/checkout?total_price='+data.Price+'&number_of_item='+1, payload).then(() => {
            Modal.success({
                title: 'Success',
                icon: <CheckOutlined />,
                content: `Success to checkout animal`,
                onOk: () => navigate('/transaction/success'),
                onCancel: () => navigate('/transaction/success')
            });
        }).catch((err) => {
            Modal.error({
                title: 'Error to Register',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        }).finally(() => {
            setLoading(false)
        })
    }

    const getData = useCallback(() => {
        setLoading(true)
        api.get('/animal-space/'+id).then((res) => {
            setData(res?.data?.data || [])
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

    const addToCart = () => {
        setLoadingSubmit(true)
        api.post('/animal-space/cart', {
            AnimalID: data?.Id
        }).then(() => {
            messageApi.open({
                type: 'success',
                content: '#'+ data?.Id +' Success add to cart '+ data?.Name ,
            });
        }).catch((err) => {
            Modal.error({
                title: 'Error to Get data',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        }).finally(() => {
            setLoadingSubmit(false)
        })
    }
    
    return (
        <Container>
            <Spin spinning={loading}>
                {contextHolder}
                <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                    <Card className="box-shadow">
                        <Flex wrap="wrap" gap="middle">
                            <div style={{ width: '435px' }}>
                                <img style={{ width: '100%' }} src={data?.Image || ''} alt="detail_animal_pic" />
                            </div>
                            <Space direction="vertical" size="small" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px', width: '500px' }}>
                                <Typography.Title level={2} style={{ marginBottom: 0 }}>{data?.Name}</Typography.Title>
                                <Typography.Title level={4} style={{ color: '#0174BE', marginBottom: 0 }}>Rp {data?.Price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Typography.Title>
                                <Divider />
                                <Row>
                                    <Col span={10}>
                                        <Typography.Text>Kategori :</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text strong>{data?.Category_name}</Typography.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <Typography.Text>Jenis    :</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text strong>{data?.Type}</Typography.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <Typography.Text>Gender    :</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text strong>{data?.Gender}</Typography.Text>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col span={10}>
                                        <Typography.Text>Jumlah   :</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text strong>{data?.Quantity}</Typography.Text>
                                    </Col>
                                </Row> */}
                                <div>
                                    <Typography.Text>Deskripsi   :</Typography.Text>
                                    <p style={{ marginTop: '10px' }}>{data?.Description}</p>
                                </div>
                                { (getUser() && getUser()?.shelter_id !== data?.Shelter_id) &&
                                    <Flex gap="middle">
                                        <Button 
                                            icon={<ShoppingCartOutlined /> } 
                                            type="primary" 
                                            loading={loadingSubmit}
                                            onClick={addToCart}
                                        >
                                            Add To Cart
                                        </Button>
                                        <Button 
                                            icon={<SendOutlined /> } 
                                            type="primary" 
                                            loading={loadingSubmit}
                                            onClick={checkout}
                                            style={{ background: '#87d068' }}
                                        >
                                            Order now
                                        </Button>
                                    </Flex>
                                }
                            </Space>
                        </Flex>
                    </Card>
                    <Card className="box-shadow">
                        <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                            <Typography.Title style={{ color: '#0174BE', marginBottom: 0 }} level={3}>Shelter</Typography.Title>
                            <div>
                                <Flex gap={"middle"} align="center">
                                    <div className="shelter-info-detail" >
                                        <ShopOutlined style={{ fontSize: '50px' }} />
                                    </div>
                                    <Space direction="vertical" size="small">
                                        <Typography.Link 
                                            strong 
                                            onClick={() => { navigate('/animal/shelter/'+data?.Shelter_id) }}
                                            style={{ fontSize: '20px' }}
                                        >
                                            {data?.Shelter_name}
                                        </Typography.Link> 
                                        <Tag icon={<PhoneOutlined />} color="#55acee">
                                            {data?.Shelter_Phone}
                                        </Tag>
                                        <Flex gap={"middle"}>
                                            <EnvironmentOutlined style={{ color: '#0174BE' }} />
                                            <Typography.Text strong>{data?.Shelter_Address}</Typography.Text>
                                        </Flex>
                                    </Space>
                                </Flex>
                            </div>
                        </Space>
                    </Card>
                        
                </Space>
            </Spin>
        </Container>
    )
}