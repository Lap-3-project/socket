import './App.css';
import io from 'socket.io-client';                  //library that is required to utilise socket
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:3001"); //connect backend with frontend

function App() {
  //rooom states
  const[room, setRoom] = useState("");

  //message states
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] =useState("")

  const joinRoom = () => {
    if(room !== "") {
      socket.emit("join_room", room)
    }
  }

  const sendMessage = () => {     
    socket.emit("send_message", { message, room });   //species the message that is sent and which room it goes to
  }           

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessageReceived(data.message);
    })
  }, [socket])
  

  return (
    <div className="App">
      <input placeholder='Room Number...'
        onChange={(e)=> {setRoom(e.target.value)} }
      />
      <button onClick={joinRoom}>Join Room</button> <br/>
      <input placeholder="Message..." onChange={(e)=> {
        setMessage(e.target.value)}
      } />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  )
}

export default App
