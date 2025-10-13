'use client'

import { useState } from 'react'

export default function ReviewSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const videoId = 'sfi2e8WrGiw'

  const openModal = () => {
    setIsVideoModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsVideoModalOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <section 
      id="student-reviews-component"
      className="bg-[#1a1d24] text-white py-20 px-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-12 text-center">
        <h2 className="text-4xl md:text-[2.25rem] font-bold text-[#f39c12] animate-fade-in-up">
          Our Learners Review
        </h2>
        <p className="text-lg text-[#bdc3c7] max-w-[600px] -mt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Get an inside look at the course experience and the powerful insights you can gain.
        </p>

        <div className="flex justify-center w-full">
          <div
            onClick={openModal}
            className="bg-[#2c323b] rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 border border-[#3d4450] w-full max-w-[800px] cursor-pointer transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div 
              className="w-full md:w-[280px] h-[160px] flex-shrink-0 rounded-lg bg-cover bg-center relative flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{ backgroundImage: `url('https://i.ytimg.com/vi/${videoId}/hqdefault.jpg')` }}
            >
              <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 bg-transparent backdrop-blur-none hover:bg-black/50 hover:backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-white ml-[3px]" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.7))' }}>
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-left md:text-left text-center">
              <h3 className="font-bold text-2xl text-white m-0">Manogya Tiwari</h3>
              <p className="text-[#f39c12] font-semibold text-sm m-0 uppercase tracking-wide">Spiritual Creator</p>
              
              <div className="flex gap-1 justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#f39c12" stroke="none"></path>
                  </svg>
                ))}
              </div>

              <p className="text-[#bdc3c7] text-[0.95rem] leading-relaxed m-0 mt-2">
                "This course masterfully bridges the gap between our ancient cultural heritage and the practical need for emotional intelligence in today's world. A vital experience for any spiritual practitioner or entrepreneur."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/85 flex items-center justify-center z-[1000] opacity-100 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div className="relative w-[90%] max-w-[900px] transition-transform duration-300 scale-100">
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 bg-transparent border-none text-white text-4xl font-light cursor-pointer leading-none hover:opacity-80"
            >
              &times;
            </button>
            <div className="relative pb-[56.25%] h-0 bg-black rounded-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes component-fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: component-fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </section>
  )
}

