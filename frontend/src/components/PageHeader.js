import React from 'react';
import '../styles/PageHeader.css';

function PageHeader({ title, subtitle, backgroundImage }) {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="header-overlay"></div>
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

export default PageHeader;
