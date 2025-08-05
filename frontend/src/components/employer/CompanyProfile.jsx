import React, { useState } from 'react';
import './CompanyProfile.css';

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Tech Innovations Inc.',
    tagline: 'Transforming Ideas into Reality',
    founded: '2010',
    employees: '250+',
    specialties: 'AI, Blockchain, Web3',
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="company-card">
      <div className="company-card-inner">
        {!isEditing ? (
          <div className="company-card-front">
            <h2>{profile.name}</h2>
            <p>{profile.tagline}</p>
            <div className="company-details">
              <p><strong>Founded:</strong> {profile.founded}</p>
              <p><strong>Employees:</strong> {profile.employees}</p>
              <p><strong>Specialties:</strong> {profile.specialties}</p>
            </div>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <i className="fas fa-edit"></i> Edit
            </button>
          </div>
        ) : (
          <div className="company-card-back">
            <h3>Edit Company Profile</h3>
            <input
              type="text"
              name="name"
              value={tempProfile.name}
              onChange={handleChange}
              placeholder="Company Name"
            />
            <input
              type="text"
              name="tagline"
              value={tempProfile.tagline}
              onChange={handleChange}
              placeholder="Tagline"
            />
            <input
              type="text"
              name="founded"
              value={tempProfile.founded}
              onChange={handleChange}
              placeholder="Founded Year"
            />
            <input
              type="text"
              name="employees"
              value={tempProfile.employees}
              onChange={handleChange}
              placeholder="Employees"
            />
            <input
              type="text"
              name="specialties"
              value={tempProfile.specialties}
              onChange={handleChange}
              placeholder="Specialties"
            />
            <div className="action-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
