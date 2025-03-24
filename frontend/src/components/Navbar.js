import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserProfile from './UserProfile';
import LoadingSpinner from './LoadingSpinner';
import '../styles/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isAuthenticated, loading } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-text">Proserso</span>
          </Link>
        </div>
        
        <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
          <div className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        
        <nav className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-menu">
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
            
            <li className="dropdown">
              <button 
                onClick={() => toggleDropdown('services')} 
                className={activeDropdown === 'services' ? 'active' : ''}
              >
                Services <span className="dropdown-arrow">▼</span>
              </button>
              <ul className={`dropdown-menu ${activeDropdown === 'services' ? 'active' : ''}`}>
                <li><Link to="/services/technology" onClick={toggleMenu}>IT Consulting</Link></li>
                <li><Link to="/services/architecture" onClick={toggleMenu}>Architecture & Design</Link></li>
                <li><Link to="/services/business" onClick={toggleMenu}>Business Transformation</Link></li>
                <li><Link to="/services/infrastructure" onClick={toggleMenu}>Infrastructure</Link></li>
                <li><Link to="/services/event" onClick={toggleMenu}>Event Management</Link></li>
                <li><Link to="/services/hr" onClick={toggleMenu}>HR Consultancy</Link></li>
              </ul>
            </li>
            
            <li><Link to="/blog" onClick={toggleMenu}>Blog</Link></li>
            <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
            <li><Link to="/faq" onClick={toggleMenu}>FAQ</Link></li>
            
            {/* Show auth buttons in mobile menu */}
            <li className="mobile-auth-container">
              {loading ? (
                <div className="mobile-loading"><LoadingSpinner size="small" /></div>
              ) : isAuthenticated ? (
                <UserProfile isMobile={true} closeMenu={toggleMenu} />
              ) : (
                <div className="mobile-auth-buttons">
                  <Link to="/auth/login" className="login-button" onClick={toggleMenu}>Login</Link>
                  <Link to="/auth/register" className="register-button" onClick={toggleMenu}>Register</Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
        
        <div className="navbar-cta">
          {loading ? (
            <LoadingSpinner size="small" />
          ) : isAuthenticated ? (
            <UserProfile isMobile={false} />
          ) : (
            <div className="auth-buttons">
              <Link to="/auth/login" className="login-button">Login</Link>
              <Link to="/auth/register" className="register-button">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;