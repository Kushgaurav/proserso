import React, { useState, useEffect } from 'react';
import { FaUsers, FaEye, FaChartLine, FaGlobe, FaDesktop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import { getAnalytics } from '../services/analyticsService';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    visitors: {
      total: 0,
      unique: 0,
      returning: 0
    },
    pageViews: {
      total: 0,
      average: 0
    },
    topPages: [],
    devices: {
      desktop: 0,
      mobile: 0,
      tablet: 0
    },
    trafficSources: [],
    conversionRate: 0
  });
  
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // In a real implementation, we would fetch actual analytics data
      // For now, we'll use mock data
      // const data = await getAnalytics(timeRange);
      
      // Mock data for demonstration
      const mockData = {
        visitors: {
          total: timeRange === 'week' ? 1250 : timeRange === 'month' ? 5430 : 16500,
          unique: timeRange === 'week' ? 980 : timeRange === 'month' ? 3850 : 12200,
          returning: timeRange === 'week' ? 270 : timeRange === 'month' ? 1580 : 4300
        },
        pageViews: {
          total: timeRange === 'week' ? 3800 : timeRange === 'month' ? 15600 : 48000,
          average: timeRange === 'week' ? 3.04 : timeRange === 'month' ? 2.87 : 2.91
        },
        topPages: [
          { url: '/', title: 'Home Page', views: timeRange === 'week' ? 980 : timeRange === 'month' ? 3600 : 11200 },
          { url: '/services', title: 'Services', views: timeRange === 'week' ? 650 : timeRange === 'month' ? 2800 : 8500 },
          { url: '/about', title: 'About Us', views: timeRange === 'week' ? 420 : timeRange === 'month' ? 1950 : 5800 },
          { url: '/blog', title: 'Blog', views: timeRange === 'week' ? 380 : timeRange === 'month' ? 1700 : 5200 },
          { url: '/contact', title: 'Contact', views: timeRange === 'week' ? 310 : timeRange === 'month' ? 1400 : 4300 }
        ],
        devices: {
          desktop: timeRange === 'week' ? 58 : timeRange === 'month' ? 55 : 52,
          mobile: timeRange === 'week' ? 35 : timeRange === 'month' ? 38 : 42,
          tablet: timeRange === 'week' ? 7 : timeRange === 'month' ? 7 : 6
        },
        trafficSources: [
          { source: 'Direct', percentage: timeRange === 'week' ? 42 : timeRange === 'month' ? 40 : 38 },
          { source: 'Organic Search', percentage: timeRange === 'week' ? 35 : timeRange === 'month' ? 36 : 37 },
          { source: 'Social Media', percentage: timeRange === 'week' ? 15 : timeRange === 'month' ? 16 : 17 },
          { source: 'Referral', percentage: timeRange === 'week' ? 8 : timeRange === 'month' ? 8 : 8 }
        ],
        conversionRate: timeRange === 'week' ? 3.2 : timeRange === 'month' ? 3.5 : 3.7
      };
      
      setAnalytics(mockData);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-container">Loading analytics...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="admin-content">
      <div className="section-header">
        <h2>Website Analytics</h2>
        <div className="time-range-selector">
          <label htmlFor="time-range">Time Range:</label>
          <select 
            id="time-range"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-control"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last 12 Months</option>
          </select>
        </div>
      </div>

      {/* Visitor Stats */}
      <div className="analytics-section">
        <h3>Visitor Statistics</h3>
        <div className="dashboard-stats">
          <div className="stat-card">
            <FaUsers />
            <div className="stat-number">{analytics.visitors.total.toLocaleString()}</div>
            <div className="stat-label">Total Visitors</div>
          </div>
          <div className="stat-card">
            <FaUsers />
            <div className="stat-number">{analytics.visitors.unique.toLocaleString()}</div>
            <div className="stat-label">Unique Visitors</div>
          </div>
          <div className="stat-card">
            <FaUsers />
            <div className="stat-number">{analytics.visitors.returning.toLocaleString()}</div>
            <div className="stat-label">Returning Visitors</div>
          </div>
          <div className="stat-card">
            <FaEye />
            <div className="stat-number">{analytics.pageViews.total.toLocaleString()}</div>
            <div className="stat-label">Total Page Views</div>
          </div>
          <div className="stat-card">
            <FaChartLine />
            <div className="stat-number">{analytics.pageViews.average.toFixed(2)}</div>
            <div className="stat-label">Pages per Visit</div>
          </div>
          <div className="stat-card">
            <FaChartLine />
            <div className="stat-number">{analytics.conversionRate.toFixed(1)}%</div>
            <div className="stat-label">Conversion Rate</div>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="analytics-section">
        <h3>Most Visited Pages</h3>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>URL</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topPages.map((page, index) => (
                <tr key={index}>
                  <td>{page.title}</td>
                  <td>{page.url}</td>
                  <td>{page.views.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device & Traffic Source Distribution */}
      <div className="analytics-section">
        <div className="analytics-row">
          <div className="analytics-column">
            <h3>Device Distribution</h3>
            <div className="device-distribution">
              <div className="device-item">
                <FaDesktop />
                <div className="device-percentage">{analytics.devices.desktop}%</div>
                <div className="device-label">Desktop</div>
              </div>
              <div className="device-item">
                <FaMobileAlt />
                <div className="device-percentage">{analytics.devices.mobile}%</div>
                <div className="device-label">Mobile</div>
              </div>
              <div className="device-item">
                <FaTabletAlt />
                <div className="device-percentage">{analytics.devices.tablet}%</div>
                <div className="device-label">Tablet</div>
              </div>
            </div>
          </div>
          
          <div className="analytics-column">
            <h3>Traffic Sources</h3>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.trafficSources.map((source, index) => (
                    <tr key={index}>
                      <td>{source.source}</td>
                      <td>{source.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="analytics-section">
        <h3>Recommendations</h3>
        <div className="recommendations">
          <div className="recommendation-card">
            <h4>Improve Mobile Experience</h4>
            <p>With {analytics.devices.mobile}% of visitors using mobile devices, focus on optimizing the mobile experience to improve engagement.</p>
          </div>
          <div className="recommendation-card">
            <h4>Enhance SEO Strategy</h4>
            <p>Organic search accounts for {analytics.trafficSources.find(s => s.source === 'Organic Search')?.percentage}% of traffic. Consider enhancing your SEO strategy to increase visibility.</p>
          </div>
          <div className="recommendation-card">
            <h4>Boost Social Media Presence</h4>
            <p>Only {analytics.trafficSources.find(s => s.source === 'Social Media')?.percentage}% of traffic comes from social media. Increase your social media activity to drive more traffic.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
