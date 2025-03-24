import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: 'dashboard'
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: 'users'
    },
    {
      name: 'Content',
      path: '/admin/content',
      icon: 'file-text'
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: 'settings'
    }
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="admin-sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                <i className={`icon-${item.icon}`}></i>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="admin-sidebar-footer">
        <Link to="/admin/logout" className="logout-btn">
          <i className="icon-log-out"></i>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
