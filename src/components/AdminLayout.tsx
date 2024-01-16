import { AppstoreOutlined, CloseOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ShoppingOutlined, UnorderedListOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const { Content, Sider } = Layout


export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const getUser = () => {
        const auth = window.localStorage.getItem('user');
        if (!auth) {
            return null
        }
        const tmp = JSON.parse(auth)
        return tmp
    }

    useEffect(() => {
        if(getUser()?.role !== "admin"){
            navigate("*")
        }
    },[getUser])

    return (
        <Layout
            style={{ minHeight: '100vh' }}
        >
            <Drawer
                title={<div style={{ color: '#fff' }} >Admin</div>}
                placement="left"
                onClose={() => setCollapsed(false)}
                open={collapsed}
                className="only-on-mobile"
                style={{ background: '#001529' }}
                closeIcon={<CloseOutlined style={{ color: '#fff' }} />}
            >
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Home',
                            onClick: () => {navigate('/admin/home'); setCollapsed(false)}
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'List Category',
                            onClick: () => {navigate('/admin/category'); setCollapsed(false)}
                        },
                        {
                            key: '3',
                            icon: <ShoppingOutlined />,
                            label: 'All Transaction',
                            onClick: () => {navigate('/admin/transaction'); setCollapsed(false)}
                        },
                        {
                            key: '4',
                            icon: <UnorderedListOutlined />,
                            label: 'All Animal',
                            onClick: () => {navigate('/admin/animal'); setCollapsed(false)}
                        },
                        {
                            key: '5',
                            icon: <AppstoreOutlined />,
                            label: 'Slide Show Banner',
                            onClick: () => {navigate('/admin/banner'); setCollapsed(false)}
                        },
                        // {
                        //     key: '6',
                        //     icon: <ArrowLeftOutlined />,
                        //     label: 'Animal Shelter',
                        //     onClick: () => {navigate('/'); setCollapsed(false)}
                        // },
                        {
                            key: '7',
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
            <Sider trigger={null} collapsible collapsed={collapsed} className="only-on-desktop">
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Home',
                            onClick: () => navigate('/admin/home')
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'List Category',
                            onClick: () => navigate('/admin/category')
                        },
                        {
                            key: '3',
                            icon: <ShoppingOutlined />,
                            label: 'All Transaction',
                            onClick: () => navigate('/admin/transaction')
                        },
                        {
                            key: '4',
                            icon: <UnorderedListOutlined />,
                            label: 'All Animal',
                            onClick: () => navigate('/admin/animal')
                        },
                        {
                            key: '5',
                            icon: <AppstoreOutlined />,
                            label: 'Slide Show Banner',
                            onClick: () => navigate('/admin/banner')
                        },
                        // {
                        //     key: '6',
                        //     icon: <ArrowLeftOutlined />,
                        //     label: 'Animal Shelter',
                        //     onClick: () => navigate('/')
                        // },
                        {
                            key: '7',
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
                    className="only-on-mobile"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                    className="content-layout"
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}