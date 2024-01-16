import { Card, Carousel, Col, Flex, Modal, Row, Space, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { api, fetcher } from "../utillities/api";
import { useCallback, useEffect, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import "@fontsource/montserrat"
import { Container } from "react-bootstrap";

export default function Home() {
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>()
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState<any>()
    // const { data, isLoading } = useSWR(`/animal-space`, fetcher);
    const { data: dataBanner } = useSWR('/admin/banner', fetcher);

    const getCategory = useCallback(() => {
        setLoading(true)
        api.get('/shelter/category').then((res) => {
            setCategory(res?.data?.data || [])
        }).catch((err) => {
            Modal.error({
                title: 'Error to Get category',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        }).finally(() => {
            setLoading(false)
        })
    }, [setCategory])

    const getData = useCallback(() => {
        setLoading(true)
        api.get('/animal-space').then((res) => {
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
    }, [setLoading, setData])

    useEffect(() => {
        getData()
        getCategory()
    }, [getData, getCategory])

    const getUser = () => {
        const auth = window.localStorage.getItem('user');
        if (!auth) {
            return null
        }
        const tmp = JSON.parse(auth)
        return tmp
    }

    useEffect(() => {
        if(getUser()?.shelter_status === 'pending'){
            navigate('/waiting-approve-shelter')
        }

        if(getUser()?.shelter_status === 'reject'){
            navigate('/edit-shelter')
        }

        if(getUser()?.shelter_id){
            navigate('/shelter/home')
        }

        if(getUser()?.role === 'admin'){
            navigate('/admin/home')
        }

    }, [navigate])

    const ButtonCreateShelter = () => {
        // const user = getUser()

        // if (!getUser()) {
        //     return null
        // }

        // if (user?.shelter_status === 'approve') {
        //     return (
        //         <div className="create-shelter">
        //             <div className="image-home-create-shelter">
        //                 <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/ipJznhWcLexbgymsFkwFundraw_Everyday_life_re_1lfb.png" alt="" />
        //                 {/* <ReactSVG className="svg-component" src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/ipJznhWcLexbgymsFkwFundraw_Everyday_life_re_1lfb.png" /> */}
        //             </div>
        //             <div>
        //                 <div>
        //                     <div className="title-create-shelter">
        //                         Manage Your shelter
        //                     </div>
        //                     <p>Add more animal to your shelter or manage you transaction of your animal </p>
        //                     <Button type="primary" onClick={() => navigate('/shelter/home')} style={{ background: '#0174BE' }}>
        //                         Go to your shelter page
        //                     </Button>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // } else if (user?.shelter_status === 'pending') {
        //     return (
        //         <div className="create-shelter">
        //             <div className="image-home-create-shelter">
        //                 <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/hhPOfLJnOolJJxSRDyBAundraw_wait_in_line_o2aq.png" alt="" />
        //                 {/* <ReactSVG className="svg-component" src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/hhPOfLJnOolJJxSRDyBAundraw_wait_in_line_o2aq.png" /> */}
        //             </div>
        //             <div>
        //                 <div>
        //                     <div className="title-create-shelter">
        //                         Waiting to approve admin
        //                     </div>
        //                     <p>Your shelter will be see by Animal Space admin and make approval for it</p>
        //                     <Tag
        //                         color="blue"
        //                     >
        //                         Waiting shelter approval from admin
        //                     </Tag>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // } else if (user?.shelter_status === 'reject') {
        //     return (
        //         <div className="create-shelter">
        //             <div className="image-home-create-shelter">
        //                 <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/cTwfQpSEymtadTaOIKrmundraw_Cancel_re_pkdm.png" alt="" />
        //                 {/* <ReactSVG className="svg-component" src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/cTwfQpSEymtadTaOIKrmundraw_Cancel_re_pkdm.png" /> */}
        //             </div>
        //             <div>
        //                 <div>
        //                     <div className="title-create-shelter">
        //                         Your shelter has been reject
        //                     </div>
        //                     <p>Some your shelter information is not correct, make sure your information that you give is correct</p>
        //                     <Button type="primary" onClick={() => navigate('/edit-shelter')} style={{ background: '#0174BE' }}>
        //                         Edit Your Shelter
        //                     </Button>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // } else if (user?.role === "admin") {
        //     return (
        //         <div className="create-shelter">
        //             <div className="image-home-create-shelter">
        //                 <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/LhgWuSaSpJWLJbInEpodundraw_settings_tab_mgiw.png" alt="" />
        //                 {/* <ReactSVG className="svg-component" src="src/assets/undraw_settings_tab_mgiw.svg" /> */}
        //             </div>
        //             <div>
        //                 <div>
        //                     <div className="title-create-shelter">
        //                         Admin Page Here
        //                     </div>
        //                     <p>Setting or manage transaction, shelter or animal in this website</p>
        //                     <Button type="primary" onClick={() => navigate('/admin/home')} style={{ background: '#0174BE' }}>
        //                         Go to Admin page
        //                     </Button>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }
        return (
            <div className="create-shelter">
                <div className="image-home-create-shelter">
                    <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/fkEQZUKMuMbTCXKPBNJrundraw_friends_r511.png" alt="" />
                    {/* <ReactSVG className="svg-component" src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/fkEQZUKMuMbTCXKPBNJrundraw_friends_r511.png" /> */}
                </div>
                <div>
                    <div>
                        <div className="title-create-shelter">
                            Get your own pet
                        </div>
                        <p>Give the animal home to stay, make them comfort with become your friends</p>
                        {/* <Button type="primary" onClick={() => navigate('/create-shelter')} style={{ background: '#0174BE' }}>
                            Create Shelter Here
                        </Button> */}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Spin spinning={loading}>
            <div className="banner-section">
                <Container>
                    <Carousel
                        autoplay
                        style={{ overflow: 'hidden', maxHeight: '500px', borderRadius: '7px' }}
                    >
                        {(dataBanner?.data || []).map((item: any, idx: number) => (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img style={{ width: '100%' }} src={item?.image} alt={'bg_' + idx} />
                            </div>
                        ))}
                    </Carousel>
                </Container>
            </div>
            <div className="section-logo">
                <div className="logo-animal-space-home">
                    <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/ufxhsmkLSKHLSIbbdjaHlogo.png" alt="logo" />
                </div>
            </div>
            <div className="section-info">
                <Container>
                    <div className="info-grid">
                        <div className="info-box-text">
                            <div className="title-info">
                                We Care About Animal
                            </div>
                            <p className="desc-info">
                                Welcome to our Animal Space Pet Shelter. Our website is a gateway to the heartwarming 
                                stories of rescued pets seeking their forever homes. Browse through our adoption gallery, 
                                where each click brings you closer to a potential lifelong companion. Discover how we go 
                                beyond sheltering, offering love, and rehabilitation to animals in need. 
                                Join us in creating a community that values the well-being of every paw, 
                                tail, and whisker. Whether you're looking to adopt, volunteer, or contribute, 
                                be a part of our journey in making a difference—one wagging tail at a time. Together, 
                                let's celebrate a year of compassion, resilience, and the joy of finding homes for those who need it most.
                            </p>
                        </div>
                        <div className="animal-info-img" >
                            <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/pliAnMrwpYACOiapLZrsundraw_Good_doggy_re_eet7.png" alt="" />
                            {/* <ReactSVG className="svg-component" src="src/assets/undraw_good_doggy_re_eet7.svg" /> */}
                        </div>
                    </div>
                </Container>
            </div>
            <div className="category-section">
                <Container>
                    <Flex style={{ fontFamily: 'Montserrat' }} justify="center">
                        <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }}>Find Your Animals by Categories</Typography.Title>
                    </Flex>
                    <br />
                    <Row justify="center" gutter={[24, 24]}>
                        {(category || []).map((item: any, idx: number) => (
                            <Col>
                                <Card hoverable onClick={() => navigate('/search-animal?category=' + item.Name)} className="box-shadow categories-card">
                                    <div className="categories-list" >
                                        <img style={{ height: '100%' }} src={item.Image} alt={'category_' + idx} />
                                    </div>
                                    <br />
                                    <div style={{ textAlign: 'center' }} className="categories-title" >
                                        <Typography.Text strong style={{ textAlign: 'center', fontFamily: 'Montserrat', color: '#0174BE', fontSize: '17px' }}>{item?.Name}</Typography.Text>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            <br />
            <Container>
                <ButtonCreateShelter />
            </Container>
            <br />
            <div className="section-list-animal">
                <Container>
                    <Space direction="vertical" size="large" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                        <Flex className="animal-list" gap="middle" justify="center" align="center">
                            <Typography.Title level={2} style={{ fontFamily: 'Montserrat', color: '#0174BE', marginBottom: 0 }} >Animals For You</Typography.Title>
                            <div className="animal-list-img" >
                                <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/MxhhWBBMzMFNREFsxVCNundraw_Dog_walking_re_l61p.png" alt="logo_space" />
                            </div>
                        </Flex>
                        <br />
                        <Flex wrap="wrap" gap="small">
                            {(data || []).map((item: any) => (
                                <Card
                                    hoverable
                                    cover={<img alt="pet_pic" src={item?.Image} style={{ height: '244px', width: 'auto' }} />}
                                    style={{ width: '300px', overflow: 'hidden' }}
                                    onClick={() => navigate('/detail-animal/' + item?.Id)}
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
                </Container>
            </div>
        </Spin>
    )
}