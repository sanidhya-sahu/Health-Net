import React from 'react'
import Navbar from './components/navbar/navbar'
import Home from './components/home/home'
import Chat from './components/chat/chat'
import Firstaid from './components/firstaid/firstaid'
import HospitalLocator from './components/Nearby_Hospitals/Hospitals'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <Navbar></Navbar>
              <Home></Home>
              <Chat></Chat>
              <Footer></Footer>
            </div>
          }
        ></Route>
        <Route path="/first-aid" element={<Firstaid/>} ></Route>
        <Route path="/nearby-hospitals" element={<HospitalLocator/>} ></Route>
      </Routes>
    </Router>

  )
}

export default App
