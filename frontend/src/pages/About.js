import React from 'react';
import PageHeader from '../components/PageHeader';
import aboutHeaderImg from '../assets/images/about-header.jpg';
import '../styles/About.css';

function About() {
  return (
    <div className="about-page">
      <PageHeader 
        title="About Proserso" 
        subtitle="Empowering clients and society through innovative solutions"
        backgroundImage={aboutHeaderImg}
      />
      
      <section className="about-mission">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>To empower our clients & Society through our recommendation of product, services and solutions to ensure user adaptability and good customer experience to unlock potential growth opportunities and success.</p>
          </div>
          <div className="mission-vision">
            <h2>Our Vision</h2>
            <p>In relation to the pace of India's digital transformation and across the world, we aim to spread awareness in society to match the pace of development through the right Product, Services and Solutions to bring harmony and sustenance in quality of life.</p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon"><i className="fas fa-handshake"></i></div>
              <h3>Trust</h3>
              <p>We build lasting relationships through honesty and transparency</p>
            </div>
            <div className="value-item">
              <div className="value-icon"><i className="fas fa-lightbulb"></i></div>
              <h3>Innovation</h3>
              <p>We embrace creative solutions and cutting-edge technologies</p>
            </div>
            <div className="value-item">
              <div className="value-icon"><i className="fas fa-users"></i></div>
              <h3>Client Focus</h3>
              <p>Your success is our primary goal</p>
            </div>
            <div className="value-item">
              <div className="value-icon"><i className="fas fa-chart-line"></i></div>
              <h3>Excellence</h3>
              <p>We deliver exceptional quality in everything we do</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <div className="team-header">
            <h2>Our Leadership Team</h2>
            <p>Meet the experienced professionals who drive our vision forward</p>
          </div>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Rajesh Kumar" />
              </div>
              <h3>Rajesh Kumar</h3>
              <p className="member-title">CEO & Founder</p>
              <p className="member-bio">With over 20 years of experience in business consulting, Rajesh founded Proserso with a vision to transform how businesses operate.</p>
              <div className="member-social">
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Priya Sharma" />
              </div>
              <h3>Priya Sharma</h3>
              <p className="member-title">Chief Technology Officer</p>
              <p className="member-bio">Priya leads our technology initiatives, bringing innovative solutions to complex technical challenges.</p>
              <div className="member-social">
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-github"></i></a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">
                <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="Vikram Singh" />
              </div>
              <h3>Vikram Singh</h3>
              <p className="member-title">Chief Operations Officer</p>
              <p className="member-bio">Vikram ensures smooth operations across all our services, maintaining the highest standards of quality.</p>
              <div className="member-social">
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">
                <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Ananya Patel" />
              </div>
              <h3>Ananya Patel</h3>
              <p className="member-title">Head of Architecture</p>
              <p className="member-bio">Ananya manages our architecture projects, bringing creative and functional designs to life.</p>
              <div className="member-social">
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-history">
        <div className="container">
          <div className="history-header">
            <h2>Our Journey</h2>
            <p>How we've grown from a small consulting firm to a comprehensive business solutions provider</p>
          </div>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2010</div>
              <div className="timeline-content">
                <h3>Foundation</h3>
                <p>Proserso was founded with a focus on IT consulting services for small businesses.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2013</div>
              <div className="timeline-content">
                <h3>Expansion</h3>
                <p>Introduced architecture and design services to our portfolio.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2016</div>
              <div className="timeline-content">
                <h3>Growth</h3>
                <p>Expanded our team and opened our second office in Mumbai.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2019</div>
              <div className="timeline-content">
                <h3>Diversification</h3>
                <p>Added event management and HR consulting to our service offerings.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>Present</h3>
                <p>Serving over 200 clients worldwide with a team of dedicated professionals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container">
          <h2>Ready to Transform Your Business?</h2>
          <p>Let's collaborate to unlock your organization's full potential</p>
          <div className="cta-buttons">
            <a href="/contact" className="cta-button primary">Get Started</a>
            <a href="/services" className="cta-button secondary">Our Services</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;