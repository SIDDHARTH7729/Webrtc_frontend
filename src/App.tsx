import { useState } from 'react'
import './App.css'
import CreateRoom from './components/CreateRoom'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Room from './pages/Room'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/room/:id' element={<Room/>} />
      </Routes>
    </>
  )
}

export default App
