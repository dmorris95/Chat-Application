import { useState } from "react";
import { Container, Form } from "react-bootstrap";

type MessageInputProps = {
    socket: any;
}

const MessageInput: React.FC<MessageInputProps> = ({ socket }) => {
    const [messageText, setMessageText] = useState('');

    const sendMessage = () => {
        let userId = sessionStorage.getItem('userName');
        let time = new Date().toISOString();
        //Create message to add to localStorage
        const newMessage = {userId, text: messageText, time};
        const chatMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        chatMessages.push(newMessage);
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
        socket.emit("message", {userId, text: messageText, time})
        setMessageText('');
    };

    const handleEnterKey = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
            setMessageText('');
        }
    };

    return (
        <Container>
            <Form>
                <Form.Label style={{color: 'darkblue'}}>
                    Type Message
                </Form.Label>
                <Form.Control
                    type="text"
                    id="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => handleEnterKey(e)}
                    autoComplete="off"
                
                ></Form.Control>
            </Form>
        </Container>
    );
};

export default MessageInput;