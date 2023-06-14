import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://chat-socket-io-nh4s.onrender.com');

function App() {
const [message, setMessage] = useState('');
const [messages, setMessages] = useState([]);

const handleSubmit = (e) => {
  e.preventDefault();
  socket.emit('message', message);
  const newMessage = {
    body: message,
    from: 'Me'
  }
  setMessages([newMessage, ...messages])
  setMessage('');
}

useEffect(()=>{
  const receiveMessage = (message) => {
    setMessages([message, ...messages])
  };
  socket.on('message', receiveMessage);

  return () => {
    socket.off('message', receiveMessage);
  }
}, [messages]);

  return (
    <div className='h-screen bg-blue-500 text-black flex justify-center items-center'>
      <div className='bg-white p-10'>
        <h1>Chat React Socket.io</h1>
        <ul className='h-80 border-8 border-solid overflow-y-auto'>
          {messages.map((message) => (
            <li key={message.from} className={`p-2 my-2 table rounded-full ${message.from == 'Me'? 'bg-sky-300': 'bg-gray-300'}`}>
              <p>
                {message.from}: {message.body}
              </p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
          <input 
            type="text" 
            onChange={e => setMessage(e.target.value)} 
            value={message} 
            placeholder='Mensaje' 
            className=' bg-gray-300 p-2 rounded-full'
            required
          />
          <button className='text-white bg-blue-500 p-2 rounded-full'>
            <i className='bx bxs-send'></i>
          </button>
        </form>
      </div>
      
    </div>
  )
}

export default App
