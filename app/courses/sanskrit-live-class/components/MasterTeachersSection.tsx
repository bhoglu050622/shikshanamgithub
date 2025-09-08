'use client';

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
              <h3 className="teacher-name">Walushka Bahuguna</h3>
              <p className="teacher-university">Central Sanskrit University, Shringeri, Karnataka</p>
              <p className="teacher-title">Mastery in Spoken Sanskrit</p>
              <p className="teacher-desc">Experience the beauty of Sanskrit through immersive, fluent conversation and unlock the wisdom of ancient texts.</p>
              <div className="stats">
                <div className="stat-item">
                  {/* Icon: University/Education */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.48L6.26 8 12 5.11 17.74 8 12 11.48zM17 19l-5-2.18L7 19V9.7l5 2.72 5-2.72V19z"></path>
                  </svg>
                  <span className="stat-text"><strong>Acharya in Nyaya Shastra</strong></span>
                </div>
                <div className="stat-item">
                  {/* Icon: Gurukul/Experience */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path>
                  </svg>
                  <span className="stat-text"><strong>7</strong> Years Shastra Learning Experience</span>
                </div>
                <div className="stat-item">
                  {/* Icon: Award/Medal */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15-3.5-3.5 1.41-1.41L11 13.17l5.59-5.59L18 9l-7 7z"></path>
                  </svg>
                  <span className="stat-text">Gold Medalist</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Guests Section */}
        <div className="special-guests-section">
          <h3 className="guests-heading">Special classmates</h3>
          <p className="guests-subheading">Every weekend, join exclusive sessions with leading creators and learners from the Dharmic community.</p>
          <div className="guest-creators-list">
            <div className="creator-profile">
              <img 
                src="https://placehold.co/80x80/2c323b/f39c12?text=VC" 
                alt="Vishal Chaurasia" 
                className="creator-avatar"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/80x80/2c323b/f39c12?text=VC';
                }}
              />
              <div className="creator-info">
                <h4 className="creator-name">Vishal Chaurasia</h4>
                <p className="creator-desc">A renowned creator making ancient wisdom accessible for modern audiences.</p>
              </div>
            </div>
            <div className="creator-profile">
              <div className="creator-avatar-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
                </svg>
              </div>
              <div className="creator-info">
                <h4 className="creator-name">More Dharmic Learners</h4>
                <p className="creator-desc">Engage with scholars, artists, and practitioners dedicated to exploring Dharmic knowledge.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* "Start Your Journey" Button */}
        <a 
          href="https://shikshanam.in/sanskrit-live-class/#:~:text=Instructions%20/%20%E0%A4%A8%E0%A4%BF%E0%A4%B0%E0%A5%8D%E0%A4%A6%E0%A5%87%E0%A4%B6-,%3A,-20%20Questions%20/%2020" 
          className="start-journey-btn"
        >
          Start Your Journey
        </a>
      </div>
    </div>
  );
}
