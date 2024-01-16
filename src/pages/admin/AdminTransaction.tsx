import { Button, Card, Col, Divider, Flex, Row, Space, Spin, Tag, Typography } from "antd";
import useSWR from "swr";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../../utillities/api";

export default function AdminTransaction() {
    const navigate = useNavigate()
    
    const { data, isLoading } = useSWR(`/admin/transaction`, fetcher);

    const Status = ({item}:{item: any}) => {

        if(item.animal_count === item.approve_count ){
            return <Tag color="success">Done</Tag>
        }else if(item.animal_count === item.reject_count){
            return <Tag color="error">Rejected</Tag>
        }
        return <Tag color="processing">Active</Tag>
    }
    
    return (
        <Spin spinning={isLoading}>
            <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                <Typography.Title level={1}>Transaction List</Typography.Title>

                <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                    { (data?.data || []).map((item: any) => (
                        <Card className="box-shadow">
                            <Flex align="baseline" justify="space-between">
                                <Typography.Title level={5}>Transaction ID: {item.transaction_id}</Typography.Title>
                                <div>
                                    <Status item={item} />
                                    <Button onClick={() => navigate('/admin/transaction/detail/'+ item.shelter_id +'/'+item.transaction_id)}>Detail Transaction</Button>
                                </div>
                            </Flex>
                            <Divider />
                            <Row justify="space-between">
                                <Col >
                                    <Typography.Text>Transaction Date:</Typography.Text>
                                    <Typography.Title level={5}>{moment(item.created_at).format("YYYY MMMM DD")}</Typography.Title>
                                    <Typography.Text>{item.animal_count} Animal</Typography.Text>
                                    <div>
                                        <Typography.Title style={{ marginTop: '10px' }} level={5}><strong>Shelter :</strong> {item.shelter_id}#{item.shelter_name}</Typography.Title>
                                    </div>
                                </Col>
                                <Col >
                                    <Typography.Text>Total Price: </Typography.Text>
                                    <Typography.Title level={5}>Rp {item.total_price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Typography.Title>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </Space>
            </Space>
        </Spin>
    )
}