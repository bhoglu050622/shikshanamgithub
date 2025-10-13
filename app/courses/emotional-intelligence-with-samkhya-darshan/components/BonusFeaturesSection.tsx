'use client'

import Image from 'next/image'

interface BonusFeature {
  id: number
  type: 'yellow' | 'blue'
  icon: string
  pill: string
  title: string
  description: string
}

const bonusFeatures: BonusFeature[] = [
  {
    id: 1,
    type: 'yellow',
    icon: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-207.png',
    pill: 'Interactive',
    title: 'Guna Profiler Tool',
    description: 'Personalized assessment to understand your dominant mental qualities'
  },
  {
    id: 2,
    type: 'yellow',
    icon: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-202.png',
    pill: 'Downloadable',
    title: 'Emotional Journal Template',
    description: 'Structured daily practice for emotional awareness and growth'
  },
  {
    id: 3,
    type: 'yellow',
    icon: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-208.png',
    pill: 'Community',
    title: 'Private WhatsApp Group',
    description: 'Connect with fellow seekers and get ongoing support'
  },
  {
    id: 4,
    type: 'blue',
    icon: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-210.png',
    pill: '1 Year',
    title: '1-Year Access',
    description: 'Revisit the teachings whenever you need guidance'
  },
  {
    id: 5,
    type: 'blue',
    icon: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-206.png',
    pill: 'Achievement',
    title: 'Certificate of Completion',
    description: 'Recognition of your journey through ancient wisdom'
  },
  {
    id: 6,
    type: 'blue',
    icon: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-203-1.png',
    pill: 'Personalized',
    title: 'Guna-Based Assessment',
    description: 'A custom "Emotional Roadmap" based on your reflections.'
  }
]

export default function BonusFeaturesSection() {
  return (
    <section 
      id="bonus-features-component"
      className="bg-[#f9f9f9] py-20 px-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-12 text-center">
        <h2 className="text-4xl md:text-[2.25rem] font-bold text-[#3a2e2e] m-0 opacity-0 animate-fade-in-up">
          Exclusive Bonus Features! 🎉
        </h2>
        <p className="text-lg text-[#7a7373] max-w-[600px] leading-relaxed -mt-8 m-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Enhanced learning tools and community support to deepen your practice
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {bonusFeatures.map((feature, index) => (
            <div 
              key={feature.id}
              className="relative overflow-hidden rounded-2xl flex opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* Ribbon */}
              <div className="w-[150px] h-[150px] overflow-hidden absolute -top-2.5 -left-2.5 z-[2]">
                <div 
                  className="text-sm font-bold text-white text-center leading-[25px] w-[150px] block bg-[#e74c3c] shadow-lg absolute top-[35px] -left-[35px]"
                  style={{ transform: 'rotate(-45deg)' }}
                >
                  BONUS
                </div>
              </div>

              {/* Card Content */}
              <div 
                className={`w-full p-8 text-left rounded-2xl border transition-all duration-400 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-2xl flex flex-col ${
                  feature.type === 'yellow' 
                    ? 'bg-[#fff9ed] border-[#fdebd0]' 
                    : 'bg-[#f0f7ff] border-[#d6eaf8]'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-[72px] h-[72px] flex items-center justify-center flex-shrink-0">
                    <Image
                      src={feature.icon}
                      alt={`${feature.title} Icon`}
                      width={72}
                      height={72}
                      className="w-full h-full object-contain animate-on-hover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://placehold.co/72x72/${feature.type === 'yellow' ? 'fdebd0/e67e22' : 'd6eaf8/3498db'}?text=Icon`
                      }}
                    />
                  </div>
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      feature.type === 'yellow'
                        ? 'bg-[#fdebd0] text-[#e67e22]'
                        : 'bg-[#d6eaf8] text-[#3498db]'
                    }`}
                  >
                    {feature.pill}
                  </span>
                </div>

                <h3 className="font-semibold text-lg text-[#3a2e2e] mb-2">{feature.title}</h3>
                <p className="text-[0.95rem] text-[#7a7373] leading-relaxed mt-2">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes bonus-fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes icon-wobble-shine {
          0% { transform: rotate(0deg); filter: brightness(1); }
          25% { transform: rotate(5deg); }
          50% { filter: brightness(1.3); }
          75% { transform: rotate(-5deg); }
          100% { transform: rotate(0deg); filter: brightness(1); }
        }
        .animate-fade-in-up {
          animation: bonus-fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        :global(.animate-on-hover:hover) {
          animation: icon-wobble-shine 0.8s ease-in-out;
        }
      `}</style>
    </section>
  )
}
