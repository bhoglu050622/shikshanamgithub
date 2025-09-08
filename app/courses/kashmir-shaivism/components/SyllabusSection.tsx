'use client';

import { useEffect, useRef, useState } from 'react';

export default function SyllabusSection() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const syllabusData = [
    { title: "चिति (शिव शक्ति) का प्रयोजन", duration: "15:00" },
    { title: "विश्व का प्रकटीकरण", duration: "12:00" },
    { title: "ग्राह्य-ग्राहक भेद", duration: "10:00" },
    { title: "जीव में संकुचित विश्व", duration: "11:00" },
    { title: "चिति द्वारा संकोच ग्रहण", duration: "09:00" },
    { title: "माया का स्वरूप", duration: "07:00" },
    { title: "चिति के विभिन्न आयाम", duration: "14:00" },
    { title: "दर्शनों की कल्पित स्थितियाँ", duration: "08:00" },
    { title: "तीन मलों का आविर्भाव", duration: "09:00" },
    { title: "जीव के पंचकृत्य", duration: "10:00" },
    { title: "पंचकृत्य की अवस्थाएँ", duration: "06:48" },
    { title: "पंचकृत्य की अज्ञानता", duration: "13:00" },
    { title: "पंचकृत्य का बोध", duration: "10:00" },
    { title: "चित्त का ऊर्ध्वगमन", duration: "11:00" },
    { title: "विषय-बंधनों से आत्मसात", duration: "09:00" },
    { title: "विदेह एकत्वबोध", duration: "07:00" },
    { title: "मध्य के विकास से चिदानन्द लाभ", duration: "10:00" },
    { title: "मध्य विकास के उपाय", duration: "12:00" },
    { title: "शिव में शाश्वत समाधि", duration: "08:00" },
    { title: "शिव का स्वभाव बोध", duration: "15:00" }
  ];

  const activityData = [
    { title: "Transcending KĀLA KANCHUKA", description: "Engage in practices to overcome the limitation of time and experience the eternal now." },
    { title: "Breaking NIYATI KANCHUKA", description: "Learn techniques to dissolve the illusion of fate and reclaim your creative power." },
    { title: "Expanding KALĀ KANCHUKA", description: "Activities designed to move beyond the sense of limited authorship and recognize your infinite potential." },
    { title: "Transcending VIDYA KANCHUKA", description: "Exercises to see beyond limited knowledge and access the universal wisdom within." },
    { title: "Discovering the Ananda Within", description: "Our capstone activity guides you to the direct experience of the innate bliss of your true nature." }
  ];

  const moduleData = [
    { title: "Module 1: Discovering Shiva", subtitle: "Unveiling the essence of Shiva Tattva" },
    { title: "Module 2: Separation from Shiva", subtitle: "How the One becomes the many" },
    { title: "Module 3: Returning to Shiva", subtitle: "Your journey back to its source" },
    { title: "Module 4: Becoming Shiva", subtitle: "Merging into ultimate oneness" }
  ];

  useEffect(() => {
    // Intersection Observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('#kashmir-syllabus-accordion .animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div id="kashmir-syllabus-accordion">
      <div className="syllabus-wrapper">
        <h2 className="main-heading animate-on-scroll">
          Course <span className="text-accent">Curriculum</span>
        </h2>

        <div className="accordion-container">
          {moduleData.map((module, moduleIndex) => {
            const videoChapters = syllabusData.slice(moduleIndex * 5, (moduleIndex + 1) * 5);
            const isOpen = openAccordion === moduleIndex;
            
            return (
              <div key={moduleIndex}>
                {/* Module Accordion */}
                <div className="accordion-item animate-on-scroll" style={{ animationDelay: `${moduleIndex * 0.2}s` }}>
                  <div className="accordion-header" onClick={() => toggleAccordion(moduleIndex)}>
                    <div className="accordion-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <div className="accordion-title-area">
                      <h3 className="accordion-title">{module.title}</h3>
                      <div className="accordion-meta">
                        <span>{module.subtitle}</span>
                      </div>
                    </div>
                    <div className="accordion-toggle">
                      <span>{isOpen ? 'Collapse' : 'Expand'}</span>
                      <svg 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className={`accordion-content ${isOpen ? 'is-open' : ''}`}>
                    <div className="accordion-content-inner">
                      {videoChapters.map((chapter, chapterIndex) => (
                        <div key={chapterIndex} className="lesson-item">
                          <div className="lesson-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="lesson-title font-tiro-hindi">
                              Chapter {moduleIndex * 5 + chapterIndex + 1}: {chapter.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Activity Card */}
                <div className="activity-card animate-on-scroll" style={{ animationDelay: `${(moduleIndex * 0.2) + 0.1}s` }}>
                  <div className="accordion-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </div>
                  <div className="accordion-title-area">
                    <h3 className="accordion-title">{activityData[moduleIndex].title}</h3>
                    <p className="feature-desc">{activityData[moduleIndex].description}</p>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Final Activity Card */}
          <div className="activity-card animate-on-scroll" style={{ animationDelay: '0.9s' }}>
            <div className="accordion-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </div>
            <div className="accordion-title-area">
              <h3 className="accordion-title">{activityData[4].title}</h3>
              <p className="feature-desc">{activityData[4].description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
