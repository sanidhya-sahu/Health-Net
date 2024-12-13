import React from 'react'
import './home.css'
import arrowSvg from '../../assets/arrow.svg'
import pharmacySvg from '../../assets/pharmacy.svg'
import chatSvg from '../../assets/chat.svg'
import mentalSvg from '../../assets/mental.svg'
import videoSvg from '../../assets/video.svg'
function home() {
    return (
        <div className='homeWrap'>
            <div className="content">
                <div className="punchLine">Making healthcare accessible, reliable, and efficient.</div>
                <div className="details">Our mission is to leverage technology to provide users with real-time, data-driven medical assistance and resources, empowering them to manage their health effectively.</div>
                <div className="footdetails">What type of service you want?</div>
            </div>
            <div className="heroImage">
                <img src="./heroImg.png" alt="" />
            </div>
            <div className="services">
                <div className="serviceBox serviceBox1">
                    <div className="serviceSvg"><img src={pharmacySvg} alt="" /></div>
                    <div>
                        <div className="serviceName">Local pharmacy</div>
                        <div className="serviceDetails">Get closest pharmacy details.</div>
                    </div>
                    <div className="arrow"><img src={arrowSvg} alt="" /></div>
                </div>
                <div className="serviceBox serviceBox2">
                    <div className="serviceSvg"><img src={videoSvg} alt="" /></div>
                    <div>
                        <div className="serviceName">Videos for First-Aid</div>
                        <div className="serviceDetails">Detailed videos for various first-aid.</div>
                    </div>
                    <div className="arrow"><img src={arrowSvg} alt="" /></div>
                </div>
                <div className="serviceBox serviceBox3">
                    <div className="serviceSvg"><img src={mentalSvg} alt="" /></div>
                    <div>
                        <div className="serviceName">Mental health help</div>
                        <div className="serviceDetails">Get help with mental health</div>
                    </div>
                    <div className="arrow"><img src={arrowSvg} alt="" /></div>
                </div>
                <div className="serviceBox serviceBox4">
                    <div className="serviceSvg"><img src={chatSvg} alt="" /></div>
                    <div>
                        <div className="serviceName">Chat bot</div>
                        <div className="serviceDetails">Chat to know medicine information.</div>
                    </div>
                    <div className="arrow"><img src={arrowSvg} alt="" /></div>
                </div>
            </div>
        </div>
    )
}

export default home
