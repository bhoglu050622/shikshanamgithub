'use client'

import { useState } from 'react'

interface StruggleItem {
  id: string
  question: string
  title: string
  description: string
  image: string
}

const struggleItems: StruggleItem[] = [
  {
    id: 'emotional-overwhelm',
    question: 'Are you eating significantly more or less than usual?',
    title: 'Emotional Overwhelm',
    description: 'Feeling flooded by intense emotions without clear direction.',
    image: 'https://shikshanam.in/wp-content/uploads/2025/06/Emotional-Overwhelm.png'
  },
  {
    id: 'overthinking-patterns',
    question: 'Are you constantly replaying past conversations or imagining future ones?',
    title: 'Overthinking Patterns',
    description: 'Mental loops that drain energy and cloud judgment.',
    image: 'https://shikshanam.in/wp-content/uploads/2025/06/Overthinking-Patterns-1.png'
  },
  {
    id: 'reactive-responses',
    question: 'Do you often either lash out or completely shut down when stressed?',
    title: 'Reactive Responses',
    description: 'Acting from emotion rather than conscious choice.',
    image: 'https://shikshanam.in/wp-content/uploads/2025/06/Reactive-Responses-1.png'
  },
  {
    id: 'inner-conflict',
    question: 'Are you struggling to make a decision or stick with one once it\'s made?',
    title: 'Inner Conflict',
    description: 'A state of mental and emotional unrest.',
    image: 'https://shikshanam.in/wp-content/uploads/2025/06/Inner-Turbulence-1.png'
  }
]

export default function StruggleSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const handleItemClick = (itemId: string) => {
    if (activeItem === itemId) {
      setActiveItem(null)
    } else {
      setActiveItem(itemId)
    }
  }

  return (
    <section 
      id="struggle-section-component"
      className="py-16 px-4"
      style={{ 
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: '#fdfaf6',
        color: '#3a2e2e'
      }}
    >
      <div className="struggle-wrapper max-w-4xl mx-auto text-center">
        <h2 
          className="section-heading text-4xl font-bold leading-tight mb-4"
          style={{ maxWidth: '600px', margin: '0 auto 1rem auto' }}
        >
          Do you often struggle with emotional overwhelm,<br/>
          overthinking, or impulsive responses?
        </h2>
        
        <div className="accordion-container grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {struggleItems.map((item) => (
            <div
              key={item.id}
              className={`accordion-item bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                activeItem === item.id ? 'is-open' : ''
              }`}
              style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.07)' }}
            >
              <button
                className="accordion-header w-full p-6 text-left flex items-start gap-4 min-h-[110px] border-none bg-none cursor-pointer"
                onClick={() => handleItemClick(item.id)}
              >
                <div 
                  className="question-icon w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0 animate-pulse"
                  style={{ 
                    backgroundColor: '#f07127',
                    animation: 'pulse 0.3s infinite'
                  }}
                >
                  ?
                </div>
                <div className="question-text-wrapper flex flex-col">
                  <p className="main-question font-semibold leading-relaxed text-base m-0">
                    {item.question}
                  </p>
                  <span 
                    className="see-more-text text-sm mt-2 transition-colors duration-200"
                    style={{ color: '#7a7373' }}
                  >
                    {activeItem === item.id ? 'see less' : 'see more'}
                  </span>
                </div>
              </button>

              <div 
                className={`accordion-content overflow-hidden transition-all duration-500 ${
                  activeItem === item.id ? 'max-h-[600px]' : 'max-h-0'
                }`}
                style={{
                  borderTop: activeItem === item.id ? '1px solid #eee' : 'none'
                }}
              >
                <div className="accordion-content-inner flex flex-col items-center gap-6 p-8">
                  <img
                    src={item.image}
                    alt={`${item.title} illustration`}
                    className="w-full max-w-xs h-auto rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://placehold.co/400x200/f0f0f0/3a2e2e?text=${encodeURIComponent(item.title)}`
                    }}
                  />
                  <div className="text-content text-center">
                    <h3 className="text-xl font-bold mb-2 m-0" style={{ color: '#3a2e2e' }}>
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed m-0" style={{ color: '#7a7373' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(240, 113, 39, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(240, 113, 39, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(240, 113, 39, 0);
          }
        }
        
        .accordion-item:hover .see-more-text {
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .section-heading {
            font-size: 1.75rem !important;
          }
          .accordion-container {
            grid-template-columns: 1fr !important;
          }
          .accordion-header {
            padding: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  )
}
