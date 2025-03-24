const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      // Clear invalid tokens
      localStorage.removeItem('adminToken');
      localStorage.removeItem('authToken');
    }
    const error = await response.json();
    throw new Error(error.error || error.message || 'Request failed');
  }
  return response.json();
};

export const getUsers = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('No admin token found. Please login again.');
    }

    const response = await fetch(`${API_URL}/api/admin/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error in getUsers:', error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('No admin token found. Please login again.');
    }

    const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error in getUser:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('No admin token found. Please login again.');
    }

    const response = await fetch(`${API_URL}/api/admin/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('No admin token found. Please login again.');
    }

    const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('No admin token found. Please login again.');
    }

    const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw error;
  }
};
