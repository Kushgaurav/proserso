const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

// All admin routes require authentication and admin role
router.use(isAuthenticated, isAdmin);

// Analytics Routes
router.get('/analytics/overview', adminController.getAnalyticsOverview);
router.get('/activity/recent', adminController.getRecentActivity);
router.get('/dashboard/stats', adminController.getDashboardStats);

// User Management
router.route('/users')
  .get(adminController.getAllUsers)
  .post(adminController.createUser);

router.route('/users/:id')
  .get(adminController.getUserById)
  .put(adminController.updateUser)
  .delete(adminController.deleteUser);

// Content Management
router.get('/content', adminController.getAllContent);
router.post('/content', adminController.createContent);
router.put('/content/:id', adminController.updateContent);
router.delete('/content/:id', adminController.deleteContent);

module.exports = router;
