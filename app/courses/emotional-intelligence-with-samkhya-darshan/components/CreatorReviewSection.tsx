'use client'

import { useEffect, useRef, useState } from 'react'

interface ReviewCardProps {
  name: string
  bio: string
  quote: string
  videoId: string
  thumbnailUrl: string
  rating: number
}

const ReviewCard = ({ name, bio, quote, videoId, thumbnailUrl, rating }: ReviewCardProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Preload the image
  useEffect(() => {
    const img = new Image()
    img.src = thumbnailUrl
    img.onload = () => setImageLoaded(true)
    img.onerror = () => setImageLoaded(true)
  }, [thumbnailUrl])

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className="w-5 h-5 fill-orange-500"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))
  }

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-slate-200 shadow-lg transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl cursor-pointer max-w-4xl w-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
        transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s'
      }}
    >
      {/* Video Thumbnail */}
      <div 
        className="w-full md:w-80 h-40 flex-shrink-0 rounded-lg bg-slate-200 relative flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105"
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={thumbnailUrl}
          alt={`${name} video thumbnail`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)} // Fallback if image fails to load
        />
        <div className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/50 hover:backdrop-blur-md">
          <svg className="w-5 h-5 fill-white ml-1 drop-shadow-lg" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      
      {/* Reviewer Details */}
      <div className="flex flex-col gap-3 flex-grow text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 m-0">{name}</h3>
        <p className="text-orange-500 font-semibold text-sm m-0 uppercase tracking-wider">
          {bio}
        </p>
        
        {/* Star Rating */}
        <div className="flex gap-1 justify-center md:justify-start">
          {renderStars()}
        </div>
        
        <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0 mt-2">
          "{quote}"
        </p>
      </div>
    </div>
  )
}

interface VideoModalProps {
  isOpen: boolean
  videoId: string | null
  onClose: () => void
}

const VideoModal = ({ isOpen, videoId, onClose }: VideoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

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

  if (!isOpen || !videoId) return null

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black/85 flex items-center justify-center z-[9999] opacity-0 pointer-events-none transition-opacity duration-300"
      style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
      onClick={(e) => {
        if (e.target === modalRef.current) {
          onClose()
        }
      }}
    >
      <div 
        className="relative w-[95%] md:w-[90%] max-w-4xl transform scale-90 transition-transform duration-300"
        style={{ transform: isOpen ? 'scale(1)' : 'scale(0.9)' }}
      >
        <button
          onClick={onClose}
          className="absolute -top-8 md:-top-10 right-0 md:right-0 bg-none border-none text-white text-3xl md:text-4xl font-light cursor-pointer leading-none hover:text-orange-400 transition-colors duration-200"
        >
          ×
        </button>
        <div className="relative pb-[56.25%] h-0 bg-black rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default function CreatorReviewSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const reviewData: ReviewCardProps = {
    name: "Manogya Tiwari",
    bio: "Spiritual Creator",
    quote: "This course masterfully bridges the gap between our ancient cultural heritage and the practical need for emotional intelligence in today's world. A vital experience for any spiritual practitioner or entrepreneur.",
    videoId: "sfi2e8WrGiw",
    thumbnailUrl: "https://i.ytimg.com/vi/sfi2e8WrGiw/hqdefault.jpg",
    rating: 5
  }

  const handleVideoClick = (videoId: string) => {
    setCurrentVideoId(videoId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentVideoId(null)
  }

  return (
    <>
      <section 
        ref={sectionRef}
        className="py-20 bg-parchment-ivory text-slate-800"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center gap-12 text-center">
            {/* Main Heading */}
            <h2 
              className="text-4xl font-bold text-orange-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
                transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              Our Learners Review
            </h2>
            
            {/* Sub Heading */}
            <p 
              className="text-lg text-slate-600 max-w-2xl -mt-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
                transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
              }}
            >
              Get an inside look at the course experience and the powerful insights you can gain.
            </p>

            {/* Review Card */}
            <div className="flex justify-center w-full">
              <div onClick={() => handleVideoClick(reviewData.videoId)}>
                <ReviewCard {...reviewData} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        videoId={currentVideoId}
        onClose={handleCloseModal}
      />
    </>
  )
}