'use client'

import { useState } from 'react'
import Image from 'next/image'

interface AccordionItem {
  id: number
  question: string
  title: string
  description: string
  image: string
}

const accordionData: AccordionItem[] = [
  {
    id: 1,
    question: 'Are you eating significantly more or less than usual?',
    title: 'Emotional Overwhelm',
    description: 'Feeling flooded by intense emotions without clear direction.',
    image: 'https://shikshanam.in/wp-content/uploads/2025/06/Emotional-Overwhelm.png'
  },
  {
    id: 2,
    question: 'Are you constantly replaying past conversations or imagining future ones?',
    title: 'Overthinking Patterns',
    description: 'Mental loops that drain energy and cloud judgment.',
    image: 'https://shikshanam.in/wp-content/uploads/2025/06/Overthinking-Patterns-1.png'
  },
  {
    id: 3,
    question: 'Do you often either lash out or completely shut down when stressed?',
    title: 'Reactive Responses',
    description: 'Acting from emotion rather than conscious choice.',
    image: 'https://shikshanam.in/wp-content/uploads/2025/06/Reactive-Responses-1.png'
  },
  {
    id: 4,
    question: 'Are you struggling to make a decision or stick with one once it\'s made?',
    title: 'Inner Conflict',
    description: 'A state of mental and emotional unrest.',
    image: 'https://shikshanam.in/wp-content/uploads/2025/06/Inner-Turbulence-1.png'
  }
]

export default function StruggleSection() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section 
      id="struggle-section-component"
      className="bg-[#fdfaf6] py-16 px-4 overflow-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-[900px] mx-auto flex flex-col items-center gap-10 text-center">
        <h2 
          className="text-4xl md:text-[2.25rem] font-bold leading-tight max-w-[600px] mb-4"
          style={{ color: '#3a2e2e' }}
        >
          Do you often struggle with emotional overwhelm,<br className="hidden md:block"/>overthinking, or impulsive responses?
        </h2>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {accordionData.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${
                openItem === item.id ? 'is-open' : ''
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-start p-6 text-left min-h-[110px] cursor-pointer"
              >
                <div 
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f07127] text-white flex items-center justify-center text-2xl font-bold mr-4"
                  style={{
                    animation: 'pulse 0.3s infinite'
                  }}
                >
                  ?
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-base leading-relaxed m-0" style={{ color: '#3a2e2e' }}>
                    {item.question}
                  </p>
                  <span 
                    className="text-sm mt-2 transition-all duration-200"
                    style={{ color: '#7a7373' }}
                  >
                    {openItem === item.id ? 'see less' : 'see more'}
                  </span>
                </div>
              </button>

              {/* Accordion Content */}
              <div
                className={`transition-all duration-700 ease-in-out ${
                  openItem === item.id ? 'max-h-[600px]' : 'max-h-0'
                }`}
                style={{ overflow: 'hidden' }}
              >
                <div className={`flex flex-col items-center gap-6 p-8 ${openItem === item.id ? 'border-t border-[#eee]' : ''}`}>
                  <Image
                    src={item.image}
                    alt={`${item.title} illustration`}
                    width={300}
                    height={150}
                    className="w-full max-w-[300px] h-auto rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://placehold.co/400x200/f0f0f0/3a2e2e?text=${encodeURIComponent(item.title)}`
                    }}
                  />
                  <div className="text-center">
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

        @media (max-width: 768px) {
          h2 {
            font-size: 1.75rem !important;
          }
        }
      `}</style>
    </section>
  )
}
