import { useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login-page';
import ChatPage from './Pages/Chat-page';

const socket = io('http://127.0.0.1:5000');

function App() {

  useEffect(() => {
    console.log("Connecting to server...");
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on("disconnect", () => {
      console.log('Disconnected from server');
    });
  }, []);

  return (
    <Routes>
      <Route path='/' element={<LoginPage socket={socket} />} />
      <Route path='/chat' element={<ChatPage socket={socket} />} /> 
    </Routes>
  )
}

export default App
