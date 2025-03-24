import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaBlog, FaBriefcase, FaCog, FaChartBar, FaUsers, FaFileAlt } from 'react-icons/fa';

const AdminNav = ({ onNavigate }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartBar />, path: '/admin' },
    { id: 'users', label: 'Users', icon: <FaUsers />, path: '/admin/users' },
    { id: 'blog', label: 'Blog Posts', icon: <FaBlog />, path: '/admin/blog' },
    { id: 'jobs', label: 'Job Postings', icon: <FaBriefcase />, path: '/admin/jobs' },
    { id: 'applications', label: 'Applications', icon: <FaFileAlt />, path: '/admin/applications' },
    { id: 'settings', label: 'Site Settings', icon: <FaCog />, path: '/admin/settings' }
  ];

  return (
    <nav className="admin-sidebar">
      <h3>Admin Panel</h3>
      <ul>
        {menuItems.map(item => (
          <li
            key={item.id}
            className={currentPath === item.path ? 'active' : ''}
            onClick={() => onNavigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav;