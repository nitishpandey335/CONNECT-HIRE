import React, { useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(el => {
      const duration = Math.random() * 5 + 5;
      el.style.animation = `float ${duration}s ease-in-out infinite`;
    });
  }, []);

  return (
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="floating-element floating"></div>
            <div className="floating-element floating" style={{ top: '30%', left: '20%', animationDelay: '1s' }}></div>
            <div className="floating-element floating" style={{ top: '70%', left: '80%', animationDelay: '2s' }}></div>
            
            <h1 className="hero-title">
              <span className="title-part">Connect</span>
              <span className="title-part">Hire</span>
            </h1>
            <p className="hero-subtitle">
              Where talent meets opportunity. Find your dream job or the perfect candidate.
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="cta-btn primary">Sign In</Link>
              <Link to="/signup" className="cta-btn secondary">Sign Up</Link>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="animated-card">
              <div className="card-content">
                <div className="profile-badge">
                  <div className="profile-pic">
                     <img src="/images/Nikita.jpg" alt="Nikita" className="author-image" />
                  </div>
                  <div className="profile-info">
                    <span className="name">Nikita</span>
                    <span className="title">Senior Developer</span>
                  </div>
                </div>
                <div className="job-offer">
                  <span className="company">Tech Innovations Inc.</span>
                  <span className="position">Frontend Engineer</span>
                  <div className="offer-tag">$120K • Full-time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Why Choose ConnectHire?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>Fast Matching</h3>
              <p>Our AI matches you with opportunities in seconds, not days.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Verified Profiles</h3>
              <p>All professionals are vetted for skills and experience.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3>Seamless Communication</h3>
              <p>Chat, video call, and collaborate in one platform.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Career Growth</h3>
              <p>Tools and insights to help you advance your career.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your Profile</h3>
                <p>Build a professional profile showcasing your skills and experience.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Find Opportunities</h3>
                <p>Browse jobs or candidates tailored to your preferences.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Connect & Interview</h3>
                <p>Communicate directly through our secure platform.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Hire or Get Hired</h3>
                <p>Finalize agreements and start your new journey.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <h2 className="section-title">Success Stories</h2>
          <div className="testimonial-cards">
            <div className="testimonial">
              <div className="quote-icon">"</div>
              <p>ConnectHire helped me find my dream job in just two weeks! The process was seamless and efficient.</p>
              <div className="testimonial-author">
                <div className="author-pic">
                   <img src="/images/Nikita.jpg" alt="Nikita" className="author-image" />
                </div>
                <div className="author-info">
                  <span className="name">Nikita</span>
                  <span className="role">Senior Developer at TechCorp</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="quote-icon">"</div>
              <p>We found three perfect candidates for our engineering team in less than a week. Incredible platform!</p>
              <div className="testimonial-author">
                <div className="author-pic">
                  <img src="/images/rishabh.jpg" alt="Rishabh" className="author-image" />
                </div>
                <div className="author-info">
                  <span className="name">Rishabh</span>
                  <span className="role">HR Director at InnovateX</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to Transform Your Career?</h2>
          <p>Join thousands of professionals and companies finding success with ConnectHire</p>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-btn primary">Sign Up as Job Seeker</Link>
            <Link to="/post-job" className="cta-btn secondary">Post a Job Opening</Link>
          </div>
        </section>
      </div>
  );
};

export default Home;