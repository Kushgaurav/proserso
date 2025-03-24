import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import businessHeaderImg from '../assets/images/business-header.jpg';

function Business() {
  // Service overview content
  const serviceIcon = <i className="fas fa-chart-line"></i>;
  const serviceContent = (
    <>
      <h2>Business Transformation Services</h2>
      <p>Proserso's Business Transformation services help organizations reimagine their operations, strategies, and capabilities to achieve breakthrough performance and sustainable growth. In today's rapidly evolving market landscape, businesses must continuously adapt and innovate to stay competitive.</p>
      <p>Our team of experienced business consultants works closely with your leadership to identify opportunities, overcome challenges, and implement strategic initiatives that drive meaningful change across your organization. We combine industry insights, proven methodologies, and innovative thinking to deliver tailored solutions that generate measurable results.</p>
    </>
  );

  // Key features
  const features = [
    {
      icon: <i className="fas fa-sitemap"></i>,
      title: "Organizational Design",
      description: "Optimize your organizational structure to improve efficiency, collaboration, and agility."
    },
    {
      icon: <i className="fas fa-cogs"></i>,
      title: "Process Optimization",
      description: "Streamline operations and eliminate inefficiencies to enhance productivity and reduce costs."
    },
    {
      icon: <i className="fas fa-hand-holding-usd"></i>,
      title: "Financial Planning",
      description: "Strategic financial management to maximize resources and drive sustainable growth."
    },
    {
      icon: <i className="fas fa-bullseye"></i>,
      title: "Strategic Planning",
      description: "Define clear objectives and roadmaps to achieve your long-term business vision."
    },
    {
      icon: <i className="fas fa-users-cog"></i>,
      title: "Change Management",
      description: "Enable successful transitions with effective communication and stakeholder engagement."
    },
    {
      icon: <i className="fas fa-chart-pie"></i>,
      title: "Performance Analysis",
      description: "Data-driven insights to measure progress and optimize business outcomes."
    }
  ];

  // Process steps
  const process = [
    {
      title: "Discovery & Assessment",
      description: "We analyze your current business state, identify pain points, and understand your strategic objectives and market position."
    },
    {
      title: "Vision & Strategy",
      description: "Together, we define a clear vision for transformation and develop a comprehensive strategy aligned with your goals."
    },
    {
      title: "Roadmap Development",
      description: "We create a detailed implementation roadmap with specific initiatives, timelines, and resource requirements."
    },
    {
      title: "Implementation",
      description: "Our team works alongside yours to execute the transformation initiatives, driving change throughout the organization."
    },
    {
      title: "Measurement & Refinement",
      description: "We continuously monitor progress against defined metrics, making adjustments to ensure sustainable results."
    }
  ];

  // FAQ
  const faq = [
    {
      question: "How do I know if my business needs transformation?",
      answer: "Signs include declining growth, increasing competition, changing customer expectations, operational inefficiencies, or difficulty adapting to market changes."
    },
    {
      question: "How long does business transformation typically take?",
      answer: "Transformation timelines vary based on scope and complexity. Most programs run 12-24 months, though some initiatives can show results within 3-6 months."
    },
    {
      question: "How do you ensure transformation initiatives succeed?",
      answer: "We focus on securing leadership commitment, engaging stakeholders at all levels, clear communication, measurable objectives, and building internal capabilities for sustainable change."
    },
    {
      question: "What industries do you have experience with?",
      answer: "Our consultants have worked across diverse sectors including manufacturing, financial services, technology, healthcare, retail, and professional services."
    }
  ];

  return (
    <ServicePageTemplate
      title="Business Transformation"
      subtitle="Strategic solutions to drive growth, efficiency, and competitive advantage"
      backgroundImage={businessHeaderImg}
      serviceIcon={serviceIcon}
      serviceContent={serviceContent}
      features={features}
      process={process}
      faq={faq}
    />
  );
}

export default Business;