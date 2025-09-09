'use client';
import Image from 'next/image';

export default function BonusFeaturesSection() {
  return (
    <div id="kashmir-receive-section">
      <div className="receive-wrapper">
        <h2 className="main-heading">Exclusive <span className="text-accent">Bonus Features!</span> 🎉</h2>
        <p className="sub-heading">A complete spiritual education designed for lasting transformation</p>

        <div className="features-grid">
          {/* Card 1: Wisdom Chapters */}
          <div className="feature-card">
            <div className="feature-icon">
              <Image width={512} height={512} src="https://shikshanam.in/wp-content/uploads/2025/07/1.png" alt="Wisdom Chapters Icon" />
            </div>
            <h3 className="feature-title">20 Wisdom-filled Chapters</h3>
            <p className="feature-desc">Comprehensive teachings that blend ancient wisdom with practical application.</p>
          </div>

          {/* Card 2: Transformational Activities */}
          <div className="feature-card">
            <div className="feature-icon">
              <Image width={512} height={512} src="https://shikshanam.in/wp-content/uploads/2025/07/2.png" alt="Transformational Activities Icon" />
            </div>
            <h3 className="feature-title">4 Transformational Activities</h3>
            <p className="feature-desc">Practical exercises to clear mental blocks and make your self-awareness a steady, natural state.</p>
          </div>

          {/* Card 3: Daily Inner Practices */}
          <div className="feature-card">
            <div className="feature-icon">
              <Image width={512} height={512} src="https://shikshanam.in/wp-content/uploads/2025/07/3.png" alt="Daily Inner Practices Icon" />
            </div>
            <h3 className="feature-title">Daily Inner Practices</h3>
            <p className="feature-desc">Simple yet profound techniques for maintaining Śiva-awareness throughout your day.</p>
          </div>

          {/* Card 4: Sacred Tools */}
          <div className="feature-card">
            <div className="feature-icon">
              <Image width={512} height={512} src="https://shikshanam.in/wp-content/uploads/2025/07/4.png" alt="Sacred Tools Icon" />
            </div>
            <h3 className="feature-title">Sacred Tools</h3>
            <p className="feature-desc">Journal, Tracker, and Guide to support your inner transformation.</p>
          </div>

          {/* Card 5: Guided Meditations */}
          <div className="feature-card">
            <div className="feature-icon">
              <Image width={512} height={512} src="https://shikshanam.in/wp-content/uploads/2025/07/6.png" alt="Guided Meditations Icon" />
            </div>
            <h3 className="feature-title">Guided Meditations</h3>
            <p className="feature-desc">Audio practices to help you access deeper states of consciousness and stillness.</p>
          </div>

          {/* Card 6: Premium Additions */}
          <div className="feature-card">
            <div className="feature-icon">
              <Image width={512} height={512} src="https://shikshanam.in/wp-content/uploads/2025/07/5.png" alt="Premium Additions Icon" />
            </div>
            <h3 className="feature-title">Premium Additions</h3>
            <p className="feature-desc">Exclusive community access and a course completion certificate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
