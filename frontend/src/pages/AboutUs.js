import React from 'react';
import PageHeader from '../components/PageHeader';
import '../styles/AboutUs.css';

// Free image imports from Unsplash
const aboutHeaderImg = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
const ceoImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";
const ctoImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";
const cfoImage = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";
const vpProductImage = "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";
const vpMarketingImage = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";
const vpSalesImage = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";

function AboutUs() {
  // Company stats data
  const companyStats = [
    { number: '15+', label: 'Years Experience' },
    { number: '200+', label: 'Employees Worldwide' },
    { number: '500+', label: 'Projects Completed' },
    { number: '95%', label: 'Client Satisfaction' }
  ];
  
  // Team members data
  const leadershipTeam = [
    {
      name: 'Jessica Reynolds',
      position: 'Chief Executive Officer',
      bio: 'Jessica has over 20 years of experience in technology and management consulting. She founded Proserso in 2008 with a vision to create a company that delivers exceptional professional services across multiple domains.',
      image: ceoImage,
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Michael Chen',
      position: 'Chief Technology Officer',
      bio: "Michael leads Proserso's technology strategy and innovation initiatives. With his background in software engineering and architecture, he ensures our technical solutions are cutting-edge, scalable, and aligned with business objectives.",
      image: ctoImage,
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'David Williams',
      position: 'Chief Financial Officer',
      bio: 'David oversees all financial operations at Proserso. His strategic financial planning and analysis have been instrumental in guiding the company through periods of expansion while maintaining strong financial health.',
      image: cfoImage,
      social: {
        linkedin: '#'
      }
    },
    {
      name: 'Sarah Johnson',
      position: 'VP of Product',
      bio: 'Sarah leads product development and service design at Proserso. Her innovative approach to creating service offerings has helped position the company as a leader in multiple professional service categories.',
      image: vpProductImage,
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Robert Patel',
      position: 'VP of Marketing',
      bio: "Robert drives Proserso's brand strategy and marketing initiatives. His deep understanding of market trends and client needs helps shape our messaging and position our services effectively in the marketplace.",
      image: vpMarketingImage,
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Olivia Martinez',
      position: 'VP of Sales',
      bio: 'Olivia leads our global sales organization. Her client-centered approach and deep industry knowledge have been key to establishing long-term relationships with our clients and driving sustainable growth.',
      image: vpSalesImage,
      social: {
        linkedin: '#'
      }
    }
  ];
  
  // Company timeline data
  const companyTimeline = [
    {
      year: '2008',
      title: 'Company Founded',
      description: 'Proserso was founded in New York with a small team of consultants focused on technology solutions.'
    },
    {
      year: '2010',
      title: 'Service Expansion',
      description: 'Expanded service offerings to include business transformation and architecture design.'
    },
    {
      year: '2013',
      title: 'International Growth',
      description: 'Opened our first international office in London to better serve our growing European client base.'
    },
    {
      year: '2015',
      title: 'Asia Pacific Entry',
      description: 'Established presence in Singapore to support clients in the Asia Pacific region.'
    },
    {
      year: '2018',
      title: 'Service Portfolio Expansion',
      description: 'Added HR Management and Event Management to our service portfolio to provide more comprehensive solutions.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched specialized digital transformation services to help clients navigate the challenges of remote work and digital acceleration.'
    },
    {
      year: '2023',
      title: 'Sustainable Solutions Initiative',
      description: 'Introduced dedicated sustainability consulting services to help organizations implement environmentally responsible practices.'
    }
  ];
  
  // Values data
  const coreValues = [
    {
      title: 'Excellence',
      description: 'We are committed to delivering exceptional quality in everything we do, consistently exceeding client expectations.',
      icon: 'fa-star'
    },
    {
      title: 'Integrity',
      description: 'We conduct business ethically and transparently, building trust through honest communication and accountability.',
      icon: 'fa-shield-alt'
    },
    {
      title: 'Innovation',
      description: 'We embrace creativity and forward thinking to develop cutting-edge solutions that address complex challenges.',
      icon: 'fa-lightbulb'
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and partnership, both internally and with our clients, to achieve superior results.',
      icon: 'fa-hands-helping'
    },
    {
      title: 'Respect',
      description: 'We value diversity of thought, background, and experience, treating everyone with dignity and consideration.',
      icon: 'fa-heart'
    },
    {
      title: 'Adaptability',
      description: 'We remain flexible and responsive to change, continuously evolving our approaches to meet emerging needs.',
      icon: 'fa-sync-alt'
    }
  ];
  
  return (
    <div className="about-page">
      <PageHeader 
        title="About Us" 
        subtitle="Discover our story, mission, and the team behind Proserso"
        backgroundImage={aboutHeaderImg}
      />
      
      <section className="about-intro-section">
        <div className="container">
          <div className="about-intro-content">
            <div className="about-intro-text">
              <h2>Our Story</h2>
              <p className="lead">
                Founded in 2008, Proserso has grown from a small team of consultants to a global professional services firm with a reputation for excellence and innovation.
              </p>
              <p>
                Our journey began with a simple vision: to help organizations navigate complex challenges through tailored, high-quality professional services. What started as a technology consulting practice has evolved into a comprehensive service portfolio spanning IT consulting, architecture and design, business transformation, infrastructure management, event planning, and HR management.
              </p>
              <p>
                Today, Proserso operates globally with offices in New York, London, and Singapore, serving clients across various industries. Our diverse team of experts brings together deep domain knowledge, innovative thinking, and a client-first approach to deliver exceptional results.
              </p>
              <p>
                As we continue to grow, we remain committed to our founding principles of excellence, integrity, and client success. We believe in building lasting relationships, understanding the unique needs of each client, and delivering solutions that create real, measurable value.
              </p>
            </div>
            
            <div className="about-stats">
              {companyStats.map((stat, index) => (
                <div className="stat-item" key={index}>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="card-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Our Mission</h3>
              <p>
                To empower organizations to achieve their full potential through innovative, effective, and sustainable professional services that create lasting value.
              </p>
            </div>
            
            <div className="vision-card">
              <div className="card-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted partner for organizations seeking transformative professional services, recognized globally for our excellence, innovation, and client-centered approach.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide our actions and define our culture</p>
          </div>
          
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div className="value-card" key={index}>
                <div className="value-icon">
                  <i className={`fas ${value.icon}`}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Milestones that have shaped our company's growth and evolution</p>
          </div>
          
          <div className="timeline">
            {companyTimeline.map((item, index) => (
              <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Leadership Team</h2>
            <p>Meet the experts guiding our vision and strategy</p>
          </div>
          
          <div className="team-grid">
            {leadershipTeam.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-member-info">
                  <h3>{member.name}</h3>
                  <div className="team-member-position">{member.position}</div>
                  <p>{member.bio.replace(/'/g, "\\'")}</p>
                  <div className="team-member-social">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="social-link" aria-label="LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="social-link" aria-label="Twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Work With Us?</h2>
            <p>
              Partner with Proserso to transform your organization with our innovative professional services. 
              Our team of experts is ready to help you navigate complex challenges and achieve sustainable success.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="cta-button primary">
                Contact Us
                <i className="fas fa-arrow-right"></i>
              </a>
              <a href="/services" className="cta-button secondary">
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
