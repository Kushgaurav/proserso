const Activity = require('../models/Activity');

const trackActivity = async ({
  title,
  description,
  type = 'info',
  category,
  performedBy,
  relatedTo = null
}) => {
  try {
    const activity = new Activity({
      title,
      description,
      type,
      category,
      performedBy,
      relatedTo
    });

    await activity.save();
    return activity;
  } catch (error) {
    console.error('Error tracking activity:', error);
    // Don't throw error - activity tracking should not break main functionality
    return null;
  }
};

// Helper function to generate activity content
const generateActivityContent = (action, category, details) => {
  const templates = {
    user: {
      create: {
        title: 'New User Registration',
        description: `User ${details.name || details.email} has registered`
      },
      update: {
        title: 'User Profile Updated',
        description: `Profile updated for ${details.name || details.email}`
      },
      delete: {
        title: 'User Account Deleted',
        description: `Account deleted for ${details.name || details.email}`
      }
    },
    blog: {
      create: {
        title: 'New Blog Post Created',
        description: `New post "${details.title}" has been created`
      },
      publish: {
        title: 'Blog Post Published',
        description: `Post "${details.title}" has been published`
      },
      update: {
        title: 'Blog Post Updated',
        description: `Post "${details.title}" has been updated`
      },
      delete: {
        title: 'Blog Post Deleted',
        description: `Post "${details.title}" has been deleted`
      }
    },
    job: {
      create: {
        title: 'New Job Posted',
        description: `New position "${details.title}" has been posted`
      },
      update: {
        title: 'Job Posting Updated',
        description: `Position "${details.title}" has been updated`
      },
      delete: {
        title: 'Job Posting Removed',
        description: `Position "${details.title}" has been removed`
      }
    },
    application: {
      create: {
        title: 'New Job Application',
        description: `New application received for "${details.jobTitle}"`
      },
      statusChange: {
        title: 'Application Status Updated',
        description: `Application status changed to "${details.status}" for "${details.jobTitle}"`
      }
    }
  };

  return templates[category][action] || {
    title: 'System Activity',
    description: 'An action was performed in the system'
  };
};

module.exports = {
  trackActivity,
  generateActivityContent
};