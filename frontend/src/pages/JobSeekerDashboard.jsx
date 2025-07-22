// src/pages/JobSeekerDashboard.jsx
import React, { useState, useEffect } from 'react';
import './JobSeekerDashboard.css';
import { useAuth } from '../context/AuthContext';

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    location: '',
    skills: ['React', 'JavaScript', 'CSS', 'Node.js'],
    experience: '5 years',
    education: 'B.S. Computer Science'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({ name: '', title: '', location: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data initialization
  useEffect(() => {
    // Simulating API call to fetch jobs
    const mockJobs = [
      {
        id: 1,
        title: 'Senior React Developer',
        company: 'Tech Innovations Inc.',
        location: 'Remote',
        salary: '$120,000 - $140,000',
        type: 'Full-time',
        posted: '2 days ago',
        description: 'We are looking for an experienced React developer to join our team building cutting-edge web applications.',
        skills: ['React', 'Redux', 'TypeScript', 'CSS']
      },
      {
        id: 2,
        title: 'UX/UI Designer',
        company: 'Creative Solutions',
        location: 'New York, NY',
        salary: '$90,000 - $110,000',
        type: 'Full-time',
        posted: '1 week ago',
        description: 'Join our design team to create beautiful and intuitive user interfaces for our enterprise products.',
        skills: ['Figma', 'UI Design', 'User Research', 'Prototyping']
      },
      {
        id: 3,
        title: 'Backend Engineer (Node.js)',
        company: 'Data Systems Ltd',
        location: 'Austin, TX',
        salary: '$130,000 - $150,000',
        type: 'Full-time',
        posted: '3 days ago',
        description: 'Help us build scalable backend systems for our data processing platform.',
        skills: ['Node.js', 'Express', 'MongoDB', 'AWS']
      },
      {
        id: 4,
        title: 'Frontend Developer',
        company: 'Digital Agency',
        location: 'Remote',
        salary: '$80,000 - $100,000',
        type: 'Contract',
        posted: '5 days ago',
        description: 'Contract position for frontend development of client websites and applications.',
        skills: ['HTML', 'CSS', 'JavaScript', 'React']
      },
      {
        id: 5,
        title: 'Full Stack Developer',
        company: 'StartUp Ventures',
        location: 'Seattle, WA',
        salary: '$110,000 - $130,000',
        type: 'Full-time',
        posted: '1 day ago',
        description: 'Early-stage startup looking for a full stack developer to help build our MVP.',
        skills: ['React', 'Node.js', 'PostgreSQL', 'AWS']
      }
    ];
    
    // Simulating API call to fetch applications
    const mockApplications = [
      {
        id: 1,
        jobId: 1,
        status: 'Submitted',
        date: '2023-10-20',
        company: 'Tech Innovations Inc.',
        position: 'Senior React Developer'
      },
      {
        id: 2,
        jobId: 2,
        status: 'Review',
        date: '2023-10-18',
        company: 'Creative Solutions',
        position: 'UX/UI Designer'
      },
      {
        id: 3,
        jobId: 3,
        status: 'Interview',
        date: '2023-10-15',
        company: 'Data Systems Ltd',
        position: 'Backend Engineer'
      },
      {
        id: 4,
        jobId: 4,
        status: 'Rejected',
        date: '2023-10-10',
        company: 'Digital Agency',
        position: 'Frontend Developer'
      }
    ];
    
    setJobs(mockJobs);
    setApplications(mockApplications);
  }, []);

  useEffect(() => {
    if (user && !profile.name && !profile.title && !profile.location) {
      setProfile(prev => ({
        ...prev,
        name: user.name || '',
        title: user.title || 'Frontend Developer',
        location: user.location || 'India'
      }));
    }
  }, [user]);

  // Edit Profile Handlers
  const handleEditClick = () => {
    setEditProfile({ name: profile.name, title: profile.title, location: profile.location });
    setIsEditing(true);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({ ...prev, [name]: value }));
  };
  const handleEditSave = () => {
    setProfile(prev => ({ ...prev, ...editProfile }));
    setIsEditing(false);
  };
  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || job.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const applyForJob = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      const newApplication = {
        id: applications.length + 1,
        jobId,
        status: 'Submitted',
        date: new Date().toISOString().split('T')[0],
        company: job.company,
        position: job.title
      };
      
      setApplications([newApplication, ...applications]);
      
      // Show success notification
      document.querySelector('.notification').style.display = 'block';
      setTimeout(() => {
        document.querySelector('.notification').style.display = 'none';
      }, 3000);
    }
  };

  return (
    <div className="jobseeker-dashboard">
      {/* 3D Animated Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Job Seeker Dashboard</h1>
          <p>Find your dream job and manage your applications</p>
        </div>
        <div className="header-shapes">
          <div className="shape cube"></div>
          <div className="shape pyramid"></div>
          <div className="shape sphere"></div>
        </div>
      </div>

      {/* Notification */}
      <div className="notification">
        Application submitted successfully!
      </div>

      {/* Dashboard Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <i className="fas fa-home"></i> Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          <i className="fas fa-briefcase"></i> Find Jobs
        </button>
        <button 
          className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          <i className="fas fa-file-alt"></i> Applications
        </button>
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="fas fa-user"></i> My Profile
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-overview">
            <div className="welcome-card">
              <div className="profile-summary">
                <div className="avatar">
                  <div className="avatar-initials">AJ</div>
                </div>
                <div className="profile-info">
                  <h2>Welcome back, {profile.name}!</h2>
                  <p>{profile.title} | {profile.location}</p>
                  <div className="profile-stats">
                    <div className="stat">
                      <strong>{applications.length}</strong>
                      <span>Applications</span>
                    </div>
                    <div className="stat">
                      <strong>3</strong>
                      <span>Interviews</span>
                    </div>
                    <div className="stat">
                      <strong>87%</strong>
                      <span>Profile Strength</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="action-buttons">
                <button className="action-btn primary">
                  <i className="fas fa-search"></i> Find Jobs
                </button>
                <button className="action-btn secondary">
                  <i className="fas fa-edit"></i> Update Profile
                </button>
              </div>
            </div>

            <div className="stats-section">
              <div className="recommended-jobs">
                <h3>Recommended For You</h3>
                <div className="jobs-grid">
                  {jobs.slice(0, 2).map(job => (
                    <div className="job-card" key={job.id}>
                      <div className="job-card-header">
                        <h4>{job.title}</h4>
                        <span className="company">{job.company}</span>
                      </div>
                      <div className="job-details">
                        <div className="detail">
                          <i className="fas fa-map-marker-alt"></i>
                          <span>{job.location}</span>
                        </div>
                        <div className="detail">
                          <i className="fas fa-money-bill-wave"></i>
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      <button 
                        className="apply-btn"
                        onClick={() => applyForJob(job.id)}
                      >
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="application-status">
                <h3>Application Status</h3>
                <div className="status-chart">
                  <div className="status-item">
                    <div className="status-label">Submitted</div>
                    <div className="status-bar">
                      <div className="bar-fill" style={{ width: '40%' }}></div>
                    </div>
                    <div className="status-count">5</div>
                  </div>
                  <div className="status-item">
                    <div className="status-label">Review</div>
                    <div className="status-bar">
                      <div className="bar-fill" style={{ width: '25%' }}></div>
                    </div>
                    <div className="status-count">3</div>
                  </div>
                  <div className="status-item">
                    <div className="status-label">Interview</div>
                    <div className="status-bar">
                      <div className="bar-fill" style={{ width: '15%' }}></div>
                    </div>
                    <div className="status-count">2</div>
                  </div>
                  <div className="status-item">
                    <div className="status-label">Rejected</div>
                    <div className="status-bar">
                      <div className="bar-fill" style={{ width: '20%' }}></div>
                    </div>
                    <div className="status-count">1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="jobs-container">
            <div className="jobs-header">
              <h2>Find Your Next Opportunity</h2>
              <div className="search-filter">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input 
                    type="text" 
                    placeholder="Search jobs, companies, keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>
            
            <div className="jobs-grid">
              {filteredJobs.map(job => (
                <div className="job-card" key={job.id}>
                  <div className="job-card-header">
                    <div className="company-logo">
                      <div className="logo-placeholder">{job.company.charAt(0)}</div>
                    </div>
                    <div className="job-info">
                      <h3>{job.title}</h3>
                      <span className="company">{job.company}</span>
                    </div>
                  </div>
                  <div className="job-details">
                    <div className="detail">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{job.location}</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-money-bill-wave"></i>
                      <span>{job.salary}</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-clock"></i>
                      <span>{job.type}</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-calendar"></i>
                      <span>{job.posted}</span>
                    </div>
                  </div>
                  <p className="job-description">{job.description}</p>
                  <div className="job-skills">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <button 
                    className="apply-btn"
                    onClick={() => applyForJob(job.id)}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-container">
            <div className="applications-header">
              <h2>Your Applications</h2>
              <div className="stats-summary">
                <div className="stat">
                  <span className="count">{applications.length}</span>
                  <span className="label">Total Applications</span>
                </div>
                <div className="stat">
                  <span className="count">3</span>
                  <span className="label">Active Applications</span>
                </div>
              </div>
            </div>
            
            <div className="applications-list">
              {applications.map(app => (
                <div className="application-card" key={app.id}>
                  <div className="app-header">
                    <div className="app-info">
                      <h3>{app.position}</h3>
                      <span className="company">{app.company}</span>
                    </div>
                    <span className={`status-badge ${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="app-details">
                    <div className="detail">
                      <i className="fas fa-calendar"></i>
                      <span>Applied: {app.date}</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-file-alt"></i>
                      <span>Application ID: #{app.id}</span>
                    </div>
                  </div>
                  <div className="app-actions">
                    <button className="action-btn view">
                      <i className="fas fa-eye"></i> View Details
                    </button>
                    <button className="action-btn message">
                      <i className="fas fa-comment"></i> Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-container">
            <div className="profile-header">
              <h2>My Profile</h2>
              {isEditing ? (
                <>
                  <button className="edit-btn" onClick={handleEditSave} style={{marginRight: 8}}>Save</button>
                  <button className="edit-btn secondary" onClick={handleEditCancel}>Cancel</button>
                </>
              ) : (
                <button className="edit-btn" onClick={handleEditClick}>
                  <i className="fas fa-edit"></i> Edit Profile
                </button>
              )}
            </div>
            
            <div className="profile-content">
              <div className="profile-card">
                <div className="profile-top">
                  <div className="avatar">
                    <div className="avatar-initials">{profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}</div>
                  </div>
                  <div className="profile-info">
                    {isEditing ? (
                      <>
                        <input name="name" value={editProfile.name} onChange={handleEditChange} placeholder="Full Name" />
                        <input name="title" value={editProfile.title} onChange={handleEditChange} placeholder="Title" />
                        <input name="location" value={editProfile.location} onChange={handleEditChange} placeholder="Location" />
                      </>
                    ) : (
                      <>
                        <h3>{profile.name}</h3>
                        <p>{profile.title}</p>
                        <div className="location">
                          <i className="fas fa-map-marker-alt"></i>
                          <span>{profile.location}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="profile-section">
                  <h4>About Me</h4>
                  <p>
                    Passionate frontend developer with 5 years of experience building responsive 
                    and accessible web applications. Specialized in React ecosystem and modern 
                    JavaScript frameworks.
                  </p>
                </div>
                
                <div className="profile-section">
                  <h4>Skills</h4>
                  <div className="skills-list">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="profile-section">
                  <h4>Experience</h4>
                  <p>{profile.experience} of professional experience</p>
                  <div className="experience-item">
                    <div className="exp-header">
                      <h5>Senior Frontend Developer</h5>
                      <span className="exp-date">2020 - Present</span>
                    </div>
                    <span className="exp-company">TechCorp Inc.</span>
                    <p className="exp-desc">
                      Lead frontend development for multiple products, mentored junior developers, 
                      and implemented modern React best practices.
                    </p>
                  </div>
                </div>
                
                <div className="profile-section">
                  <h4>Education</h4>
                  <p>{profile.education}</p>
                  <div className="education-item">
                    <h5>Stanford University</h5>
                    <span className="edu-date">2014 - 2018</span>
                  </div>
                </div>
              </div>
              
              <div className="profile-stats">
                <div className="stat-card">
                  <h4>Profile Strength</h4>
                  <div className="progress-ring">
                    <div className="ring" style={{ '--progress': '87' }}></div>
                    <div className="progress-value">87%</div>
                  </div>
                  <p>Complete your profile for better job matches</p>
                </div>
                
                <div className="stat-card">
                  <h4>Application Success Rate</h4>
                  <div className="progress-ring">
                    <div className="ring" style={{ '--progress': '65', '--color': '#7c3aed' }}></div>
                    <div className="progress-value">65%</div>
                  </div>
                  <p>Higher than average for your industry</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;