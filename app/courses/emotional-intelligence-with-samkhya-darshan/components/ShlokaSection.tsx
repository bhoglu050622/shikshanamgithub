'use client'

import Image from 'next/image'

export default function ShlokaSection() {
  return (
    <section 
      id="shloka-section-container"
      className="py-10 px-5 bg-[#f8f9fa]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full flex justify-center items-center max-w-[1100px] mx-auto">
        <div 
          className="w-full flex items-center justify-center p-10 rounded-2xl text-white shadow-lg"
          style={{
            background: 'linear-gradient(110deg, #f97316, #ef4444)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex items-center justify-center gap-8 w-full flex-col md:flex-row">
            {/* Symbol/Logo */}
            <div className="flex-shrink-0">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2024/03/logo-white-1.png"
                alt="Shikshanam Logo"
                width={50}
                height={50}
                className="w-[50px] h-auto opacity-90"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>

            {/* Vertical Divider */}
            <div className="w-0.5 h-28 bg-white/50 rounded hidden md:block" />
            {/* Horizontal Divider for mobile */}
            <div className="w-[150px] h-0.5 bg-white/50 rounded block md:hidden" />

            {/* Text Container */}
            <div className="text-left md:text-left text-center">
              <p 
                className="m-0 text-3xl leading-[1.7] text-white font-medium"
                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
              >
                दु:खेष्वनुद्विग्नमना: सुखेषु विगतस्पृह:।
              </p>
              <p 
                className="m-0 text-3xl leading-[1.7] text-white font-medium"
                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
              >
                वीतरागभयक्रोध: स्थितधीर्मुनिरुच्यते॥
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/90 max-w-[650px]">
                One whose mind remains undisturbed amidst misery, who does not crave for pleasure, and who is free from attachment, fear, and anger, is called stable of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
