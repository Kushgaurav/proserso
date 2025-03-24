import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobs, deleteJob, updateApplicationStatus } from '../services/jobService';
import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AdminJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data.jobs || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load job postings');
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) {
      return;
    }

    try {
      await deleteJob(jobId);
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('Failed to delete job posting');
    }
  };

  const handleApplicationStatus = async (jobId, applicationId, newStatus) => {
    try {
      await updateApplicationStatus(jobId, applicationId, newStatus);
      const updatedJobs = jobs.map(job => {
        if (job._id === jobId) {
          return {
            ...job,
            applications: job.applications.map(app => {
              if (app._id === applicationId) {
                return { ...app, status: newStatus };
              }
              return app;
            })
          };
        }
        return job;
      });
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error updating application status:', error);
      setError('Failed to update application status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-content">
      <div className="section-header">
        <h2>Job Postings</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/jobs/new')}
        >
          <FaPlus /> New Job
        </button>
      </div>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Department</th>
              <th>Location</th>
              <th>Type</th>
              <th>Published</th>
              <th>Applications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <React.Fragment key={job._id}>
                <tr>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => setExpandedJob(expandedJob === job._id ? null : job._id)}
                    >
                      {expandedJob === job._id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </td>
                  <td>{job.title}</td>
                  <td>{job.department}</td>
                  <td>{job.location}</td>
                  <td>{job.type}</td>
                  <td>
                    <span className={`status ${job.published ? 'active' : 'inactive'}`}>
                      {job.published ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>{job.applications?.length || 0}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(job._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedJob === job._id && job.applications?.length > 0 && (
                  <tr>
                    <td colSpan="8">
                      <table className="nested-table">
                        <thead>
                          <tr>
                            <th>Applicant</th>
                            <th>Email</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {job.applications.map(app => (
                            <tr key={app._id}>
                              <td>{app.name}</td>
                              <td>{app.email}</td>
                              <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                              <td>
                                <select
                                  value={app.status}
                                  onChange={(e) => handleApplicationStatus(job._id, app._id, e.target.value)}
                                  className={`status ${app.status}`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="reviewed">Reviewed</option>
                                  <option value="interviewed">Interviewed</option>
                                  <option value="accepted">Accepted</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                              </td>
                              <td>
                                <a
                                  href={app.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-outline btn-sm"
                                >
                                  View Resume
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobs;