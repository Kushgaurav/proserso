const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Get analytics data for the specified time range
 * @param {string} timeRange - 'week', 'month', or 'year'
 * @returns {Promise<Object>} Analytics data
 */
export const getAnalytics = async (timeRange = 'week') => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/analytics?timeRange=${timeRange}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to fetch analytics data');
  }

  return response.json();
};

/**
 * Get visitor data for a specific page
 * @param {string} pageUrl - The URL of the page to get analytics for
 * @param {string} timeRange - 'week', 'month', or 'year'
 * @returns {Promise<Object>} Page-specific analytics data
 */
export const getPageAnalytics = async (pageUrl, timeRange = 'week') => {
  const token = localStorage.getItem('authToken');
  const encodedUrl = encodeURIComponent(pageUrl);
  const response = await fetch(`${API_URL}/api/analytics/page?url=${encodedUrl}&timeRange=${timeRange}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to fetch page analytics data');
  }

  return response.json();
};

/**
 * Track a page view
 * @param {string} pageUrl - The URL of the page being viewed
 * @param {Object} visitorData - Data about the visitor (device, referrer, etc.)
 * @returns {Promise<Object>} Confirmation of tracking
 */
export const trackPageView = async (pageUrl, visitorData = {}) => {
  const response = await fetch(`${API_URL}/api/analytics/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pageUrl,
      timestamp: new Date().toISOString(),
      ...visitorData
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to track page view');
  }

  return response.json();
};

/**
 * Track a conversion event (form submission, signup, etc.)
 * @param {string} eventType - Type of conversion event
 * @param {Object} eventData - Data about the conversion event
 * @returns {Promise<Object>} Confirmation of tracking
 */
export const trackConversion = async (eventType, eventData = {}) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/analytics/conversion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify({
      eventType,
      timestamp: new Date().toISOString(),
      ...eventData
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to track conversion');
  }

  return response.json();
};

/**
 * Get conversion rate data
 * @param {string} timeRange - 'week', 'month', or 'year'
 * @returns {Promise<Object>} Conversion rate data
 */
export const getConversionData = async (timeRange = 'week') => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/analytics/conversions?timeRange=${timeRange}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to fetch conversion data');
  }

  return response.json();
};
