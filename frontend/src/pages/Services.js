import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import '../styles/Services.css';

// Free image imports from Unsplash
const servicesHeaderImg = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
const technologyImg = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
const architectureImg = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
const businessImg = "https://images.unsplash.com/photo-1460794418188-1bb7dba2720d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
const infrastructureImg = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
const eventImg = "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
const hrImg = "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

function Services() {
  // Services data
  const servicesList = [
    {
      id: 'technology',
      title: 'IT Consulting',
      description: 'Strategic technology consulting to align your IT initiatives with business objectives and drive digital transformation.',
      features: ['Digital Strategy', 'Technology Assessment', 'IT Roadmap Development', 'System Integration', 'Cloud Transformation', 'Cybersecurity Solutions'],
      image: technologyImg,
      link: '/services/technology'
    },
    {
      id: 'architecture',
      title: 'Architecture & Design',
      description: 'Expert architectural services to create functional, sustainable, and aesthetically pleasing spaces that meet your requirements.',
      features: ['Commercial Design', 'Residential Architecture', 'Urban Planning', 'Sustainable Design', 'Interior Architecture', 'Renovation & Restoration'],
      image: architectureImg,
      link: '/services/architecture'
    },
    {
      id: 'business',
      title: 'Business Transformation',
      description: 'Comprehensive business consulting to optimize your operations, enhance performance, and drive sustainable growth.',
      features: ['Process Optimization', 'Change Management', 'Organizational Design', 'Digital Transformation', 'Strategic Planning', 'Performance Improvement'],
      image: businessImg,
      link: '/services/business'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Management',
      description: 'End-to-end infrastructure solutions to ensure reliable, scalable, and secure operations for your business.',
      features: ['IT Infrastructure Planning', 'Cloud Infrastructure', 'Network Management', 'Data Center Solutions', 'Infrastructure Monitoring', 'Disaster Recovery'],
      image: infrastructureImg,
      link: '/services/infrastructure'
    },
    {
      id: 'event',
      title: 'Event Management',
      description: 'Professional event planning and execution to create memorable experiences that achieve your objectives.',
      features: ['Corporate Events', 'Conferences & Seminars', 'Product Launches', 'Gala Dinners', 'Trade Shows', 'Virtual & Hybrid Events'],
      image: eventImg,
      link: '/services/event'
    },
    {
      id: 'hr',
      title: 'HR Management',
      description: 'Strategic human resources services to attract, develop, and retain top talent while optimizing workforce management.',
      features: ['Talent Acquisition', 'Performance Management', 'Workforce Planning', 'Employee Development', 'Compensation & Benefits', 'HR Technology Implementation'],
      image: hrImg,
      link: '/services/hr'
    }
  ];

  return (
    <div className="services-page">
      <PageHeader 
        title="Our Services" 
        subtitle="Comprehensive professional solutions tailored to your needs"
        backgroundImage={servicesHeaderImg}
      />
      
      <section className="services-intro-section">
        <div className="container">
          <div className="services-intro">
            <h2>Transformative Professional Services</h2>
            <p className="lead">
              At Proserso, we offer a wide range of professional services designed to help organizations 
              solve complex challenges, drive innovation, and achieve sustainable growth.
            </p>
            <p>
              Our team of experienced professionals brings deep domain expertise and a client-centered approach 
              to every engagement. Whether you're looking to optimize your technology infrastructure, transform 
              your business processes, or plan a memorable corporate event, we have the skills and knowledge to 
              deliver exceptional results.
            </p>
            <p>
              Explore our service offerings below to learn how we can help your organization reach its full potential.
            </p>
          </div>
        </div>
      </section>
      
      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {servicesList.map(service => (
              <div className="service-card" key={service.id}>
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                  <div className="service-overlay">
                    <Link to={service.link} className="view-service-btn">
                      Learn More
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={service.link} className="service-link">
                    View Details
                    <i className="fas fa-long-arrow-alt-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="approach-section">
        <div className="container">
          <div className="approach-content">
            <div className="section-header">
              <h2>Our Approach</h2>
              <p>How we work with our clients to deliver exceptional results</p>
            </div>
            
            <div className="approach-steps">
              <div className="approach-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Discovery</h3>
                  <p>
                    We begin by understanding your business objectives, challenges, and requirements 
                    through in-depth consultations and assessments.
                  </p>
                </div>
              </div>
              
              <div className="approach-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Strategy</h3>
                  <p>
                    Based on our findings, we develop a tailored strategy and detailed plan that 
                    aligns with your goals and addresses your specific needs.
                  </p>
                </div>
              </div>
              
              <div className="approach-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Implementation</h3>
                  <p>
                    Our experienced team executes the strategy with precision, leveraging 
                    best practices and proprietary methodologies.
                  </p>
                </div>
              </div>
              
              <div className="approach-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Evaluation</h3>
                  <p>
                    We measure results against defined success criteria and make 
                    adjustments as needed to ensure optimal outcomes.
                  </p>
                </div>
              </div>
              
              <div className="approach-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Optimization</h3>
                  <p>
                    We identify opportunities for ongoing improvement and provide 
                    recommendations for continued success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="industries-section">
        <div className="container">
          <div className="section-header">
            <h2>Industries We Serve</h2>
            <p>Our expertise spans across multiple sectors, providing tailored solutions for diverse business needs</p>
          </div>
          
          <div className="industries-grid">
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-university"></i>
              </div>
              <h3>Finance</h3>
              <p>
                Banking, investment, insurance, and financial technology solutions designed 
                to enhance security, compliance, and customer experience.
              </p>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <h3>Healthcare</h3>
              <p>
                Innovative solutions for healthcare providers, payers, and life sciences companies 
                focused on improving patient outcomes and operational efficiency.
              </p>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <h3>Retail</h3>
              <p>
                Digital transformation strategies for retailers to enhance customer 
                engagement, streamline operations, and drive omnichannel growth.
              </p>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-industry"></i>
              </div>
              <h3>Manufacturing</h3>
              <p>
                Solutions that optimize production processes, supply chain management, 
                and asset utilization to improve efficiency and reduce costs.
              </p>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Education</h3>
              <p>
                Technology and organizational strategies for educational institutions 
                to enhance learning experiences and administrative operations.
              </p>
            </div>
            
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-landmark"></i>
              </div>
              <h3>Government</h3>
              <p>
                Public sector solutions that improve citizen services, enhance 
                operational efficiency, and enable digital government initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Client Success Stories</h2>
            <p>Hear what our clients have to say about working with Proserso</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <i className="fas fa-quote-left"></i>
                <p>
                  "Proserso's IT consulting services helped us modernize our legacy systems and 
                  implement a cloud strategy that has significantly improved our operational efficiency. 
                  Their expertise and client-focused approach made the transition seamless."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <span>JM</span>
                </div>
                <div className="author-info">
                  <h4>James Morrison</h4>
                  <p>CIO, Global Financial Services</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <i className="fas fa-quote-left"></i>
                <p>
                  "The business transformation team at Proserso helped us reimagine our customer 
                  experience strategy, resulting in a 35% increase in customer satisfaction and 
                  a significant boost in retention rates."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <span>SL</span>
                </div>
                <div className="author-info">
                  <h4>Sarah Lee</h4>
                  <p>VP of Customer Experience, Retail Corporation</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <i className="fas fa-quote-left"></i>
                <p>
                  "Proserso's event management services exceeded our expectations. They handled 
                  every aspect of our annual conference with professionalism and creativity, 
                  delivering an exceptional experience for all attendees."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <span>RP</span>
                </div>
                <div className="author-info">
                  <h4>Robert Patel</h4>
                  <p>Director of Marketing, Tech Innovations Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>
              Partner with Proserso to navigate complex challenges, drive innovation, and achieve sustainable growth. 
              Our team of experts is ready to develop customized solutions that address your unique needs.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">
                Get Started
                <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="cta-button secondary">
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
