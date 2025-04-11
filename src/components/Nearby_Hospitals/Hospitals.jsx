import React, { useState, useEffect } from 'react';
import './hosp.css'
const HospitalLocator = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          fetchHospitals(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError("Error getting your location. Please enable location services.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  const fetchHospitals = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://med-check-health-net-api-7682.vercel.app/hospitals?lat=${latitude}&lon=${longitude}&radius=30`);
      const data = await response.json();
      console.log(data);
      
      if (data.status === "success") {
        setHospitals(data.hospitals);
      } else {
        setError("Failed to fetch hospital data");
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching hospital data");
      setLoading(false);
    }
  };

  const HospitalCard = ({ hospital }) => {
    return (
      <div className="hospital-card">
        <h3>{hospital.Hospital_Name}</h3>
        <div className="hospital-details">
          <p><strong>Address:</strong> {hospital.Address}</p>
          <p><strong>District:</strong> {hospital.District}, {hospital.State}</p>
          <p><strong>Pincode:</strong> {hospital.Pincode}</p>
          {hospital.Phone !== "0" && <p><strong>Phone:</strong> {hospital.Phone}</p>}
          {hospital.Mobile !== "0" && <p><strong>Mobile:</strong> {hospital.Mobile}</p>}
          <p className="distance"><strong>Distance:</strong> {hospital.Distance_km} km</p>
        </div>
      </div>
    );
  };

  return (
    <div className="hospital-locator">
      <div className="header">
        <h1>Nearby Hospitals</h1>
        {userLocation && (
          <p className="location-info">
            Your location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
          </p>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading hospital data...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="hospitals-container">
          <p className="results-count">Found {hospitals.length} hospitals near you</p>
          {hospitals.map((hospital, index) => (
            <HospitalCard key={index} hospital={hospital} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalLocator;