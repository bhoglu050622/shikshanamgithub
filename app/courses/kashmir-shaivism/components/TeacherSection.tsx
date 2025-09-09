'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function TeacherSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoPlaceholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const component = sectionRef.current;
    if (!component || component.dataset.initialized) {
      return;
    }
    component.dataset.initialized = 'true';

    const videoPlaceholder = videoPlaceholderRef.current;

    if (videoPlaceholder) {
      const handleVideoClick = () => {
        const videoId = videoPlaceholder.dataset.videoId;
        if (videoId) {
          const iframe = document.createElement('iframe');
          iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
          iframe.setAttribute('width', '100%');
          iframe.setAttribute('height', '100%');
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
          iframe.setAttribute('allowfullscreen', '');

          videoPlaceholder.innerHTML = '';
          videoPlaceholder.style.height = '100%';
          videoPlaceholder.appendChild(iframe);
        }
      };

      videoPlaceholder.addEventListener('click', handleVideoClick, { once: true });
    }
  }, []);

  const stats = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path>
        </svg>
      ),
      text: <><strong>1.5M</strong> Subscribers</>
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.2,5.2 0 0,1 16.2,21.4H7.8C4.6,21.4 2,18.8 2,15.6V7.8A5.2,5.2 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M16.5,5.5A1.5,1.5 0 0,1 18,7A1.5,1.5 0 0,1 16.5,8.5A1.5,1.5 0 0,1 15,7A1.5,1.5 0 0,1 16.5,5.5Z"></path>
        </svg>
      ),
      text: <><strong>450K</strong> Followers</>
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17,2V5H14C13.4,5 13,5.4 13,6V8H16L15.5,11H13V20H10V11H7V8H10V6C10,3.8 11.3,2 14,2H17Z"></path>
        </svg>
      ),
      text: <><strong>500K</strong> Followers</>
    }
  ];

  return (
    <div id="kashmir-teacher-section" ref={sectionRef}>
      <div className="teachers-wrapper">
        <h2 className="main-heading">
          Meet Your <span className="text-accent">Teacher</span>
        </h2>
        <p className="sub-heading">
          Get a preview of the profound teachings that await you in this transformative course.
        </p>

        <div className="teacher-card">
          <div className="card-grid-container">
            <div 
              className="video-placeholder" 
              ref={videoPlaceholderRef}
              data-video-id="oppR6FUIPno"
            >
              <Image 
                src="https://shikshanam.in/wp-content/uploads/2024/05/1.png" 
                alt="Vishal Chaurasia" 
                width={400}
                height={500}
                className="teacher-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/400x500/374151/FFFFFF?text=Video+Not+Found';
                }}
              />
              <div className="play-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </div>
            </div>
            <div className="card-content">
              <h3 className="teacher-name">Vishal Chaurasia</h3>
              <p className="teacher-title">Exploring the Heart of Self-Recognition</p>
              <div className="stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    {stat.icon}
                    <span className="stat-text">{stat.text}</span>
                  </div>
                ))}
              </div>
              <p className="teacher-desc">
                An IIT graduate with a profound passion for philosophy, Vishal Chaurasia makes the timeless wisdom of Kashmir Shaivism accessible and relevant for the modern world, focusing on the direct recognition (Pratyabhijñā) of your own divine consciousness.
              </p>
            </div>
          </div>
        </div>
        
        <a 
          href="https://shikshanam.in/kashmir-shaivism/#:~:text=Invest%20in%20your%20spiritual%20transformation%20with%20confidence" 
          className="start-journey-btn"
        >
          Start Your Journey
        </a>
      </div>
    </div>
  );
}
