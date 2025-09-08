'use client'

import { useEffect, useRef, useState } from 'react'

export default function FoundersMissionSection() {
  const [isVisible, setIsVisible] = useState(false)
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

  const galleryImages = [
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-01-scaled.png",
      alt: "Gallery Image 1",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+1"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-02-scaled.png",
      alt: "Gallery Image 2",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+2"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-03-scaled.png",
      alt: "Gallery Image 3",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+3"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-04-scaled.png",
      alt: "Gallery Image 4",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+4"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-06-scaled.png",
      alt: "Gallery Image 5",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+5"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-05-5-scaled.png",
      alt: "Gallery Image 6",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+6"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-07-scaled.png",
      alt: "Gallery Image 7",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+7"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-16.png",
      alt: "Gallery Image 16",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+16"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-13.png",
      alt: "Gallery Image 13",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+13"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-12-scaled.png",
      alt: "Gallery Image 12",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+12"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-11-scaled.png",
      alt: "Gallery Image 11",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+11"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-15.png",
      alt: "Gallery Image 15",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+15"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-14-scaled.png",
      alt: "Gallery Image 14",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+14"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-08-scaled.png",
      alt: "Gallery Image 8",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+8"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-09-4-scaled.png",
      alt: "Gallery Image 9",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+9"
    },
    {
      src: "https://shikshanam.in/wp-content/uploads/2025/07/1-10-3-scaled.png",
      alt: "Gallery Image 10",
      fallback: "https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+10"
    }
  ]

  return (
    <>
      <style jsx>{`
        .masonry-item {
          break-inside: avoid;
          position: relative;
          overflow: hidden;
          border-radius: 0.5rem;
        }
        
        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
        }
        
        .masonry-item:hover .gallery-image {
          transform: scale(1.05);
        }
        
        .wisdom-tag {
          background-color: #f5f3ff;
          color: #8b5cf6;
        }
        
        .dark .wisdom-tag {
          background-color: rgba(124, 58, 237, 0.2);
          color: #a78bfa;
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className="py-16 bg-gray-50 text-slate-800"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
          transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading Section */}
          <div className="text-center py-8 mb-8 md:mb-12">
            {/* Pill/Tag */}
            <div className="inline-flex items-center wisdom-tag text-sm font-medium px-4 py-1 rounded-full mb-4">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              Wisdom in Action
            </div>
            
            {/* Main Heading */}
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-gray-900">Founder's</span> <span className="text-purple-500">Mission</span>
            </h2>
            
            {/* Subheading */}
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              To Transform Modern lives with Eternal Wisdom
            </p>
          </div>
          
          {/* Masonry Gallery */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="masonry-item">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="gallery-image" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = image.fallback
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
