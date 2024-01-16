import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
    const navigate = useNavigate()

    return (
        <Result
            status="success"
            title="Successfully Purchased Animal!"
            subTitle="Your transaction has been send to shelter, please wait."
            extra={[
                <Button onClick={() => navigate('/transaction') } type="primary" key="console">
                    View all transaction
                </Button>,
                <Button onClick={() => navigate('/') } key="buy">Back to home</Button>,
            ]}
        />
    )
}