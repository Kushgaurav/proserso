# Proserso Project Codebase Documentation

This document tracks changes and important information about the codebase.

## Structure Overview
- **frontend**: React application (React Router, context-based state management)
- **backend**: Node.js/Express API with MongoDB

## Recent Changes

### [2024-06-13] - Fixed Express Route Handler Error
- Created missing validateBlogPost function in validationMiddleware.js
- Fixed server startup error related to undefined route handler in blog routes

### [2024-10-05] - Updated Profile and BlogPost Components
- Updated Profile.js to ensure fullName is properly handled and displayed
- Updated BlogPost.js to display author's fullName correctly

### [2024-10-05] - Updated AuthContext
- Added default API URL in AuthContext.js when environment variable is not set
- Fixed registration form submission to properly connect with backend

### [2024-10-05] - Fixed Blog Featured Toggle Functionality
- Added missing toggleFeatured controller function to blogController.js
- Fixed server startup error related to undefined route handler

### [2024-10-05] - Fixed UserProfile Component Error
- Updated UserProfile.js to use 'fullName' instead of 'name' property
- Added null check to prevent "Cannot read properties of undefined" errors
- Added user existence check before rendering user profile

### [2024-10-05] - Fixed Registration Functionality
- Added default API URL in AuthContext.js when environment variable is not set
- Fixed registration form submission to properly connect with backend

### [2025-03-18] - Updated Documentation
- Updated codebase.md to include recent changes related to Profile, BlogPost components, and AuthContext.

## Common Issues

### Authentication Flow
- Registration requires proper fullName, email, and password (8+ characters)
- Login uses JWT tokens stored in localStorage
- Protected routes require authentication token
- User object contains fullName (not name) property for displaying user information

## Environment Setup
- Backend needs .env file with MongoDB connection and JWT_SECRET
- Frontend needs .env file with REACT_APP_API_URL

## Notes
- Always update this file when making significant changes to the codebase
- Document any new components, routes, or API endpoints added
- Include any complex business logic or implementation decisions