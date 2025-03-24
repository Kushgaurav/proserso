const Job = require('../models/Job');
const multer = require('multer');
const path = require('path');
const { trackActivity, generateActivityContent } = require('../utils/activityTracker');

// Configure multer for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/resumes');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (extname) {
      return cb(null, true);
    } else {
      cb('Error: Only PDF and Word documents are allowed!');
    }
  }
}).single('resume');

// Create a new job posting
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      type,
      description,
      requirements,
      salary,
      applicationDeadline,
      published
    } = req.body;

    const job = new Job({
      title,
      department,
      location,
      type,
      description,
      requirements,
      salary,
      applicationDeadline,
      published: published !== 'false',
      createdBy: req.user.id
    });

    await job.save();
    
    const populatedJob = await Job.findById(job._id)
      .populate('createdBy', 'fullName email');

    // Track activity
    const activity = generateActivityContent('create', 'job', job);
    await trackActivity({
      ...activity,
      type: 'success',
      category: 'job',
      performedBy: req.user._id,
      relatedTo: job._id
    });

    res.status(201).json(populatedJob);
  } catch (error) {
    console.error('Job creation error:', error);
    res.status(500).json({ error: 'Error creating job posting' });
  }
};

// Get all job postings
exports.getJobs = async (req, res) => {
  try {
    const { department, type, published, limit = 10, page = 1 } = req.query;
    const query = {};

    if (department) query.department = department;
    if (type) query.type = type;
    if (published === 'true' || published === 'false') {
      query.published = published === 'true';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [jobs, total] = await Promise.all([
      Job.find(query)
        .populate('createdBy', 'fullName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Job.countDocuments(query)
    ]);

    res.json({
      jobs,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalJobs: total
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Error fetching job postings' });
  }
};

// Get a single job posting
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('createdBy', 'fullName')
      .populate('applications.applicant', 'fullName email');
    
    if (!job) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: 'Error fetching job posting' });
  }
};

// Update a job posting
exports.updateJob = async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      type,
      description,
      requirements,
      salary,
      applicationDeadline,
      published
    } = req.body;

    const jobId = req.params.id;
    let job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    // Check if user is creator or admin
    if (job.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this job posting' });
    }

    job = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        department,
        location,
        type,
        description,
        requirements,
        salary,
        applicationDeadline,
        published: published !== 'false'
      },
      { new: true, runValidators: true }
    ).populate('createdBy', 'fullName');

    // Track activity
    const activity = generateActivityContent('update', 'job', job);
    await trackActivity({
      ...activity,
      type: 'info',
      category: 'job',
      performedBy: req.user._id,
      relatedTo: job._id
    });

    res.json(job);
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ error: 'Error updating job posting' });
  }
};

// Delete a job posting
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    // Check if user is creator or admin
    if (job.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this job posting' });
    }

    await job.remove();
    res.json({ message: 'Job posting deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Error deleting job posting' });
  }
};

// Apply for a job
exports.applyForJob = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Error uploading resume' });
    }

    try {
      const { coverLetter } = req.body;
      const jobId = req.params.id;
      const job = await Job.findById(jobId);

      if (!job) {
        return res.status(404).json({ error: 'Job posting not found' });
      }

      if (!job.published) {
        return res.status(400).json({ error: 'This job posting is not accepting applications' });
      }

      // Check if user has already applied
      const existingApplication = job.applications.find(
        app => app.applicant.toString() === req.user.id
      );

      if (existingApplication) {
        return res.status(400).json({ error: 'You have already applied for this position' });
      }

      // Add the application
      job.applications.push({
        applicant: req.user.id,
        resume: req.file ? `/uploads/resumes/${req.file.filename}` : undefined,
        coverLetter,
        status: 'pending'
      });

      await job.save();

      const updatedJob = await Job.findById(jobId)
        .populate('applications.applicant', 'fullName email');

      // Track activity
      const activity = generateActivityContent('create', 'application', {
        jobTitle: job.title,
        ...req.body,
        status: 'pending',
        appliedAt: new Date()
      });
      await trackActivity({
        ...activity,
        type: 'info',
        category: 'application',
        performedBy: req.user._id,
        relatedTo: job._id
      });

      res.json({
        message: 'Application submitted successfully',
        job: updatedJob
      });
    } catch (error) {
      console.error('Job application error:', error);
      res.status(500).json({ error: 'Error submitting job application' });
    }
  });
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { jobId, applicationId } = req.params;
    const { status } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    // Check if user is creator or admin
    if (job.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update application status' });
    }

    const application = job.applications.id(applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = status;
    await job.save();

    // Track activity
    const activity = generateActivityContent('statusChange', 'application', {
      jobTitle: job.title,
      status: status
    });
    await trackActivity({
      ...activity,
      type: status === 'rejected' ? 'warning' : 'success',
      category: 'application',
      performedBy: req.user._id,
      relatedTo: job._id
    });

    res.json({ message: 'Application status updated successfully', job });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ error: 'Error updating application status' });
  }
};

// Get departments list
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Job.distinct('department');
    res.json(departments);
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ error: 'Error fetching departments' });
  }
};

// Get applications for a job
exports.getApplications = async (req, res) => {
  try {
    const jobId = req.params.id;
    
    const job = await Job.findById(jobId)
      .populate('applications.applicant', 'fullName email phone')
      .select('applications title');
    
    if (!job) {
      return res.status(404).json({ error: 'Job posting not found' });
    }
    
    // Check if user is creator or admin
    if (job.createdBy && job.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to view applications' });
    }
    
    res.json({
      jobTitle: job.title,
      applications: job.applications
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Error fetching applications' });
  }
};

// Get all applications across all jobs (for admin)
exports.getAllApplications = async (req, res) => {
  try {
    const { status, limit = 20, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build a pipeline to get applications along with job details
    const pipeline = [
      {
        $unwind: "$applications"
      },
      {
        $lookup: {
          from: "users",
          localField: "applications.applicant",
          foreignField: "_id",
          as: "applicantDetails"
        }
      },
      {
        $project: {
          jobId: "$_id",
          jobTitle: "$title",
          department: "$department",
          location: "$location",
          applicationId: "$applications._id",
          applicant: { $arrayElemAt: ["$applicantDetails", 0] },
          resume: "$applications.resume",
          coverLetter: "$applications.coverLetter",
          appliedAt: "$applications.createdAt",
          status: "$applications.status"
        }
      },
      {
        $project: {
          "applicant.password": 0
        }
      }
    ];
    
    // Add status filter if provided
    if (status) {
      pipeline.splice(1, 0, {
        $match: {
          "applications.status": status
        }
      });
    }
    
    // Add pagination
    const countPipeline = [...pipeline];
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: parseInt(limit) });
    
    const applications = await Job.aggregate(pipeline);
    const countResult = await Job.aggregate([...countPipeline, { $count: "total" }]);
    const total = countResult.length > 0 ? countResult[0].total : 0;
    
    res.json({
      applications,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalApplications: total
    });
  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({ error: 'Error fetching applications' });
  }
};