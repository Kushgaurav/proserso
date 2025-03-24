import React, { useState, useEffect } from 'react';
import { getApplications, updateApplicationStatus } from '../services/jobService';
import { FaEye, FaCheck, FaTimes, FaFileAlt, FaFilter } from 'react-icons/fa';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);  // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getApplications();
      // Ensure we have an array of applications
      const data = Array.isArray(response.applications) ? response.applications : [];
      setApplications(data);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load job applications');
      setApplications([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, { status: newStatus });
      
      // Update local state
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      // If we're updating the currently selected application, update it too
      if (selectedApplication && selectedApplication._id === applicationId) {
        setSelectedApplication(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Error updating application status:', err);
      setError('Failed to update application status');
    }
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Ensure applications is an array before filtering
  const filteredApplications = Array.isArray(applications) 
    ? (filter === 'all' 
      ? applications 
      : applications.filter(app => app.status === filter))
    : [];

  if (loading) return <div className="loading-container">Loading applications...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="admin-content">
      <div className="section-header">
        <h2>Job Applications</h2>
        <div className="filter-controls">
          <FaFilter /> Filter by status:
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="form-control form-control-sm"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="interviewed">Interviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="alert alert-info">
          No applications found with the selected filter.
        </div>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job Position</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map(application => (
                <tr key={application._id}>
                  <td>{application.name}</td>
                  <td>{application.job?.title || 'Unknown Position'}</td>
                  <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status ${application.status}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleViewApplication(application)}
                        title="View Application"
                      >
                        <FaEye />
                      </button>
                      {application.status === 'pending' && (
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => handleStatusChange(application._id, 'reviewed')}
                          title="Mark as Reviewed"
                        >
                          <FaFileAlt />
                        </button>
                      )}
                      {(application.status === 'reviewed' || application.status === 'interviewed') && (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleStatusChange(application._id, 
                              application.status === 'reviewed' ? 'interviewed' : 'accepted')}
                            title={application.status === 'reviewed' ? "Mark as Interviewed" : "Accept Application"}
                          >
                            <FaCheck />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleStatusChange(application._id, 'rejected')}
                            title="Reject Application"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Application Detail Modal */}
      {showModal && selectedApplication && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Application Details</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="application-details">
              <div className="detail-section">
                <h4>Applicant Information</h4>
                <p><strong>Name:</strong> {selectedApplication.name}</p>
                <p><strong>Email:</strong> {selectedApplication.email}</p>
                <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                <p><strong>Applied On:</strong> {new Date(selectedApplication.createdAt).toLocaleString()}</p>
              </div>
              
              <div className="detail-section">
                <h4>Job Position</h4>
                <p><strong>Title:</strong> {selectedApplication.job?.title || 'Unknown Position'}</p>
                <p><strong>Department:</strong> {selectedApplication.job?.department || 'N/A'}</p>
                <p><strong>Location:</strong> {selectedApplication.job?.location || 'N/A'}</p>
              </div>
              
              <div className="detail-section">
                <h4>Application Status</h4>
                <div className="status-controls">
                  <p>Current Status: 
                    <span className={`status ${selectedApplication.status}`}>
                      {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                    </span>
                  </p>
                  <div className="status-buttons">
                    <button 
                      className={`btn ${selectedApplication.status === 'pending' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handleStatusChange(selectedApplication._id, 'pending')}
                    >
                      Pending
                    </button>
                    <button 
                      className={`btn ${selectedApplication.status === 'reviewed' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handleStatusChange(selectedApplication._id, 'reviewed')}
                    >
                      Reviewed
                    </button>
                    <button 
                      className={`btn ${selectedApplication.status === 'interviewed' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handleStatusChange(selectedApplication._id, 'interviewed')}
                    >
                      Interviewed
                    </button>
                    <button 
                      className={`btn ${selectedApplication.status === 'accepted' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handleStatusChange(selectedApplication._id, 'accepted')}
                    >
                      Accepted
                    </button>
                    <button 
                      className={`btn ${selectedApplication.status === 'rejected' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handleStatusChange(selectedApplication._id, 'rejected')}
                    >
                      Rejected
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Cover Letter / Message</h4>
                <div className="cover-letter">
                  {selectedApplication.message || 'No cover letter provided.'}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Resume</h4>
                {selectedApplication.resumeUrl ? (
                  <div className="resume-link">
                    <a 
                      href={selectedApplication.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <FaFileAlt /> View Resume
                    </a>
                  </div>
                ) : (
                  <p>No resume uploaded.</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
