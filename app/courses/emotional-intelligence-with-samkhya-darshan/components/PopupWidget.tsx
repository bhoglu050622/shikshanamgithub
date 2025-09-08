'use client'

import { useState, useEffect } from 'react'

interface PopupWidgetProps {
  onClose: () => void
}

export default function PopupWidget({ onClose }: PopupWidgetProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if popup was dismissed in this session
    let popupDismissed = false
    try {
      popupDismissed = sessionStorage.getItem('gunaPopupDismissed') === 'true'
    } catch (e) {
      // ignore
    }

    if (!popupDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    try {
      sessionStorage.setItem('gunaPopupDismissed', 'true')
    } catch (e) {
      console.error('SessionStorage is not available.', e)
    }
    setTimeout(onClose, 300)
  }

  const handlePlay = () => {
    setIsVisible(false)
    window.location.href = 'https://shikshanam.in/emotional-intelligence-with-samkhya-darshan/#:~:text=Discover%20your%20inner%20nature%20through%20ancient%20Vedic%20wisdom.'
  }

  if (!isVisible) return null

  return (
    <>
      {/* Overlay */}
      <div 
        id="guna-profiler-popup-overlay"
        className="fixed inset-0 bg-black/60 z-[9999] transition-opacity duration-400"
        style={{ 
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
          fontFamily: 'Inter, sans-serif'
        }}
      />
      
      {/* Popup */}
      <div 
        id="guna-profiler-popup"
        className="fixed top-1/2 left-1/2 w-96 max-w-[90%] bg-white rounded-2xl shadow-2xl z-[10000] overflow-hidden transform transition-all duration-400"
        style={{ 
          fontFamily: 'Inter, sans-serif',
          transform: isVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.9)',
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden'
        }}
      >
        {/* Header */}
        <div className="popup-header relative p-5 text-center" style={{ background: 'linear-gradient(135deg, #fff7ed, #fff1e1)' }}>
          <button
            id="popup-close-btn"
            onClick={handleClose}
            className="absolute top-2.5 right-2.5 w-9 h-9 bg-black/5 border-none rounded-full text-[#7c2d12] text-xl leading-none cursor-pointer transition-all duration-200 hover:bg-black/10 hover:scale-110"
            title="Close"
          >
            ×
          </button>
          
          <div 
            className="popup-icon w-15 h-15 mx-auto mb-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-3xl"
          >
            <i className="fas fa-star"></i>
          </div>
          
          <h3 className="text-2xl font-bold text-[#7c2d12] m-0">Take the Personality Test!</h3>
        </div>

        {/* Body */}
        <div className="popup-body p-6 text-center">
          <p className="text-lg text-gray-600 leading-relaxed mb-6 m-0">
            Discover your inner nature with our quick Vedic personality quiz.
          </p>
          
          <button 
            id="popup-play-btn"
            onClick={handlePlay}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold text-lg py-4 px-6 border-none rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{ boxShadow: '0 4px 15px rgba(249, 115, 22, 0.2)' }}
          >
            Play Now
          </button>
        </div>
      </div>
    </>
  )
}
