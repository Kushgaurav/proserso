import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import architectureHeaderImg from '../assets/images/architecture-header.jpg';

function Architecture() {
  // Service overview content
  const serviceIcon = <i className="fas fa-drafting-compass"></i>;
  const serviceContent = (
    <>
      <h2>Architecture & Design Services</h2>
      <p>Proserso's Architecture & Design services offer comprehensive solutions for creating beautiful, functional spaces that meet your specific needs and vision. Our team of skilled architects and designers combine creativity with technical expertise to deliver exceptional results across residential, commercial, and institutional projects.</p>
      <p>We believe that great architecture goes beyond aesthetics—it enhances lives, improves productivity, and creates sustainable environments. From initial concept development to detailed design and construction supervision, we provide end-to-end support throughout your project journey.</p>
    </>
  );

  // Key features
  const features = [
    {
      icon: <i className="fas fa-building"></i>,
      title: "Commercial Design",
      description: "Creating innovative workspaces that enhance productivity and reflect your brand identity."
    },
    {
      icon: <i className="fas fa-home"></i>,
      title: "Residential Architecture",
      description: "Designing distinctive homes that balance aesthetics, functionality, and your personal lifestyle."
    },
    {
      icon: <i className="fas fa-hospital"></i>,
      title: "Healthcare Facilities",
      description: "Specialized designs for medical spaces that optimize workflow and patient experience."
    },
    {
      icon: <i className="fas fa-leaf"></i>,
      title: "Sustainable Design",
      description: "Eco-friendly architecture that reduces environmental impact and operational costs."
    },
    {
      icon: <i className="fas fa-pencil-ruler"></i>,
      title: "Interior Design",
      description: "Thoughtful interior solutions that transform spaces with innovative materials and concepts."
    },
    {
      icon: <i className="fas fa-project-diagram"></i>,
      title: "Master Planning",
      description: "Comprehensive planning for campuses, communities, and large-scale developments."
    }
  ];

  // Process steps
  const process = [
    {
      title: "Consultation & Brief",
      description: "We begin by understanding your requirements, aspirations, constraints, and budget to establish a clear project brief."
    },
    {
      title: "Conceptual Design",
      description: "Our team develops initial design concepts and spatial strategies that address your needs while exploring creative possibilities."
    },
    {
      title: "Design Development",
      description: "We refine the chosen concept into detailed plans, including materials, systems, and technical specifications."
    },
    {
      title: "Documentation",
      description: "Comprehensive construction documents are prepared to ensure accurate implementation of the design vision."
    },
    {
      title: "Construction Supervision",
      description: "Our architects oversee the construction process to ensure quality, adherence to design intent, and timely completion."
    }
  ];

  // FAQ
  const faq = [
    {
      question: "What types of projects do you handle?",
      answer: "We have expertise in a wide range of projects including residential homes, commercial spaces, healthcare facilities, educational institutions, and mixed-use developments."
    },
    {
      question: "How long does the design process typically take?",
      answer: "The timeline varies based on project scope and complexity. Small projects might take 2-3 months for design, while larger projects can take 6-12 months before construction begins."
    },
    {
      question: "Do you incorporate sustainable design principles?",
      answer: "Yes, sustainability is integral to our design philosophy. We implement energy-efficient systems, sustainable materials, and environmentally responsible practices in all our projects."
    },
    {
      question: "Can you work within my established budget?",
      answer: "Absolutely. We develop designs that respect your budget constraints while maximizing value and quality. We provide transparent cost estimates throughout the process."
    }
  ];

  return (
    <ServicePageTemplate
      title="Architecture & Design"
      subtitle="Creating inspiring spaces that blend form, function, and sustainability"
      backgroundImage={architectureHeaderImg}
      serviceIcon={serviceIcon}
      serviceContent={serviceContent}
      features={features}
      process={process}
      faq={faq}
    />
  );
}

export default Architecture;