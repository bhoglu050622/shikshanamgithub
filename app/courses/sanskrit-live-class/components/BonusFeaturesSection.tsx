'use client';
import Image from 'next/image';

export default function BonusFeaturesSection() {
  return (
    <div id="bonus-features-component">
      <div className="bonus-wrapper">
        <h2 className="bonus-main-heading">Exclusive Sanskrit Learning Bonuses! 📜✨</h2>
        <p className="bonus-sub-heading">Extra benefits to help you master conversational Sanskrit in 3 months</p>

        <div className="bonus-cards-container">
          {/* Card 1 */}
          <div className="bonus-card yellow">
            <div className="ribbon-wrapper">
              <div className="ribbon">BONUS</div>
            </div>
            <div className="bonus-card-content">
              <div className="card-header">
                <div className="bonus-icon">
                  <Image 
                    width={72}
                    height={72}
                    src="https://shikshanam.in/wp-content/uploads/2025/08/icons-features-Recovered-212.png" 
                    alt="Learning Material Icon" 
                    className="animate-all"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/72x72/fdebd0/e67e22?text=Icon';
                    }}
                  />
                </div>
                <span className="bonus-pill">Resources</span>
              </div>
              <h3 className="bonus-title">Sanskrit Learning Material</h3>
              <p className="bonus-desc">Access curated PDFs and notes to support your learning.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bonus-card yellow">
            <div className="ribbon-wrapper">
              <div className="ribbon">BONUS</div>
            </div>
            <div className="bonus-card-content">
              <div className="card-header">
                <div className="bonus-icon">
                  <Image 
                    width={72}
                    height={72}
                    src="https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-202.png" 
                    alt="Practice Sheets Icon" 
                    className="animate-all"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/72x72/fdebd0/e67e22?text=Icon';
                    }}
                  />
                </div>
                <span className="bonus-pill">Practice</span>
              </div>
              <h3 className="bonus-title">Weekly Practice Activities</h3>
              <p className="bonus-desc">Reinforce your lessons with exercises.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bonus-card yellow">
            <div className="ribbon-wrapper">
              <div className="ribbon">BONUS</div>
            </div>
            <div className="bonus-card-content">
              <div className="card-header">
                <div className="bonus-icon">
                  <Image 
                    width={72}
                    height={72}
                    src="https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-208.png" 
                    alt="Private WhatsApp Group Icon" 
                    className="animate-all"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/72x72/fdebd0/e67e22?text=Icon';
                    }}
                  />
                </div>
                <span className="bonus-pill">Community</span>
              </div>
              <h3 className="bonus-title">Private WhatsApp Group</h3>
              <p className="bonus-desc">Connect with fellow learners, share practice clips & get ongoing support</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bonus-card blue">
            <div className="ribbon-wrapper">
              <div className="ribbon">BONUS</div>
            </div>
            <div className="bonus-card-content">
              <div className="card-header">
                <div className="bonus-icon">
                  <Image 
                    width={72}
                    height={72}
                    src="https://shikshanam.in/wp-content/uploads/2025/08/icons-features-Recovered-211.png" 
                    alt="Course Access Icon" 
                    className="animate-all"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/72x72/d6eaf8/3498db?text=Icon';
                    }}
                  />
                </div>
                <span className="bonus-pill">Access</span>
              </div>
              <h3 className="bonus-title">3-Month &nbsp;Live&nbsp;Course Access+ 1yr Recordings Access</h3>
              <p className="bonus-desc">Access live classes for 3 months and revisit recordings for a full year.</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bonus-card blue">
            <div className="ribbon-wrapper">
              <div className="ribbon">BONUS</div>
            </div>
            <div className="bonus-card-content">
              <div className="card-header">
                <div className="bonus-icon">
                  <Image 
                    width={72}
                    height={72}
                    src="https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-206.png" 
                    alt="Certificate of Completion Icon" 
                    className="animate-all"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/72x72/d6eaf8/3498db?text=Icon';
                    }}
                  />
                </div>
                <span className="bonus-pill">Achievement</span>
              </div>
              <h3 className="bonus-title">Certificate of Completion</h3>
              <p className="bonus-desc">Recognition for successfully completing all 24 classes</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bonus-card blue">
            <div className="ribbon-wrapper">
              <div className="ribbon">BONUS</div>
            </div>
            <div className="bonus-card-content">
              <div className="card-header">
                <div className="bonus-icon">
                  <Image 
                    width={72}
                    height={72}
                    src="https://shikshanam.in/wp-content/uploads/2025/08/icons-features-Recovered-213.png" 
                    alt="Priority Access Icon" 
                    className="animate-all"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/72x72/d6eaf8/3498db?text=Icon';
                    }}
                  />
                </div>
                <span className="bonus-pill">Exclusive</span>
              </div>
              <h3 className="bonus-title">Priority Access to Future Courses</h3>
              <p className="bonus-desc">
                Be the first to enroll in advanced Sanskrit programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
