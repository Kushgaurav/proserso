import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

function Services() {
  const services = [
    {
      id: 'technology',
      title: 'Information & Operations Technology',
      description: 'Strategic technology guidance and solutions to help businesses leverage digital transformation for growth and competitive advantage.',
      icon: 'fas fa-laptop-code',
      link: '/services/technology'
    },
    {
      id: 'architecture',
      title: 'Architecture & Interior Design',
      description: 'Creative and functional design solutions that transform spaces and enhance user experience.',
      icon: 'fas fa-drafting-compass',
      link: '/services/architecture'
    },
    {
      id: 'business',
      title: 'Business Transformation & Growth',
      description: 'Expert consultation to help organizations achieve remarkable growth and reach their full potential.',
      icon: 'fas fa-chart-line',
      link: '/services/business'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Management',
      description: 'End-to-end infrastructure solutions to ensure reliable, scalable, and secure operations.',
      icon: 'fas fa-network-wired',
      link: '/services/infrastructure'
    },
    {
      id: 'event',
      title: 'Event Management & Planning',
      description: 'Professional event planning and execution services for memorable and impactful experiences.',
      icon: 'fas fa-calendar-check',
      link: '/services/event'
    },
    {
      id: 'hr',
      title: 'Human Resource Consultancy',
      description: 'Strategic HR solutions to optimize workforce management and organizational development.',
      icon: 'fas fa-users',
      link: '/services/hr'
    }
  ];

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive solutions tailored to your needs</p>
        </div>
        
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to={service.link} className="service-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
