import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check auth status when component mounts
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('authToken') || localStorage.getItem('adminToken');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // If token is invalid, clear it
          localStorage.removeItem('authToken');
          localStorage.removeItem('adminToken');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }

      const data = await response.json();
      if (!data.token || !data.user) {
        throw new Error('Invalid response from server');
      }

      // Store token based on user role
      if (data.user.role === 'admin') {
        localStorage.setItem('adminToken', data.token);
      } else {
        localStorage.setItem('authToken', data.token);
      }

      setUser(data.user);
      setError(null);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        if (response.status === 503) {
          throw new Error('Server is temporarily unavailable. Please try again later.');
        }
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      const data = await response.json();
      if (!data.token || !data.user) {
        throw new Error('Invalid response from server');
      }

      // Ensure new user has a role
      if (!data.user.role) {
        data.user.role = 'user';
      }
      
      // For testing purposes, temporarily set all users as admin
      // REMOVE THIS IN PRODUCTION
      if (process.env.NODE_ENV === 'development') {
        data.user.role = 'admin';
        console.info('Development mode: Setting user role to admin');
      }

      const { token, user: newUser } = data;
      localStorage.setItem('authToken', token);
      setUser(newUser);
      setError(null);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};