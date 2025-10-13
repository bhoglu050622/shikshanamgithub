'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Teacher {
  id: string
  name: string
  title: string
  description: string
  videoId: string
  videoType: 'orange' | 'blue'
  videoPill: string
  videoTimestamp: string
  stats: {
    icon: string
    text: string
  }[]
  backgroundImage: string
}

const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Acharya Jamwant Ji',
    title: 'The Essence of Sānkhya Philosophy',
    description: 'Discover the fundamentals of the Human Emotions and explore the three Guṇas that govern the origin of your Emotional Behaviour',
    videoId: 'VxoFDmPIpGU',
    videoType: 'orange',
    videoPill: 'Traditional Wisdom',
    videoTimestamp: '12:34',
    backgroundImage: 'https://shikshanam.in/wp-content/uploads/2025/06/1.1.jpg',
    stats: [
      { icon: 'students', text: '<strong>500+</strong> Disciples' },
      { icon: 'clock', text: '<strong>10+</strong> Years' },
      { icon: 'book', text: 'Author | 2 Books' }
    ]
  },
  {
    id: '2',
    name: 'Vishal Chaurasia',
    title: 'Modern Applications of Ancient Wisdom',
    description: 'Learn how to apply Sāṃkhya principles through various activities to overcome modern emotional challenges and build resilience.',
    videoId: 'kldd4TkWkEU',
    videoType: 'blue',
    videoPill: 'Modern Application',
    videoTimestamp: '10:45',
    backgroundImage: 'https://shikshanam.in/wp-content/uploads/2024/05/1.png',
    stats: [
      { icon: 'youtube', text: '<strong>1.5M</strong> Subscribers' },
      { icon: 'instagram', text: '<strong>450K</strong> Followers' },
      { icon: 'facebook', text: '<strong>500K</strong> Followers' }
    ]
  }
]

export default function MasterTeachersSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  return (
    <section 
      id="master-teachers-component"
      className="bg-[#1a1d24] text-white py-20 px-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-12 text-center">
        <h2 className="text-4xl md:text-[2.25rem] font-bold text-[#f39c12] animate-fade-in-up">
          Meet Your Masters
        </h2>
        <p className="text-lg text-[#bdc3c7] max-w-[600px] -mt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Get a preview of the profound teachings that await you in this transformative course
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {teachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className="bg-[#2c323b] rounded-2xl overflow-hidden flex flex-col border border-[#3d4450] transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
            >
              {/* Video Placeholder */}
              <div
                onClick={() => setPlayingVideo(teacher.id)}
                className="h-[200px] relative flex items-center justify-center cursor-pointer overflow-hidden transition-transform duration-400 hover:scale-105"
                style={{
                  backgroundImage: playingVideo === teacher.id ? 'none' : `url('${teacher.backgroundImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: teacher.videoType === 'orange' ? 'center 20%' : 'center'
                }}
              >
                {playingVideo === teacher.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${teacher.videoId}?autoplay=1&rel=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  />
                ) : (
                  <>
                    {/* Glow Effect for Orange Card */}
                    {teacher.videoType === 'orange' && (
                      <div
                        className="absolute top-0 left-full w-1/2 h-full pointer-events-none transition-all duration-1000 ease-out"
                        style={{
                          background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%)',
                          transform: 'skewX(-25deg)',
                          zIndex: 1
                        }}
                      />
                    )}

                    <div className="absolute top-4 left-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      {teacher.videoPill}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      {teacher.videoTimestamp}
                    </div>
                    
                    <div className="w-15 h-15 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:bg-white/30 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-white ml-1">
                        <path d="M8 5v14l11-7z"></path>
                      </svg>
                    </div>
                    <div className="absolute top-[calc(50%+40px)] left-1/2 -translate-x-1/2 text-white font-semibold text-center text-xs uppercase opacity-90 pointer-events-none z-10">
                      Tap Now
                    </div>
                  </>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 text-left flex flex-col flex-grow">
                <h3 className="font-bold text-xl text-white">{teacher.name}</h3>
                <p className="text-[#f39c12] font-semibold text-sm mt-1">{teacher.title}</p>
                <p className="text-[#bdc3c7] text-[0.95rem] my-4 leading-relaxed">{teacher.description}</p>
                
                <div className="flex justify-between gap-4 pt-4 border-t border-[#3d4450] mt-auto flex-wrap">
                  {teacher.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {stat.icon === 'students' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-[#f39c12] fill-current">
                          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
                        </svg>
                      )}
                      {stat.icon === 'clock' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-[#f39c12] fill-current">
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                          <path d="M13 7h-2v6l5.25 3.15.75-1.23-4-2.42z"></path>
                        </svg>
                      )}
                      {stat.icon === 'book' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-[#f39c12] fill-current">
                          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path>
                        </svg>
                      )}
                      {stat.icon === 'youtube' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-[#f39c12] fill-current">
                          <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path>
                        </svg>
                      )}
                      {stat.icon === 'instagram' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-[#f39c12] fill-current">
                          <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.2,5.2 0 0,1 16.2,21.4H7.8C4.6,21.4 2,18.8 2,15.6V7.8A5.2,5.2 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M16.5,5.5A1.5,1.5 0 0,1 18,7A1.5,1.5 0 0,1 16.5,8.5A1.5,1.5 0 0,1 15,7A1.5,1.5 0 0,1 16.5,5.5Z"></path>
                        </svg>
                      )}
                      {stat.icon === 'facebook' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-[#f39c12] fill-current">
                          <path d="M17,2V5H14C13.4,5 13,5.4 13,6V8H16L15.5,11H13V20H10V11H7V8H10V6C10,3.8 11.3,2 14,2H17Z"></path>
                        </svg>
                      )}
                      <span className="text-sm text-[#bdc3c7]" dangerouslySetInnerHTML={{ __html: stat.text }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <a 
          href="https://shikshanam.in/emotional-intelligence-with-samkhya-darshan/#:~:text=Limited%20Time%20Offer,-Transform%20Your%20Emotional"
          className="inline-block mt-8 px-12 py-4 text-lg font-bold text-white rounded-full bg-gradient-to-r from-[#f39c12] to-[#e67e22] transition-all duration-400 hover:-translate-y-1 hover:scale-105 hover:brightness-115 opacity-0 animate-fade-in-up-pulse"
          style={{ 
            animationDelay: '0.8s',
            boxShadow: '0 10px 20px rgba(243, 156, 18, 0.2)'
          }}
        >
          Start Your Journey
        </a>
      </div>

      <style jsx>{`
        @keyframes master-teacher-fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseEffect {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 20px rgba(243, 156, 18, 0.2);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 15px 30px rgba(243, 156, 18, 0.4);
          }
        }
        .animate-fade-in-up {
          animation: master-teacher-fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .animate-fade-in-up-pulse {
          animation: master-teacher-fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
                     pulseEffect 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1) 1.8s;
        }
        .animate-fade-in-up-pulse:hover {
          animation-play-state: running, paused;
        }
        @media (max-width: 992px) {
          .grid-cols-2 {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
