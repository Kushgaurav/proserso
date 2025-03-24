import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import contactHeaderImg from '../assets/images/contact-header.jpg';
import { sendContactForm } from '../services/contactService';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitStatus({ submitting: true, success: false, error: null });
      
      // Send the form data using our contact service
      await sendContactForm(formData);
      
      // If successful, update state and reset form
      setSubmitStatus({ submitting: false, success: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(prev => ({ ...prev, success: false }));
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        submitting: false, 
        success: false, 
        error: 'There was a problem sending your message. Please try again later.'
      });
    }
  };

  return (
    <div className="contact-page">
      <PageHeader 
        title="Contact Us" 
        subtitle="Get in touch with our team of experts"
        backgroundImage={contactHeaderImg}
      />
      
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-cards">
            <div className="contact-card">
              <div className="contact-card-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h3>Call Us</h3>
              <p>+91-8559575667</p>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-card-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email Us</h3>
              <p><a href="mailto:sales.support@proserso.com">sales.support@proserso.com</a></p>
              <p>We'll respond within 24 hours</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-card-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Visit Us</h3>
              <p>Noida | Bengaluru | Chandigarh</p>
              <p>India</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you shortly</p>
            </div>
            
            {submitStatus.success && (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <p>Your message has been sent successfully! We'll get back to you soon.</p>
              </div>
            )}
            
            {submitStatus.error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                <p>{submitStatus.error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email <span className="required">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="subject">Subject <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="message">Message <span className="required">*</span></label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="6" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                  ></textarea>
                </div>
                
                <div className="form-group full-width">
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={submitStatus.submitting}
                  >
                    {submitStatus.submitting ? (
                      <>Sending... <i className="fas fa-spinner fa-spin"></i></>
                    ) : (
                      <>Send Message <i className="fas fa-paper-plane"></i></>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <section className="faq-teaser-section">
        <div className="container">
          <div className="faq-teaser-content">
            <h2>Have Questions?</h2>
            <p>Check out our frequently asked questions to find quick answers to common inquiries.</p>
            <a href="/faq" className="faq-link">
              View FAQ
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;