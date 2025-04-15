import React, { useState, useEffect } from 'react'
import './nav.css'
import menu from '../../assets/menu.svg'
import cancle from '../../assets/cancle.svg'
import emergency from '../../assets/emergency.svg'
import { useNavigate } from "react-router-dom";
function Navbar(params) {
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
      <div className={`nav ${params.theme == "pink" ? "pink" : ""}`}>
        <div className="navHead" onClick={()=>{navigate('/')}}>
            <span>H</span>ealth Net
        </div>
        
        <div className={`center ${menuOpen ? 'active' : ''}`}>
            <a onClick={() => navigate('/mental-help')}> <span hidden={isMobile?false:true} >▢&nbsp;&nbsp;</span>  Mental help</a>
            <a onClick={() => navigate('/first-aid')}> <span hidden={isMobile?false:true} >▢&nbsp;&nbsp;</span>  First Aid</a>
            <a onClick={() => navigate('/yoga')}> <span hidden={isMobile?false:true} >▢&nbsp;&nbsp;</span>  Yoga & Fitness</a>
            <a onClick={() => navigate('/period')}> <span hidden={isMobile?false:true} >▢&nbsp;&nbsp;</span>  Period Tracker</a>
        </div>
        
        <div className="right" >
            {/* <button id='login'>Login</button> */}
            <button onClick={() => navigate('/nearby-hospitals')} id='emergency' className={`emergency ${params.theme == "pink" ? "whiteBut" : ""}`} >Emergency</button>
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