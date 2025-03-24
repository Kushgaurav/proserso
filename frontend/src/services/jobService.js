const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getJobs = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/api/jobs?${queryString}`);
  if (!response.ok) {
    throw new Error('Failed to fetch job postings');
  }
  return response.json();
};

export const getJob = async (id) => {
  const response = await fetch(`${API_URL}/api/jobs/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch job posting');
  }
  return response.json();
};

export const createJob = async (jobData) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/jobs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jobData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create job posting');
  }

  return response.json();
};

export const updateJob = async (id, jobData) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jobData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update job posting');
  }

  return response.json();
};

export const deleteJob = async (id) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete job posting');
  }

  return response.json();
};

export const applyForJob = async (id, applicationData) => {
  const token = localStorage.getItem('authToken');
  const formData = new FormData();
  
  Object.keys(applicationData).forEach(key => {
    formData.append(key, applicationData[key]);
  });

  const response = await fetch(`${API_URL}/api/jobs/${id}/apply`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit job application');
  }

  return response.json();
};

// Get all applications across all jobs
export const getApplications = async (params = {}) => {
  const token = localStorage.getItem('authToken');
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/api/jobs/applications/all?${queryString}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to fetch applications');
  }
  
  const data = await response.json();
  // Ensure we return an object with applications property
  return {
    applications: Array.isArray(data) ? data : Array.isArray(data.applications) ? data.applications : []
  };
};

// Get applications for a specific job
export const getJobApplications = async (jobId) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/jobs/${jobId}/applications`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to fetch job applications');
  }

  return response.json();
};

// Update application status
export const updateApplicationStatus = async (jobId, applicationId, statusData) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/jobs/${jobId}/applications/${applicationId}/status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(statusData)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to update application status');
  }

  return response.json();
};

// Delete an application
export const deleteApplication = async (applicationId) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/applications/${applicationId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to delete application');
  }

  return response.json();
};

export const getDepartments = async () => {
  const response = await fetch(`${API_URL}/api/jobs/departments`);
  if (!response.ok) {
    throw new Error('Failed to fetch departments');
  }
  return response.json();
};