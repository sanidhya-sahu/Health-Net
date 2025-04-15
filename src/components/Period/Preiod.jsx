// src/components/PeriodTracker/PeriodTracker.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CycleForm from './CycleForm';
import CycleList from './CycleList';
import CycleStats from './CycleStats';
import Login from './login';
import Signup from './signup';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import './Period.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/Period/login" />;
  }
  
  return children;
}

function PeriodTrackerContent() {
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('list'); // 'list', 'add', 'stats'
  const { currentUser, logout, getAuthHeader } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      fetchCycles();
    }
  }, [currentUser]);

  const fetchCycles = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1/api/cycles', {
        headers: {
          ...getAuthHeader(),
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch cycles');
      }
      
      const data = await response.json();
      setCycles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCycle = async (cycleData) => {
    try {
      const response = await fetch('http://127.0.0.1/api/cycles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(cycleData),
      });

      if (!response.ok) {
        throw new Error('Failed to add cycle');
      }

      await fetchCycles();
      setActiveView('list');
    } catch (err) {
      setError(err.message);
    }
  };

  const updateCycle = async (id, cycleData) => {
    try {
      const response = await fetch(`http://127.0.0.1/cycles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(cycleData),
      });

      if (!response.ok) {
        throw new Error('Failed to update cycle');
      }

      await fetchCycles();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteCycle = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1/api/cycles/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete cycle');
      }

      await fetchCycles();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/Period/login');
  };

  return (
    <>
    <Navbar theme={"pink"} ></Navbar>
    <div className="period-tracker-app">
      <header className="app-header">
        <h1>Period Tracker</h1>
        {currentUser && (
          <div className="user-controls">
            <span className="welcome-text">Hello, {currentUser.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>
      
      {currentUser && (
        <nav className="app-nav">
          <button 
            className={activeView === 'list' ? 'active' : ''} 
            onClick={() => setActiveView('list')}>
            Log
          </button>
          <button 
            className={activeView === 'add' ? 'active' : ''} 
            onClick={() => setActiveView('add')}>
            Add Entry
          </button>
          <button 
            className={activeView === 'stats' ? 'active' : ''} 
            onClick={() => setActiveView('stats')}>
            Stats
          </button>
        </nav>
      )}

      <main className="app-content">
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {activeView === 'list' && (
              <CycleList 
                cycles={cycles} 
                onUpdateCycle={updateCycle} 
                onDeleteCycle={deleteCycle} 
              />
            )}
            
            {activeView === 'add' && (
              <CycleForm onAddCycle={addCycle} />
            )}
            
            {activeView === 'stats' && (
              <CycleStats cycles={cycles} />
            )}
          </>
        )}
      </main>
    </div>
    <Footer theme={"pink"} ></Footer>
    </>
  );
}

function PeriodTracker() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <ProtectedRoute>
            <PeriodTrackerContent />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default PeriodTracker;