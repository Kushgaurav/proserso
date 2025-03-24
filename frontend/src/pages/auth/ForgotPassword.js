import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import FlashMessage from '../../components/FlashMessage';
import '../../styles/auth/Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }
      
      setMessageType('success');
      setMessage(data.message || 'Password reset instructions have been sent to your email.');
      setEmail(''); // Clear the form
    } catch (error) {
      setMessageType('error');
      setMessage(error.message || 'Failed to process your request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <PageHeader 
        title="Forgot Password" 
        subtitle="Reset your account password"
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
            
            <form onSubmit={handleSubmit} className="auth-form">
              <p className="auth-instructions">
                Enter your email address and we'll send you instructions to reset your password.
              </p>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <button 
                  type="submit" 
                  className="auth-submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>

              <div className="auth-links">
                <p>
                  Remember your password? <Link to="/auth/login">Login</Link>
                </p>
                <p>
                  Don't have an account? <Link to="/auth/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgotPassword;