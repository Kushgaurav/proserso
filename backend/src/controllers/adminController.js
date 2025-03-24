const Admin = require('../models/Admin');
const User = require('../models/User');
const Content = require('../models/Content');
const BlogPost = require('../models/BlogPost');
const Job = require('../models/Job');
const Activity = require('../models/Activity');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin auth
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last login
    admin.lastLogin = Date.now();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

exports.logout = (req, res) => {
  // Client-side should handle token removal
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// Get admin dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      activeUsers: await User.countDocuments({ active: true }),
      newUsersToday: await User.countDocuments({
        createdAt: { 
          $gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      })
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// User Management Controllers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      data: users 
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error fetching users. Please try again.' 
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching user details'
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, fullName, password, role = 'user', active = true } = req.body;

    if (!email || !fullName || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email, full name, and password'
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    const user = await User.create({
      email: email.toLowerCase(),
      fullName,
      password,
      role,
      active
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      data: userData
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      error: 'Error creating user'
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { fullName, email, role, active, password } = req.body;
    const updateData = {};

    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email.toLowerCase();
    if (role) updateData.role = role;
    if (active !== undefined) updateData.active = active;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating user'
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prevent deleting the last admin
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete the last admin user'
        });
      }
    }

    await user.remove();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting user'
    });
  }
};

// Content Management Controllers
exports.getAllContent = async (req, res) => {
  try {
    const content = await Content.find();
    res.status(200).json({ success: true, count: content.length, data: content });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createContent = async (req, res) => {
  try {
    const content = await Content.create(req.body);
    res.status(201).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Analytics Controllers
exports.getAnalyticsOverview = async (req, res) => {
  try {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Basic counts
    const [userCount, blogCount, jobCount, applicationCount] = await Promise.all([
      User.countDocuments(),
      BlogPost.countDocuments(),
      Job.countDocuments(),
      Job.aggregate([
        { $project: { applicationCount: { $size: "$applications" } } },
        { $group: { _id: null, total: { $sum: "$applicationCount" } } }
      ])
    ]);

    // Weekly stats
    const [
      lastWeekUsers,
      weeklyNewUsers,
      postViews,
      weeklyApplications
    ] = await Promise.all([
      User.countDocuments({ createdAt: { $lt: weekAgo } }),
      User.countDocuments({ createdAt: { $gte: weekAgo } }),
      BlogPost.aggregate([
        { $match: { createdAt: { $gte: weekAgo } } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } }
      ]),
      Job.aggregate([
        { $unwind: "$applications" },
        { $match: { "applications.createdAt": { $gte: weekAgo } } },
        { $count: "weekly" }
      ])
    ]);

    // Calculate growth and rates
    const userGrowth = lastWeekUsers > 0 
      ? ((weeklyNewUsers / lastWeekUsers) * 100).toFixed(1)
      : 0;

    const applicationRate = applicationCount[0]?.total > 0
      ? ((weeklyApplications[0]?.weekly || 0) / applicationCount[0].total * 100).toFixed(1)
      : 0;

    // Active jobs and pending applications
    const activeJobs = await Job.countDocuments({ status: 'active' });
    const pendingApplications = await Job.aggregate([
      { $unwind: "$applications" },
      { $match: { "applications.status": "pending" } },
      { $count: "pending" }
    ]);

    res.status(200).json({
      success: true,
      data: {
        userCount,
        totalPosts: blogCount,
        totalJobs: jobCount,
        activeJobs,
        applications: applicationCount[0]?.total || 0,
        pendingApplications: pendingApplications[0]?.pending || 0,
        weeklyStats: {
          userGrowth: parseFloat(userGrowth),
          postViews: postViews[0]?.totalViews || 0,
          applicationRate: parseFloat(applicationRate)
        }
      }
    });
  } catch (error) {
    console.error('Analytics overview error:', error);
    res.status(500).json({ success: false, error: 'Error fetching analytics data' });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    // Fetch last 10 activities, sorted by most recent
    const activities = await Activity.find()
      .sort({ timestamp: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      activities
    });
  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({ success: false, error: 'Error fetching recent activity' });
  }
};
