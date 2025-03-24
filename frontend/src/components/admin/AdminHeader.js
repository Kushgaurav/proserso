import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="admin-header-actions">
        <div className="admin-header-notifications">
          <i className="icon-bell"></i>
        </div>
        <div className="admin-header-profile">
          <img src="/images/admin-avatar.png" alt="Admin" />
          <div className="admin-profile-dropdown">
            <span>Admin User</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
