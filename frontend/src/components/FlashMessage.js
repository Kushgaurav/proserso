import React from 'react';
import '../styles/shared.css';

function FlashMessage({ type = 'info', message, onClose }) {
  if (!message) return null;

  return (
    <div className={`flash-message ${type}`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} aria-label="Close message">
          ×
        </button>
      )}
    </div>
  );
}

export default FlashMessage;