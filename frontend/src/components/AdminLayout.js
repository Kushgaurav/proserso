import React from 'react';
import Navbar from './Navbar';
import '../styles/AdminDashboard.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Navbar />
      <main className="admin-main">
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
