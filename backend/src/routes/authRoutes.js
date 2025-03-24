const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify', authController.verify);

// Password reset routes
router.post('/forgot-password', authController.forgotPassword);
router.post('/validate-reset-token', authController.validateResetToken);
router.post('/reset-password', authController.resetPassword);

// Protected routes - require authentication
router.put('/profile', isAuthenticated, authController.updateProfile);
router.put('/change-password', isAuthenticated, authController.changePassword);

module.exports = router;