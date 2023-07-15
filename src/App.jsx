import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Chat from './pages/Chat';
import './app.css'
function App() {


  return (
    <BrowserRouter>
      <Navbar className="navbar" />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
