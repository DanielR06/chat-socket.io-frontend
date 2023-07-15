import { useEffect, useState } from 'react';
import io from 'socket.io-client';
//http://localhost:8080
const socket = io('https://chat-socket-io-nh4s.onrender.com');

const Chat = () => {
    const [message, setMessage] = useState('');
const [messages, setMessages] = useState([]);

const handleSubmit = (e) => {
  e.preventDefault();
  socket.emit('message', message);
  const newMessage = {
    body: message,
    from: 'Me'
  }
  setMessages([...messages, newMessage])
  setMessage('');
}

useEffect(()=>{
  const receiveMessage = (message) => {
    setMessages([...messages, message])
  };
  socket.on('message', receiveMessage);

  return () => {
    socket.off('message', receiveMessage);
  }
}, [messages]);
  return (
    <div className=' text-black'>
      <div className='h-screen bg-white'>
        
        <ul className='messages px-4 border-2 border-solid overflow-y-auto '>
          {messages.map((message, index) => (
            <li key={index} className={`w-3/4 p-2 my-2 rounded-full ${message.from == 'Me'? 'bg-sky-500 ml-auto': 'bg-gray-300 mr-auto'}`}>
              <p>
                <b>{message.from}:</b> {message.body}
              </p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className='form flex items-center justify-center gap-2'>
          <input 
            type="text" 
            onChange={e => setMessage(e.target.value)} 
            value={message} 
            placeholder='Mensaje' 
            className='input bg-gray-300 p-2 rounded-full '
            required
          />
          <button className='text-white bg-slate-800 p-2 rounded-full'>
            <i className='bx bxs-send'></i>
          </button>
        </form>
      </div>
      
    </div>
  )
}

export default Chat