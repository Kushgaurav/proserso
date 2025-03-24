const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['success', 'warning', 'danger', 'pending', 'info'],
    default: 'info'
  },
  category: {
    type: String,
    enum: ['user', 'blog', 'job', 'application', 'system'],
    required: true
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  relatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'category'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
ActivitySchema.index({ timestamp: -1 });
ActivitySchema.index({ category: 1, timestamp: -1 });
ActivitySchema.index({ performedBy: 1, timestamp: -1 });

module.exports = mongoose.model('Activity', ActivitySchema);