import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import FlashMessage from '../../components/FlashMessage';
import '../../styles/auth/Auth.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);
  
  const { token } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/validate-reset-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        });
        
        if (!response.ok) {
          setTokenValid(false);
          const data = await response.json();
          setMessage(data.error || 'Invalid or expired reset link');
          setMessageType('error');
          return;
        }
        
        setTokenValid(true);
      } catch (error) {
        setTokenValid(false);
        setMessage('Error validating reset link. Please try again.');
        setMessageType('error');
      }
    };
    
    if (token) {
      validateToken();
    } else {
      setTokenValid(false);
      setMessage('Invalid reset link');
      setMessageType('error');
    }
  }, [token, API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }
    
    // Validate password length
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      setMessageType('error');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred during password reset');
      }
      
      setMessageType('success');
      setMessage('Your password has been successfully reset');
      
      // Clear form
      setPassword('');
      setConfirmPassword('');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/auth/login', { state: { success: 'Password reset successful. Please login with your new password.' }});
      }, 3000);
      
    } catch (error) {
      setMessageType('error');
      setMessage(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <PageHeader 
        title="Reset Password" 
        subtitle="Create a new password for your account"
        backgroundImage="/assets/images/auth-header.jpg"
      />

      <section className="auth-section">
        <div className="container">
          <div className="auth-form-container">
            <h2>Reset Your Password</h2>
            
            {message && (
              <FlashMessage 
                type={messageType} 
                message={message}
                onClose={() => setMessage('')}
              />
            )}
            
            {tokenValid === null ? (
              <p className="text-center">Validating your reset link...</p>
            ) : tokenValid === false ? (
              <div className="auth-error-container">
                <p>This password reset link is invalid or has expired.</p>
                <div className="auth-links">
                  <p>
                    <Link to="/auth/forgot-password">Request a new reset link</Link>
                  </p>
                  <p>
                    <Link to="/auth/login">Return to login</Link>
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form">
                <p className="auth-instructions">
                  Please enter your new password below.
                </p>
                
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                    required
                  />
                  <small className="form-help">Must be at least 8 characters long</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength="8"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <button 
                    type="submit" 
                    className="auth-submit-btn"
                    disabled={loading}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
                
                <div className="auth-links">
                  <p>
                    <Link to="/auth/login">Return to login</Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResetPassword;