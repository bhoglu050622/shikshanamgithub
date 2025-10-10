'use client'

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
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = `https://placehold.co/300x200/1f2937/a78bfa?text=${target.alt}`
  }

  return (
    <section id="founders-mission-section" className="py-16 bg-sand-50 dark:bg-slate-900 relative">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center py-8 mb-8 md:mb-12">
          {/* Pill/Tag */}
          <div className="inline-flex items-center bg-saffron-100 text-saffron-800 text-sm font-medium px-4 py-1 rounded-full mb-4 border border-saffron-200 dark:bg-saffron-500/20 dark:text-saffron-400 dark:border-saffron-500/30">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            Wisdom in Action
          </div>
          
          {/* Main Heading */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-saffron-900 dark:text-gray-50">Founder's</span> <span className="text-saffron-600 dark:text-orange-300">Mission</span>
          </h2>
          
          {/* Subheading */}
          <p className="text-lg text-saffron-700 dark:text-gray-100 mt-4 max-w-3xl mx-auto">
            To Transform Modern lives with Eternal Wisdom
          </p>
        </div>
        
        {/* Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <Image 
                src={image.src} 
                alt={image.alt} 
                width={300}
                height={200}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-110" 
                onError={handleImageError}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}