'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface VideoItem {
  id: string
  title: string
  overlayTitle: string
  duration: string
}

const videos: VideoItem[] = [
  { id: 'lOR9ZsMt4ug', title: 'The Trap of Work Addiction: Why You Cannot Relax Anymore', overlayTitle: 'The Trap of Work Addiction', duration: '15:30' },
  { id: 'fOyOmesmUhk', title: 'How to Stop Overthinking', overlayTitle: 'How to Stop Overthinking', duration: '11:45' },
  { id: 'Y9D3VkB8cQE', title: 'Why Social Media Still Confuses the Mind', overlayTitle: 'Social Media & The Mind', duration: '18:22' },
  { id: 'lqVTJewLhPs', title: 'Workplace Stress Hurting Your Personal Life?', overlayTitle: 'Workplace Stress', duration: '9:10' },
  { id: 'b92bww6ImZo', title: 'Do Housewives Lose Their True Purpose?', overlayTitle: 'Finding Purpose', duration: '14:05' },
  { id: 'OambhYsblNI', title: 'How to Find the Courage to Quit a Job You Hate', overlayTitle: 'Quitting a Job You Hate', duration: '12:54' },
  { id: '90FsCxSpWD0', title: 'Most Common Life Problems People Face', overlayTitle: 'Common Life Problems', duration: '22:18' },
  { id: 'LBqOELB32AM', title: 'Is Living Alone Best for Spiritual Growth?', overlayTitle: 'Living Alone & Growth', duration: '10:33' }
]

export default function VideoGallerySection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    if (scrollerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
    }
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (scroller) {
      scroller.addEventListener('scroll', updateScrollButtons)
      updateScrollButtons()
      
      return () => scroller.removeEventListener('scroll', updateScrollButtons)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollerRef.current) {
      const scrollAmount = 300 + 24 // card width + gap
      scrollerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const openModal = (videoId: string) => {
    setCurrentVideoId(videoId)
    setIsVideoModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setCurrentVideoId(null)
    setIsVideoModalOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <section className="bg-[#fdfaf6] py-12">
      <h2 
        className="text-center text-4xl md:text-5xl font-bold text-[#2c2020] mb-8"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Explore the <span className="text-[#ee7125] cursor-pointer hover-shine">Wisdom</span>
      </h2>

      <div className="relative mx-8">
        {/* Previous Arrow */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="hidden lg:flex absolute left-[-22px] top-[calc(50%-1.5rem)] -translate-y-1/2 z-10 bg-white border border-[#f0eade] rounded-full w-11 h-11 items-center justify-center shadow-md transition-all duration-200 hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed disabled:scale-100"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c2620" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Video Scroller */}
        <div 
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => openModal(video.id)}
              className="flex-none w-[300px] text-center cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03]"
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg mb-4 aspect-[16/10] bg-[#e0d9d0]">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/sddefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-400"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://placehold.co/600x400/2c2620/fdfaf6?text=Video+Not+Found'
                  }}
                />

                {/* Overlay */}
                <div 
                  className="absolute top-0 left-0 w-full p-2 flex justify-between items-start text-white z-[2] pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%)' }}
                >
                  <span className="text-xs font-medium text-left whitespace-nowrap overflow-hidden text-ellipsis max-w-[70%]">
                    {video.overlayTitle}
                  </span>
                  <span className="text-xs font-medium bg-black/60 px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>

                {/* Golden Line */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-[3px] z-[3]"
                  style={{
                    background: 'linear-gradient(110deg, #f8c35a, #ee7125, #f8c35a)',
                    backgroundSize: '200% auto',
                    animation: 'textShine 3s linear infinite'
                  }}
                />

                {/* Play Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-15 h-15 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-[1] opacity-0 transition-all duration-300 hover:bg-white/40 hover:opacity-100">
                  <svg viewBox="0 0 20 20" className="w-[30px] h-[30px] fill-white ml-1">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </div>
              </div>

              <p className="text-base font-medium text-[#575049] px-2">
                {video.title}
              </p>
            </div>
          ))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="hidden lg:flex absolute right-[-22px] top-[calc(50%-1.5rem)] -translate-y-1/2 z-10 bg-white border border-[#f0eade] rounded-full w-11 h-11 items-center justify-center shadow-md transition-all duration-200 hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed disabled:scale-100"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c2620" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && currentVideoId && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center z-[1000] opacity-100 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div className="relative w-[90%] max-w-[800px] transition-transform duration-300 scale-100">
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 bg-transparent border-none text-white text-[2rem] leading-none cursor-pointer opacity-80 hover:opacity-100 hover:rotate-90 transition-all duration-200"
            >
              &times;
            </button>
            <div className="relative pb-[56.25%] h-0 bg-black rounded-2xl overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full border-none"
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes textShine {
          from { background-position: -200% center; }
          to { background-position: 200% center; }
        }
        .hover-shine:hover {
          background: linear-gradient(110deg, #b92b27, #ee7125, #b92b27);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: textShine 2s linear infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .flex {
            padding: 0 1rem 0.5rem 1rem;
          }
        }
      `}</style>
    </section>
  )
}

