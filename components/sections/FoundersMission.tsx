'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const galleryImages = [
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-01-scaled.png", alt: "Gallery Image 1" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-02-scaled.png", alt: "Gallery Image 2" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-03-scaled.png", alt: "Gallery Image 3" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-04-scaled.png", alt: "Gallery Image 4" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-06-scaled.png", alt: "Gallery Image 5" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-05-5-scaled.png", alt: "Gallery Image 6" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-07-scaled.png", alt: "Gallery Image 7" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-16.png", alt: "Gallery Image 16" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-13.png", alt: "Gallery Image 13" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-12-scaled.png", alt: "Gallery Image 12" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-11-scaled.png", alt: "Gallery Image 11" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-15.png", alt: "Gallery Image 15" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-14-scaled.png", alt: "Gallery Image 14" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-08-scaled.png", alt: "Gallery Image 8" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-09-4-scaled.png", alt: "Gallery Image 9" },
  { src: "https://shikshanam.in/wp-content/uploads/2025/07/1-10-3-scaled.png", alt: "Gallery Image 10" }
]

export default function FoundersMission() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Intersection Observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('#founders-mission-section .animate-on-scroll')
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = `https://placehold.co/600x400/1f2937/a78bfa?text=${target.alt}`
  }

  return (
    <section id="founders-mission-section" className="py-12 md:py-16 bg-slate-900 relative overflow-hidden">
      {/* Background styling to match Kashmir Shaivism theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      <div className="container-custom relative z-10">
        {/* Heading Section */}
        <div className="text-center py-8 mb-8 md:mb-12 animate-on-scroll">
          {/* Pill/Tag */}
          <div className="inline-flex items-center bg-purple-500/20 text-purple-400 text-sm font-medium px-4 py-1 rounded-full mb-4 border border-purple-500/30">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            Wisdom in Action
          </div>
          
          {/* Main Heading */}
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-center mx-auto">
            <span className="text-white">Founder's</span> <span className="text-purple-400">Mission</span>
          </h2>
          
          {/* Subheading */}
          <p className="font-sans text-lg text-gray-400 mt-4 max-w-3xl mx-auto text-center">
            To Transform Modern lives with Eternal Wisdom
          </p>
        </div>
        
        {/* Masonry Gallery */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="masonry-item animate-on-scroll break-inside-avoid relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Image 
                src={image.src} 
                alt={image.alt} 
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-110" 
                onError={handleImageError}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .masonry-item {
          break-inside: avoid;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .masonry-item.is-visible {
          opacity: 1;
        }
      `}</style>
    </section>
  )
}