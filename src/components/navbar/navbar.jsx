import React, { useState, useEffect } from 'react'
import './nav.css'
import menu from '../../assets/menu.svg'
import cancle from '../../assets/cancle.svg'
import emergency from '../../assets/emergency.svg'
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='navWrap'>
      <div className="nav">
        <div className="navHead" onClick={()=>{navigate('/')}}>
            <span>H</span>ealth Net
        </div>
        
        <div className={`center ${menuOpen ? 'active' : ''}`}>
            <a href='#' onClick={() => isMobile && setMenuOpen(false)}> <span hidden={isMobile?false:true} >▢&nbsp;&nbsp;</span>  Services</a>
            <a href='#' onClick={() => isMobile && setMenuOpen(false)}> <span hidden={isMobile?false:true} >▢&nbsp;&nbsp;</span>  How it Works</a>
            <a href='#' onClick={() => isMobile && setMenuOpen(false)}> <span hidden={isMobile?false:true} >▢&nbsp;&nbsp;</span>  Contact</a>
            <a href='#' onClick={() => isMobile && setMenuOpen(false)}> <span hidden={isMobile?false:true} >▢&nbsp;&nbsp;</span>  About</a>
        </div>
        
        <div className="right">
            <button id='login'>Login</button>
            <button id='emergency'>Emergency</button>
        </div>
        <div className="emergencyIcon" hidden={isMobile?false:true}><img src={emergency} alt="" /></div>
        <button className="mobile-menu-button" onClick={toggleMenu}>
          {menuOpen ? <><img src={cancle} alt="X" /></> : <><img src={menu} alt="X" /></>}
        </button>
      </div>
    </div>
  )
}

export default Navbar