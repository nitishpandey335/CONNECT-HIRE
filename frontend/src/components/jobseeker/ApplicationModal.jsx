// src/components/jobseeker/ApplicationModal.jsx
import React, { useState } from 'react';
import './ApplicationModal.css';

const ApplicationModal = ({ job, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentCompany: '',
    linkedin: '',
    github: '',
    portfolio: '',
    coverLetter: '',
    resume: null,
    resumeName: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0],
      resumeName: e.target.files[0]?.name || ''
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    }

    if (step === 2 && !formData.resume) {
      newErrors.resume = 'Resume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  return (
    <div className="application-modal-overlay">
      <div className="application-modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <h2>Apply for {job.position}</h2>
          <p>{job.company} • {job.location}</p>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
          <div className="step-indicator">
            <span className={currentStep >= 1 ? 'active' : ''}>1. Personal Info</span>
            <span className={currentStep >= 2 ? 'active' : ''}>2. Resume</span>
            <span className={currentStep >= 3 ? 'active' : ''}>3. Review</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label>Full Name*</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Phone*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Current Company</label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>LinkedIn Profile</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="form-group">
                  <label>GitHub Profile</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Portfolio Website</label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-next" onClick={handleNext}>
                  Next <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label>Upload Resume*</label>
                <div className="file-upload">
                  <label className="file-upload-label">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <div className="file-upload-box">
                      {formData.resumeName ? (
                        <div className="file-selected">
                          <i className="fas fa-file-alt"></i>
                          <span>{formData.resumeName}</span>
                        </div>
                      ) : (
                        <>
                          <i className="fas fa-cloud-upload-alt"></i>
                          <p>Click to browse or drag and drop</p>
                          <p className="file-types">PDF, DOC, DOCX (Max 5MB)</p>
                        </>
                      )}
                    </div>
                  </label>
                  {errors.resume && <span className="error-message">{errors.resume}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Write a cover letter explaining why you're a good fit for this position..."
                  rows="6"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-back" onClick={handleBack}>
                  <i className="fas fa-arrow-left"></i> Back
                </button>
                <button type="button" className="btn-next" onClick={handleNext}>
                  Next <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step review-step">
              <h3>Review Your Application</h3>
              
              <div className="review-section">
                <h4>Personal Information</h4>
                <div className="review-item">
                  <span>Full Name:</span>
                  <span>{formData.fullName || 'Not provided'}</span>
                </div>
                <div className="review-item">
                  <span>Email:</span>
                  <span>{formData.email || 'Not provided'}</span>
                </div>
                <div className="review-item">
                  <span>Phone:</span>
                  <span>{formData.phone || 'Not provided'}</span>
                </div>
                <div className="review-item">
                  <span>Current Company:</span>
                  <span>{formData.currentCompany || 'Not provided'}</span>
                </div>
              </div>

              <div className="review-section">
                <h4>Links</h4>
                <div className="review-item">
                  <span>LinkedIn:</span>
                  <span>{formData.linkedin || 'Not provided'}</span>
                </div>
                <div className="review-item">
                  <span>GitHub:</span>
                  <span>{formData.github || 'Not provided'}</span>
                </div>
                <div className="review-item">
                  <span>Portfolio:</span>
                  <span>{formData.portfolio || 'Not provided'}</span>
                </div>
              </div>

              <div className="review-section">
                <h4>Application Materials</h4>
                <div className="review-item">
                  <span>Resume:</span>
                  <span>{formData.resumeName || 'Not provided'}</span>
                </div>
                <div className="review-item">
                  <span>Cover Letter:</span>
                  <span>{formData.coverLetter ? 'Provided' : 'Not provided'}</span>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-back" onClick={handleBack}>
                  <i className="fas fa-arrow-left"></i> Back
                </button>
                <button type="submit" className="btn-submit">
                  Submit Application <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;