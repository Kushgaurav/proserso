import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import infrastructureHeaderImg from '../assets/images/infrastructure-header.jpg';

function Infrastructure() {
  // Service overview content
  const serviceIcon = <i className="fas fa-server"></i>;
  const serviceContent = (
    <>
      <h2>Infrastructure Management Services</h2>
      <p>Proserso's Infrastructure Management services provide comprehensive solutions for designing, implementing, and maintaining robust IT infrastructure that supports your business objectives. We help organizations build scalable, secure, and reliable technology foundations that enhance operational efficiency and drive digital transformation.</p>
      <p>Our team of certified infrastructure specialists combines deep technical expertise with industry best practices to deliver tailored solutions across on-premises, cloud, and hybrid environments. We focus on optimizing performance, reducing costs, and ensuring business continuity while aligning your infrastructure strategy with your long-term business goals.</p>
    </>
  );

  // Key features
  const features = [
    {
      icon: <i className="fas fa-network-wired"></i>,
      title: "Network Infrastructure",
      description: "Design and implementation of high-performance, secure network solutions that connect your entire organization."
    },
    {
      icon: <i className="fas fa-database"></i>,
      title: "Data Center Services",
      description: "Modern data center solutions that ensure optimal efficiency, scalability, and reliability."
    },
    {
      icon: <i className="fas fa-cloud"></i>,
      title: "Cloud Infrastructure",
      description: "Strategic cloud migration and management to enhance flexibility and reduce operational overhead."
    },
    {
      icon: <i className="fas fa-shield-alt"></i>,
      title: "Security Infrastructure",
      description: "Comprehensive security frameworks to protect your critical systems and data from threats."
    },
    {
      icon: <i className="fas fa-hdd"></i>,
      title: "Storage Solutions",
      description: "Scalable storage architectures that optimize data access, protection, and management."
    },
    {
      icon: <i className="fas fa-sync-alt"></i>,
      title: "Disaster Recovery",
      description: "Robust business continuity and disaster recovery solutions to minimize downtime and data loss."
    }
  ];

  // Process steps
  const process = [
    {
      title: "Assessment",
      description: "We conduct a thorough analysis of your current infrastructure, identifying strengths, weaknesses, and improvement opportunities."
    },
    {
      title: "Architecture Design",
      description: "Our experts design a tailored infrastructure architecture aligned with your business requirements and future growth."
    },
    {
      title: "Implementation",
      description: "We deploy your infrastructure solutions with minimal disruption, ensuring proper integration with existing systems."
    },
    {
      title: "Migration",
      description: "For transition projects, we manage the migration process to ensure data integrity and service continuity."
    },
    {
      title: "Ongoing Management",
      description: "We provide proactive monitoring, maintenance, and optimization to ensure your infrastructure performs optimally."
    }
  ];

  // FAQ
  const faq = [
    {
      question: "How can improved infrastructure benefit my business?",
      answer: "Modern infrastructure can reduce operational costs, enhance security, improve reliability, enable faster innovation, and provide the agility needed to respond to changing business demands."
    },
    {
      question: "Should we move everything to the cloud?",
      answer: "Not necessarily. We recommend a strategic approach based on your specific needs. Often, a hybrid model combining on-premises and cloud infrastructure provides the optimal balance of performance, security, and cost efficiency."
    },
    {
      question: "How do you ensure infrastructure security?",
      answer: "We implement multi-layered security approaches including network segmentation, advanced threat protection, identity management, encryption, and continuous monitoring to protect against evolving cyber threats."
    },
    {
      question: "What certifications do your infrastructure specialists hold?",
      answer: "Our team holds certifications from major technology providers including Cisco, Microsoft, AWS, VMware, and CompTIA, along with security certifications such as CISSP and infrastructure frameworks like ITIL."
    }
  ];

  return (
    <ServicePageTemplate
      title="Infrastructure Management"
      subtitle="Building the foundation for reliable, secure, and scalable IT operations"
      backgroundImage={infrastructureHeaderImg}
      serviceIcon={serviceIcon}
      serviceContent={serviceContent}
      features={features}
      process={process}
      faq={faq}
    />
  );
}

export default Infrastructure;