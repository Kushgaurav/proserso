import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ServiceCard.css';

function ServiceCard({ title, description, icon, link }) {
  return (
    <div className="service-card">
      <div className="service-icon">
        {icon}
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      <Link to={link} className="service-link">
        Learn More <span className="arrow-icon">→</span>
      </Link>
    </div>
  );
}

export default ServiceCard;
