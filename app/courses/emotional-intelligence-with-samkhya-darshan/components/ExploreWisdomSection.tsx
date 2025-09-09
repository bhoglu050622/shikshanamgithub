'use client'

import { useEffect, useRef, useState } from 'react'
import VideoModal from './VideoModal'
import Image from 'next/image'

interface VideoData {
  id: string
  videoId: string
  title: string
  overlayTitle: string
  duration: string
  thumbnailUrl: string
}

interface VideoCardProps {
  video: VideoData
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  // Preload the image
  useEffect(() => {
    const img = document.createElement('img')
    img.src = video.thumbnailUrl
    img.onload = () => setImageLoaded(true)
    img.onerror = () => setImageLoaded(true)
  }, [video.thumbnailUrl])

  return (
        <div className="flex-shrink-0 w-72 md:w-80 text-center cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-105">
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-4 aspect-video bg-slate-200 group">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          layout="fill"
          objectFit="cover"
          className={`w-full h-full object-cover transition-transform duration-400 hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://placehold.co/600x400/2c2620/fdfaf6?text=Video+Not+Found'
            setImageLoaded(true)
          }}
        />
        
        {/* Golden Shiny Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-[length:200%_auto] animate-pulse" />
        
        {/* Thumbnail Overlay */}
        <div className="absolute top-0 left-0 w-full p-2 flex justify-between items-start text-white z-10 pointer-events-none bg-gradient-radial from-black/60 via-transparent to-transparent">
          <span className="text-xs font-medium text-left truncate max-w-[70%]">
            {video.overlayTitle}
          </span>
          <span className="text-xs font-medium bg-black/60 px-2 py-1 rounded">
            {video.duration}
          </span>
        </div>
        
        {/* Play Icon */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-15 h-15 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-10 opacity-0 transition-all duration-300 group-hover:bg-white/40 group-hover:opacity-100 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            // This will be handled by the parent component
          }}
        >
          <svg className="w-8 h-8 fill-white ml-1" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
      </div>
      <p className="text-sm md:text-base font-medium text-slate-600 px-2">
        {video.title}
      </p>
      <p className="text-xs text-slate-500 px-2 mt-1">
        Click to watch on YouTube
      </p>
    </div>
  )
}


export default function ExploreWisdomSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

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

  const videos: VideoData[] = [
    {
      id: 'work-addiction',
      videoId: 'lOR9ZsMt4ug',
      title: 'The Trap of Work Addiction: Why You Can\'t Relax Anymore',
      overlayTitle: 'The Trap of Work Addiction',
      duration: '15:30',
      thumbnailUrl: 'https://img.youtube.com/vi/lOR9ZsMt4ug/sddefault.jpg'
    },
    {
      id: 'stop-overthinking',
      videoId: 'fOyOmesmUhk',
      title: 'How to Stop Overthinking',
      overlayTitle: 'How to Stop Overthinking',
      duration: '11:45',
      thumbnailUrl: 'https://img.youtube.com/vi/fOyOmesmUhk/sddefault.jpg'
    },
    {
      id: 'social-media-mind',
      videoId: 'Y9D3VkB8cQE',
      title: 'Why Social Media Still Confuses the Mind',
      overlayTitle: 'Social Media & The Mind',
      duration: '18:22',
      thumbnailUrl: 'https://img.youtube.com/vi/Y9D3VkB8cQE/sddefault.jpg'
    },
    {
      id: 'workplace-stress',
      videoId: 'lqVTJewLhPs',
      title: 'Workplace Stress Hurting Your Personal Life?',
      overlayTitle: 'Workplace Stress',
      duration: '9:10',
      thumbnailUrl: 'https://img.youtube.com/vi/lqVTJewLhPs/sddefault.jpg'
    },
    {
      id: 'finding-purpose',
      videoId: 'b92bww6ImZo',
      title: 'Do Housewives Lose Their True Purpose?',
      overlayTitle: 'Finding Purpose',
      duration: '14:05',
      thumbnailUrl: 'https://img.youtube.com/vi/b92bww6ImZo/sddefault.jpg'
    },
    {
      id: 'quit-job',
      videoId: 'OambhYsblNI',
      title: 'How to Find the Courage to Quit a Job You Hate',
      overlayTitle: 'Quitting a Job You Hate',
      duration: '12:54',
      thumbnailUrl: 'https://img.youtube.com/vi/OambhYsblNI/sddefault.jpg'
    },
    {
      id: 'common-problems',
      videoId: '90FsCxSpWD0',
      title: 'Most Common Life Problems People Face',
      overlayTitle: 'Common Life Problems',
      duration: '22:18',
      thumbnailUrl: 'https://img.youtube.com/vi/90FsCxSpWD0/sddefault.jpg'
    },
    {
      id: 'living-alone',
      videoId: 'LBqOELB32AM',
      title: 'Is Living Alone Best for Spiritual Growth?',
      overlayTitle: 'Living Alone & Growth',
      duration: '10:33',
      thumbnailUrl: 'https://img.youtube.com/vi/LBqOELB32AM/sddefault.jpg'
    }
  ]

  const updateScrollButtons = () => {
    if (!scrollerRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current
    const tolerance = 1
    
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - tolerance)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollerRef.current) return
    
    const scrollAmount = 320 // Width of one card + gap
    const currentScroll = scrollerRef.current.scrollLeft
    const targetScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount
    
    scrollerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }

  const handleVideoClick = (videoId: string) => {
    // Open video in built-in modal popup
    setCurrentVideoId(videoId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentVideoId(null)
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const handleScroll = () => {
      updateScrollButtons()
    }

    const handleResize = () => {
      updateScrollButtons()
    }

    scroller.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    // Initial update
    updateScrollButtons()

    return () => {
      scroller.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes textShine {
          from { background-position: -200% center; }
          to { background-position: 200% center; }
        }
        .light-text {
          color: #ee7125;
          cursor: pointer;
        }
        .light-text:hover {
          background: linear-gradient(110deg, #b92b27, #ee7125, #b92b27);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: textShine 2s linear infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(ellipse at top left, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%);
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className="py-16 bg-parchment-ivory text-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Heading */}
          <h2 
            className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
              transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            Explore the <span className="light-text">Wisdom</span>
          </h2>

          {/* Gallery Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="hidden lg:flex absolute -left-12 top-1/2 transform -translate-y-1/2 z-10 w-11 h-11 bg-white border border-slate-200 rounded-full items-center justify-center cursor-pointer shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Previous videos"
            >
              <svg className="w-6 h-6 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="hidden lg:flex absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 w-11 h-11 bg-white border border-slate-200 rounded-full items-center justify-center cursor-pointer shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Next videos"
            >
              <svg className="w-6 h-6 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Video Scroller */}
            <div 
              ref={scrollerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitScrollbar: 'none'
              } as React.CSSProperties}
            >
              {videos.map((video) => (
                <div key={video.id} onClick={() => handleVideoClick(video.videoId)}>
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        videoId={currentVideoId}
        onClose={handleCloseModal}
        title="Explore the Wisdom - Video"
      />
    </>
  )
}
