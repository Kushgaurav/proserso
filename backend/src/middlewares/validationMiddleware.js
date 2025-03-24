const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

const sanitizeContent = (content) => {
  return sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title']
    }
  });
};

// Validate blog post data
const validateBlogPost = [
  body('title')
    .trim()
    .notEmpty().withMessage('Blog title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  
  body('summary')
    .trim()
    .notEmpty().withMessage('Blog summary is required')
    .isLength({ min: 10, max: 500 }).withMessage('Summary must be between 10 and 500 characters'),
  
  body('content')
    .trim()
    .notEmpty().withMessage('Blog content is required')
    .isLength({ min: 50 }).withMessage('Content must be at least 50 characters')
    .customSanitizer(content => sanitizeContent(content)),
  
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array')
    .custom((tags) => {
      if (tags && tags.length > 0) {
        const validTags = tags.every(tag => 
          typeof tag === 'string' && 
          tag.trim().length > 0 && 
          tag.trim().length <= 30
        );
        if (!validTags) {
          throw new Error('Each tag must be a non-empty string of max 30 characters');
        }
      }
      return true;
    }),
  
  body('featured')
    .optional()
    .isBoolean().withMessage('Featured must be a boolean value'),
  
  body('draft')
    .optional()
    .isBoolean().withMessage('Draft must be a boolean value'),
  
  handleValidationErrors
];

// Validate job post data
const validateJobPost = (req, res, next) => {
  const { title, description } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: 'Job title and description are required' });
  }
  
  next();
};

// Validate application status updates
const validateApplicationStatus = (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'reviewing', 'accepted', 'rejected'];
  
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Valid status is required' });
  }
  
  next();
};

module.exports = {
  validateBlogPost,
  validateJobPost,
  validateApplicationStatus
};