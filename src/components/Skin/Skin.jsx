import React, { useState } from 'react';
import './SkinDiseaseDetector.css';
import Navbar from '../navbar/navbar'
import Footer from '../Footer/Footer';

function SkinDiseaseDetector() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setPrediction(null);
            setError(null);
        }
    };

    // Added drag and drop functionality
    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setSelectedImage(file);
                setPreviewUrl(URL.createObjectURL(file));
                setPrediction(null);
                setError(null);
            } else {
                setError("Please select an image file");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            setError("Please select an image first");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', selectedImage);

            const response = await fetch('https://skin-disease-prediction-api.vercel.app/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setPrediction(data.prediction);
        } catch (err) {
            setError("Error detecting skin condition: " + err.message);
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        setPrediction(null);
        setError(null);
    };

    return (
        <>
            <Navbar />
            <div className="skin-container">
                <div className="skin-disease-content">
                    <div className="skin-header">
                        <h1>Skin Disease Detection</h1>
                        <p>Upload a clear image of the skin condition to get an AI-powered diagnosis</p>
                    </div>

                    <div className="service-info">
                        <h3>How It Works</h3>
                        <div className="info-cards">
                            <div className="info-card">
                                <div className="info-icon">1</div>
                                <h4>Upload</h4>
                                <p>Upload a clear photo of the skin condition</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">2</div>
                                <h4>Analysis</h4>
                                <p>Our AI analyzes the image for potential conditions</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">3</div>
                                <h4>Results</h4>
                                <p>Receive a potential diagnosis instantly</p>
                            </div>
                        </div>

                    </div>
                    <div className="detector-container">
                        <div className="upload-section">
                            <h3>Upload Image</h3>
                            <form onSubmit={handleSubmit}>
                                <div
                                    className="file-upload-area"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    {!previewUrl ? (
                                        <>
                                            <div className="upload-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                    <polyline points="17 8 12 3 7 8"></polyline>
                                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                                </svg>
                                                <p>Drag & drop an image or click to browse</p>
                                                <p className="upload-info">Supported formats: JPG, PNG, JPEG</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="file-input"
                                            />
                                        </>
                                    ) : (
                                        <div className="image-preview">
                                            <img src={previewUrl} alt="Selected skin condition" />
                                            <button type="button" className="change-image-btn" onClick={handleReset}>
                                                Change Image
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {previewUrl && !prediction && (
                                    <button
                                        type="submit"
                                        className="analyze-btn"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="button-spinner"></span>
                                                <span>Analyzing...</span>
                                            </>
                                        ) : 'Analyze Image'}
                                    </button>
                                )}
                            </form>
                        </div>

                        <div className="result-section">
                            <h3>{prediction ? 'Diagnosis Result' : 'Results'}</h3>

                            {loading && (
                                <div className="loading">
                                    <div className="spinner"></div>
                                    <p>Analyzing your image...</p>
                                    <p className="analyzing-note">This may take a few moments</p>
                                </div>
                            )}

                            {error && (
                                <div className="error-message">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    <p>{error}</p>
                                </div>
                            )}

                            {!loading && !error && !prediction && (
                                <div className="empty-result">
                                    <p>Please upload an image to receive a diagnosis</p>
                                </div>
                            )}

                            {prediction && (
                                <div className="prediction-result">
                                    <div className="result-box">
                                        <p className="condition-name">{prediction}</p>
                                        <p className="disclaimer">
                                            This is an AI-powered suggestion and should not replace professional medical advice.
                                            Please consult with a dermatologist for a proper diagnosis.
                                        </p>
                                    </div>
                                    <button className="new-analysis-btn" onClick={handleReset}>
                                        Analyze Another Image
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="disclaimer-box">
                        <h4>Important Disclaimer</h4>
                        <p>This tool is designed to provide preliminary information only and is not intended to replace professional medical diagnosis. Always consult with a qualified healthcare provider for proper diagnosis and treatment.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SkinDiseaseDetector;
