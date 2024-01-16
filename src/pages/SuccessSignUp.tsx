import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
// import { ReactSVG } from "react-svg";

export default function SuccessSignUp() {
    const navigate = useNavigate()

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'  }} >
            <Result
                icon={
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ maxWidth: '200px' }}>
                            <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/DiSurPPUDLrQNMOGZXVvundraw_Email_campaign_re_m6k5.png" alt="email_send" />
                            {/* <ReactSVG className="svg-component" src="src/assets/undraw_email_campaign_re_m6k5.svg" /> */}
                        </div>
                    </div>
                }
                title="Successfully register, check your email"
                subTitle="Signup success, you're almost ready to enjoy animal space. We send you email to confirmation your email address"
                extra={[
                    <Button onClick={() => navigate('/login') } key="buy">Go to Login page</Button>,
                ]}
            />
        </div>
    )
}