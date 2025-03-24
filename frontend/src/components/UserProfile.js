import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import '../styles/UserProfile.css';

function UserProfile({ isMobile = false, closeMenu }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    if (closeMenu) closeMenu();
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    if (closeMenu) closeMenu();
  };

  const getInitials = (name) => {
    // Add null check to prevent errors if name is undefined
    if (!name) return "??";
    
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // If user is not defined yet, show a loading state
  if (!user) {
    return null; // or return a loading indicator
  }

  return (
    <div className={`user-profile ${isMobile ? 'mobile' : ''}`} ref={dropdownRef}>
      <button 
        className="profile-button" 
        onClick={toggleDropdown}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.fullName} />
          ) : (
            <span className="avatar-initials">{getInitials(user.fullName)}</span>
          )}
        </div>
        <span className="profile-name">{user.fullName}</span>
        <i className={`fas fa-chevron-down ${isOpen ? 'rotate' : ''}`}></i>
      </button>
      {isOpen && (
        <div className={`profile-dropdown ${isMobile ? 'mobile' : ''}`}>
          <div className="dropdown-header">
            <strong>{user.fullName}</strong>
            <small>{user.email}</small>
          </div>
          
          <div className="dropdown-divider"></div>
          
          <Link to="/profile" className="dropdown-item" onClick={handleProfileClick}>
            <FaUser />
            My Profile
          </Link>
          
          {user.role === 'admin' && (
            <Link to="/admin" className="dropdown-item" onClick={handleProfileClick}>
              <FaTachometerAlt />
              Admin Dashboard
            </Link>
          )}
          
          <div className="dropdown-divider"></div>
          
          <button onClick={handleLogout} className="dropdown-item logout-item">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;