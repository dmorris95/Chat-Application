import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type LoginPageProps = {
    socket: any;
}

const LoginPage: React.FC<LoginPageProps> = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault()
        let userName = e.target.username.value
        // put username in localStorage to gather chats
        sessionStorage.setItem('userName', userName);
        navigate('/chat')
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label>
                Enter Username
            </Form.Label>
            <Form.Control
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                ></Form.Control>
            <Button type="submit">Login</Button>
        </Form>
    )
};

export default LoginPage;