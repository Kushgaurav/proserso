import React from 'react';
import '../styles/shared.css';

function LoadingSpinner({ size = 'medium' }) {
  const spinnerSize = {
    small: { width: '20px', height: '20px' },
    medium: { width: '40px', height: '40px' },
    large: { width: '60px', height: '60px' }
  }[size];

  return (
    <div className="loading-container">
      <div 
        className="loading-spinner"
        style={spinnerSize}
      ></div>
    </div>
  );
}

export default LoadingSpinner;