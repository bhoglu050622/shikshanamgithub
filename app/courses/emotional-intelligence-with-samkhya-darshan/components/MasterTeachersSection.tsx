'use client'

import { useEffect, useRef, useState } from 'react'
import VideoModal from './VideoModal'

interface TeacherCardProps {
  name: string
  title: string
  description: string
  videoId: string
  videoType: 'orange' | 'blue'
  videoPill: string
  videoTimestamp: string
  stats: Array<{
    icon: React.ReactNode
    text: string
  }>
  delay: number
  onVideoClick: (videoId: string) => void
}

const TeacherCard = ({ 
  name, 
  title, 
  description, 
  videoId, 
  videoType, 
  videoPill, 
  videoTimestamp, 
  stats, 
  delay,
  onVideoClick
}: TeacherCardProps) => {
  const [isVisible, setIsVisible] = useState(false)
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

  const handleVideoClick = () => {
    onVideoClick(videoId)
  }

  const backgroundImage = videoType === 'orange' 
    ? 'https://shikshanam.in/wp-content/uploads/2025/06/1.1.jpg'
    : 'https://shikshanam.in/wp-content/uploads/2024/05/1.png'

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-2xl overflow-hidden flex flex-col border border-slate-200 shadow-lg transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
        animationDelay: `${delay}s`
      }}
    >
      {/* Video Placeholder */}
      <div 
        className="h-48 relative flex items-center justify-center cursor-pointer transition-transform duration-400 hover:scale-105 overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: videoType === 'orange' ? 'center 20%' : 'center'
        }}
        onClick={handleVideoClick}
      >
        {/* Glow effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 transform -skew-x-12 translate-x-full hover:translate-x-[-200%]" />
        
        {/* Video Info Pills */}
        <div className="absolute top-4 left-4 bg-black/40 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {videoPill}
        </div>
        <div className="absolute top-4 right-4 bg-black/40 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {videoTimestamp}
        </div>
        
        {/* Play Icon */}
        <div className="relative z-10 w-15 h-15 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors duration-300 hover:bg-white/30">
          <svg className="w-6 h-6 fill-white ml-1" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        
        {/* Tap Now Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-10 text-white font-semibold text-xs uppercase opacity-90 transition-opacity duration-300 hover:opacity-100 pointer-events-none">
          Tap Now
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800">{name}</h3>
        <p className="text-orange-500 font-semibold text-sm mt-1">{title}</p>
        <p className="text-slate-600 text-sm mt-4 leading-relaxed">{description}</p>
        
        {/* Stats Section */}
        <div className="flex justify-between gap-4 pt-4 mt-auto border-t border-slate-200 flex-wrap">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-6 h-6 text-orange-500">
                {stat.icon}
              </div>
              <span className="text-sm text-slate-600">
                <strong className="text-slate-800">{stat.text.split(' ')[0]}</strong> {stat.text.split(' ').slice(1).join(' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function MasterTeachersSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Delay button animation
            setTimeout(() => setButtonVisible(true), 800)
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

  const handleVideoClick = (videoId: string) => {
    setCurrentVideoId(videoId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentVideoId(null)
  }

  const teachers = [
    {
      name: "Acharya Jamwant Ji",
      title: "The Essence of Sānkhya Philosophy",
      description: "Discover the fundamentals of the Human Emotions and explore the three Guṇas that govern the origin of your Emotional Behaviour",
      videoId: "VxoFDmPIpGU",
      videoType: "orange" as const,
      videoPill: "Traditional Wisdom",
      videoTimestamp: "12:34",
      stats: [
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          ),
          text: "500+ Disciples"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
              <path d="M13 7h-2v6l5.25 3.15.75-1.23-4-2.42z" />
            </svg>
          ),
          text: "10+ Years"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
            </svg>
          ),
          text: "Author | 2 Books"
        }
      ]
    },
    {
      name: "Vishal Chaurasia",
      title: "Modern Applications of Ancient Wisdom",
      description: "Learn how to apply Sāṃkhya principles through various activities to overcome modern emotional challenges and build resilience.",
      videoId: "kldd4TkWkEU",
      videoType: "blue" as const,
      videoPill: "Modern Application",
      videoTimestamp: "10:45",
      stats: [
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
            </svg>
          ),
          text: "1.5M Subscribers"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.2,5.2 0 0,1 16.2,21.4H7.8C4.6,21.4 2,18.8 2,15.6V7.8A5.2,5.2 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M16.5,5.5A1.5,1.5 0 0,1 18,7A1.5,1.5 0 0,1 16.5,8.5A1.5,1.5 0 0,1 15,7A1.5,1.5 0 0,1 16.5,5.5Z" />
            </svg>
          ),
          text: "450K Followers"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,2V5H14C13.4,5 13,5.4 13,6V8H16L15.5,11H13V20H10V11H7V8H10V6C10,3.8 11.3,2 14,2H17Z" />
            </svg>
          ),
          text: "500K Followers"
        }
      ]
    }
  ]

  return (
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
            Meet Your Masters
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
            Get a preview of the profound teachings that await you in this transformative course
          </p>

          {/* Cards Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-4xl">
            {teachers.map((teacher, index) => (
              <TeacherCard
                key={teacher.name}
                {...teacher}
                delay={0.4 + (index * 0.2)}
                onVideoClick={handleVideoClick}
              />
            ))}
          </div>
          
          {/* Start Your Journey Button */}
          <a 
            href="https://shikshanam.in/emotional-intelligence-with-samkhya-darshan/#:~:text=Limited%20Time%20Offer,-Transform%20Your%20Emotional"
            className={`inline-block mt-8 px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-400 hover:-translate-y-1 hover:scale-105 hover:brightness-110 ${
              buttonVisible ? 'animate-pulse' : ''
            }`}
            style={{
              opacity: buttonVisible ? 1 : 0,
              transform: buttonVisible ? 'translateY(0)' : 'translateY(25px)',
              transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s'
            }}
          >
            Start Your Journey
          </a>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        videoId={currentVideoId}
        onClose={handleCloseModal}
        title="Meet Your Masters - Video"
      />
    </section>
  )
}