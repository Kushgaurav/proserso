import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <Hero />
      <Services />
      
      {/* Company Overview Section */}
      <section className="overview-section">
        <div className="container">
          <div className="overview-content">
            <h2>Who We Are</h2>
            <p>Proserso India P. Limited aims to help clients achieve remarkable growth in their work by providing expert assistance to reach the next level and beyond. We are a team of qualified, experienced, and visionary individuals focused on providing products, services, and solutions to meet the real needs of our clients.</p>
            <p>Our analysis is geared towards the growth of our clients, and their success is what we thrive on. We position ourselves as the right partner to help build a good presence and bring in more conversions and revenue.</p>
            <div className="overview-cta">
              <a href="/contact" className="cta-link">Let's talk about what we can build together →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-header">
            <h2>Our Impact by the Numbers</h2>
            <p>Delivering measurable results that drive business success</p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">200+</div>
              <div className="stat-label">Clients Served</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-value">15+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-value">500+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-header">
            <h2>What Our Clients Say</h2>
            <p>Success stories from businesses we've transformed</p>
          </div>
          
          <div className="testimonials-carousel">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Proserso's IT consulting services helped us modernize our infrastructure and increase operational efficiency by 40%. Their expertise and dedication are unmatched."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Rahul Sharma</h4>
                  <p>CTO, Tech Solutions India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Business?</h2>
          <p>If you are looking for the right Partner that'll help you build a good presence and bring in more conversions and revenue, we are right here!</p>
          <div className="cta-buttons">
            <a href="/contact" className="cta-button primary">Get Started</a>
            <a href="/about" className="cta-button secondary">Learn More</a>
          </div>
          <div className="contact-info">
            <p>Contact us at: <a href="mailto:sales.support@proserso.com">sales.support@proserso.com</a> | <a href="tel:+918559575667">+91-8559575667</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;