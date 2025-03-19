import React from 'react';
import './Footer.css';
import facebook from '../../assets/facebook.svg'
import linkedin from '../../assets/linkedin.svg'
import insta from '../../assets/insta.svg'
import x from '../../assets/x.svg'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <div className="navHead footerhead">
                        <span>H</span>ealth Net
                    </div>
                    <p className="footer-tagline">
                        Springs Behavioral Health provides high quality mental
                        health services using an evidence.
                    </p>

                    <div className="social-icons">
                        <a href="#" className="social-icon"><div className="serviceSvg footersvg"><img src={facebook} alt="" /></div></a>
                        <a href="#" className="social-icon"><div className="serviceSvg footersvg"><img src={x} alt="" /></div></a>
                        <a href="#" className="social-icon"><div className="serviceSvg footersvg"><img src={linkedin} alt="" /></div></a>
                        <a href="#" className="social-icon"><div className="serviceSvg footersvg"><img src={insta} alt="" /></div></a>
                    </div>
                </div>
                <div className="footer-links-section">

                </div>

                <div className="footer-links-section">
                    <h3>Product</h3>
                    <ul className="footer-links">
                        <li><a href="#">Overview</a></li>
                        <li><a href="#">Features</a></li>
                    </ul>
                </div>

                <div className="footer-links-section">
                    <h3>Company</h3>
                    <ul className="footer-links">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>


                <div className="footer-links-section">
                    <h3>Legal</h3>
                    <ul className="footer-links">
                        <li><a href="#">Cookies Policy</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-links-section">
                    <h3>Contact</h3>
                    <p>contact@healthnet.com</p>
                    <br />
                    <p>(+91) 9552875504</p>
                </div>
            </div>

            <div className="footer-copyright">
                <p>© 2023 healthnet. All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;