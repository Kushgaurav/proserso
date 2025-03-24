const BlogPost = require('../models/BlogPost');
const multer = require('multer');
const path = require('path');
const { trackActivity, generateActivityContent } = require('../utils/activityTracker');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/blog');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
}).single('image');

// Create a new blog post
exports.createPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Error uploading file' });
    }

    try {
      const { title, summary, content, tags, featured, draft } = req.body;
      
      const post = new BlogPost({
        title: title.trim(),
        summary: summary.trim(),
        content,
        image: req.file ? `/uploads/blog/${req.file.filename}` : undefined,
        tags: tags ? JSON.parse(tags) : [],
        featured: featured === 'true',
        draft: draft === 'true',
        author: req.user.id
      });

      await post.save();
      
      const populatedPost = await BlogPost.findById(post._id)
        .populate('author', 'fullName email');

      // Track activity
      const activity = generateActivityContent('create', 'blog', post);
      await trackActivity({
        ...activity,
        type: 'success',
        category: 'blog',
        performedBy: req.user._id,
        relatedTo: post._id
      });

      res.status(201).json(populatedPost);
    } catch (error) {
      console.error('Blog post creation error:', error);
      res.status(500).json({ error: error.message || 'Error creating blog post' });
    }
  });
};

// Get all blog posts
exports.getPosts = async (req, res) => {
  try {
    const { featured, tag, limit = 10, page = 1, includeDrafts } = req.query;
    const query = {};

    if (featured === 'true') {
      query.featured = true;
    }
    if (tag) {
      query.tags = tag;
    }
    
    // Only include draft posts if explicitly requested and user is authenticated
    if (includeDrafts !== 'true' || !req.user) {
      query.draft = { $ne: true };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .populate('author', 'fullName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      BlogPost.countDocuments(query)
    ]);

    res.json({
      posts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalPosts: total
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ error: 'Error fetching blog posts' });
  }
};

// Get a single blog post
exports.getPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'fullName')
      .populate('comments.author', 'fullName email');
    
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if post is a draft and user is not authenticated
    if (post.draft && (!req.user || (post.author._id.toString() !== req.user.id && req.user.role !== 'admin'))) {
      return res.status(403).json({ error: 'Access denied. This post is a draft.' });
    }

    res.json(post);
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Error fetching blog post' });
  }
};

// Update a blog post
exports.updatePost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Error uploading file' });
    }

    try {
      const { title, summary, content, tags, featured, draft } = req.body;
      const postId = req.params.id;

      let post = await BlogPost.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      // Check if user is author or admin
      if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized to update this post' });
      }

      const updateData = {
        title: title.trim(),
        summary: summary.trim(),
        content,
        tags: tags ? JSON.parse(tags) : post.tags,
        featured: featured === 'true',
        draft: draft === 'true'
      };

      if (req.file) {
        updateData.image = `/uploads/blog/${req.file.filename}`;
      }

      post = await BlogPost.findByIdAndUpdate(
        postId,
        updateData,
        { new: true, runValidators: true }
      ).populate('author', 'fullName');

      // Track activity
      const activityType = req.body.published ? 'publish' : 'update';
      const activity = generateActivityContent(activityType, 'blog', post);
      await trackActivity({
        ...activity,
        type: 'info',
        category: 'blog',
        performedBy: req.user._id,
        relatedTo: post._id
      });

      res.json(post);
    } catch (error) {
      console.error('Update blog post error:', error);
      res.status(500).json({ error: error.message || 'Error updating blog post' });
    }
  });
};

// Delete a blog post
exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    // Track activity before deletion
    const activity = generateActivityContent('delete', 'blog', post);
    await trackActivity({
      ...activity,
      type: 'warning',
      category: 'blog',
      performedBy: req.user._id,
      relatedTo: post._id
    });

    await post.remove();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({ error: 'Error deleting blog post' });
  }
};

// Get blog post tags
exports.getTags = async (req, res) => {
  try {
    const tags = await BlogPost.distinct('tags');
    res.json(tags);
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ error: 'Error fetching tags' });
  }
};

// Add a comment to a blog post
exports.addComment = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const comment = {
      content: req.body.content,
      author: req.user.id
    };

    post.comments.unshift(comment);
    await post.save();

    // Populate the author details of the new comment
    const populatedPost = await BlogPost.findById(post._id)
      .populate('comments.author', 'fullName email');

    // Return only the new comment
    const newComment = populatedPost.comments[0];
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Error adding comment' });
  }
};

// Get comments for a blog post
exports.getComments = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .select('comments')
      .populate('comments.author', 'fullName email');

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(post.comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

// Toggle featured status of a blog post
exports.toggleFeatured = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Toggle the featured status
    post.featured = !post.featured;
    await post.save();

    res.json({ 
      message: `Blog post ${post.featured ? 'marked as featured' : 'removed from featured'}`,
      featured: post.featured 
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({ error: 'Error updating featured status' });
  }
};