import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { 
  FaUsers, FaBlog, FaBriefcase, FaFileAlt, FaChartLine, 
  FaCheckCircle, FaClock, FaExclamationTriangle, FaCalendarAlt
} from 'react-icons/fa';
import axios from 'axios';
import '../../styles/admin/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    totalPosts: 0,
    totalJobs: 0,
    activeJobs: 0,
    applications: 0,
    pendingApplications: 0,
    weeklyStats: {
      userGrowth: 0,
      postViews: 0,
      applicationRate: 0
    }
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
    // Set up real-time updates every 5 minutes
    const interval = setInterval(fetchDashboardData, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const [analyticsRes, activityRes] = await Promise.all([
        axios.get('/api/admin/analytics/overview', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/api/admin/activity/recent', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (analyticsRes.data.success) {
        setStats({
          ...analyticsRes.data.data,
          weeklyStats: analyticsRes.data.weeklyStats || {
            userGrowth: 0,
            postViews: 0,
            applicationRate: 0
          }
        });
      }

      if (activityRes.data.success) {
        setRecentActivity(activityRes.data.activities);
      }

      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (type) => {
    switch (type) {
      case 'success': return 'var(--success-color, #28a745)';
      case 'warning': return 'var(--warning-color, #ffc107)';
      case 'danger': return 'var(--danger-color, #dc3545)';
      default: return 'var(--primary-color, #007bff)';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'success': return <FaCheckCircle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'pending': return <FaClock />;
      default: return <FaCalendarAlt />;
    }
  };

  if (loading) return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader />
        <div className="loading-container">Loading dashboard data...</div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader />
        <div className="admin-dashboard-content">
          {error && <div className="alert alert-danger">{error}</div>}
          
          <div className="dashboard-header">
            <h2>Dashboard Overview</h2>
            <div className="date-filter">
              <FaCalendarAlt />
              <select defaultValue="week">
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="stat-icon users">
                <FaUsers />
              </div>
              <div className="stat-details">
                <h3>Users</h3>
                <p className="stat-number">{stats.userCount}</p>
                <p className="stat-growth">
                  <span className={stats.weeklyStats.userGrowth >= 0 ? 'positive' : 'negative'}>
                    {stats.weeklyStats.userGrowth}% this week
                  </span>
                </p>
                <Link to="/admin/users" className="manage-link">Manage Users</Link>
              </div>
            </div>
            
            <div className="admin-stat-card">
              <div className="stat-icon blog">
                <FaBlog />
              </div>
              <div className="stat-details">
                <h3>Blog Posts</h3>
                <p className="stat-number">{stats.totalPosts}</p>
                <p className="stat-growth">
                  <span className="neutral">{stats.weeklyStats.postViews} views this week</span>
                </p>
                <Link to="/admin/blog" className="manage-link">Manage Posts</Link>
              </div>
            </div>
            
            <div className="admin-stat-card">
              <div className="stat-icon jobs">
                <FaBriefcase />
              </div>
              <div className="stat-details">
                <h3>Job Postings</h3>
                <p className="stat-number">{stats.totalJobs}</p>
                <p className="stat-subtitle">{stats.activeJobs} active jobs</p>
                <Link to="/admin/jobs" className="manage-link">Manage Jobs</Link>
              </div>
            </div>
            
            <div className="admin-stat-card">
              <div className="stat-icon applications">
                <FaFileAlt />
              </div>
              <div className="stat-details">
                <h3>Applications</h3>
                <p className="stat-number">{stats.applications}</p>
                <p className="stat-subtitle highlight">{stats.pendingApplications} pending</p>
                <Link to="/admin/applications" className="manage-link">Review Applications</Link>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Activity Feed */}
            <div className="dashboard-section activity-feed">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="activity-item" style={{ borderLeft: `4px solid ${getStatusColor(activity.type)}` }}>
                      <div className="activity-icon" style={{ color: getStatusColor(activity.type) }}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="activity-content">
                        <h4>{activity.title}</h4>
                        <p>{activity.description}</p>
                        <span className="activity-time">{new Date(activity.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-activity">No recent activity to display</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="dashboard-section quick-stats">
              <h3>Performance Metrics</h3>
              <div className="metrics-grid">
                <div className="metric-card">
                  <FaChartLine />
                  <div className="metric-value">{stats.weeklyStats.applicationRate}%</div>
                  <div className="metric-label">Application Rate</div>
                </div>
                {/* Add more metric cards as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
