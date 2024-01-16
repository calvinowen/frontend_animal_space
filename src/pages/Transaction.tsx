import { Button, Card, Col, Divider, Flex, Result, Row, Space, Spin, Tag, Typography } from "antd";
import useSWR from "swr";
import { fetcher } from "../utillities/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
// import { ReactSVG } from "react-svg";

export default function Transaction() {
    const navigate = useNavigate()
    
    const { data, isLoading } = useSWR(`/animal-space/transaction`, fetcher);

    const Status = ({item}:{item: any}) => {
        if(item.animal_count === item.approve_count ){
            return <Tag color="success">Done</Tag>
        }else if(item.animal_count === item.reject_count){
            return <Tag color="error">Rejected</Tag>
        }
        return <Tag color="processing">Active</Tag>
    }

    if((data?.data || []).length === 0){
        return(
            <Result
                icon={
                    <div style={{ display: 'flex', justifyContent: 'center'  }}>
                        <div style={{ width: '50vh'}}>
                            <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/yAkxsUPlZfuhVmPgTorIundraw_selection_re_ycpo.png" alt="cart_img" />
                            {/* <ReactSVG className="svg-component" src="src/assets/undraw_selection_re_ycpo.svg" /> */}
                        </div>
                    </div>
                }
                title="You don't have any transaction here!"
                extra={<Button type="primary" onClick={() => navigate('/')} >Back to home</Button>}
            />
        )
    }
    
    return (
        <Container>
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
                                        <Button onClick={() => navigate('/transaction/'+item.transaction_id)}>Detail Transaction</Button>
                                    </div>
                                </Flex>
                                <Divider />
                                <Row justify="space-between">
                                    <Col >
                                        <Typography.Text>Transaction Date:</Typography.Text>
                                        <Typography.Title level={5}>{moment(item.created_at).format("YYYY MMMM DD")}</Typography.Title>
                                        <Typography.Text>{item.animal_count} Animal</Typography.Text>
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
        </Container>
    )
}