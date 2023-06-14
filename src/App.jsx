import { useEffect, useState } from 'react';
import './app.css'
import io from 'socket.io-client';
import Navbar from './components/Navbar';

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
        <Navbar className="navbar" />
        <ul className='messages p-4 border-2 border-solid overflow-y-auto '>
          {messages.map((message, index) => (
            <li key={index} className={`w-3/4 p-2 my-2 rounded-full ${message.from == 'Me'? 'bg-sky-300 ml-auto': 'bg-gray-300 mr-auto'}`}>
              <p>
                {message.from}: {message.body}
              </p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className='form flex items-center gap-2'>
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

export default App
