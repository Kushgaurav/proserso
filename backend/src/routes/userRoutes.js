const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

// All routes in this file are protected by auth middleware
router.use(isAuthenticated);

// All routes in this file are protected by admin middleware
router.use(isAdmin);

// @route   GET /api/users
// @desc    Get all users
// @access  Admin
router.get('/', getUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Admin
router.get('/:id', getUserById);

// @route   POST /api/users
// @desc    Create a new user
// @access  Admin
router.post('/', createUser);

// @route   PUT /api/users/:id
// @desc    Update a user
// @access  Admin
router.put('/:id', updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Admin
router.delete('/:id', deleteUser);

module.exports = router;
