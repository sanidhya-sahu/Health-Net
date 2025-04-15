// src/components/Signup.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const { signup, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    // Validate password match
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    
    // Validate password strength
    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    const success = await signup(username, email, password);
    setIsLoading(false);
    
    if (success) {
      navigate('/Period');
    }
  };

  return (
    <>
    <div className="auth-form">
      <h2>Create Account</h2>
      
      {(localError || authError) && (
        <div className="error-message">{localError || authError}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
      <div className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
    <Footer theme={"pink"} ></Footer>
    </>
  );
}

export default Signup;