import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Signout from "../Components/Signout";
import MessageInput from "../Components/MessageInput";
import ChatBody from "../Components/ChatBody";

type ChatPageProps = {
    socket: any;
}

const ChatPage: React.FC<ChatPageProps> = ({ socket }) => {

    return (
        <Container>
            <Row>
                <Col className="pt-4">
                <Signout socket={socket} />
                </Col>
            </Row>
            <Container>
                <ChatBody socket={socket}/>
            </Container>
            <MessageInput socket={socket}/>
        </Container>
    )
};

export default ChatPage;