const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getPosts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const token = localStorage.getItem('authToken');
  
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}/api/blog?${queryString}`, {
    headers
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  return response.json();
};

export const getPost = async (id) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}/api/blog/${id}`, {
    headers
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog post');
  }
  return response.json();
};

export const createPost = async (postData) => {
  const token = localStorage.getItem('authToken');
  const formData = new FormData();
  
  Object.keys(postData).forEach(key => {
    if (key === 'tags' && Array.isArray(postData[key])) {
      formData.append(key, JSON.stringify(postData[key]));
    } else if (key === 'featured' || key === 'draft') {
      formData.append(key, postData[key].toString());
    } else {
      formData.append(key, postData[key]);
    }
  });

  const response = await fetch(`${API_URL}/api/blog`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create blog post');
  }

  return response.json();
};

export const updatePost = async (id, postData) => {
  const token = localStorage.getItem('authToken');
  const formData = new FormData();
  
  Object.keys(postData).forEach(key => {
    if (key === 'tags' && Array.isArray(postData[key])) {
      formData.append(key, JSON.stringify(postData[key]));
    } else if (key === 'featured' || key === 'draft') {
      formData.append(key, postData[key].toString());
    } else {
      formData.append(key, postData[key]);
    }
  });

  const response = await fetch(`${API_URL}/api/blog/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update blog post');
  }

  return response.json();
};

export const deletePost = async (id) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/blog/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete blog post');
  }

  return response.json();
};

export const getTags = async () => {
  const response = await fetch(`${API_URL}/api/blog/tags`);
  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }
  return response.json();
};

export const addComment = async (postId, commentData) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/blog/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(commentData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add comment');
  }

  return response.json();
};

export const updatePostStatus = async (id, statusData) => {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(`${API_URL}/api/blog/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(statusData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to update post status`);
  }

  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/api/blog/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};