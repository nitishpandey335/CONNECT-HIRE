// src/components/ApplicationModal.jsx
import React, { useState } from 'react';
import './ApplicationModal.css';

const ApplicationModal = ({ isOpen, onClose }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [step, setStep] = useState(1);
  
  const handleResumeChange = (e) => {
    if (e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };
  
  const handleNext = () => {
    setStep(step + 1);
  };
  
  const handleBack = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = () => {
    console.log('Application submitted');
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Apply for Senior UX Designer</h2>
          <p>Nexus Technologies</p>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Resume</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Details</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Review</div>
          </div>
        </div>
        
        <div className="modal-content">
          {step === 1 && (
            <div className="step-content">
              <h3>Upload Your Resume</h3>
              <p>Upload your resume in PDF, DOC, or DOCX format (max 5MB)</p>
              
              <div className="upload-container">
                <div className="upload-box">
                  <div className="upload-icon">📄</div>
                  <p>Drag & drop your resume here</p>
                  <p>or</p>
                  <label className="btn-browse">
                    Browse Files
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleResumeChange} 
                      hidden
                    />
                  </label>
                </div>
                {resume && (
                  <div className="file-preview">
                    <div className="file-icon">📄</div>
                    <div className="file-info">
                      <p>{resume.name}</p>
                      <p>{(resume.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button className="btn-remove" onClick={() => setResume(null)}>✕</button>
                  </div>
                )}
              </div>
              
              <div className="action-buttons">
                <button className="btn-next" onClick={handleNext}>Next</button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="step-content">
              <h3>Additional Information</h3>
              
              <div className="form-group">
                <label>Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell us why you're a great fit for this position..."
                  className="form-textarea"
                  rows="6"
                />
              </div>
              
              <div className="form-group">
                <label>Portfolio Link (Optional)</label>
                <input 
                  type="url" 
                  className="form-input"
                  placeholder="https://yourportfolio.com"
                />
              </div>
              
              <div className="action-buttons">
                <button className="btn-back" onClick={handleBack}>Back</button>
                <button className="btn-next" onClick={handleNext}>Next</button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="step-content">
              <h3>Review Your Application</h3>
              
              <div className="review-section">
                <h4>Resume</h4>
                {resume ? (
                  <div className="file-preview">
                    <div className="file-icon">📄</div>
                    <div className="file-info">
                      <p>{resume.name}</p>
                      <p>{(resume.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                ) : (
                  <p>No resume uploaded</p>
                )}
              </div>
              
              <div className="review-section">
                <h4>Cover Letter</h4>
                <div className="cover-letter-preview">
                  {coverLetter || <p className="placeholder">No cover letter provided</p>}
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="btn-back" onClick={handleBack}>Back</button>
                <button className="btn-submit" onClick={handleSubmit}>Submit Application</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;