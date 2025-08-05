// src/pages/EmployerDashboard.jsx
import React, { useState, useEffect } from 'react';
import './EmployerDashboard.css';
import { useAuth } from '../context/AuthContext';
import CompanyProfile from '../components/employer/CompanyProfile';
import DeveloperCard from '../components/employer/DeveloperCard';
import JobRequestForm from '../components/employer/JobRequestForm';
import JobCard from '../components/employer/JobCard';
import ApplicantRow from '../components/employer/ApplicantRow';
import DashboardOverview from '../components/employer/DashboardOverview';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
        salary: '$120,000 - $140,000',
        description: 'Looking for an experienced frontend developer to lead our team.',
        type: 'Full-time',
        location: 'Remote'
      },
      {
        id: 2,
        title: 'Backend Engineer',
        posted: '2023-11-01',
        applications: 18,
        status: 'Active',
        salary: '$110,000 - $130,000',
        description: 'Node.js developer needed for API development.',
        type: 'Full-time',
        location: 'New York, NY'
      },
    ];
    
    // Simulating API call to fetch applications
    const mockApplications = [
      {
        id: 1,
        name: 'Sarah Johnson',
        position: 'Senior Frontend Developer',
        status: 'New',
        date: '2023-10-20',
        experience: '5 years',
        skills: ['React', 'JavaScript', 'TypeScript'],
        bio: 'Experienced frontend developer with 5+ years in building responsive web applications',
        email: 'sarah@example.com',
        phone: '(123) 456-7890',
        portfolio: 'sarahdev.com'
      },
      {
        id: 2,
        name: 'Michael Chen',
        position: 'Backend Engineer',
        status: 'Reviewed',
        date: '2023-11-05',
        experience: '4 years',
        skills: ['Node.js', 'Express', 'MongoDB'],
        bio: 'Backend specialist with experience in building scalable APIs',
        email: 'michael@example.com',
        phone: '(234) 567-8901',
        portfolio: 'michaelchen.dev'
      },
    ];
    
    setJobs(mockJobs);
    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = applications.filter(app => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredApplications(filtered);
    } else {
      setFilteredApplications(applications);
    }
  }, [searchTerm, applications]);

  const handleViewDeveloper = (developer) => {
    setSelectedDeveloper(developer);
  };

  const handleJobPosted = (newJob) => {
    setJobs([newJob, ...jobs]);
    setActiveTab('jobs');
  };

  const handleStatusChange = (applicationId, newStatus) => {
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
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
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('profile');
            setShowCompanyProfile(true);
          }}
        >
          <i className="fas fa-building"></i> Company Profile
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {activeTab === 'dashboard' && (
          <DashboardOverview 
            jobs={jobs} 
            applications={applications} 
            onViewJobs={() => setActiveTab('jobs')}
            onViewApplicants={() => setActiveTab('applicants')}
          />
        )}

        {activeTab === 'jobs' && (
          <div className="jobs-container">
            <JobRequestForm onJobPosted={handleJobPosted} />
            <div className="jobs-header">
              <h2>Your Job Postings</h2>
              <p>{jobs.length} active job{jobs.length !== 1 ? 's' : ''}</p>
            </div>
            
            <div className="jobs-grid">
              {jobs.length > 0 ? (
                jobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onEdit={() => console.log('Edit job', job.id)}
                    onDelete={() => setJobs(jobs.filter(j => j.id !== job.id))}
                  />
                ))
              ) : (
                <div className="no-jobs">
                  <p>You haven't posted any jobs yet.</p>
                  <button 
                    className="btn-primary"
                    onClick={() => document.querySelector('.job-request-form').scrollIntoView()}
                  >
                    Post Your First Job
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'applicants' && (
          <div className="applicants-container">
            <div className="applicants-header">
              <h2>Recent Applications</h2>
              <div className="applicants-controls">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input 
                    type="text" 
                    placeholder="Search applicants..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select className="status-filter">
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Interview">Interview</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
            
            <div className="applicants-table">
              <div className="table-header">
                <div className="header-cell">Candidate</div>
                <div className="header-cell">Applied For</div>
                <div className="header-cell">Date</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Actions</div>
              </div>
              <div className="table-body">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map(app => (
                    <ApplicantRow 
                      key={app.id} 
                      applicant={app} 
                      onClick={() => handleViewDeveloper(app)}
                      onStatusChange={(newStatus) => handleStatusChange(app.id, newStatus)}
                    />
                  ))
                ) : (
                  <div className="no-applicants">
                    <p>No applicants found{searchTerm ? ` matching "${searchTerm}"` : ''}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Developer Card Modal */}
            {selectedDeveloper && (
              <div className="developer-modal">
                <div className="modal-content">
                  <button 
                    className="close-modal" 
                    onClick={() => setSelectedDeveloper(null)}
                  >
                    &times;
                  </button>
                  <DeveloperCard 
                    developer={selectedDeveloper} 
                    onClose={() => setSelectedDeveloper(null)}
                    onContact={() => console.log('Contact', selectedDeveloper.email)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && showCompanyProfile && (
          <div className="profile-container">
            <CompanyProfile 
              company={{
                name: user?.company || "Your Company",
                description: user?.companyDescription || "Tech company specializing in web development",
                location: user?.location || "San Francisco, CA",
                website: user?.website || "www.yourcompany.com",
                logo: user?.logo || "/default-company-logo.png",
                size: user?.companySize || "11-50 employees",
                founded: user?.founded || "2015"
              }} 
              onUpdate={(updatedProfile) => {
                // In a real app, you would update the user context and/or make an API call
                console.log("Profile updated:", updatedProfile);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;