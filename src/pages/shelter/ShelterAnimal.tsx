import { Card, Flex, Space, Spin, Tag, Typography } from "antd";
import { EnvironmentOutlined, PhoneOutlined, ShopOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { fetcher } from "../../utillities/api";
import useSWR from "swr";
import { Container } from "react-bootstrap";

export default function ShelterAnimal() {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data, isLoading } = useSWR(`/animal?shelter_id=${id}` , fetcher);
    const { data: data_shelter, isLoading: isLoading_shelter } = useSWR(`/shelter/${id}` , fetcher);

    return (
        <Container>
            <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                <Spin spinning={isLoading || isLoading_shelter}>
                <Card className="box-shadow">
                        <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                            <div>
                                <Flex gap={"middle"} align="center">
                                    <div className="shelter-info-detail" >
                                        <ShopOutlined style={{ fontSize: '50px' }} />
                                    </div>
                                    <Space direction="vertical" size="small">
                                        <Typography.Title  
                                            onClick={() => { navigate('/animal/shelter/'+data?.Shelter_id) }}
                                            style={{ marginBottom: 0, color: '#0174BE' }}
                                            level={3}
                                        >
                                            {data_shelter?.data?.Name}
                                        </Typography.Title> 
                                        <Tag icon={<PhoneOutlined />} color="#55acee">
                                            {data_shelter?.data?.Phone}
                                        </Tag>
                                        <Flex gap={"middle"}>
                                            <EnvironmentOutlined style={{ color: '#0174BE' }} />
                                            <Typography.Text strong>{data_shelter?.data?.Address}</Typography.Text>
                                        </Flex>
                                    </Space>
                                </Flex>
                                <br />
                                <p>
                                    {data_shelter?.data?.Description}
                                </p>
                            </div>
                        </Space>
                    </Card>
                    <br />
                    <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                        
                        <Flex wrap="wrap" gap="small">
                            {(data?.data || []).map((item: any) => (
                                <Card
                                    hidden={item?.Status === "sold"}
                                    hoverable
                                    cover={<img alt="pet_pic" src={item?.Image} style={{ height: '244px', width: 'auto' }} />}
                                    style={{ width: '300px', overflow: 'hidden' }}
                                    onClick={() => {
                                        navigate('/detail-animal/'+item?.ID)
                                    }}
                                    className="card-animal"
                                >
                                    <Card.Meta
                                        title={item?.Name}
                                        description={(
                                            <Space direction="vertical" size="middle">
                                                <Typography.Title level={5}>Rp {item?.Price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Typography.Title>
                                            </Space>
                                        )}
                                    />
                                </Card>
                            ))}
                        </Flex>
                    </Space>
                </Spin>
            </Space>
        </Container>
    )
}