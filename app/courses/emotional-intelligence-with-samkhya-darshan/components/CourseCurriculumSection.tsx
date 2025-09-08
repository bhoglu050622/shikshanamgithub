'use client'

import { useRef, useState } from 'react'

interface Lesson {
  title: string
  type: string
  duration: string
}

interface Module {
  moduleNumber: number
  title: string
  description: string
  tag: string
  totalTime: string
  lessons?: Lesson[]
  isProfiler?: boolean
  profilerLink?: string
  isReport?: boolean
  activityTitle?: string
  reportDetails?: string[]
}

export default function CourseCurriculumSection() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null) // Start with no modules expanded
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  const curriculumData: Module[] = [
    { 
      moduleNumber: 0, 
      title: 'Guna Profiler', 
      description: 'Discover Your Guṇa-Based Profile to Start Your Personalised Journey', 
      tag: 'Self-Discovery', 
      totalTime: '5 mins', 
      isProfiler: true, 
      profilerLink: 'https://shikshanam.in/guna-profiler/' 
    },
    { 
      moduleNumber: 1, 
      title: 'Emotional Intelligence – The Foundation', 
      description: 'Understand the philosophical and practical basis of emotional intelligence.', 
      tag: 'Self-Awareness', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Introduction to Emotions & Sāṅkhya Darśana', type: 'Video Class', duration: '🎥' }, 
        { title: 'Emotional Confusion in Modern Life', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'What are the emotional challenges in your life? How to deal with that?', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 2, 
      title: 'Kāma-Krodha (Desire & Anger)', 
      description: 'Learn to observe and manage the powerful emotions of desire and anger.', 
      tag: 'Core Emotions', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Desire as the Root of Anger', type: 'Video Class', duration: '🎥' }, 
        { title: 'Everyday Triggers + Self-Inquiry Practices', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Desire–Reaction Tracker', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 3, 
      title: 'Moha (Attachment)', 
      description: 'Explore the nature of attachment and the freedom in letting go.', 
      tag: 'Mindfulness', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Nature of Attachment & Letting Go', type: 'Video Class', duration: '🎥' }, 
        { title: 'Identifying Emotional Dependency', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Liberation Writing', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 4, 
      title: 'Bhaya (Fear)', 
      description: 'A deep inquiry into the roots of your fears and how to dissolve them.', 
      tag: 'Inner Work', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Identify Fears through Guṇas', type: 'Video Class', duration: '🎥' }, 
        { title: 'Understanding Root Fears & Facing Them', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Fear Inquiry Sheet', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 5, 
      title: 'Īrṣyā (Jealousy)', 
      description: 'Transform comparison and jealousy into self-gratitude.', 
      tag: 'Self-Love', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Jealousy as Distorted Self-Perception', type: 'Video Class', duration: '🎥' }, 
        { title: 'Turning Comparison into Self-Gratitude', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Self-Gratitude Mirror Practice', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 6, 
      title: 'Nāśā (Craving / Addiction)', 
      description: 'Understand addictive patterns and reclaim your focus.', 
      tag: 'Discipline', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Pleasure & Dependence in the Mind', type: 'Video Class', duration: '🎥' }, 
        { title: 'Dopamine Detox & Focus Rebuilding', type: 'Explainer Video', duration: '🎥' }, 
        { title: '1-Day Dopamine Fast', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 7, 
      title: 'Ahaṃkāra (Ego)', 
      description: 'Observe the play of the Gunas within you to understand the ego.', 
      tag: 'Observation', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Ego and Guṇa Dynamics', type: 'Video Class', duration: '🎥' }, 
        { title: 'Self-Tracking to Reduce Ego Influence', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Track Your Guṇas for 3 Days', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 8, 
      title: 'Lobha (Greed)', 
      description: 'Discover the joy of simplicity and contentment.', 
      tag: 'Contentment', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Greed and Inner Insecurity', type: 'Video Class', duration: '🎥' }, 
        { title: 'Minimalist Living for Mental Peace', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Minimalism Day', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 9, 
      title: 'Sādhanā kā Pāthika Krama (Spiritual Practice Design)', 
      description: 'Learn to design a consistent and personalized spiritual routine.', 
      tag: 'Routine Design', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'The Need for Daily Sādhanā', type: 'Video Class', duration: '🎥' }, 
        { title: 'How to Build a Realistic Spiritual Routine', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Daily Routine Blueprint', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 10, 
      title: 'Śarīra kī Svasthatā (Body Purity)', 
      description: 'Cleanse the body to create a clear and pure mind.', 
      tag: 'Purity', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Body as a Sacred Instrument', type: 'Video Class', duration: '🎥' }, 
        { title: 'Morning Cleansing for Clarity & Energy', type: 'Explainer Video', duration: '🎥' }, 
        { title: '15-Minute Morning Cleanse', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 11, 
      title: 'Prāṇa Ūrjā kā Santulana (Pranic Balance)', 
      description: 'Balance your vital life-force energy with powerful breathing techniques.', 
      tag: 'Pranic Balance', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Balancing Iḍā & Piṅgalā', type: 'Video Class', duration: '🎥' }, 
        { title: 'Breath as an Emotional Regulator', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Nāḍī Śodhana Practice', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 12, 
      title: 'Manaḥ kī Sthirātā (Mental Stillness)', 
      description: 'Develop profound concentration and mental stillness.', 
      tag: 'Concentration', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'The Role of Stillness in Sāṅkhya', type: 'Video Class', duration: '🎥' }, 
        { title: 'Trāṭaka & Śāmbhavī for Mental Clarity', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Trāṭaka + Śāmbhavī Mudrā', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 13, 
      title: 'Manaḥ kī Antarmukhatā (Turning Inward)', 
      description: 'Shift your focus from the external to the internal world.', 
      tag: 'Introspection', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'The Journey of Inner Observation', type: 'Video Class', duration: '🎥' }, 
        { title: 'Mantra & Vibration Awareness', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Observe the Inner World', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 14, 
      title: 'Ahaṃkāra kī Śūnyatā (Ego Dissolution)', 
      description: 'Experience the joy of selflessness through acts of service.', 
      tag: 'Selflessness', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Ego and Selfless Karma', type: 'Video Class', duration: '🎥' }, 
        { title: 'Anonymous Kindness as Spiritual Practice', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Anonymous Kind Deed / Observe Your Serving Nature', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 15, 
      title: 'Buddhi kī Vyāpakatā (Expanded Wisdom)', 
      description: 'Learn to apply spiritual wisdom to your everyday life challenges.', 
      tag: 'Action', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'Viveka (Discrimination) as Spiritual Maturity', type: 'Video Class', duration: '🎥' }, 
        { title: 'Applying Learnings to Real Life', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Wisdom in Action', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 16, 
      title: 'Citta kī Śuddhatā (Purity of Consciousness)', 
      description: 'Learn to witness your thoughts and emotions without judgment.', 
      tag: 'Final Practice', 
      totalTime: '25-30 min', 
      lessons: [ 
        { title: 'The Cleansing of Citta in Sāṅkhya', type: 'Video Class', duration: '🎥' }, 
        { title: 'Silent Observation as Inner Cleanse', type: 'Explainer Video', duration: '🎥' }, 
        { title: 'Observe Your Thoughts and Emotions', type: 'Activity', duration: '🧘' } 
      ] 
    },
    { 
      moduleNumber: 17, 
      title: 'Antaryatra ka Darpan (Personalized Emotional Journey Report)', 
      description: 'Generate your final report, a mirror to your inner journey, growth, and future path.', 
      tag: 'Final Report', 
      totalTime: '15 mins', 
      isReport: true,
      activityTitle: 'Activity: Mirror of the Self – Final Guna-Based Assessment',
      reportDetails: [
        'Guna dominance chart over the 16 chapters',
        'Emotional hotspots (anger, fear, attachment, etc.)',
        'Growth highlights: what\'s shifted, what\'s stable',
        'Suggested practices for further inner balance',
        'A custom "Emotional Roadmap" based on their reflections'
      ]
    }
  ]

  const handleModuleToggle = (moduleNumber: number) => {
    setExpandedModule(prevExpanded => prevExpanded === moduleNumber ? null : moduleNumber)
  }

  const renderModuleContent = (module: Module) => {
    if (module.isProfiler) {
      return (
        <div className="lessons-list" style={{ paddingTop: '1rem', borderTop: 'none' }}>
          <p style={{ marginBottom: '1.5rem', textAlign: 'left', color: 'hsl(var(--text-secondary))' }}>
            This simple test will help you identify your dominant Guna (Sattva, Rajas, or Tamas), providing a personalized starting point for your journey.
          </p>
          <a 
            href={module.profilerLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="profiler-button"
            style={{ marginTop: 0 }}
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-6.75 0H7.5" />
            </svg>
            <span>Start Guna Profiler Test</span>
          </a>
        </div>
      )
    }

    if (module.isReport) {
      return (
        <div className="lessons-list">
          <h4 className="report-activity-title">{module.activityTitle}</h4>
          <p style={{ textAlign: 'left', color: 'hsl(var(--text-secondary))', marginTop: '0.5rem' }}>
            This detailed report will cover:
          </p>
          <ul className="report-details">
            {module.reportDetails?.map((detail, index) => (
              <li key={index}>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    }

    return (
      <div className="lessons-list">
        {module.lessons?.map((lesson, index) => (
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
    )
  }

  return (
    <>
      <style jsx>{`
        .curriculum-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          max-width: 1400px;
          width: 100%;
          text-align: center;
          padding: 0 1rem;
        }

        .curriculum-header {
          position: relative;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border-radius: 32px;
          padding: 4rem 3rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(249, 115, 22, 0.1);
          max-width: 900px;
          width: 100%;
        }

        .curriculum-pill {
          background: linear-gradient(135deg, #f97316, #ef4444);
          color: #ffffff;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
          margin-bottom: 2rem;
        }

        .curriculum-pill svg {
          width: 18px;
          height: 18px;
        }

        .curriculum-main-heading {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1f2937, #374151);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 1.5rem 0;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .curriculum-sub-heading {
          font-size: 1.25rem;
          color: #6b7280;
          max-width: 800px;
          line-height: 1.7;
          margin: 0;
          font-weight: 400;
        }

        .curriculum-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2.5rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #f97316, #ef4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.95rem;
          color: #6b7280;
          font-weight: 500;
          margin: 0.5rem 0 0 0;
        }

        .accordion-container {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .module-item {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 28px;
          border: 1px solid rgba(249, 115, 22, 0.08);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          position: relative;
        }

        .module-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f97316, #ef4444);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .module-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          border-color: rgba(249, 115, 22, 0.2);
        }

        .module-item:hover::before {
          opacity: 1;
        }

        .module-item.expanded {
          border-color: rgba(249, 115, 22, 0.3);
          box-shadow: 0 16px 50px rgba(249, 115, 22, 0.15);
          transform: translateY(-4px);
          background: linear-gradient(135deg, #ffffff 0%, #fef7f0 100%);
        }

        .module-item.expanded::before {
          opacity: 1;
        }

        .module-header {
          padding: 2.5rem;
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 160px;
          position: relative;
        }

        .module-header:hover {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.02) 0%, rgba(239, 68, 68, 0.02) 100%);
        }

        .module-icon {
          background: linear-gradient(135deg, #f97316, #ef4444);
          color: #ffffff;
          width: 72px;
          height: 72px;
          min-width: 72px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
          transition: all 0.3s ease;
        }

        .module-item:hover .module-icon {
          transform: scale(1.05);
          box-shadow: 0 12px 25px rgba(249, 115, 22, 0.4);
        }

        .module-icon svg {
          width: 32px;
          height: 32px;
        }

        .module-info {
          text-align: left;
          flex-grow: 1;
        }

        .module-title-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .module-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .module-tag {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(239, 68, 68, 0.1));
          color: #f97316;
          padding: 0.4rem 1rem;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
          border: 1px solid rgba(249, 115, 22, 0.2);
        }

        .module-desc {
          color: hsl(var(--text-secondary));
          font-size: 1rem;
          margin: 0 0 1rem 0;
          line-height: 1.5;
        }

        .module-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          color: hsl(var(--text-secondary));
          font-size: 0.9rem;
          margin-top: auto;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .meta-item svg {
          width: 16px;
          height: 16px;
        }

        .expand-collapse-trigger {
          text-align: right;
          margin-left: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .module-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: hsl(var(--text-secondary));
          margin: 0;
          display: block;
        }

        .expand-text {
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #f97316, #ef4444);
          border-radius: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
          min-width: 140px;
          justify-content: center;
        }

        .expand-text:hover {
          background: linear-gradient(135deg, #ea580c, #dc2626);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
        }

        .expand-text svg {
          width: 18px;
          height: 18px;
          transition: transform 0.4s ease;
          order: 2;
        }

        .expand-text span {
          order: 1;
        }

        .module-item.expanded .expand-text svg {
          transform: rotate(180deg);
        }

        .module-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s ease, opacity 0.3s ease;
          padding: 0 2rem;
          opacity: 0;
        }

        .module-item.expanded .module-content {
          max-height: 2000px;
          padding: 0 2rem 2rem 2rem;
          opacity: 1;
        }

        .lessons-list {
          border-top: 1px solid rgba(249, 115, 22, 0.1);
          padding-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .lesson-item {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.02) 0%, rgba(239, 68, 68, 0.02) 100%);
          border: 1px solid rgba(249, 115, 22, 0.08);
          border-radius: 20px;
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .lesson-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #f97316, #ef4444);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .lesson-item:hover {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(239, 68, 68, 0.05) 100%);
          border-color: rgba(249, 115, 22, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(249, 115, 22, 0.1);
        }

        .lesson-item:hover::before {
          opacity: 1;
        }

        .lesson-icon {
          background: linear-gradient(135deg, #f97316, #ef4444);
          color: #ffffff;
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
          transition: all 0.3s ease;
        }

        .lesson-item:hover .lesson-icon {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
        }

        .lesson-info {
          flex-grow: 1;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .lesson-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .lesson-type {
          font-size: 0.9rem;
          color: #6b7280;
          margin: 0;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .lesson-type::before {
          content: '';
          width: 6px;
          height: 6px;
          background: linear-gradient(135deg, #f97316, #ef4444);
          border-radius: 50%;
        }

        .report-details {
          text-align: left;
          padding: 0;
          margin: 1.5rem 0 0 0;
          list-style: none;
        }

        .report-details li {
          color: #6b7280;
          margin-bottom: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          font-size: 1rem;
          line-height: 1.5;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.02) 0%, rgba(239, 68, 68, 0.02) 100%);
          border-radius: 16px;
          border: 1px solid rgba(249, 115, 22, 0.08);
          transition: all 0.3s ease;
        }

        .report-details li:hover {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(239, 68, 68, 0.05) 100%);
          border-color: rgba(249, 115, 22, 0.15);
          transform: translateX(4px);
        }

        .report-details li svg {
          width: 20px;
          height: 20px;
          min-width: 20px;
          color: #f97316;
          margin-top: 2px;
        }

        .report-activity-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 1.5rem;
          text-align: left;
          letter-spacing: -0.01em;
        }

        .profiler-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: linear-gradient(135deg, #f97316, #ef4444);
          color: #ffffff;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 1.25rem 2.5rem;
          border-radius: 20px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: none;
          cursor: pointer;
          margin-top: 2rem;
          box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
          letter-spacing: 0.01em;
        }

        .profiler-button:hover {
          background: linear-gradient(135deg, #ea580c, #dc2626);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(249, 115, 22, 0.4);
        }

        .profiler-button svg {
          width: 22px;
          height: 22px;
        }


        @media (max-width: 1024px) {
          .accordion-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .curriculum-wrapper {
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .curriculum-header {
            padding: 2.5rem 2rem;
          }
          .curriculum-main-heading {
            font-size: 2.5rem;
          }
          .curriculum-sub-heading {
            font-size: 1.1rem;
          }
          .curriculum-stats {
            gap: 2rem;
            margin-top: 2rem;
          }
          .stat-number {
            font-size: 2rem;
          }
          .module-header {
            padding: 2rem;
            min-height: auto;
          }
          .module-icon {
            width: 64px;
            height: 64px;
            min-width: 64px;
          }
          .module-icon svg {
            width: 28px;
            height: 28px;
          }
          .module-title {
            font-size: 1.2rem;
          }
          .expand-collapse-trigger {
            margin-top: 1rem;
            align-self: stretch;
            align-items: center;
          }
          .expand-text {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
            min-width: 120px;
            gap: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .curriculum-wrapper {
            padding: 0 0.5rem;
          }
          .curriculum-header {
            padding: 2rem 1.5rem;
          }
          .curriculum-main-heading {
            font-size: 2rem;
          }
          .curriculum-stats {
            flex-direction: column;
            gap: 1.5rem;
            margin-top: 1.5rem;
          }
          .module-header {
            padding: 1.5rem;
          }
          .module-content {
            padding: 0 1.5rem;
          }
          .module-item.expanded .module-content {
            padding: 0 1.5rem 1.5rem 1.5rem;
          }
          .lessons-list {
            padding-top: 1.5rem;
            gap: 1rem;
          }
          .lesson-item {
            padding: 1.25rem;
            gap: 1rem;
          }
          .lesson-icon {
            width: 40px;
            height: 40px;
            min-width: 40px;
            font-size: 1.25rem;
          }
          .lesson-title {
            font-size: 1rem;
          }
          .lesson-type {
            font-size: 0.85rem;
          }
          .lesson-item {
            padding: 1rem;
            gap: 0.75rem;
          }
          .lesson-icon {
            width: 36px;
            height: 36px;
            min-width: 36px;
            font-size: 1.1rem;
          }
          .lesson-title {
            font-size: 0.95rem;
          }
          .lesson-type {
            font-size: 0.8rem;
          }
          .expand-text {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
            min-width: 100px;
            gap: 0.4rem;
          }
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className="py-20 bg-parchment-ivory text-slate-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="curriculum-wrapper">
            {/* Header */}
            <div className="curriculum-header">
              <div className="curriculum-pill">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Course Curriculum
              </div>
              
              <h2 className="curriculum-main-heading">A Transformative Learning Journey</h2>
              <p className="curriculum-sub-heading">
                Eighteen modules designed to guide you from ancient principles to modern, practical application for a balanced life.
              </p>
              
              <div className="curriculum-stats">
                <div className="stat-item">
                  <div className="stat-number">18</div>
                  <div className="stat-label">Modules</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">6+</div>
                  <div className="stat-label">Hours</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Lessons</div>
                </div>
              </div>
            </div>
            
            {/* Accordion Container */}
            <div className="accordion-container">
              {curriculumData.map((module) => (
                <div 
                  key={module.moduleNumber} 
                  className={`module-item ${expandedModule === module.moduleNumber ? 'expanded' : ''}`}
                >
                  <div 
                    className="module-header"
                    onClick={() => handleModuleToggle(module.moduleNumber)}
                  >
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
                        {!module.isProfiler && !module.isReport && (
                          <div className="meta-item">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <span>{module.lessons?.length} Lessons</span>
                          </div>
                        )}
                        <div className="meta-item">
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{module.totalTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="expand-collapse-trigger">
                      <span className="module-label">Module {module.moduleNumber}</span>
                      <div 
                        className="expand-text"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleModuleToggle(module.moduleNumber)
                        }}
                      >
                        <span>{expandedModule === module.moduleNumber ? 'Collapse' : 'Expand'}</span>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="module-content"
                    ref={(el) => {
                      contentRefs.current[module.moduleNumber] = el
                    }}
                  >
                    {renderModuleContent(module)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
