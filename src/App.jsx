import React from 'react'
import Navbar from './components/navbar/navbar'
import Home from './components/home/home'
import Chat from './components/chat/chat'
import Skin from './components/Skin/Skin'
import Yoga from './components/Yoga/yoga'
import Period from './components/Period/Preiod'
import Firstaid from './components/firstaid/firstaid'
import Mental from './components/mental/mental'
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
        <Route path="/mental-help" element={<Mental/>} ></Route>
        <Route path="/skin-disease" element={<Skin/>} ></Route>
        <Route path="/Yoga" element={<Yoga/>} ></Route>
        <Route path="/Period/*" element={<Period/>} ></Route>
        <Route path="/nearby-hospitals" element={<HospitalLocator/>} ></Route>
      </Routes>
    </Router>

  )
}

export default App
