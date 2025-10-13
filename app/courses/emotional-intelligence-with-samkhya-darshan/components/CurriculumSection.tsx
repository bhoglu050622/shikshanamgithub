'use client'

import { useState } from 'react'

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
  isProfiler?: boolean
  profilerLink?: string
  isReport?: boolean
  activityTitle?: string
  reportDetails?: string[]
  lessons?: Lesson[]
}

const curriculumData: Module[] = [
  { moduleNumber: 0, title: 'Guna Profiler', description: 'Discover Your Guṇa-Based Profile to Start Your Personalised Journey', tag: 'Self-Discovery', totalTime: '5 mins', isProfiler: true, profilerLink: 'https://shikshanam.in/guna-profiler/' },
  { moduleNumber: 1, title: 'Emotional Intelligence – The Foundation', description: 'Understand the philosophical and practical basis of emotional intelligence.', tag: 'Self-Awareness', totalTime: '25-30 min', lessons: [ { title: 'Introduction to Emotions & Sāṅkhya Darśana', type: 'Video Class', duration: '🎥' }, { title: 'Emotional Confusion in Modern Life', type: 'Explainer Video', duration: '🎥' }, { title: 'What are the emotional challenges in your life? How to deal with that?', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 2, title: 'Kāma-Krodha (Desire & Anger)', description: 'Learn to observe and manage the powerful emotions of desire and anger.', tag: 'Core Emotions', totalTime: '25-30 min', lessons: [ { title: 'Desire as the Root of Anger', type: 'Video Class', duration: '🎥' }, { title: 'Everyday Triggers + Self-Inquiry Practices', type: 'Explainer Video', duration: '🎥' }, { title: 'Desire–Reaction Tracker', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 3, title: 'Moha (Attachment)', description: 'Explore the nature of attachment and the freedom in letting go.', tag: 'Mindfulness', totalTime: '25-30 min', lessons: [ { title: 'Nature of Attachment & Letting Go', type: 'Video Class', duration: '🎥' }, { title: 'Identifying Emotional Dependency', type: 'Explainer Video', duration: '🎥' }, { title: 'Liberation Writing', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 4, title: 'Bhaya (Fear)', description: 'A deep inquiry into the roots of your fears and how to dissolve them.', tag: 'Inner Work', totalTime: '25-30 min', lessons: [ { title: 'Identify Fears through Guṇas', type: 'Video Class', duration: '🎥' }, { title: 'Understanding Root Fears & Facing Them', type: 'Explainer Video', duration: '🎥' }, { title: 'Fear Inquiry Sheet', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 5, title: 'Īrṣyā (Jealousy)', description: 'Transform comparison and jealousy into self-gratitude.', tag: 'Self-Love', totalTime: '25-30 min', lessons: [ { title: 'Jealousy as Distorted Self-Perception', type: 'Video Class', duration: '🎥' }, { title: 'Turning Comparison into Self-Gratitude', type: 'Explainer Video', duration: '🎥' }, { title: 'Self-Gratitude Mirror Practice', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 6, title: 'Nāśā (Craving / Addiction)', description: 'Understand addictive patterns and reclaim your focus.', tag: 'Discipline', totalTime: '25-30 min', lessons: [ { title: 'Pleasure & Dependence in the Mind', type: 'Video Class', duration: '🎥' }, { title: 'Dopamine Detox & Focus Rebuilding', type: 'Explainer Video', duration: '🎥' }, { title: '1-Day Dopamine Fast', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 7, title: 'Ahaṃkāra (Ego)', description: 'Observe the play of the Gunas within you to understand the ego.', tag: 'Observation', totalTime: '25-30 min', lessons: [ { title: 'Ego and Guṇa Dynamics', type: 'Video Class', duration: '🎥' }, { title: 'Self-Tracking to Reduce Ego Influence', type: 'Explainer Video', duration: '🎥' }, { title: 'Track Your Guṇas for 3 Days', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 8, title: 'Lobha (Greed)', description: 'Discover the joy of simplicity and contentment.', tag: 'Contentment', totalTime: '25-30 min', lessons: [ { title: 'Greed and Inner Insecurity', type: 'Video Class', duration: '🎥' }, { title: 'Minimalist Living for Mental Peace', type: 'Explainer Video', duration: '🎥' }, { title: 'Minimalism Day', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 9, title: 'Sādhanā kā Pāthika Krama (Spiritual Practice Design)', description: 'Learn to design a consistent and personalized spiritual routine.', tag: 'Routine Design', totalTime: '25-30 min', lessons: [ { title: 'The Need for Daily Sādhanā', type: 'Video Class', duration: '🎥' }, { title: 'How to Build a Realistic Spiritual Routine', type: 'Explainer Video', duration: '🎥' }, { title: 'Daily Routine Blueprint', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 10, title: 'Śarīra kī Svasthatā (Body Purity)', description: 'Cleanse the body to create a clear and pure mind.', tag: 'Purity', totalTime: '25-30 min', lessons: [ { title: 'Body as a Sacred Instrument', type: 'Video Class', duration: '🎥' }, { title: 'Morning Cleansing for Clarity & Energy', type: 'Explainer Video', duration: '🎥' }, { title: '15-Minute Morning Cleanse', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 11, title: 'Prāṇa Ūrjā kā Santulana (Pranic Balance)', description: 'Balance your vital life-force energy with powerful breathing techniques.', tag: 'Pranic Balance', totalTime: '25-30 min', lessons: [ { title: 'Balancing Iḍā & Piṅgalā', type: 'Video Class', duration: '🎥' }, { title: 'Breath as an Emotional Regulator', type: 'Explainer Video', duration: '🎥' }, { title: 'Nāḍī Śodhana Practice', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 12, title: 'Manaḥ kī Sthirātā (Mental Stillness)', description: 'Develop profound concentration and mental stillness.', tag: 'Concentration', totalTime: '25-30 min', lessons: [ { title: 'The Role of Stillness in Sāṅkhya', type: 'Video Class', duration: '🎥' }, { title: 'Trāṭaka & Śāmbhavī for Mental Clarity', type: 'Explainer Video', duration: '🎥' }, { title: 'Trāṭaka + Śāmbhavī Mudrā', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 13, title: 'Manaḥ kī Antarmukhatā (Turning Inward)', description: 'Shift your focus from the external to the internal world.', tag: 'Introspection', totalTime: '25-30 min', lessons: [ { title: 'The Journey of Inner Observation', type: 'Video Class', duration: '🎥' }, { title: 'Mantra & Vibration Awareness', type: 'Explainer Video', duration: '🎥' }, { title: 'Observe the Inner World', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 14, title: 'Ahaṃkāra kī Śūnyatā (Ego Dissolution)', description: 'Experience the joy of selflessness through acts of service.', tag: 'Selflessness', totalTime: '25-30 min', lessons: [ { title: 'Ego and Selfless Karma', type: 'Video Class', duration: '🎥' }, { title: 'Anonymous Kindness as Spiritual Practice', type: 'Explainer Video', duration: '🎥' }, { title: 'Anonymous Kind Deed / Observe Your Serving Nature', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 15, title: 'Buddhi kī Vyāpakatā (Expanded Wisdom)', description: 'Learn to apply spiritual wisdom to your everyday life challenges.', tag: 'Action', totalTime: '25-30 min', lessons: [ { title: 'Viveka (Discrimination) as Spiritual Maturity', type: 'Video Class', duration: '🎥' }, { title: 'Applying Learnings to Real Life', type: 'Explainer Video', duration: '🎥' }, { title: 'Wisdom in Action', type: 'Activity', duration: '🧘' } ] },
  { moduleNumber: 16, title: 'Citta kī Śuddhatā (Purity of Consciousness)', description: 'Learn to witness your thoughts and emotions without judgment.', tag: 'Final Practice', totalTime: '25-30 min', lessons: [ { title: 'The Cleansing of Citta in Sāṅkhya', type: 'Video Class', duration: '🎥' }, { title: 'Silent Observation as Inner Cleanse', type: 'Explainer Video', duration: '🎥' }, { title: 'Observe Your Thoughts and Emotions', type: 'Activity', duration: '🧘' } ] },
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

export default function CurriculumSection() {
  const [expandedModule, setExpandedModule] = useState<number | null>(0)

  const toggleModule = (moduleNumber: number) => {
    setExpandedModule(expandedModule === moduleNumber ? null : moduleNumber)
  }

  return (
    <section 
      id="curriculum-component"
      className="bg-[#f9fafb] py-20 px-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6 text-center">
        {/* Pill */}
        <div className="bg-[#fff7ed] text-[#f97316] px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2 opacity-0 animate-fade-in-up">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          Course Curriculum
        </div>

        <h2 className="text-4xl md:text-[2.5rem] font-bold text-[#1f2937] m-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          A Transformative Learning Journey
        </h2>
        <p className="text-lg text-[#6b7280] max-w-[700px] leading-relaxed -mt-2 m-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Eighteen modules designed to guide you from ancient principles to modern, practical application for a balanced life.
        </p>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {curriculumData.map((module) => (
            <div
              key={module.moduleNumber}
              className={`bg-white rounded-2xl border overflow-hidden transition-all duration-400 ${
                expandedModule === module.moduleNumber 
                  ? 'border-[#3b82f6] shadow-lg' 
                  : 'border-[#f3f4f6]'
              }`}
            >
              {/* Module Header */}
              <div
                onClick={() => toggleModule(module.moduleNumber)}
                className="p-6 flex items-center gap-6 cursor-pointer transition-colors duration-300 hover:bg-[#fafbff]"
              >
                <div className="bg-[#fef3c7] text-[#f59e0b] w-15 h-15 min-w-[60px] rounded-2xl flex items-center justify-center">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>

                <div className="flex-grow text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-semibold text-[#1f2937] m-0">{module.title}</h3>
                    <span className="bg-[#fff7ed] text-[#f97316] px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap">
                      {module.tag}
                    </span>
                  </div>
                  <p className="text-base text-[#6b7280] m-0 mb-2">{module.description}</p>
                  <div className="flex items-center gap-6 text-sm text-[#6b7280]">
                    {!module.isProfiler && !module.isReport && module.lessons && (
                      <div className="flex items-center gap-1.5">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <span>{module.lessons.length} Lessons</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{module.totalTime}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right ml-auto">
                  <span className="block text-sm font-medium text-[#6b7280] mb-1">Module {module.moduleNumber}</span>
                  <div className="flex items-center gap-1 text-base font-semibold text-[#1f2937]">
                    <span>{expandedModule === module.moduleNumber ? 'Collapse' : 'Expand'}</span>
                    <svg 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth="2" 
                      stroke="currentColor" 
                      className={`w-5 h-5 transition-transform duration-400 ${expandedModule === module.moduleNumber ? 'rotate-180' : ''}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Module Content */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  expandedModule === module.moduleNumber ? 'max-h-[1000px] pb-6' : 'max-h-0'
                }`}
              >
                <div className="px-6">
                  <div className={`border-t border-[#f3f4f6] pt-6 flex flex-col gap-3 ${module.isProfiler ? 'border-t-0 pt-4' : ''}`}>
                    {module.isProfiler && (
                      <>
                        <p className="text-left text-[#6b7280] mb-6">
                          This simple test will help you identify your dominant Guna (Sattva, Rajas, or Tamas), providing a personalized starting point for your journey.
                        </p>
                        <a
                          href={module.profilerLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-3 bg-[#3b82f6] text-white font-semibold text-base px-7 py-3.5 rounded-xl transition-all duration-300 hover:bg-[#2563eb] hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-6.75 0H7.5" />
                          </svg>
                          <span>Start Guna Profiler Test</span>
                        </a>
                      </>
                    )}

                    {module.isReport && (
                      <>
                        <h4 className="text-lg font-semibold text-[#1f2937] mt-4 text-left">{module.activityTitle}</h4>
                        <p className="text-left text-[#6b7280] mt-2">This detailed report will cover:</p>
                        <ul className="list-none p-0 m-0 mt-4">
                          {module.reportDetails?.map((detail, idx) => (
                            <li key={idx} className="text-[#6b7280] mb-3 flex items-start gap-3 text-[0.95rem]">
                              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 min-w-[20px] text-[#3b82f6] mt-0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {module.lessons && module.lessons.map((lesson, idx) => (
                      <div key={idx} className="bg-[#f9fafb] rounded-xl p-4 flex items-center gap-4">
                        <div className="text-[#9ca3af] flex items-center justify-center w-5 h-5">
                          <span className="text-xl">{lesson.duration}</span>
                        </div>
                        <div className="flex-grow text-left">
                          <h4 className="text-base font-medium text-[#1f2937] m-0 mb-0.5">{lesson.title}</h4>
                          <p className="text-sm text-[#6b7280] m-0">{lesson.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes curriculum-fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: curriculum-fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @media (max-width: 992px) {
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

