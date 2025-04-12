import React, { useState, useEffect } from 'react'
import './mental.css'
import Navbar from '../navbar/navbar'
import Footer from '../Footer/Footer';

function FirstAid() {
    const [openVideo, setOpenVideo] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Video categories for filtering
    const categories = {
        'all': 'All Videos',
        'disorders': 'Mental Disorders',
        'therapy': 'Therapy & Treatment',
        'wellness': 'Wellness & Self-Care',
        'psychology': 'Psychology'
    };

    // Add category tags to videos
    const videos = {
        "z-IR48Mb3W0": {
            title: "What is depression?",
            category: "disorders"
        },
        "DhlRgwdDc-E": {
            title: "Debunking the myths of OCD",
            category: "disorders"
        },
        "RrWBhVlD1H8": {
            title: "What is bipolar disorder?",
            category: "disorders"
        },
        "b_n9qegR7C4": {
            title: "The psychology of post-traumatic stress disorder",
            category: "disorders"
        },
        "ZQUxL4Jm1Lo": {
            title: "What is imposter syndrome and how can you combat it?",
            category: "psychology"
        },
        "hyg7lcU4g8E": {
            title: "Does stress affect your memory?",
            category: "psychology"
        },
        "AcmarVpo2xE": {
            title: "The truth about electroconvulsive therapy (ECT)",
            category: "therapy"
        },
        "wr6fQ4KpbRM": {
            title: "Why is it so hard to break a bad habit?",
            category: "wellness"
        },
        "IzFObkVRSV0": {
            title: "What causes panic attacks, and how can you prevent them?",
            category: "wellness"
        },
        "ClPVJ25Ka4k": {
            title: "How do antidepressants work?",
            category: "therapy"
        },
        "x2Q_kYyCH9Q": {
            title: "4 signs of emotional abuse",
            category: "psychology"
        },
        "3Bax8ijH038": {
            title: "Why are eating disorders so hard to treat?",
            category: "disorders"
        },
        "iNyUmbmQQZg": {
            title: "Is it normal to talk to yourself?",
            category: "psychology"
        },
        "K2sc_ck5BZU": {
            title: "What is schizophrenia?",
            category: "disorders"
        },
        "9xf1T7-t1ak": {
            title: "5 philosophers on anger",
            category: "psychology"
        },
        "hBC7i-vHWsU": {
            title: "What causes addiction, and why is it so hard to treat?",
            category: "disorders"
        },
        "m4Ics03xzUQ": {
            title: "How to increase your happiness",
            category: "wellness"
        },
        "w3d2DlLX7xw": {
            title: "One of the most controversial medical procedures in history",
            category: "therapy"
        },
        "kD3-DKkiVeA": {
            title: "Why you feel stuck — and how to get motivated",
            category: "wellness"
        },
        "arJLy3hX1E8": {
            title: "The psychology of narcissism",
            category: "psychology"
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
                        Mental Help
                    </div>
                    <div className="firstaid-body">
                        Watch, breathe, and heal — empowering videos for your mental wellness journey.
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

export default FirstAid