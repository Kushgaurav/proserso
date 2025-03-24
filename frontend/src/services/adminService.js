import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Configure axios defaults
const adminApi = axios.create({
  baseURL: `${API_URL}/api/admin`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add token to requests
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject({
    error: 'Failed to set up the request',
    details: error.message
  });
});

// Handle response errors
adminApi.interceptors.response.use(
  (response) => {
    // If the response has a data.data structure (our API format), return data.data
    // Otherwise, if it just has data, return that
    return response.data.data || response.data;
  },
  (error) => {
    if (error.response) {
      // Handle authentication errors
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem('adminToken');
        window.dispatchEvent(new CustomEvent('auth-error'));
      }
      
      // Return error message from response if available
      const errorMessage = error.response.data.error || error.response.data.message || 'An error occurred';
      return Promise.reject({
        error: errorMessage,
        status: error.response.status
      });
    } else if (error.request) {
      return Promise.reject({
        error: 'No response from server. Please check your connection.',
        status: 0
      });
    } else {
      return Promise.reject({
        error: error.message || 'An unexpected error occurred',
        status: -1
      });
    }
  }
);

export const loginAdmin = async (credentials) => {
  try {
    return await adminApi.post('/login', credentials);
  } catch (error) {
    throw error;
  }
};

export const getDashboardStats = async () => {
  try {
    return await adminApi.get('/dashboard/stats');
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (page = 1, limit = 10) => {
  try {
    const response = await adminApi.get(`/users?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    console.error('getUsers error:', error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    return await adminApi.get(`/users/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    return await adminApi.post('/users', userData);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    return await adminApi.put(`/users/${userId}`, userData);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    return await adminApi.delete(`/users/${userId}`);
  } catch (error) {
    throw error;
  }
};

export default adminApi;
