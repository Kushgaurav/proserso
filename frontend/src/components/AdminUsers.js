import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaUserPlus, FaSearch } from 'react-icons/fa';
import { getUsers, deleteUser } from '../services/adminService';
import UserForm from './UserForm';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminUsers.css';

const AdminUsers = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      logout();
      navigate('/auth/login', { state: { error: 'Admin access required' } });
      return;
    }
    fetchUsers();
  }, [user, logout, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers();
      
      // Since adminService now handles the data extraction, response should be the array directly
      if (Array.isArray(response)) {
        setUsers(response);
      } else {
        console.error('Unexpected response format:', response);
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.error || 'Failed to fetch users. Please try again.');
      
      if (err.status === 401 || err.status === 403) {
        logout();
        navigate('/auth/login', { state: { error: 'Please login as admin to continue.' } });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user._id !== userId));
        setError(null);
      } catch (err) {
        setError(err.error || 'Failed to delete user');
      }
    }
  };

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    setShowUserForm(true);
  };

  const handleCloseForm = () => {
    setShowUserForm(false);
    setSelectedUserId(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterRole(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchUsers}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>User Management</h2>
        <button className="btn btn-primary" onClick={() => setShowUserForm(true)}>
          <FaUserPlus /> Add New User
        </button>
      </div>

      <div className="filters-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="filter-box">
          <select value={filterRole} onChange={handleFilterChange}>
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="no-results">No users found matching your criteria.</div>
      ) : (
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.role || 'user'}</td>
                  <td>
                    <span className={`status ${user.active ? 'active' : 'inactive'}`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="actions">
                    <button 
                      className="btn btn-icon" 
                      title="Edit user"
                      onClick={() => handleEditUser(user._id)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn btn-icon delete" 
                      title="Delete user"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showUserForm && (
        <UserForm 
          userId={selectedUserId} 
          onClose={handleCloseForm} 
          onUserSaved={fetchUsers} 
        />
      )}
    </div>
  );
};

export default AdminUsers;
