import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, updateJob, getJob, getDepartments } from '../services/jobService';
import { FaSave, FaTimes } from 'react-icons/fa';
import '../styles/JobForm.css';

const JobForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    salary: '',
    published: false,
    deadline: ''
  });

  const fetchDepartments = useCallback(async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }, []);

  const fetchJob = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await getJob(id);
      setFormData({
        title: data.title || '',
        department: data.department || '',
        location: data.location || '',
        type: data.type || 'full-time',
        description: data.description || '',
        requirements: data.requirements || '',
        responsibilities: data.responsibilities || '',
        benefits: data.benefits || '',
        salary: data.salary || '',
        published: data.published || false,
        deadline: data.deadline ? data.deadline.split('T')[0] : ''
      });
    } catch (error) {
      console.error('Error fetching job:', error);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDepartments();
    fetchJob();
  }, [fetchDepartments, fetchJob]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await updateJob(id, formData);
      } else {
        await createJob(formData);
      }
      navigate('/admin/jobs');
    } catch (error) {
      console.error('Error saving job:', error);
      setError('Failed to save job posting');
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <div>Loading...</div>;

  return (
    <div className="admin-content">
      <div className="section-header">
        <h2>{id ? 'Edit Job Posting' : 'Create New Job Posting'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g. Senior Software Engineer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              placeholder="e.g. New York, NY (Remote)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Job Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="temporary">Temporary</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="salary">Salary Range</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="e.g. $80,000 - $100,000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Application Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="5"
            placeholder="Provide a detailed description of the job..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements *</label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            required
            rows="5"
            placeholder="List the qualifications and skills required..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="responsibilities">Responsibilities *</label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleInputChange}
            required
            rows="5"
            placeholder="Describe the key responsibilities of this role..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="benefits">Benefits</label>
          <textarea
            id="benefits"
            name="benefits"
            value={formData.benefits}
            onChange={handleInputChange}
            rows="5"
            placeholder="List the benefits offered with this position..."
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleInputChange}
          />
          <label htmlFor="published">Publish Job Posting</label>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/jobs')}>
            <FaTimes /> Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <FaSave /> {loading ? 'Saving...' : 'Save Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
