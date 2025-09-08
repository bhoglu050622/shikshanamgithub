'use client'

import { useEffect, useRef } from 'react'

interface VideoModalProps {
  isOpen: boolean
  videoId: string | null
  onClose: () => void
  title?: string
}

export default function VideoModal({ isOpen, videoId, onClose, title = "Video Player" }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Clean up iframe when modal closes
  useEffect(() => {
    if (!isOpen && iframeRef.current) {
      // Reset iframe src to stop video playback
      iframeRef.current.src = ''
    }
  }, [isOpen])

  if (!isOpen || !videoId) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  const handleYouTubeClick = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
  }

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] opacity-0 invisible transition-all duration-300"
      style={{ 
        opacity: isOpen ? 1 : 0, 
        visibility: isOpen ? 'visible' : 'hidden' 
      }}
      onClick={handleBackdropClick}
    >
      <div className="relative w-[90%] max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl transform scale-90 transition-transform duration-300"
           style={{ transform: isOpen ? 'scale(1)' : 'scale(0.9)' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 w-8 h-8 bg-none border-none text-white text-3xl font-light cursor-pointer leading-none opacity-80 transition-all duration-200 hover:opacity-100 hover:rotate-90 z-10"
          aria-label="Close video"
        >
          ×
        </button>
        
        {/* YouTube Button */}
        <button
          onClick={handleYouTubeClick}
          className="absolute -top-10 right-12 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 z-10"
        >
          Watch on YouTube
        </button>
        
        {/* Video Iframe */}
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0`}
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          title={title}
          onError={() => {
            // If iframe fails to load, show fallback message
            const iframe = iframeRef.current
            if (iframe && iframe.parentNode) {
              iframe.style.display = 'none'
              const fallback = document.createElement('div')
              fallback.className = 'w-full h-full flex flex-col items-center justify-center text-white bg-gray-800'
              fallback.innerHTML = `
                <div class="text-center p-8">
                  <h3 class="text-xl font-semibold mb-4">Video Not Available</h3>
                  <p class="text-gray-300 mb-6">This video cannot be embedded. Please watch it on YouTube.</p>
                  <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                    Watch on YouTube
                  </a>
                </div>
              `
              iframe.parentNode.appendChild(fallback)
            }
          }}
        />
      </div>
    </div>
  )
}
