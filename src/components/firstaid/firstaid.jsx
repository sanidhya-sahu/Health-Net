import React, { useState, useEffect } from 'react'
import './firstaid.css'
import Navbar from '../navbar/navbar'
import Footer from '../Footer/Footer';

function FirstAid() {
    const [openVideo, setOpenVideo] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    // Track window resize for responsive adjustments
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const videoTitles = [
        "How to do the primary survey",
        "How to do CPR on an adult",
        "What to do if someone has a stroke",
        "How to treat poisoning",
        "How to help someone who's fainted",
        "How to treat severe bleeding",
        "How to treat an asthama attack",
        "How to help someone having a heart attack",
        "What to do if someone has a seizure",
        "How to treat shock",
        "What to do if someone has a spinal injury",
        "How to help someone with a head injury",
        "How to treat a fracture",
        "How to bandage a hand",
        "How to bandage a sprain",
        "How to treat cuts and grazes",
        "How to make a sling",
        "how to treat an eye injury",
        "What to do in a diabetic emergency",
        "How to use a defibrillator",
        "The recovery position"
    ];

    const videoIds = [
        "ea1RJUOiNfQ", // How to do the primary survey
        "BQNNOh8c8ks", // How to do CPR on an adult
        "PhH9a0kIwmk", // What to do if someone has a stroke
        "b2ieb8BZJuY", // How to treat poisoning
        "ddHKwkMwNyI", // How to help someone who's fainted
        "NxO5LvgqZe0", // How to treat severe bleeding
        "hdVKpUR513M", // How to treat an asthama attack
        "gDwt7dD3awc", // How to help someone having a heart attack
        "Ovsw7tdneqE", // What to do if someone has a seizure
        "61urGQrmeNM", // How to treat shock
        "Uqy2IUhYkVA", // What to do if someone has a spinal injury
        "a4cIFZx1f2E", // How to help someone with a head injury
        "2v8vlXgGXwE", // How to treat a fracture
        "fKzdiuseEIw", // How to bandage a hand
        "0jps5SZlTdo", // How to bandage a sprain
        "4e7evinsfm0", // How to treat cuts and grazes
        "PwfBGkBXkFA", // How to make a sling
        "PHrrxe3p8vw", // how to treat an eye injury
        "L06DNMRcy98", // What to do in a diabetic emergency
        "UFvL7wTFzl0", // How to use a defibrillator
        "GmqXqwSV3bo"  // The recovery position
    ];

    // Use appropriate embed parameters for responsive behavior
    const getEmbedUrl = (videoId) => {
        return `https://www.youtube.com/embed/${videoId}`;
    };
    
    const handleVideoClick = (videoId) => {
        setOpenVideo(videoId);
        // Prevent background scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };
    
    const closeVideo = () => {
        setOpenVideo(null);
        // Restore scrolling when modal is closed
        document.body.style.overflow = 'auto';
    };

    // Handle keyboard events for accessibility
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) closeVideo();
        };
        
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <>
            <div className='firstaid-wrap'>
                <Navbar />
                <div className="firstaid-detail">
                    <div className="firstaid-head">
                        First Aid
                    </div>
                    <div className="firstaid-body">
                        Keep your first aid skills fresh with our first aid videos and learn how to do first aid.
                    </div>
                </div>
                <div className="firstaid-vidgrid">
                    {videoTitles.map((title, index) => {
                        const videoNum = index + 1;
                        return (
                            <div
                                key={videoNum}
                                className="firstaid-vidgrid-item"
                                onClick={() => handleVideoClick(videoNum)}
                            >
                                <div className="thumbnail">
                                    <img 
                                        src={`/firstaid-vid-thumbs/${videoNum}.webp`} 
                                        alt={`Thumbnail for ${title}`}
                                        loading="lazy" // For better performance
                                    />
                                </div>
                                <div className="vidtitle">{title}</div>
                            </div>
                        );
                    })}
                </div>

                {openVideo && (
                    <div className="video-popover-overlay" onClick={closeVideo}>
                        <div className="video-popover-content" onClick={(e) => e.stopPropagation()}>
                            <button 
                                className="video-popover-close" 
                                onClick={closeVideo}
                                aria-label="Close video"
                            >×</button>
                            <div className="video-popover-title">{videoTitles[openVideo - 1]}</div>
                            <iframe
                                width="100%"
                                height="100%"
                                src={getEmbedUrl(videoIds[openVideo - 1])}
                                title={videoTitles[openVideo - 1]}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default FirstAid