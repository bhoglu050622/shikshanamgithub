'use client';

export default function ShlokaSection() {
  return (
    <div id="shloka-section-container">
      {/* The main banner containing the shloka */}
      <div className="shloka-banner">
        <div className="shloka-container">
          {/* Symbol/Logo */}
          <div className="shloka-symbol">
            <img 
              src="https://shikshanam.in/wp-content/uploads/2024/03/logo-white-1.png" 
              alt="Shikshanam Logo"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          {/* Vertical Divider */}
          <div className="divider"></div>
          {/* Text container for Hindi and English */}
          <div className="shloka-text">
            <p className="shloka-hindi">भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती ॥</p>
            {/* English Translation */}
            <p className="shloka-translation">Among all languages, sweet and divine is the speech of the gods — Sanskrit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
