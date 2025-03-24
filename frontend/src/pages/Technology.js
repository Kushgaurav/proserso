import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

function Technology() {
  // Use direct image path to ensure loading
  const technologyHeaderImg = require('../assets/images/technology-header.jpg');
  
  // Service overview content
  const serviceIcon = <i className="fas fa-laptop-code"></i>;
  const serviceContent = (
    <>
      <h2>IT Consulting & Technology Services</h2>
      <p>Proserso's IT Consulting services provide strategic technology guidance to help businesses leverage digital solutions for growth and competitive advantage. We analyze your current infrastructure, identify opportunities for improvement, and implement tailored solutions that drive efficiency and innovation.</p>
      <p>Our team of experienced consultants specializes in enterprise software development, cloud migration, system integration, and digital transformation initiatives. We work closely with your team to ensure seamless implementation and knowledge transfer, enabling your organization to maximize the value of your technology investments.</p>
    </>
  );

  // Key features
  const features = [
    {
      icon: <i className="fas fa-cloud"></i>,
      title: "Cloud Solutions",
      description: "Secure and scalable cloud infrastructure to enhance flexibility and reduce operational costs."
    },
    {
      icon: <i className="fas fa-shield-alt"></i>,
      title: "Cybersecurity",
      description: "Comprehensive security assessments and solutions to protect your critical assets and data."
    },
    {
      icon: <i className="fas fa-code"></i>,
      title: "Custom Software Development",
      description: "Tailored applications built to address your specific business requirements and challenges."
    },
    {
      icon: <i className="fas fa-network-wired"></i>,
      title: "IT Infrastructure",
      description: "Strategic planning and implementation of robust, scalable IT infrastructure."
    },
    {
      icon: <i className="fas fa-sync-alt"></i>,
      title: "Digital Transformation",
      description: "End-to-end strategies to modernize your business processes and customer experiences."
    },
    {
      icon: <i className="fas fa-database"></i>,
      title: "Data Management & Analytics",
      description: "Solutions to harness the power of your data for better decision-making and insights."
    }
  ];

  // Process steps
  const process = [
    {
      title: "Assessment",
      description: "We start by conducting a thorough analysis of your current technology landscape, business goals, and challenges to identify improvement opportunities."
    },
    {
      title: "Strategy Development",
      description: "Our experts develop a customized technology roadmap aligned with your business objectives, including timelines and investment projections."
    },
    {
      title: "Solution Design",
      description: "We architect tailored solutions that address your specific requirements, leveraging best practices and innovative technologies."
    },
    {
      title: "Implementation",
      description: "Our team executes the plan with minimal disruption to your operations, ensuring quality and adherence to timelines."
    },
    {
      title: "Training & Support",
      description: "We provide comprehensive training and ongoing support to ensure your team can effectively utilize and maintain the implemented solutions."
    }
  ];

  // FAQ
  const faq = [
    {
      question: "How can IT consulting benefit my business?",
      answer: "IT consulting helps identify efficiency opportunities, reduce technology costs, improve security, and implement solutions that drive business growth and innovation."
    },
    {
      question: "How long does a typical IT consulting project take?",
      answer: "Project timelines vary based on scope and complexity. Small projects may take 4-6 weeks, while enterprise-wide initiatives can span 6-12 months or more."
    },
    {
      question: "Do you work with specific industries?",
      answer: "Yes, we have experience across multiple sectors including healthcare, finance, manufacturing, retail, and education, with specialized knowledge of industry-specific requirements."
    },
    {
      question: "What size businesses do you typically work with?",
      answer: "We work with organizations of all sizes, from startups to enterprise-level companies, tailoring our approach to match your specific needs and resources."
    }
  ];

  return (
    <ServicePageTemplate
      title="IT Consulting"
      subtitle="Strategic technology solutions for your business"
      backgroundImage={technologyHeaderImg}
      serviceIcon={serviceIcon}
      serviceContent={serviceContent}
      features={features}
      process={process}
      faq={faq}
    />
  );
}

export default Technology;