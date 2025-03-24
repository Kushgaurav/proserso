import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/PageHeader';
import FlashMessage from '../../components/FlashMessage';
import '../../styles/auth/Auth.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await login(formData);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    }
  };

  return (
    <div className="auth-page">
      <PageHeader 
        title="Login" 
        subtitle="Welcome back to Proserso"
        backgroundImage="/assets/images/auth-header.jpg"
      />

      <section className="auth-section">
        <div className="container">
          <div className="auth-form-container">
            <h2>Sign In</h2>
            {error && (
              <FlashMessage 
                type="error" 
                message={error}
                onClose={() => setError('')}
              />
            )}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" className="auth-submit-btn">
                  Login
                </button>
              </div>

              <div className="auth-links">
                <Link to="/auth/forgot-password">Forgot Password?</Link>
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

export default Login;