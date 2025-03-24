import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import '../styles/FAQ.css';

// Free image import from Unsplash
const faqHeaderImg = "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

function FAQ() {
  // State to track which FAQ is open
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaqs, setOpenFaqs] = useState({});

  // Toggle FAQ accordion
  const toggleFaq = (id) => {
    setOpenFaqs(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  // Change active category
  const changeCategory = (category) => {
    setActiveCategory(category);
    setOpenFaqs({});
  };

  // FAQ data organized by categories
  const faqData = {
    general: {
      title: "General Questions",
      faqs: [
        {
          id: "general-1",
          question: "What is Proserso?",
          answer: "Proserso is a leading professional services company that specializes in providing comprehensive solutions across various domains including technology consulting, architecture and design, business transformation, infrastructure management, event planning, and HR management. Our mission is to help organizations optimize their operations, drive innovation, and achieve sustainable growth."
        },
        {
          id: "general-2",
          question: "How long has Proserso been in business?",
          answer: "Proserso has been providing exceptional professional services for over 15 years. Since our founding in 2008, we have grown from a small consulting team to a global organization with offices in New York, London, and Singapore, serving clients across multiple industries worldwide."
        },
        {
          id: "general-3",
          question: "What industries does Proserso serve?",
          answer: "Proserso serves a wide range of industries including but not limited to finance, healthcare, retail, manufacturing, education, government, technology, and non-profit organizations. Our diverse expertise allows us to understand the unique challenges and requirements of different sectors and provide tailored solutions."
        },
        {
          id: "general-4",
          question: "How can I get in touch with Proserso?",
          answer: "You can reach us through multiple channels. Visit our Contact page to find our office locations, phone numbers, and email addresses. You can also fill out the contact form on our website, and one of our representatives will get back to you promptly. Additionally, you can connect with us on LinkedIn, Twitter, Facebook, Instagram, and YouTube."
        },
        {
          id: "general-5",
          question: "Does Proserso offer services internationally?",
          answer: "Yes, Proserso operates globally with offices in New York, London, and Singapore. We have successfully delivered projects for clients across North America, Europe, Asia, Australia, and Africa. Our team of experts is equipped to handle international projects while navigating cultural, regulatory, and geographic considerations."
        }
      ]
    },
    services: {
      title: "Our Services",
      faqs: [
        {
          id: "services-1",
          question: "What services does Proserso offer?",
          answer: "Proserso offers a comprehensive range of professional services including IT Consulting, Architecture & Design, Business Transformation, Infrastructure Management, Event Management, and HR Management. Each service line is staffed with experienced professionals who bring deep domain expertise and a commitment to delivering exceptional results."
        },
        {
          id: "services-2",
          question: "Can Proserso customize services for my specific needs?",
          answer: "Absolutely. We understand that every organization is unique, and we pride ourselves on our ability to tailor our services to meet your specific challenges and objectives. Our approach begins with a thorough assessment of your current situation, followed by the development of a customized solution that aligns with your goals, timeline, and budget."
        },
        {
          id: "services-3",
          question: "How does Proserso ensure quality in service delivery?",
          answer: "Quality is at the core of everything we do at Proserso. We maintain rigorous quality standards through our proven methodologies, regular reviews, and continuous improvement processes. Our project teams follow established frameworks while maintaining the flexibility to adapt to changing requirements. Additionally, we regularly collect client feedback to ensure our services consistently exceed expectations."
        },
        {
          id: "services-4",
          question: "What is the typical timeline for a project with Proserso?",
          answer: "Project timelines vary depending on the scope, complexity, and specific requirements of each engagement. Some projects may be completed in a few weeks, while others may span several months or involve ongoing support. During our initial consultation, we'll work with you to establish realistic timelines and milestones, and we'll keep you informed of our progress throughout the project lifecycle."
        },
        {
          id: "services-5",
          question: "Do you offer ongoing support after project completion?",
          answer: "Yes, we offer various post-implementation support options to ensure the long-term success of your initiatives. These may include maintenance agreements, technical support, training sessions, periodic reviews, and optimization services. We can design a support package that addresses your specific needs and ensures you continue to derive maximum value from our solutions."
        }
      ]
    },
    process: {
      title: "Working Process",
      faqs: [
        {
          id: "process-1",
          question: "What is Proserso's approach to new projects?",
          answer: "Our approach to new projects follows a structured yet flexible methodology: 1) Discovery & Assessment - We begin by understanding your business objectives, challenges, and requirements. 2) Strategy & Planning - We develop a comprehensive strategy and detailed project plan. 3) Implementation - Our team executes the plan with regular check-ins and adjustments as needed. 4) Evaluation - We assess the results against the defined success criteria. 5) Continuous Improvement - We identify opportunities for ongoing optimization."
        },
        {
          id: "process-2",
          question: "How does Proserso handle project management?",
          answer: "Proserso employs best-in-class project management methodologies tailored to each engagement. Every project is assigned a dedicated project manager who serves as your primary point of contact and is responsible for coordinating resources, managing timelines, mitigating risks, and ensuring quality delivery. We use collaborative tools that provide transparency into project status and facilitate effective communication among all stakeholders."
        },
        {
          id: "process-3",
          question: "How do you communicate progress during projects?",
          answer: "Communication is essential to project success. We establish a communication plan at the outset of each project, which typically includes regular status meetings, progress reports, and real-time updates through our project management platform. The frequency and format of communication are tailored to your preferences. Additionally, your project manager is always available to address any questions or concerns that arise."
        },
        {
          id: "process-4",
          question: "How does Proserso handle changes in project scope?",
          answer: "We understand that requirements may evolve during a project. Our change management process ensures that any modifications to the project scope are properly evaluated for their impact on timelines, resources, and budget. Proposed changes are documented, reviewed with all stakeholders, and formally approved before implementation. This structured approach helps maintain project integrity while accommodating necessary adjustments."
        },
        {
          id: "process-5",
          question: "What if I'm not satisfied with the service or deliverables?",
          answer: "Client satisfaction is our highest priority. If you're not completely satisfied with any aspect of our service or deliverables, we encourage you to raise your concerns immediately with your project manager or account executive. We will work diligently to understand the issues and take appropriate corrective actions. Proserso is committed to resolving any problems promptly and ensuring you receive the value you expect from our partnership."
        }
      ]
    },
    technical: {
      title: "Technical Questions",
      faqs: [
        {
          id: "technical-1",
          question: "What technologies and platforms does Proserso work with?",
          answer: "Proserso works with a wide range of technologies and platforms to deliver optimal solutions for our clients. Our expertise spans cloud platforms (AWS, Azure, Google Cloud), enterprise systems (SAP, Oracle, Salesforce), development frameworks, data analytics tools, AI and machine learning technologies, cybersecurity solutions, and infrastructure management systems. We remain technology-agnostic, focusing on selecting the right tools to address your specific business needs."
        },
        {
          id: "technical-2",
          question: "Can Proserso integrate with my existing systems?",
          answer: "Yes, we specialize in integrating new solutions with existing systems and infrastructure. Our integration experts conduct thorough assessments of your current environment and develop integration strategies that minimize disruption while maximizing the value of your technology investments. We have experience working with legacy systems, proprietary platforms, and diverse technology stacks to create cohesive, interoperable solutions."
        },
        {
          id: "technical-3",
          question: "How does Proserso ensure data security and privacy?",
          answer: "Data security and privacy are paramount in all our engagements. We implement robust security measures aligned with industry standards and regulatory requirements. This includes secure development practices, encryption, access controls, regular security assessments, and comprehensive data protection protocols. Our team stays abreast of evolving security threats and compliance requirements to ensure your information remains protected."
        },
        {
          id: "technical-4",
          question: "Do you provide training for new systems or technologies?",
          answer: "Yes, we offer comprehensive training programs to ensure your team can effectively utilize and maintain the solutions we implement. Our training approaches include hands-on workshops, documentation, knowledge transfer sessions, video tutorials, and ongoing support resources. We tailor the training to different user roles and skill levels, focusing on practical applications that drive adoption and maximize the return on your investment."
        },
        {
          id: "technical-5",
          question: "How do you approach scalability in your solutions?",
          answer: "Scalability is a key consideration in all our technical designs. We architect solutions that can grow with your business, accommodating increased users, transactions, data volumes, and functional requirements. This involves selecting appropriate technologies, implementing modular designs, establishing performance benchmarks, and creating a roadmap for future enhancements. We also conduct load testing and stress testing to ensure the solution performs optimally under various conditions."
        }
      ]
    },
    pricing: {
      title: "Pricing & Contracts",
      faqs: [
        {
          id: "pricing-1",
          question: "How does Proserso structure its pricing?",
          answer: "Proserso offers flexible pricing structures to accommodate different project types and client preferences. These may include fixed-price contracts for well-defined projects, time and materials billing for evolving engagements, retainer arrangements for ongoing services, or value-based pricing tied to specific outcomes. During our initial discussions, we'll explore which approach best aligns with your project requirements and budget considerations."
        },
        {
          id: "pricing-2",
          question: "Do you offer any discounts for non-profits or startups?",
          answer: "Yes, Proserso offers special pricing considerations for non-profit organizations, educational institutions, and early-stage startups. We believe in supporting mission-driven organizations and emerging businesses. Please contact our sales team to discuss your specific situation and learn about the options available to your organization."
        },
        {
          id: "pricing-3",
          question: "What is the typical contract duration?",
          answer: "Contract durations vary based on the nature of the engagement. Project-based contracts typically align with the project timeline, which could range from a few weeks to several months. For ongoing services such as maintenance or advisory roles, we often establish annual contracts with options for renewal. We can also accommodate shorter trial periods or phased approaches for clients who prefer to start with a smaller scope."
        },
        {
          id: "pricing-4",
          question: "Are there any hidden costs or fees I should be aware of?",
          answer: "Transparency is a core value at Proserso. We provide detailed proposals that clearly outline all costs associated with our services. Any potential additional expenses, such as travel, third-party software licenses, or specialized equipment, are identified upfront. Throughout the engagement, we maintain open communication about any circumstances that might impact the agreed-upon budget and seek your approval before incurring any unforeseen costs."
        },
        {
          id: "pricing-5",
          question: "What payment terms does Proserso offer?",
          answer: "Our standard payment terms include an initial deposit at contract signing, followed by milestone-based payments for project work or monthly invoicing for ongoing services. We accept various payment methods including bank transfers, credit cards, and electronic payment systems. We can discuss specific payment schedules that align with your internal processes and cash flow considerations during contract negotiations."
        }
      ]
    }
  };

  // Get the current active FAQs based on selected category
  const activeFaqs = faqData[activeCategory]?.faqs || [];
  
  return (
    <div className="faq-page">
      <PageHeader 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about our services and processes"
        backgroundImage={faqHeaderImg}
      />
      
      <section className="faq-content">
        <div className="container">
          <div className="faq-intro">
            <h2>How Can We Help You?</h2>
            <p>
              Browse through our comprehensive FAQ section to find answers to the most common questions about 
              Proserso's services, processes, and policies. If you can't find what you're looking for, 
              please don't hesitate to <a href="/contact">contact us</a>.
            </p>
            
            <div className="faq-search">
              <input 
                type="text" 
                placeholder="Search for questions..." 
                className="search-input"
              />
              <button className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          
          <div className="faq-container">
            <div className="faq-categories">
              {Object.keys(faqData).map(category => (
                <button
                  key={category}
                  className={`category-button ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => changeCategory(category)}
                >
                  {faqData[category].title}
                </button>
              ))}
            </div>
            
            <div className="faq-list">
              <h3 className="category-title">{faqData[activeCategory].title}</h3>
              
              <div className="faq-accordions">
                {activeFaqs.map(faq => (
                  <div className={`faq-item ${openFaqs[faq.id] ? 'open' : ''}`} key={faq.id}>
                    <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                      <h4>{faq.question}</h4>
                      <span className="faq-icon">
                        <i className={`fas ${openFaqs[faq.id] ? 'fa-minus' : 'fa-plus'}`}></i>
                      </span>
                    </div>
                    
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="faq-cta">
            <div className="cta-content">
              <h3>Still Have Questions?</h3>
              <p>Our team is ready to assist you with any additional questions or concerns you might have.</p>
              <div className="cta-buttons">
                <a href="/contact" className="cta-button primary">
                  Contact Us
                  <i className="fas fa-arrow-right"></i>
                </a>
                <a href="tel:+18001234567" className="cta-button secondary">
                  <i className="fas fa-phone-alt"></i>
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ;