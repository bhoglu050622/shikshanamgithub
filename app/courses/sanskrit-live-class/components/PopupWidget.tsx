'use client';

import { useEffect, useState } from 'react';

export default function PopupWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if popup was already dismissed in this session
    const popupDismissed = sessionStorage.getItem('gunaPopupDismissed') === 'true';
    
    if (!popupDismissed) {
      // Show popup after 1 second
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem('gunaPopupDismissed', 'true');
    } catch (e) {
      console.error('SessionStorage is not available.', e);
    }
  };

  const handleStartNow = () => {
    setIsVisible(false);
    window.location.href = 'https://shikshanam.in/sanskrit-live-class/#:~:text=Instructions%20/%20%E0%A4%A8%E0%A4%BF%E0%A4%B0%E0%A5%8D%E0%A4%A6%E0%A5%87%E0%A4%B6-,%3A,-20%20Questions%20/%2020';
  };

  if (!isVisible) return null;

  return (
    <>
      <div 
        id="guna-profiler-popup-overlay"
        className={`${isVisible ? 'show' : ''}`}
        onClick={handleClose}
      />
      <div 
        id="guna-profiler-popup"
        className={`${isVisible ? 'show' : ''}`}
      >
        <div className="popup-header">
          <button 
            id="popup-close-btn"
            onClick={handleClose}
            title="Close"
            aria-label="Close popup"
          >
            &times;
          </button>
          <div className="popup-icon">
            <i className="fas fa-star"></i>
          </div>
          <h3>Only a Few Are Chosen</h3>
        </div>
        <div className="popup-body">
          <p>Find out if you qualify for this Sanskrit program.</p>
          <button 
            id="popup-play-btn"
            onClick={handleStartNow}
          >
            Start Now
          </button>
        </div>
      </div>
    </>
  );
}
