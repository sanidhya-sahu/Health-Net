import React, { useState, useEffect } from 'react'
import './firstaid.css'
import Navbar from '../navbar/navbar'
import Footer from '../Footer/Footer';

function FirstAid() {
    const [openVideo, setOpenVideo] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    // Define categories for the first aid videos
    const categories = {
        'all': 'All Videos',
        'emergency': 'Emergency Response',
        'injuries': 'Injuries & Wounds',
        'medical': 'Medical Emergencies',
        'techniques': 'First Aid Techniques'
    };
    
    // Add category information to video objects
    const videos = {
        "ea1RJUOiNfQ": {
            title: "How to do the primary survey",
            category: "emergency",
            thumbIndex: 1
        },
        "BQNNOh8c8ks": {
            title: "How to do CPR on an adult",
            category: "emergency",
            thumbIndex: 2
        },
        "PhH9a0kIwmk": {
            title: "What to do if someone has a stroke",
            category: "medical",
            thumbIndex: 3
        },
        "b2ieb8BZJuY": {
            title: "How to treat poisoning",
            category: "medical",
            thumbIndex: 4
        },
        "ddHKwkMwNyI": {
            title: "How to help someone who's fainted",
            category: "medical",
            thumbIndex: 5
        },
        "NxO5LvgqZe0": {
            title: "How to treat severe bleeding",
            category: "injuries",
            thumbIndex: 6
        },
        "hdVKpUR513M": {
            title: "How to treat an asthma attack",
            category: "medical",
            thumbIndex: 7
        },
        "gDwt7dD3awc": {
            title: "How to help someone having a heart attack",
            category: "emergency",
            thumbIndex: 8
        },
        "Ovsw7tdneqE": {
            title: "What to do if someone has a seizure",
            category: "medical",
            thumbIndex: 9
        },
        "61urGQrmeNM": {
            title: "How to treat shock",
            category: "emergency",
            thumbIndex: 10
        },
        "Uqy2IUhYkVA": {
            title: "What to do if someone has a spinal injury",
            category: "injuries",
            thumbIndex: 11
        },
        "a4cIFZx1f2E": {
            title: "How to help someone with a head injury",
            category: "injuries",
            thumbIndex: 12
        },
        "2v8vlXgGXwE": {
            title: "How to treat a fracture",
            category: "injuries",
            thumbIndex: 13
        },
        "fKzdiuseEIw": {
            title: "How to bandage a hand",
            category: "techniques",
            thumbIndex: 14
        },
        "0jps5SZlTdo": {
            title: "How to bandage a sprain",
            category: "techniques",
            thumbIndex: 15
        },
        "4e7evinsfm0": {
            title: "How to treat cuts and grazes",
            category: "injuries",
            thumbIndex: 16
        },
        "PwfBGkBXkFA": {
            title: "How to make a sling",
            category: "techniques",
            thumbIndex: 17
        },
        "PHrrxe3p8vw": {
            title: "How to treat an eye injury",
            category: "injuries",
            thumbIndex: 18
        },
        "L06DNMRcy98": {
            title: "What to do in a diabetic emergency",
            category: "medical",
            thumbIndex: 19
        },
        "UFvL7wTFzl0": {
            title: "How to use a defibrillator",
            category: "techniques",
            thumbIndex: 20
        },
        "GmqXqwSV3bo": {
            title: "The recovery position",
            category: "techniques",
            thumbIndex: 21
        }
    };
    
    // Track window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
    
    const getEmbedUrl = (videoId) => {
        return `https://www.youtube.com/embed/${videoId}`;
    };
    
    const handleVideoClick = (videoId) => {
        setOpenVideo(videoId);
        document.body.style.overflow = 'hidden';
    };
    
    const closeVideo = () => {
        setOpenVideo(null);
        document.body.style.overflow = 'auto';
    };
    
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };
    
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };
    
    // Filter videos based on category and search query
    const filteredVideos = Object.entries(videos).filter(([_, video]) => {
        const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
        const matchesSearch = searchQuery === '' || video.title.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

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
                    
                    {/* Search bar */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search first aid videos..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="search-input"
                            aria-label="Search first aid videos"
                        />
                    </div>
                    
                    {/* Category tabs */}
                    <div className="category-tabs">
                        {Object.entries(categories).map(([key, label]) => (
                            <div 
                                key={key}
                                className={`category-tab ${activeCategory === key ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(key)}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="firstaid-vidgrid">
                    {filteredVideos.length > 0 ? (
                        filteredVideos.map(([videoId, video]) => (
                            <div
                                key={videoId}
                                className="firstaid-vidgrid-item"
                                onClick={() => handleVideoClick(videoId)}
                            >
                                <div className="thumbnail">
                                    <img 
                                        src={`/firstaid-vid-thumbs/${video.thumbIndex}.webp`} 
                                        alt={`Thumbnail for ${video.title}`}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = "/firstaid-vid-thumbs/placeholder.jpg";
                                        }}
                                    />
                                </div>
                                <div className="vidtitle">{video.title}</div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            No videos match your search. Try different keywords or categories.
                        </div>
                    )}
                </div>

                {openVideo && (
                    <div className="video-popover-overlay" onClick={closeVideo}>
                        <div className="video-popover-content" onClick={(e) => e.stopPropagation()}>
                            <button 
                                className="video-popover-close" 
                                onClick={closeVideo}
                                aria-label="Close video"
                            >×</button>
                            <div className="video-popover-title">{videos[openVideo].title}</div>
                            <iframe
                                width="100%"
                                height="100%"
                                src={getEmbedUrl(openVideo)}
                                title={videos[openVideo].title}
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