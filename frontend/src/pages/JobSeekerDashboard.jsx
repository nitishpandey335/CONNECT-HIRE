// src/pages/JobSeekerDashboard.jsx

import React, { useState, useEffect } from 'react';
import './JobSeekerDashboard.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Applications from '../components/jobseeker/Applications';
import JobCard from '../components/jobseeker/JobCard';
import ProfileForm from '../components/jobseeker/ProfileForm';

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
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

  // Navigation helper
  const handleNavigation = (tab, path) => {
    setActiveTab(tab.toLowerCase());
    navigate(path);
  };

  useEffect(() => {
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
      }
    ];
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

  const handleEditClick = () => {
    setEditProfile({
      name: profile.name,
      title: profile.title,
      location: profile.location
    });
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

  return (
    <div className="jobseeker-dashboard">
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

      <div className="dashboard-tabs">
        <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <i className="fas fa-home"></i> Dashboard
        </button>
        <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
          <i className="fas fa-user"></i> My Profile
        </button>
        <button className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
          <i className="fas fa-briefcase"></i> Applications
        </button>
        <button className={`tab-btn ${activeTab === 'jobcard' ? 'active' : ''}`} onClick={() => setActiveTab('jobcard')}>
          <i className="fas fa-cog"></i> Jobcard
        </button>
        <button className={`tab-btn ${activeTab === 'profileform' ? 'active' : ''}`} onClick={() => setActiveTab('profileform')}>
          <i className="fas fa-user"></i> ProfileForm
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-overview">
            <div className="welcome-card">
              <div className="profile-summary">
                <div className="avatar">
                  <div className="avatar-initials">{profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}</div>
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
                <button className="action-btn secondary" onClick={() => setActiveTab('profile')}>
                  <i className="fas fa-edit"></i> Update Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <Applications />
        )}

        {activeTab === 'jobcard' && (
          <JobCard />
        )}

        {activeTab === 'profileform' && (
          <ProfileForm />
        )}

        {activeTab === 'profile' && (
          <div className="profile-container">
            <div className="profile-header">
              <h2>My Profile</h2>
              {isEditing ? (
                <>
                  <button className="edit-btn" onClick={handleEditSave} style={{ marginRight: 8 }}>Save</button>
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
                    {isEditing ? (
                      <textarea placeholder="Tell us about yourself..." value={profile.about || ''} onChange={(e) => setProfile(prev => ({ ...prev, about: e.target.value }))} />
                    ) : (
                      profile.about || 'A passionate frontend developer with a knack for creating beautiful and functional user interfaces.'
                    )}
                  </p>
                </div>    

              


               <div className="profile-section">  
              <h4>Contact Information</h4>
              {isEditing ? (
                <>
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={editProfile.email || user.email || ''}
                onChange={handleEditChange}/>
                <input
                type="text" name="phone" placeholder="Phone Number" value={editProfile.phone || ''}onChange={handleEditChange} />
                <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={editProfile.linkedin || ''} onChange={handleEditChange} />
                <input type="text" name="github" placeholder="GitHub Profile" value={editProfile.github || ''} onChange={handleEditChange} /> 
                </>) : (
                <>
                <p>Email: {user?.email || 'Not provided'}</p>
                <p>Phone: {profile.phone || 'Not provided'}</p>
                <p>LinkedIn: {profile.linkedin || 'Not provided'}</p>
                <p>GitHub: {profile.github || 'Not provided'}</p>
                </>
              )}
              </div>


              


                <div className="profile-section">
  <h4>Skills</h4>
  <div className="skills-list">
    {isEditing ? (
      <>
        {editProfile.skills?.map((skill, index) => (
          <div key={index} className="skill-edit-item">
            <input
              type="text"
              value={skill}
              onChange={(e) => {
                const updatedSkills = [...editProfile.skills];
                updatedSkills[index] = e.target.value;
                setEditProfile(prev => ({ ...prev, skills: updatedSkills }));
              }}
            />
            <button
              className="remove-skill-btn"
              onClick={() => {
                const updatedSkills = editProfile.skills.filter((_, i) => i !== index);
                setEditProfile(prev => ({ ...prev, skills: updatedSkills }));
              }}
            >
              ❌
            </button>
          </div>
        ))}
        <button
          className="add-skill-btn"
          onClick={() => setEditProfile(prev => ({
            ...prev,
            skills: [...(prev.skills || []), '']
          }))}
        >
          ➕ Add Skill
        </button>
      </>
    ) : (
      profile.skills.map((skill, index) => (
        <span key={index} className="skill-tag">{skill}</span>
      ))
    )}
  </div>
</div>


                <div className="profile-section">
  <h4>Experience</h4>

  {isEditing ? (
    <>
      <input
        type="text"
        name="experience"
        placeholder="Total Experience (e.g., 5 years)"
        value={editProfile.experience || ''}
        onChange={handleEditChange}
      />
      <input
        type="text"
        name="jobTitle"
        placeholder="Job Title"
        value={editProfile.jobTitle || ''}
        onChange={handleEditChange}
      />
      <input
        type="text"
        name="company"
        placeholder="Company Name"
        value={editProfile.company || ''}
        onChange={handleEditChange}
      />
      <input
        type="text"
        name="expDuration"
        placeholder="Duration (e.g., 2020 - Present)"
        value={editProfile.expDuration || ''}
        onChange={handleEditChange}
      />
      <textarea
        name="expDesc"
        placeholder="Describe your role and responsibilities"
        value={editProfile.expDesc || ''}
        onChange={handleEditChange}
      />
    </>
  ) : (
    <>
      <p>{profile.experience} of professional experience</p>
      <div className="experience-item">
        <div className="exp-header">
          <h5>{profile.jobTitle || 'Senior Frontend Developer'}</h5>
          <span className="exp-date">{profile.expDuration || '2020 - Present'}</span>
        </div>
        <span className="exp-company">{profile.company || 'TechCorp Inc.'}</span>
        <p className="exp-desc">
          {profile.expDesc ||
            `Lead frontend development for multiple products, mentored junior developers, and implemented modern React best practices.`}
        </p>
      </div>
    </>
  )}
</div>


               <div className="profile-section">
  <h4>Education</h4>

  {isEditing ? (
    <>
      <input
        type="text"
        name="education"
        placeholder="Degree (e.g., B.S. in Computer Science)"
        value={editProfile.education || ''}
        onChange={handleEditChange}
      />
      <input
        type="text"
        name="university"
        placeholder="University Name"
        value={editProfile.university || ''}
        onChange={handleEditChange}
      />
      <input
        type="text"
        name="eduDate"
        placeholder="Duration (e.g., 2014 - 2018)"
        value={editProfile.eduDate || ''}
        onChange={handleEditChange}
      />
    </>
  ) : (
    <>
      <p>{profile.education}</p>
      <div className="education-item">
        <h5>{profile.university || 'Stanford University'}</h5>
        <span className="edu-date">{profile.eduDate || '2014 - 2018'}</span>
      </div>
    </>
  )}
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
