// src/components/ProfileForm.jsx
import React, { useState } from 'react';
import './ProfileForm.css';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: 'Nitish Pandey',
    title: 'Senior UX Designer',
    location: 'San Francisco, CA',
    email: 'xyz@gmail.com',
    phone: '+91 12345 67890',
    bio: 'Experienced UX designer with 8+ years in creating user-centered digital experiences. Passionate about solving complex problems through intuitive design.',
    skills: 'UI/UX Design, User Research, Prototyping, Figma, Adobe Creative Suite'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-form-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-container">
            <div className="avatar">
              <div className="initials">AJ</div>
            </div>
            <div className="online-status"></div>
          </div>
          <h2>Edit Your Profile</h2>
          <p>Update your information to help employers find you</p>
        </div>
        
        <form className="profile-form">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Professional Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group half">
              <label>Phone</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Professional Bio</label>
            <textarea 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange}
              className="form-textarea"
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input 
              type="text" 
              name="skills" 
              value={formData.skills} 
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-actions">
            <button className="btn-cancel">Cancel</button>
            <button className="btn-save">Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;