// src/pages/EmployerDashboard.jsx
import React, { useState, useEffect } from 'react';
import './EmployerDashboard.css';
import { useAuth } from '../context/AuthContext';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    type: 'Full-time',
    salary: '',
    location: '',
    remote: false
  });

  // Mock data initialization
  useEffect(() => {
    // Simulating API call to fetch jobs
    const mockJobs = [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        posted: '2023-10-15',
        applications: 24,
        status: 'Active',
        salary: '$120,000 - $140,000'
      },
      {
        id: 2,
        title: 'UX/UI Designer',
        posted: '2023-10-10',
        applications: 18,
        status: 'Active',
        salary: '$90,000 - $110,000'
      },
      {
        id: 3,
        title: 'Backend Engineer (Node.js)',
        posted: '2023-09-28',
        applications: 32,
        status: 'Closed',
        salary: '$130,000 - $150,000'
      }
    ];
    
    // Simulating API call to fetch applications
    const mockApplications = [
      {
        id: 1,
        name: 'Sarah Johnson',
        position: 'Senior Frontend Developer',
        status: 'New',
        date: '2023-10-20',
        experience: '5 years'
      },
      {
        id: 2,
        name: 'Michael Chen',
        position: 'Senior Frontend Developer',
        status: 'Reviewed',
        date: '2023-10-18',
        experience: '7 years'
      },
      {
        id: 3,
        name: 'Emma Rodriguez',
        position: 'UX/UI Designer',
        status: 'Interview',
        date: '2023-10-17',
        experience: '4 years'
      },
      {
        id: 4,
        name: 'David Kim',
        position: 'Backend Engineer',
        status: 'Rejected',
        date: '2023-10-10',
        experience: '6 years'
      }
    ];
    
    setJobs(mockJobs);
    setApplications(mockApplications);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewJob(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call
    const jobToAdd = {
      id: jobs.length + 1,
      title: newJob.title,
      posted: new Date().toISOString().split('T')[0],
      applications: 0,
      status: 'Active',
      salary: newJob.salary
    };
    
    setJobs([jobToAdd, ...jobs]);
    setNewJob({
      title: '',
      description: '',
      type: 'Full-time',
      salary: '',
      location: '',
      remote: false
    });
    
    // Show success notification
    document.querySelector('.notification').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.notification').style.display = 'none';
    }, 3000);
  };

  return (
    <div className="employer-dashboard">
      {/* 3D Animated Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Employer Dashboard</h1>
          <p>Welcome{user && user.name ? `, ${user.name}` : ''}! Manage your job postings and applicants in one place</p>
        </div>
        <div className="header-shapes">
          <div className="shape cube"></div>
          <div className="shape pyramid"></div>
          <div className="shape sphere"></div>
        </div>
      </div>

      {/* Notification */}
      <div className="notification">
        Job posted successfully!
      </div>

      {/* Dashboard Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <i className="fas fa-chart-line"></i> Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          <i className="fas fa-briefcase"></i> Job Postings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'applicants' ? 'active' : ''}`}
          onClick={() => setActiveTab('applicants')}
        >
          <i className="fas fa-users"></i> Applicants
        </button>
        <button 
          className={`tab-btn ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => setActiveTab('post')}
        >
          <i className="fas fa-plus"></i> Post New Job
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-overview">
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Active Jobs</h3>
                <div className="stat-value">12</div>
                <div className="stat-trend up">+2 from last month</div>
              </div>
              <div className="stat-card">
                <h3>New Applications</h3>
                <div className="stat-value">24</div>
                <div className="stat-trend up">+8 from last week</div>
              </div>
              <div className="stat-card">
                <h3>Interview Scheduled</h3>
                <div className="stat-value">7</div>
                <div className="stat-trend down">-2 from last week</div>
              </div>
              <div className="stat-card">
                <h3>Hired This Month</h3>
                <div className="stat-value">3</div>
                <div className="stat-trend up">+1 from last month</div>
              </div>
            </div>

            <div className="charts-container">
              <div className="chart">
                <h3>Applications by Position</h3>
                <div className="chart-visual">
                  <div className="chart-bar" style={{ '--height': '70%', '--color': '#4f46e5' }}>Frontend</div>
                  <div className="chart-bar" style={{ '--height': '50%', '--color': '#7c3aed' }}>Backend</div>
                  <div className="chart-bar" style={{ '--height': '40%', '--color': '#ec4899' }}>UX/UI</div>
                  <div className="chart-bar" style={{ '--height': '30%', '--color': '#10b981' }}>DevOps</div>
                </div>
              </div>
              <div className="chart">
                <h3>Hiring Progress</h3>
                <div className="progress-ring">
                  <div className="ring" style={{ '--progress': '65' }}></div>
                  <div className="progress-value">65%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="jobs-container">
            <div className="jobs-header">
              <h2>Your Job Postings</h2>
              <button className="add-job-btn" onClick={() => setActiveTab('post')}>
                <i className="fas fa-plus"></i> Add New Job
              </button>
            </div>
            
            <div className="jobs-grid">
              {jobs.map(job => (
                <div className="job-card" key={job.id}>
                  <div className="job-card-header">
                    <h3>{job.title}</h3>
                    <span className={`status-badge ${job.status.toLowerCase()}`}>{job.status}</span>
                  </div>
                  <div className="job-details">
                    <div className="detail">
                      <i className="fas fa-calendar"></i>
                      <span>Posted: {job.posted}</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-users"></i>
                      <span>Applications: {job.applications}</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-money-bill-wave"></i>
                      <span>Salary: {job.salary}</span>
                    </div>
                  </div>
                  <div className="job-actions">
                    <button className="action-btn view">View Applicants</button>
                    <button className="action-btn edit">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applicants' && (
          <div className="applicants-container">
            <div className="applicants-header">
              <h2>Recent Applications</h2>
              <div className="filter-controls">
                <select>
                  <option>All Positions</option>
                  <option>Frontend Developer</option>
                  <option>UX/UI Designer</option>
                  <option>Backend Engineer</option>
                </select>
                <select>
                  <option>All Statuses</option>
                  <option>New</option>
                  <option>Reviewed</option>
                  <option>Interview</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
            
            <div className="applicants-table">
              <div className="table-header">
                <div>Candidate</div>
                <div>Position</div>
                <div>Status</div>
                <div>Applied</div>
                <div>Experience</div>
                <div>Actions</div>
              </div>
              <div className="table-body">
                {applications.map(app => (
                  <div className="table-row" key={app.id}>
                    <div className="candidate-info">
                      <div className="avatar"></div>
                      <span>{app.name}</span>
                    </div>
                    <div>{app.position}</div>
                    <div>
                      <span className={`status-tag ${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </div>
                    <div>{app.date}</div>
                    <div>{app.experience}</div>
                    <div className="actions">
                      <button className="icon-btn view"><i className="fas fa-eye"></i></button>
                      <button className="icon-btn message"><i className="fas fa-comment"></i></button>
                      <button className="icon-btn schedule"><i className="fas fa-calendar-check"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'post' && (
          <div className="post-job-container">
            <h2>Post a New Job</h2>
            <form onSubmit={handlePostJob}>
              <div className="form-group">
                <label>Job Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={newJob.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Frontend Developer"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Job Description</label>
                <textarea 
                  name="description"
                  value={newJob.description}
                  onChange={handleInputChange}
                  placeholder="Describe the position, responsibilities, and requirements..."
                  required
                  rows="5"
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Job Type</label>
                  <select 
                    name="type"
                    value={newJob.type}
                    onChange={handleInputChange}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                    <option>Internship</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Salary Range</label>
                  <input 
                    type="text" 
                    name="salary"
                    value={newJob.salary}
                    onChange={handleInputChange}
                    placeholder="e.g. $100,000 - $130,000"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    type="text" 
                    name="location"
                    value={newJob.location}
                    onChange={handleInputChange}
                    placeholder="e.g. New York, NY"
                  />
                </div>
                
                <div className="form-group checkbox-group">
                  <label>
                    <input 
                      type="checkbox" 
                      name="remote"
                      checked={newJob.remote}
                      onChange={handleInputChange}
                    />
                    Remote Position
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="post-job-btn">
                  Post Job
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;