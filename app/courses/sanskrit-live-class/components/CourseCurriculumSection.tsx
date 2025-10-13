'use client';

import { useState } from 'react';

interface Lesson {
  title: string;
  type: string;
  duration: string;
}

interface Module {
  moduleNumber: number;
  title: string;
  description: string;
  tag: string;
  lessons: Lesson[];
}

export default function CourseCurriculumSection() {
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [showAll, setShowAll] = useState(false);

  // All curriculum data for the Sanskrit course
  const curriculumData: Module[] = [
    { moduleNumber: 1, title: 'Meet & Greet in Sanskrit', description: 'Learn basic greetings and polite expressions.', tag: 'Conversation', lessons: [ { title: 'Polite Expressions', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 2, title: 'Introduce Yourself!', description: 'Ask for and give names for yourself and others.', tag: 'Conversation', lessons: [ { title: 'Pronouns: He, She, I', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 3, title: 'Here, There & Everywhere!', description: 'Use location words to talk about places.', tag: 'Vocabulary', lessons: [ { title: 'Pointing at Objects', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 4, title: 'Who Owns This?', description: 'Learn to talk about possession and ownership.', tag: 'Grammar', lessons: [ { title: 'Forming "Whose" Questions', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 5, title: 'Say What You\'re Doing!', description: 'Describe simple actions like eating or reading.', tag: 'Verbs', lessons: [ { title: 'Simple Sentence Building', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 6, title: 'Count Like a Pro!', description: 'Master numbers for everyday situations.', tag: 'Vocabulary', lessons: [ { title: 'Counting Objects', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 7, title: 'Tell the Time!', description: 'Learn how to ask for and tell the time.', tag: 'Conversation', lessons: [ { title: 'Telling Time (Hours)', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 8, title: 'Where Is It?', description: 'Describe object locations and positions.', tag: 'Vocabulary', lessons: [ { title: 'Describing Object Locations', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 9, title: 'Talking About Days!', description: 'Discuss days like today, yesterday, and tomorrow.', tag: 'Vocabulary', lessons: [ { title: 'Using Today, Yesterday, Tomorrow', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 10, title: 'When We Do It Together!', description: 'Use plural verbs for group actions.', tag: 'Grammar', lessons: [ { title: 'Group Action Sentences', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 11, title: 'Left, Right & All Around!', description: 'Learn directions and key question words.', tag: 'Vocabulary', lessons: [ { title: 'Asking for Directions', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 12, title: 'Narrate Past and Future Events!', description: 'Talk about past and future events.', tag: 'Grammar', lessons: [ { title: 'Recounting Your Day', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 13, title: 'After Doing This…', description: 'Connect sentences using conjunctions.', tag: 'Grammar', lessons: [ { title: 'Combining Simple Sentences', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 14, title: 'Add Color to Your Words!', description: 'Expand your vocabulary with descriptive words.', tag: 'Vocabulary', lessons: [ { title: 'Describing People and Things', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 15, title: 'Sanskrit for Fun Chats!', description: 'Practice fun, conversational scenarios.', tag: 'Conversation', lessons: [ { title: 'Understanding Gender in Nouns', type: 'Practice Exercise', duration: '✍️' } ] }
  ];

  const toggleModule = (moduleNumber: number) => {
    setExpandedModule(expandedModule === moduleNumber ? null : moduleNumber);
  };

  return (
    <div id="curriculum-component">
      <div className={`curriculum-wrapper ${showAll ? 'show-all' : ''}`}>
        <div className="curriculum-pill">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          Sanskrit Course
        </div>
        <h2 className="curriculum-main-heading">Your Journey into Conversational Sanskrit</h2>
        <p className="curriculum-sub-heading">Our 15-module course for everyday conversational Sanskrit.</p>
        
        <div className="accordion-container">
          {curriculumData.map((module) => (
            <div 
              key={module.moduleNumber}
              className={`module-item ${expandedModule === module.moduleNumber ? 'expanded' : ''} ${module.moduleNumber > 2 ? 'initially-hidden' : ''}`}
            >
              <div className="module-header" onClick={() => toggleModule(module.moduleNumber)}>
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">{module.title}</h3>
                    <span className="module-tag">{module.tag}</span>
                  </div>
                  <p className="module-desc">{module.description}</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>{module.lessons.length} Lesson{module.lessons.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module {module.moduleNumber}</span>
                  <div className="expand-text">
                    <span>{expandedModule === module.moduleNumber ? 'Collapse' : 'Expand'}</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  {module.lessons.map((lesson, index) => (
                    <div key={index} className="lesson-item">
                      <div className="lesson-icon">
                        <span>{lesson.duration}</span>
                      </div>
                      <div className="lesson-info">
                        <h4 className="lesson-title">{lesson.title}</h4>
                        <p className="lesson-type">{lesson.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="show-all-button" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show Less' : 'Show Entire Curriculum'}
        </button>
      </div>
    </div>
  );
}