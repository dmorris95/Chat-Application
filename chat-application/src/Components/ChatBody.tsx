import { useState, useEffect } from "react";
import { Card, Container, Form } from "react-bootstrap";

type ChatBodyProps = {
    socket: any;
}

type Message = {
    text: string;
    userId: string;
    time: string;
}

const filterMessages = (messages: Message[], username: string | null): Message[] => {
    if (!username) {
        return messages;
    }
    return messages.filter(message => message.userId.includes(username));
}

const ChatBody: React.FC<ChatBodyProps> = ({ socket }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [searchName, setSearchName] = useState("");
    // get username from storage
    const userID = sessionStorage.getItem('userName');
    
    useEffect(() => {
        const existMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        setMessages(existMessages);
        const handleMessages = (message: Message) => {
            setMessages((prevMessages) => {
                const updateMessages = [...prevMessages, message];
                localStorage.setItem('chatMessages', JSON.stringify(updateMessages))
                return updateMessages;
            });
        };

        socket.on("message", handleMessages);

        return () => {
            socket.off("message", handleMessages);
        };

    }, [socket]);

    const filteredMessages = filterMessages(messages, searchName);

    return (
        <Container
            style={{
                marginTop: "35px",
                background: "lightblue",
                padding: "20px",
                borderRadius: "10px",
                width: '65%',
                maxHeight: '500px',
                overflowY: 'auto',
            }}
        >
           <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Search by username"
                        className="mb-3"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        />
                </Form.Group>
            </Form> 
            {filteredMessages.map((message: Message, index: any) => (
                <Card key={index} className="mb-2">
                    <Card.Body>
                        <Card.Text style={{ color: message.userId === userID ? 'blue' : 'red', float: message.userId === userID ? 'right' : 'left'}}>
                            <h6>{message.userId}</h6>
                            {message.text}
                            <br />
                            <small>{new Date(message.time).toLocaleString()}</small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    )
}

export default ChatBody;