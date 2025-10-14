'use client';

import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function MasterTeachersSection() {
  return (
    <div id="master-teachers-component">
      <div className="teachers-wrapper">
        <h2 className="main-heading">Meet Your Master</h2>
        <p className="sub-heading">Get a preview of the profound teachings that await you in this transformative course</p>

        <div className="cards-container">
          {/* Teacher Card */}
          <div className="teacher-card">
            <div className="video-placeholder orange">
              {/* Video placeholder with background image */}
            </div>
            <div className="card-content">
              <h3 className="teacher-name">Niranjan Bhat</h3>
              <p className="teacher-university">Uttara Kannada District, Karnataka</p>
              <p className="teacher-title">Vedic Scholar & Sanskrit Teacher</p>
              <p className="teacher-desc">A dedicated Sanskrit teacher with extensive experience in Vedic studies and a passion for conducting immersive Sanskrit camps.</p>
              <div className="stats">
                <div className="stat-item">
                  {/* Icon: University/Education */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.48L6.26 8 12 5.11 17.74 8 12 11.48zM17 19l-5-2.18L7 19V9.7l5 2.72 5-2.72V19z"></path>
                  </svg>
                  <span className="stat-text"><strong>Shastri, Acharya & B.Ed</strong></span>
                </div>
                <div className="stat-item">
                  {/* Icon: Gurukul/Experience */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path>
                  </svg>
                  <span className="stat-text"><strong>4+</strong> Years Vedic Study</span>
                </div>
                <div className="stat-item">
                  {/* Icon: People/Group */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
                  </svg>
                  <span className="stat-text">Conducted <strong>Several</strong> Sanskrit Camps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* "Start Your Journey" Button */}
        <ProtectedExternalLink 
          href="https://courses.shikshanam.in/single-checkout/68e60a1bc79998642e10ed0d?pid=p1" 
          className="start-journey-btn"
        >
          Start Your Journey
        </ProtectedExternalLink>
      </div>
    </div>
  );
}

