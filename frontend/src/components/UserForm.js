import React, { useState, useEffect } from 'react';
import { createUser, updateUser, getUser } from '../services/userService';
import { FaSave, FaTimes } from 'react-icons/fa';
import '../styles/UserForm.css';

const UserForm = ({ userId, onClose, onUserSaved }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    active: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    if (userId) {
      setIsNewUser(false);
      fetchUser(userId);
    } else {
      setIsNewUser(true);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        active: true
      });
    }
  }, [userId]);

  const fetchUser = async (id) => {
    try {
      setLoading(true);
      const userData = await getUser(id);
      setFormData({
        name: userData.name,
        email: userData.email,
        password: '',
        role: userData.role,
        active: userData.active
      });
    } catch (err) {
      setError('Failed to fetch user details');
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isNewUser) {
        await createUser(formData);
      } else {
        // Don't send password if it's empty (user didn't change it)
        const dataToSend = { ...formData };
        if (!dataToSend.password) {
          delete dataToSend.password;
        }
        await updateUser(userId, dataToSend);
      }
      onUserSaved();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save user');
      console.error('Error saving user:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isNewUser) return <div className="loading-container">Loading...</div>;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{isNewUser ? 'Add New User' : 'Edit User'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="user-form">
          {error && <div className="alert alert-danger">{error}</div>}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">
              {isNewUser ? 'Password' : 'Password (leave blank to keep current)'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleInputChange}
              required={isNewUser}
            />
          </div>
          
          <div className="role-select">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleInputChange}
            />
            <label htmlFor="active">Active</label>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              <FaTimes /> Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading-spinner"></span> : <FaSave />} 
              {loading ? 'Saving...' : 'Save User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
