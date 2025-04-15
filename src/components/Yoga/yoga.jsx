import React, { useState, useEffect } from 'react'
// import './yoga.css'
import Navbar from '../navbar/navbar'
import Footer from '../Footer/Footer';

function YogaPage() {
    const [openVideo, setOpenVideo] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Video categories for filtering
    const categories = {
        'all': 'All Videos',
        'flow': 'Flow & Vinyasa',
        'strength': 'Strength & Power',
        'targeted': 'Targeted Practice',
        'meditation': 'Meditation & Recovery'
    };

    // Add category tags to videos
    const videos = {
        "h6lKRlAjq2s": {
            title: "Yoga for Inner Space Travel | 14-Minute Vinyasa Flow",
            category: "flow"
        },
        "fXOz09pxoiM": {
            title: "Yoga For Abdominal Strength",
            category: "strength"
        },
        "6rh6pVGTqRU": {
            title: "Power Yoga Break | Yoga For Weight Loss | Yoga With Adriene",
            category: "strength"
        },
        "bYQwM841ED4": {
            title: "Yoga For Lymphatic Flow",
            category: "flow"
        },
        "DP3BE1ezThE": {
            title: "Resolve to Evolve | 10-Minute Meditation",
            category: "meditation"
        },
        "6UEWJsljPVM": {
            title: "Yoga For Weight Loss - Strengthen and Lengthen - Yoga With Adriene",
            category: "strength"
        },
        "CZJVeUD_Ou8": {
            title: "Chest & Upper Body Opening Flow",
            category: "targeted"
        },
        "ypbT6ctKdZI": {
            title: "Moon Practice | 15-Minute Home Yoga",
            category: "flow"
        },
        "8CUzG_ny6sg": {
            title: "Day 27 - Strong | MOVE - A 30 Day Yoga Journey",
            category: "strength"
        },
        "idkqe6qLMfo": {
            title: "Respect and Replenish | 40-Minute Yoga Flow",
            category: "flow"
        },
        "1BfsW3JKSOI": {
            title: "Meditation For Balancing The Nervous System",
            category: "meditation"
        },
        "WymRLcDo1ek": {
            title: "Yoga For Swimmers - Yoga With Adriene",
            category: "targeted"
        },
        "35sXNGzN5-A": {
            title: "Side Body Flow - Yoga With Adriene",
            category: "flow"
        },
        "0Xdof3DtZuk": {
            title: "Yoga Camp - Day 25 - I Am Strong",
            category: "strength"
        },
        "JsE4csvlUfA": {
            title: "Yoga For Psoas | Yoga With Adriene",
            category: "targeted"
        },
        "wL8zmUMLqf8": {
            title: "Lower Body Strength | 30 Minute Yoga Practice",
            category: "strength"
        },
        "VvYCKlkLhNQ": {
            title: "Yoga For The Future | Yoga With Adriene",
            category: "flow"
        },
        "UuifgElXjmM": {
            title: "Yoga For Scoliosis | Yoga With Adriene",
            category: "targeted"
        },
        "7agiIk9KgyI": {
            title: "Yoga For Upper Body Strength | 13-Minute Home Yoga",
            category: "strength"
        },
        "KyBmGfI5OWU": {
            title: "Abs, Arms, and Attitude! | Yoga For Weight Loss",
            category: "strength"
        },
        "BPobdbmzY9o": {
            title: "Total Body Yoga - 20-Minute Deep Core Yoga",
            category: "strength"
        },
        "FQ74ZykbFFE": {
            title: "Grounding Yoga Practice | Happy Earth Day!",
            category: "flow"
        },
        "_F8aOQza68E": {
            title: "Yoga for Strength and Focus",
            category: "strength"
        },
        "2137wAXvufE": {
            title: "Yoga For Tired Legs - Yoga With Adriene",
            category: "targeted"
        },
        "plL13JF5BHA": {
            title: "Yoga For Runners - Physical & Mental Stamina",
            category: "targeted"
        },
        "yVE4XXFFO70": {
            title: "Tree Pose - Vrksasana - Yoga With Adriene",
            category: "targeted"
        },
        "fzqOY_7xiyg": {
            title: "Dedicate - Day 27 - Power",
            category: "strength"
        },
        "YWzRE1BiAvw": {
            title: "Yoga For Cyclists - Yoga With Adriene",
            category: "targeted"
        },
        "lxuTCHJSers": {
            title: "10 Minute Full Body Stretch",
            category: "meditation"
        },
        "Za6dH2-afqQ": {
            title: "Yoga For Gardeners | Yoga With Adriene",
            category: "targeted"
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) closeVideo();
        };

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const getYouTubeThumbnail = (videoId) => {
        return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    };

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
                        Yoga Practice
                    </div>
                    <div className="firstaid-body">
                        Breathe, stretch, and balance — discover the perfect yoga practice for your mind and body.
                    </div>

                    {/* Search bar */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search videos..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="search-input"
                            aria-label="Search videos"
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
                                        src={getYouTubeThumbnail(videoId)}
                                        alt={`Thumbnail for ${video.title}`}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
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

export default YogaPage