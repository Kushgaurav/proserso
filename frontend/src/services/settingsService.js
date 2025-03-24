// Using fetch instead of axios to avoid dependency issues
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const uploadLogo = async (formData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/settings/logo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // Don't set Content-Type for FormData, browser will set it with boundary
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to upload logo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading logo:', error);
    throw error;
  }
};

export const getLogo = async () => {
  try {
    const response = await fetch(`${API_URL}/settings/logo`);
    
    if (!response.ok) {
      throw new Error('Failed to get logo');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting logo:', error);
    throw error;
  }
};

// Updated updateLogo function with better error handling
export const updateLogo = async (formData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/settings/logo`, {
      method: 'PUT', // Use PUT for update
      headers: {
        'Authorization': `Bearer ${token}`
        // Don't set Content-Type for FormData, browser will set it with boundary
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update logo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating logo:', error);
    throw error;
  }
};

export const updateHeroSection = async (heroData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/settings/hero`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(heroData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update hero section');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating hero section:', error);
    throw error;
  }
};

export const updateSocialLinks = async (socialData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/settings/social`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(socialData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update social links');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating social links:', error);
    throw error;
  }
};