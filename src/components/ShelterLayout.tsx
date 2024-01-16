import { HomeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Drawer, Layout, Menu, Typography, theme } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const { Content, Sider } = Layout


export default function ShelterLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const bread_crumb = (window.location.pathname).split('/').filter((item: string) => item !== '')

    const getShelterName = () => {
        const auth = window.localStorage.getItem('user');
        if (!auth) {
            return null
        }
        const tmp = JSON.parse(auth)
        return tmp.shelter_name
    }

    const getShelterId = () => {
        const auth = window.localStorage.getItem('user');
        if (!auth) {
            return null
        }
        const tmp = JSON.parse(auth)
        return tmp.shelter_id
    }

    useEffect(() => {
        if(!getShelterId()){
            navigate('*')
        }
    }, [navigate])

    return (
        <Layout
            style={{ minHeight: '100vh' }}
        >
            <Drawer
                title={getShelterName()}
                placement="left"
                onClose={() => setCollapsed(false)}
                open={collapsed}
                className="only-on-mobile"
            >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={[
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: 'Home',
                            onClick: () => {navigate('/shelter/home'); setCollapsed(false)}
                        },
                        {
                            key: '2',
                            icon: <ShoppingOutlined />,
                            label: 'Transaction',
                            onClick: () => {navigate('/shelter/transaction'); setCollapsed(false)}
                        },
                        {
                            key: '3',
                            icon: <SettingOutlined />,
                            label: 'Setting',
                            onClick: () => {navigate('/shelter/setting'); setCollapsed(false)}
                        },
                        // {
                        //     key: '3',
                        //     icon: <ArrowLeftOutlined />,
                        //     label: 'Animal Shelter',
                        //     onClick: () => {navigate('/'); setCollapsed(false)}
                        // },
                        {
                            key: '4',
                            icon: <LogoutOutlined />,
                            label: 'Log out',
                            onClick: () => {
                                localStorage.clear()
                                navigate('/login')
                            }
                        },
                    ]}
                />
            </Drawer>
            <Sider width={200} style={{ background: colorBgContainer }} trigger={null} collapsible collapsed={collapsed} className="only-on-desktop">
                <div>
                    <Typography.Title style={{ padding: '10px 0px 0px 15px' }} level={3}>{getShelterName()}</Typography.Title>
                </div>
                <Divider />
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={[
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: 'Home',
                            onClick: () => navigate('/shelter/home')
                        },
                        {
                            key: '2',
                            icon: <ShoppingOutlined />,
                            label: 'Transaction',
                            onClick: () => navigate('/shelter/transaction')
                        },
                        {
                            key: '3',
                            icon: <SettingOutlined />,
                            label: 'Setting',
                            onClick: () => navigate('/shelter/setting')
                        },
                        // {
                        //     key: '3',
                        //     icon: <ArrowLeftOutlined />,
                        //     label: 'Animal Shelter',
                        //     onClick: () => navigate('/')
                        // },
                        {
                            key: '4',
                            icon: <LogoutOutlined />,
                            label: 'Log out',
                            onClick: () => {
                                localStorage.clear()
                                navigate('/login')
                            }
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                    className="only-on-mobile"
                />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {bread_crumb.map((item: string) => {
                            return (
                                <Breadcrumb.Item>{item}</Breadcrumb.Item>
                            )
                        })
                        }

                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                        className="content-layout"
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}