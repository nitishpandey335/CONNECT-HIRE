import Job from '../models/Job';

// @desc    Create new job
// @route   POST /api/jobs
// @access  Employer
export const createJob = async (req, res) => {
  const { title, description, compensation, duration, jobType, location } = req.body;
  
  const job = await Job.create({
    title,
    description,
    employer: req.user.employerProfile,
    compensation,
    duration,
    jobType,
    location
  });

  res.status(201).json(job);
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  const { jobType, location, skills } = req.query;
  const filter = {};
  
  if(jobType) filter.jobType = jobType;
  if(location) filter.location = new RegExp(location, 'i');
  
  const jobs = await Job.find(filter)
    .populate('employer', 'companyName logo')
    .sort('-createdAt');
  
  res.json(jobs);
};