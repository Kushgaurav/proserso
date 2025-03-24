import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import eventHeaderImg from '../assets/images/event-header.jpg';

function Event() {
  // Service overview content
  const serviceIcon = <i className="fas fa-calendar-check"></i>;
  const serviceContent = (
    <>
      <h2>Event Management Services</h2>
      <p>Proserso's Event Management services offer end-to-end solutions for planning, organizing, and executing exceptional events that leave lasting impressions. From corporate conferences and product launches to trade shows and gala celebrations, we handle every detail with precision and creativity.</p>
      <p>Our experienced team of event professionals combines strategic thinking with flawless execution to deliver memorable experiences that align with your objectives and exceed your expectations. We leverage our extensive network of venues, vendors, and industry partners to create customized events that reflect your brand and engage your audience.</p>
    </>
  );

  // Key features
  const features = [
    {
      icon: <i className="fas fa-users"></i>,
      title: "Corporate Events",
      description: "Professional conferences, team-building activities, and company milestones designed to achieve your business objectives."
    },
    {
      icon: <i className="fas fa-bullhorn"></i>,
      title: "Product Launches",
      description: "Strategic events that generate excitement and maximize visibility for your new products or services."
    },
    {
      icon: <i className="fas fa-handshake"></i>,
      title: "Trade Shows & Exhibitions",
      description: "Impactful booth designs and engaging experiences that attract visitors and generate leads."
    },
    {
      icon: <i className="fas fa-glass-cheers"></i>,
      title: "Gala Dinners & Awards",
      description: "Sophisticated celebrations that recognize achievements and foster connections."
    },
    {
      icon: <i className="fas fa-chalkboard-teacher"></i>,
      title: "Workshops & Seminars",
      description: "Knowledge-sharing events that educate and inspire your audience with interactive content."
    },
    {
      icon: <i className="fas fa-video"></i>,
      title: "Virtual & Hybrid Events",
      description: "Innovative digital experiences that connect global audiences through cutting-edge technology."
    }
  ];

  // Process steps
  const process = [
    {
      title: "Consultation & Brief",
      description: "We begin by understanding your event objectives, target audience, budget, and vision to create a comprehensive event brief."
    },
    {
      title: "Concept Development",
      description: "Our creative team develops unique event concepts, themes, and experiences that align with your goals and brand identity."
    },
    {
      title: "Planning & Logistics",
      description: "We handle all logistical elements including venue selection, vendor management, scheduling, and technical requirements."
    },
    {
      title: "Production & Execution",
      description: "Our team manages the event day operations with meticulous attention to detail, ensuring a seamless experience for all attendees."
    },
    {
      title: "Post-Event Analysis",
      description: "We provide comprehensive reporting and analysis to measure event success against objectives and identify insights for future events."
    }
  ];

  // FAQ
  const faq = [
    {
      question: "How far in advance should I book event management services?",
      answer: "For large events (200+ attendees), we recommend booking 6-12 months in advance. For smaller events, 3-6 months is typically sufficient to ensure proper planning and venue availability."
    },
    {
      question: "Can you work within my established budget?",
      answer: "Yes, we develop customized event solutions to match various budget levels. We're transparent about costs and help you prioritize elements that will create the most impact within your budget constraints."
    },
    {
      question: "How do you handle unexpected challenges during events?",
      answer: "Our experienced team creates detailed contingency plans for each event. We anticipate potential issues and have established protocols to address them quickly and effectively with minimal disruption."
    },
    {
      question: "Do you handle international events?",
      answer: "Yes, we have experience managing events worldwide. Our global network of partners ensures we can deliver exceptional experiences regardless of location, while navigating local regulations and cultural considerations."
    }
  ];

  return (
    <ServicePageTemplate
      title="Event Management"
      subtitle="Creating memorable experiences that bring your vision to life"
      backgroundImage={eventHeaderImg}
      serviceIcon={serviceIcon}
      serviceContent={serviceContent}
      features={features}
      process={process}
      faq={faq}
    />
  );
}

export default Event;