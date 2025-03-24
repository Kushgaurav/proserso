const express = require('express');
const router = express.Router();
const { validateJobPost, validateApplicationStatus } = require('../middlewares/validationMiddleware');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  applyForJob,
  updateApplicationStatus,
  getApplications,
  getAllApplications
} = require('../controllers/jobController');

// Public routes
router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/:id/apply', isAuthenticated, applyForJob);

// Protected admin routes
router.post('/', isAuthenticated, isAdmin, validateJobPost, createJob);
router.put('/:id', isAuthenticated, isAdmin, validateJobPost, updateJob);
router.delete('/:id', isAuthenticated, isAdmin, deleteJob);
router.get('/applications/all', isAuthenticated, isAdmin, getAllApplications);  // New route for all applications
router.get('/:id/applications', isAuthenticated, isAdmin, getApplications);
router.patch(
  '/:id/applications/:applicationId/status',
  isAuthenticated,
  isAdmin,
  validateApplicationStatus,
  updateApplicationStatus
);

module.exports = router;