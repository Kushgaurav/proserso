import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import hrHeaderImg from '../assets/images/hr-header.jpg';

function HR() {
  // Service overview content
  const serviceIcon = <i className="fas fa-user-tie"></i>;
  const serviceContent = (
    <>
      <h2>HR Management Services</h2>
      <p>Proserso's HR Management services provide comprehensive human resources solutions designed to optimize your workforce capabilities and create a positive, productive workplace culture. We help organizations of all sizes attract, develop, and retain top talent while ensuring compliance with employment regulations.</p>
      <p>Our team of HR professionals combines strategic expertise with practical implementation to deliver tailored services that address your specific organizational needs. Whether you're looking to outsource your entire HR function or need support with specific initiatives, we offer flexible solutions that align with your business objectives.</p>
    </>
  );

  // Key features
  const features = [
    {
      icon: <i className="fas fa-users-cog"></i>,
      title: "Talent Acquisition",
      description: "Strategic recruitment services to attract and hire qualified candidates who match your culture and requirements."
    },
    {
      icon: <i className="fas fa-graduation-cap"></i>,
      title: "Training & Development",
      description: "Customized learning programs to enhance employee skills and leadership capabilities."
    },
    {
      icon: <i className="fas fa-chart-bar"></i>,
      title: "Performance Management",
      description: "Effective systems to set goals, provide feedback, and evaluate employee performance."
    },
    {
      icon: <i className="fas fa-file-contract"></i>,
      title: "Compliance Management",
      description: "Expert guidance to navigate complex employment laws and maintain regulatory compliance."
    },
    {
      icon: <i className="fas fa-hand-holding-usd"></i>,
      title: "Compensation & Benefits",
      description: "Competitive compensation structures and benefits programs to attract and retain talent."
    },
    {
      icon: <i className="fas fa-people-arrows"></i>,
      title: "Employee Relations",
      description: "Strategies to foster positive workplace relationships and resolve conflicts effectively."
    }
  ];

  // Process steps
  const process = [
    {
      title: "Assessment",
      description: "We conduct a thorough evaluation of your current HR practices, policies, and organizational needs to identify strengths and opportunities."
    },
    {
      title: "Strategy Development",
      description: "Based on the assessment, we develop a customized HR strategy aligned with your business objectives and organizational culture."
    },
    {
      title: "Implementation",
      description: "Our team works with your leadership to implement the HR initiatives, systems, and processes across your organization."
    },
    {
      title: "Training & Integration",
      description: "We provide comprehensive training to ensure smooth adoption of new HR practices by managers and employees."
    },
    {
      title: "Ongoing Support & Optimization",
      description: "We offer continuous support and regularly review HR performance metrics to optimize outcomes and adapt to changing needs."
    }
  ];

  // FAQ
  const faq = [
    {
      question: "How can outsourcing HR functions benefit my company?",
      answer: "Outsourcing HR can reduce administrative burden, ensure compliance, provide access to specialized expertise, and allow your leadership to focus on core business activities while often reducing overall HR costs."
    },
    {
      question: "Do you offer HR services for small businesses?",
      answer: "Yes, we provide scalable HR solutions tailored to small businesses, offering the expertise of a full HR department without the overhead costs. Our services can be customized to fit your specific needs and budget."
    },
    {
      question: "How do you help improve employee retention?",
      answer: "We develop comprehensive retention strategies including competitive compensation structures, career development opportunities, employee engagement initiatives, and creating positive workplace cultures that foster loyalty and satisfaction."
    },
    {
      question: "Can you help with HR technology implementation?",
      answer: "Absolutely. We have experience implementing various HR information systems, applicant tracking systems, performance management platforms, and other HR technologies. We help select the right solutions and ensure successful adoption."
    }
  ];

  return (
    <ServicePageTemplate
      title="HR Management"
      subtitle="Strategic people solutions to build a high-performing, engaged workforce"
      backgroundImage={hrHeaderImg}
      serviceIcon={serviceIcon}
      serviceContent={serviceContent}
      features={features}
      process={process}
      faq={faq}
    />
  );
}

export default HR;