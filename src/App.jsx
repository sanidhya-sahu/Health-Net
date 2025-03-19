import React from 'react'
import Navbar from './components/navbar/navbar'
import Home from './components/home/home'
import Chat from './components/chat/chat'
import Firstaid from './components/firstaid/firstaid'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <Navbar></Navbar>
              <Home></Home>
              <Chat></Chat>
            </div>
          }
        ></Route>
        <Route path="/first-aid" element={<Firstaid/>} ></Route>
      </Routes>
    </Router>

  )
}

export default App
