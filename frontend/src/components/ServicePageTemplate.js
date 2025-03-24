import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';
import '../styles/ServicePage.css';

function ServicePageTemplate({ title, subtitle, backgroundImage, serviceIcon, serviceContent, features, process, faq }) {
  return (
    <div className="service-page">
      <PageHeader 
        title={title} 
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      />
      
      <section className="service-overview">
        <div className="container">
          <div className="overview-content">
            <div className="service-icon">
              {serviceIcon}
            </div>
            <div className="overview-text">
              {serviceContent}
            </div>
          </div>
        </div>
      </section>
      
      <section className="service-features">
        <div className="container">
          <div className="features-header">
            <h2>Key Features</h2>
            <p>What makes our service exceptional</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="service-process">
        <div className="container">
          <div className="process-header">
            <h2>Our Process</h2>
            <p>How we deliver exceptional results</p>
          </div>
          
          <div className="process-steps">
            {process.map((step, index) => (
              <div className="process-step" key={index}>
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {faq && (
        <section className="service-faq">
          <div className="container">
            <div className="faq-header">
              <h2>Frequently Asked Questions</h2>
              <p>Common questions about our {title} service</p>
            </div>
            
            <div className="faq-list">
              {faq.map((item, index) => (
                <div className="faq-item" key={index}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <section className="service-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Reach out to us to learn more about our {title} service</p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-primary-btn">Contact Us</Link>
              <Link to="/about" className="cta-secondary-btn">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicePageTemplate;
