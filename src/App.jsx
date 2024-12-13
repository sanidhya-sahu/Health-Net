import React from 'react'
import Navbar from './components/navbar/navbar'
import Home from './components/home/home'
import Chat from './components/chat/chat'
import "./App.css"
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Home></Home>
      <Chat></Chat>
    </div>
  )
}

export default App
