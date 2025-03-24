const express = require('express');
const router = express.Router();
const { validateBlogPost } = require('../middlewares/validationMiddleware');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  toggleFeatured,
  addComment,
  getComments,
  getTags
} = require('../controllers/blogController');

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/:id/comments', getComments);
router.get('/tags', getTags);

// Protected user routes
router.post('/:id/comments', isAuthenticated, addComment);

// Protected admin routes
router.post('/', isAuthenticated, isAdmin, validateBlogPost, createPost);
router.put('/:id', isAuthenticated, isAdmin, validateBlogPost, updatePost);
router.delete('/:id', isAuthenticated, isAdmin, deletePost);
router.patch('/:id/featured', isAuthenticated, isAdmin, toggleFeatured);

module.exports = router;