import { CheckOutlined, CloseCircleOutlined, DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Modal, Result, Space, Spin, Typography, message } from "antd";
import useSWR from "swr";
import { api, fetcher } from "../utillities/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
// import { ReactSVG } from "react-svg";

export default function Cart() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const { data, isLoading, mutate } = useSWR(`/animal-space/cart`, fetcher);

    const totalPrice = () => {
        let total = 0;
        (data?.data || []).forEach((item: any) => {
            total = total + (item?.Quantity * item?.Animal?.Price)
        });
        return total
    }

    const checkout = () => {
        // /animal-space/checkout
        const payload = (data?.data).map((item: any) => ({
            AnimalID: item?.AnimalID,
            Quantity: item?.Quantity,
            Price: item?.Animal?.Price
        }))
        api.post('/animal-space/checkout?total_price='+totalPrice()+'&number_of_item='+(data?.data || []).length, payload).then(() => {
            Modal.success({
                title: 'Success',
                icon: <CheckOutlined />,
                content: `Success to checkout animal`,
                onOk: () => navigate('/transaction/success'),
                onCancel: () => navigate('/transaction/success')
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
    }

    const deleteCart = (id: number) => {
        api.delete('/animal-space/cart/'+ id).then(() => {
            mutate()
            messageApi.open({
                type: 'success',
                content: '#'+ id +' Success delete this item ' ,
            });
        }).catch((err) => {
            Modal.error({
                title: 'Error to delete',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        }).finally(() => {
            setLoading(false)
        })
    }

    if((data?.data || []).length === 0){
        return(
            <Result
                icon={
                    <div style={{ display: 'flex', justifyContent: 'center'  }}>
                        <div style={{ width: '50vh'}}>
                            <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/CvpyogTlnEKniGDvtvsuundraw_empty_cart_co35.png" alt="cart_img" />
                            {/* <ReactSVG className="svg-component" src="src/assets/undraw_empty_cart_co35.svg" /> */}
                        </div>
                    </div>
                }
                title="You don't have any item here!"
                extra={<Button type="primary" onClick={() => navigate('/')} >Back to home</Button>}
            />
        )
    }

    return (
        <Container>
            <Spin spinning={isLoading || loading}>
                {contextHolder}
                <Typography.Title level={1} style={{ color: '#0174BE' }} >Cart</Typography.Title>
                <div className="cart-grid">
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }} className="cart-grid-col1">
                        {(data?.data || []).map((rec: any) => (
                            <Card className="box-shadow">
                                <Flex gap="large">
                                    <div style={{ width: '150px' }}>
                                        <img style={{ width: '100%' }} src={rec?.Animal?.Image} alt="category_img" />
                                    </div>
                                    <Space direction="vertical" size="small" style={{ display: 'flex', width: '75%' }}>
                                        <Typography.Text style={{ fontSize: '20px' }} strong>{rec?.Animal?.Name}</Typography.Text>
                                        <p style={{ marginBottom: 0 }}>{rec?.Animal?.Type}</p>
                                        <Typography.Text strong style={{ color: '#0174BE' }}>Rp {rec?.Animal?.Price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Typography.Text>
                                        {/* <Flex justify="end">
                                            <div>Quantity : {rec?.Quantity}</div>
                                        </Flex> */}
                                    </Space>
                                </Flex>
                                <br className="only-on-mobile" />
                                <Flex justify="end" style={{ width: '100%' }}>
                                    <Button danger icon={<DeleteOutlined />} onClick={() => deleteCart(rec?.AnimalID) } >Delete this Item</Button>
                                </Flex>
                            </Card>
                        ))}
                    </Space>
                    <div className="only-on-desktop cart-grid-col2">
                        <Card className="box-shadow">
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <Typography.Title
                                    level={3}
                                >
                                    Order Summary
                                </Typography.Title>
                                <Flex gap="large" wrap="wrap" justify="space-between">
                                    <Typography.Text strong>
                                        {(data?.data || []).length} Animal
                                    </Typography.Text>
                                    <Space direction="horizontal" size="large" style={{ display: 'flex'}}>
                                        <Typography.Text strong>
                                            Total
                                        </Typography.Text>
                                        <Typography.Text >
                                            Rp {totalPrice().toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}   
                                        </Typography.Text>
                                    </Space>
                                </Flex>
                                <Flex justify="end">
                                    <Button 
                                        icon={<ShoppingOutlined /> } 
                                        type="primary" 
                                        // loading={loadingSubmit}
                                        onClick={checkout}
                                        block
                                        size="large"
                                    >
                                        Checkout
                                    </Button>
                                </Flex>
                            </Space>
                        </Card>
                    </div>
                </div>
                <Divider className="only-on-mobile" />
                <Card className="box-shadow only-on-mobile">
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Typography.Title
                            level={3}
                        >
                            Order Summary
                        </Typography.Title>
                        <Flex gap="large" wrap="wrap" justify="space-between">
                            <Typography.Text strong>
                                {(data?.data || []).length} Animal
                            </Typography.Text>
                            <Space direction="horizontal" size="large" style={{ display: 'flex'}}>
                                <Typography.Text strong>
                                    Total
                                </Typography.Text>
                                <Typography.Text >
                                    Rp {totalPrice().toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}   
                                </Typography.Text>
                            </Space>
                        </Flex>
                        <Flex justify="end">
                            <Button 
                                icon={<ShoppingOutlined /> } 
                                type="primary" 
                                // loading={loadingSubmit}
                                onClick={checkout}
                                block
                                size="large"
                            >
                                Checkout
                            </Button>
                        </Flex>
                    </Space>
                </Card>

            </Spin>
        </Container>
    )
}