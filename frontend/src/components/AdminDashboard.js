import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../services/blogService';
import { getJobs, getApplications } from '../services/jobService';
import { FaBlog, FaBriefcase, FaUserPlus, FaCog, FaChartLine, FaFileAlt, FaUsers, FaChartBar } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalJobs: 0,
    activeJobs: 0,
    applications: 0,
    pendingApplications: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [blogData, jobData, applicationsData] = await Promise.all([
          getPosts(),
          getJobs(),
          getApplications().catch(() => ({ applications: [] }))
        ]);
        // Mock data for total users since we don't have that endpoint yet
        const totalUsers = 25;
        // Calculate stats
        const applications = applicationsData?.applications || [];
        const pendingApplications = applications.filter(app => app.status === 'pending').length;
        setStats({
          totalPosts: blogData.totalPosts || blogData.posts?.length || 0,
          totalJobs: jobData.totalJobs || jobData.jobs?.length || 0,
          activeJobs: jobData.jobs?.filter(job => job.published)?.length || 0,
          applications: applications.length,
          pendingApplications,
          totalUsers
        });
        // Generate recent activity (mock data for now)
        const now = new Date();
        setRecentActivity([
          {
            id: 1,
            type: 'application',
            title: 'New job application received',
            description: 'Senior Developer position',
            timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 2,
            type: 'blog',
            title: 'Blog post published',
            description: 'The Future of Professional Services',
            timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 3,
            type: 'job',
            title: 'New job posting created',
            description: 'UX Designer position',
            timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 4,
            type: 'user',
            title: 'New user registered',
            description: 'john.doe@example.com',
            timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      id: 'posts',
      icon: <FaBlog />,
      number: stats.totalPosts,
      label: 'Blog Posts',
      subtitle: null,
      action: () => navigate('/admin/blog'),
      buttonText: 'Manage'
    },
    {
      id: 'jobs',
      icon: <FaBriefcase />,
      number: stats.totalJobs,
      label: 'Total Jobs',
      subtitle: `${stats.activeJobs} active`,
      action: () => navigate('/admin/jobs'),
      buttonText: 'Manage'
    },
    {
      id: 'applications',
      icon: <FaFileAlt />,
      number: stats.applications,
      label: 'Job Applications',
      subtitle: `${stats.pendingApplications} pending`,
      action: () => navigate('/admin/applications'),
      buttonText: 'Review'
    },
    {
      id: 'users',
      icon: <FaUsers />,
      number: stats.totalUsers,
      label: 'Registered Users',
      subtitle: null,
      action: () => navigate('/admin/users'),
      buttonText: 'Manage'
    }
  ];

  const quickActions = [
    {
      id: 'new-post',
      label: 'New Blog Post',
      icon: <FaBlog />,
      action: () => navigate('/admin/blog/new')
    },
    {
      id: 'new-job',
      label: 'New Job Posting',
      icon: <FaBriefcase />,
      action: () => navigate('/admin/jobs/new')
    },
    {
      id: 'applications',
      label: 'View Applications',
      icon: <FaFileAlt />,
      action: () => navigate('/admin/applications')
    },
    {
      id: 'analytics',
      label: 'View Analytics',
      icon: <FaChartLine />,
      action: () => navigate('/admin/analytics')
    },
    {
      id: 'settings',
      label: 'Site Settings',
      icon: <FaCog />,
      action: () => navigate('/admin/settings')
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'blog':
        return <FaBlog />;
      case 'job':
        return <FaBriefcase />;
      case 'application':
        return <FaFileAlt />;
      case 'user':
        return <FaUsers />;
      default:
        return <FaCog />;
    }
  };

  if (loading) return <div className="loading-container">Loading dashboard data...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="admin-content">
      <h2>Dashboard</h2>
      
      <div className="dashboard-row">
        <div className="dashboard-column">
          <div className="stats-overview">
            <h3><FaChartBar /> Dashboard Overview</h3>
            <div className="dashboard-stats">
              {statCards.map(card => (
                <div className="stat-card" key={card.id}>
                  {card.icon}
                  <div className="stat-number">{card.number}</div>
                  <div>{card.label}</div>
                  {card.subtitle && <div className="stat-subtitle">{card.subtitle}</div>}
                  <button className="btn btn-sm" onClick={card.action}>
                    {card.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-row">
        <div className="dashboard-column">
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              {quickActions.map(action => (
                <button
                  key={action.id}
                  className="btn btn-primary"
                  onClick={action.action}
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="dashboard-column">
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivity.length > 0 ? (
                recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-description">{activity.description}</div>
                      <div className="activity-time">{formatTimeAgo(activity.timestamp)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-activity">No recent activity to display</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;