import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

// Change from direct Unsplash URL to local image
import heroBackgroundImg from '../assets/images/hero1920.jpg';

function Hero() {
  return (
    <section className="hero-container" style={{ backgroundImage: `url(${heroBackgroundImg})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Empowering Businesses Through Digital Transformation</h1>
        <p className="hero-subtitle">
          Providing expert consulting services across IT, Architecture, Business, and Infrastructure
        </p>
        <div className="hero-cta-group">
          <Link to="/contact" className="hero-cta primary">Get Started</Link>
          <Link to="/about" className="hero-cta secondary">Learn More</Link>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}

export default Hero;
