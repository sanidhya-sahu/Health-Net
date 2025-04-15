import React, { useEffect, useState } from 'react'
import './home.css'
import arrowSvg from '../../assets/arrow.svg'
import pharmacySvg from '../../assets/pharmacy.svg'
import chatSvg from '../../assets/chat.svg'
import mentalSvg from '../../assets/mental.svg'
import videoSvg from '../../assets/video.svg'
import yoga from '../../assets/yoga.svg'
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    // Check if viewport is mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        // Initial check
        handleResize();
        
        // Add listener for window resize
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='homeWrap'>
            <div className="content">
                <div className="punchLine">Making healthcare accessible, reliable, and efficient.</div>
                <div className="details">Our mission is to leverage technology to provide users with real-time, data-driven medical assistance and resources, empowering them to manage their health effectively.</div>
                <div className="footdetails">What type of service you want?</div>
            </div>
            
            <div className="heroImage">
                <img src="./heroImg.png" alt="Healthcare illustration" />
            </div>
            
            <div className="services">
                <div className="serviceBox serviceBox1">
                    <div className="serviceSvg"><img src={pharmacySvg} alt="Pharmacy icon" /></div>
                    <div>
                        <div className="serviceName">Period Tracker</div>
                        <div className="serviceDetails">Get closest pharmacy details.</div>
                    </div>
                    <div className="arrow"><img src={arrowSvg} alt="Arrow" /></div>
                </div>
                
                <div className="serviceBox serviceBox2" onClick={() => {navigate('/first-aid')}} id='frist-aid-box'>
                    <div className="serviceSvg"><img src={videoSvg} alt="Video icon" /></div>
                    <div>
                        <div className="serviceName">Videos for First-Aid</div>
                        <div className="serviceDetails">Detailed videos for various first-aid.</div>
                    </div>
                    <div className="arrow"><img src={arrowSvg} alt="Arrow" /></div>
                </div>
                
                <div className="serviceBox serviceBox3" onClick={() => {navigate('/mental-help')}} >
                    <div className="serviceSvg"><img src={mentalSvg} alt="Mental health icon" /></div>
                    <div>
                        <div className="serviceName">Mental help</div>
                        <div className="serviceDetails">Get help with mental health</div>
                    </div>
                    <div className="arrow"><img src={arrowSvg} alt="Arrow" /></div>
                </div>
                
                <div className="serviceBox serviceBox4" onClick={() => {navigate('/yoga')}}>
                    <div className="serviceSvg"><img src={yoga} alt="Chat icon" /></div>
                    <div>
                        <div className="serviceName">Yoga & Physical Health</div>
                        <div className="serviceDetails">Breathe, stretch, and balance.</div>
                    </div>
                    <div className="arrow"><img src={arrowSvg} alt="Arrow" /></div>
                </div>
            </div>
        </div>
    )
}

export default Home