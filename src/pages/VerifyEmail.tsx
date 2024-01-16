import { Button, Modal, Result, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utillities/api";
import { CloseCircleOutlined } from "@ant-design/icons";
// import { ReactSVG } from "react-svg";

export default function VerifyEmail() {
    const params = new URLSearchParams(document.location.search)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)


    const verifyEmail = useCallback(async() => {
        if(!params.get('idveas')){
            navigate('/login')
        }
        await api.post('/verify?idveas=' + (params.get('idveas') || '')).then(() => {
            setLoading(false)
        }).catch((err) => {
            Modal.confirm({
                title: 'Error to verify email',
                icon: <CloseCircleOutlined />,
                content: `${(err?.response?.data?.error || err.toString())}`,
            });
        })
    },[params])

    useEffect(() => {
        if(loading){
            verifyEmail()
        }
    },[verifyEmail])

    if(loading){
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'  }} >
                <Spin spinning={loading} size="large" ></Spin>
            </div>
        )
    }

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'  }} >
            <Result
                icon={
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ maxWidth: '200px' }}>
                            <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/UQsnSTGVMObrMMBIoYNrundraw_Done_re_oak4.png" alt="email_send" />
                            {/* <ReactSVG className="svg-component" src="src/assets/undraw_done_re_oak4.svg" /> */}
                        </div>
                    </div>
                }
                title="Email Verification Success"
                subTitle="Thank you to confirmation your email, now you can login to animal space"
                extra={[
                    <Button onClick={() => navigate('/login') } key="buy">Go to Login page</Button>,
                ]}
            />
        </div>
    )
}