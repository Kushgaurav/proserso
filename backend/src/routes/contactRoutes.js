const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');
const rateLimit = require('express-rate-limit');

// Rate limiting for contact form submissions
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5 // limit each IP to 5 requests per windowMs
});

// Contact form route with rate limiting
router.post('/submit', contactLimiter, submitContactForm);

module.exports = router;