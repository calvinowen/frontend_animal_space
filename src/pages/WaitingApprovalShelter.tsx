import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
// import { ReactSVG } from "react-svg";

export default function WaitingApprovalShelter() {
    const navigate = useNavigate()

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'  }} >
            <Result
                icon={
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ maxWidth: '200px' }}>
                            <img style={{ width: '100%' }} src="https://animal-space-img.s3.ap-southeast-1.amazonaws.com/hhPOfLJnOolJJxSRDyBAundraw_wait_in_line_o2aq.png" alt="email_send" />
                            {/* <ReactSVG className="svg-component" src="src/assets/undraw_email_campaign_re_m6k5.svg" /> */}
                        </div>
                    </div>
                }
                title="Waiting to approve admin"
                subTitle="Your shelter will be see by Animal Space admin and make approval for it"
                extra={[
                    <Button onClick={() => navigate('/login') } key="buy">Go to Login page</Button>,
                ]}
            />
        </div>
    )
}