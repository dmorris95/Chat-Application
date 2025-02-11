import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type SignoutProps = {
    socket: any;
    children?: React.ReactNode;
}

const Signout: React.FC<SignoutProps> = ({socket, children}) => {
    const navigate = useNavigate();
    const handleSignout = () => {
        // Signout User
        sessionStorage.removeItem('userName');
        socket.emit("signout")
        navigate('/')
    }

    return (
        <Button onClick={handleSignout}>
            {children || 'Logout'}
        </Button>
    )
};

export default Signout;