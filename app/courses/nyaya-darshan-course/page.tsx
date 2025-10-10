'use client'

import React from 'react';

// Icon Components (reusing from Yoga Darshan)
const BookOpen = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const Award = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const MessageCircle = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
);

const Users = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const Star = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
);

const Clock = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
);

const GraduationCap = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
);

const Video = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
);

const PlayCircle = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
    </svg>
);

const MessageSquarePlus = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/><line x1="12" y1="7" x2="12" y2="13"/><line x1="9" y1="10" x2="15" y2="10"/>
    </svg>
);

const Quote = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
);

const Sparkles = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
);

const Youtube = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);

const Instagram = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);

const Facebook = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);

const CheckCircle = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

const ChevronRight = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9 18 15 12 9 6"/>
    </svg>
);

const Brain = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
);

const Lightbulb = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
    </svg>
);

const Eye = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
);

// Main Component
export default function NyayaDarshanCoursePage() {
  const features = [
    { icon: <Clock className="h-6 w-6 text-purple-600" />, text: "1 Year Access" },
    { icon: <Award className="h-6 w-6 text-purple-600" />, text: "Community Access" },
    { icon: <MessageCircle className="h-6 w-6 text-purple-600" />, text: "Certificate" },
    { icon: <BookOpen className="h-6 w-6 text-purple-600" />, text: "Free Future Updates" },
  ];
  
  const secondaryFeatures = [
      {title: "Skill Level", description: "Beginner", icon: <GraduationCap className="h-8 w-8 text-purple-600" />},
      {title: "Language", description: "हिंदी", icon: "🗣️"},
      {title: "Students", description: "1500+", icon: <Users className="h-8 w-8 text-purple-600" /> },
      {title: "Rating", description: "5.0/5", icon: <Star className="h-8 w-8 text-purple-600" fill="currentColor" /> },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 font-sans text-slate-800 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-300 rounded-full opacity-20 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-fuchsia-300 rounded-full opacity-10 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left mb-12 lg:mb-0 order-2 lg:order-1">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-violet-100 px-4 py-2 rounded-full border-2 border-purple-300 shadow-lg">
                <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                <span className="bg-gradient-to-r from-purple-700 to-violet-700 bg-clip-text text-transparent font-bold tracking-wide uppercase text-sm">
                  Logic & Reasoning
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mt-4 mb-4 leading-tight">
              <span className="bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-700 bg-clip-text text-transparent">
                न्याय दर्शन
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 flex items-center justify-center lg:justify-start gap-2">
              <span className="text-3xl">🧩</span>
              Nyaya Philosophy through Rishi Gautama's Nyaya Sutras
            </h2>
            
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl blur opacity-20"></div>
              <p className="relative text-xl md:text-2xl text-slate-900 font-semibold bg-gradient-to-r from-purple-100 to-violet-100 px-6 py-4 rounded-xl border-l-4 border-purple-500 shadow-lg">
                <span className="text-2xl mr-2">✨</span>
                ईश्वर को कैसे और प्रमाणों से समझें!
                <span className="text-2xl ml-2">✨</span>
              </p>
            </div>

            <ul className="mt-8 space-y-4 text-left max-w-md mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center group">
                  <div className="flex-shrink-0 bg-purple-100 rounded-full p-3 group-hover:bg-purple-200 transition-all group-hover:scale-110 shadow-md">
                    {feature.icon}
                  </div>
                  <span className="ml-4 text-slate-700 font-semibold text-lg">{feature.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#enroll" 
                className="group relative bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold py-4 px-10 rounded-xl text-lg hover:from-purple-700 hover:to-violet-700 transition-all transform hover:scale-105 shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  ENROLL NOW
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </a>
              <a 
                href="#syllabus" 
                className="bg-white text-purple-700 font-bold py-4 px-10 rounded-xl text-lg hover:bg-purple-50 transition-all border-2 border-purple-300 hover:border-purple-500 shadow-lg hover:shadow-xl"
              >
                View Syllabus
              </a>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-full max-w-lg group">
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-br from-purple-300 to-violet-300 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-gradient-to-br from-fuchsia-300 to-purple-300 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity"></div>
                
                <div className="relative bg-white p-2 rounded-3xl shadow-2xl border-4 border-white transform group-hover:scale-105 transition-transform duration-500">
                    <div className="relative overflow-hidden rounded-2xl">
                        <img 
                            src="https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png" 
                            alt="Nyaya Darshan Course - Vishal Chaurasia" 
                            className="rounded-2xl w-full h-auto shadow-lg"
                            onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x600/9333ea/white?text=Nyaya+Darshan'; }}
                        />
                        
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                            <Users className="h-5 w-5 text-purple-600" />
                            <span className="font-bold text-slate-800">1500+ Students</span>
                        </div>
                        
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                            <span className="font-bold text-slate-800">5.0</span>
                        </div>
                    </div>
                </div>

                <div className="absolute -top-4 left-8 bg-gradient-to-br from-purple-500 to-violet-500 text-white px-4 py-2 rounded-lg shadow-xl transform -rotate-6 hover:rotate-0 transition-transform cursor-default">
                    <p className="text-xs font-semibold">with Vishal Chaurasia</p>
                </div>
            </div>
          </div>
        </div>

        {/* Secondary Features Section */}
        <div className="mt-20 md:mt-28">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                {secondaryFeatures.map((feature, index) => (
                     <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{feature.icon}</div>
                        <h4 className="font-bold text-slate-600 text-sm mb-1">{feature.title}</h4>
                        <p className="text-slate-900 font-extrabold text-xl">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Benefits Section - क्या आप भी चाहते हैं ? */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6">
              क्या आप भी चाहते हैं ?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group relative bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-purple-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200 to-violet-200 rounded-bl-full rounded-tr-3xl opacity-30"></div>
              
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-violet-400 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                विज्ञान और तर्क से ईश्वर को समझना
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Understand the divine through science and analytical logic
              </p>
            </div>

            <div className="group relative bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-violet-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-bl-full rounded-tr-3xl opacity-30"></div>
              
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Eye className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-fuchsia-400 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                प्राचीन ज्ञान के शास्त्रीयों को सुनना
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Learn ancient wisdom from traditional scholarly texts
              </p>
            </div>

            <div className="group relative bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-fuchsia-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-fuchsia-200 to-purple-200 rounded-bl-full rounded-tr-3xl opacity-30"></div>
              
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Lightbulb className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                सही गलत में भेद करने की समस्या पाना
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Develop power to distinguish between right and wrong
              </p>
            </div>

            <div className="group relative bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-purple-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200 to-fuchsia-200 rounded-bl-full rounded-tr-3xl opacity-30"></div>
              
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                कठिन प्रश्नों को वैदिक निर्णयों से हल करना
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Solve difficult questions using Vedic analytical methods
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Preview Section */}
      <div className="bg-gradient-to-br from-purple-900 via-violet-900 to-purple-800 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600 rounded-full opacity-10 blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
              तो आज ही जुड़ें महर्षि गौतम जी के न्यायसूत्रों से!
            </h2>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Learn the art of right perception and analytical methods to reach the answers to the most difficult questions of life.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/zZRzMdHWp-w?autoplay=0&rel=0&modestbranding=1"
                  title="Nyaya Darshan Course Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
                
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                  <Video className="h-4 w-4" />
                  Tap to Preview
                </div>
              </div>

              <div className="p-6 md:p-8 bg-gradient-to-r from-purple-50 to-violet-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Unraveling the Mysteries of Nyaya Darshan
                    </h3>
                    <p className="text-slate-600 flex items-center gap-2">
                      <PlayCircle className="h-5 w-5 text-purple-600" />
                      Start Today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Thousands: Enroll Today!
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto rounded-full mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="group bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-purple-300 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center items-center h-16 w-16 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <p className="text-5xl md:text-6xl font-extrabold text-purple-300 mb-2">2.3K+</p>
                <p className="text-white font-semibold text-lg">Students</p>
              </div>

              <div className="group bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-yellow-300 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center items-center h-16 w-16 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
                  <Star className="h-8 w-8 text-white" fill="currentColor" />
                </div>
                <p className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-2">5</p>
                <p className="text-white font-semibold text-lg">Rating</p>
                <div className="mt-4 flex justify-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
              </div>

              <div className="group bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-violet-300 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center items-center h-16 w-16 mx-auto bg-gradient-to-br from-violet-400 to-fuchsia-600 rounded-full mb-4 shadow-lg">
                  <MessageSquarePlus className="h-8 w-8 text-white" />
                </div>
                <p className="text-5xl md:text-6xl font-extrabold text-violet-300 mb-2">185+</p>
                <p className="text-white font-semibold text-lg">Positive Reviews</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="#enroll" 
              className="group relative inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-5 px-12 rounded-2xl text-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-110 shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                ENROLL NOW
                <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials Section - हजारों छात्रों */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-purple-50 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-violet-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <span className="text-purple-600 font-bold tracking-wide uppercase text-sm">Student Testimonials</span>
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span className="text-slate-900">हजारों </span>
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">छात्रों</span>
              <span className="text-slate-900"> ने अपनाया </span>
              <span className="text-slate-900">न्याय दर्शन को</span>
            </h2>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-8 h-8 text-yellow-500" fill="currentColor" />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Testimonial 1 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-purple-100 hover:border-purple-300 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                <Quote className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex items-center gap-4 mb-6 mt-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-400 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">हर्षित वर्मा</h4>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-purple-500" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-lg italic">
                "विशाल जी मेरे senior हैं हैं स्कूल में। बहुत सूक्ष्म हुआ देवताद की यो वैदिक मान को सुर्ख वर्ण करे हैं।"
              </p>

              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-100 to-transparent rounded-tl-full opacity-50"></div>
            </div>

            {/* Testimonial 2 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-violet-100 hover:border-violet-300 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                <Quote className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex items-center gap-4 mb-6 mt-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-violet-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Shaunak Patel</h4>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-violet-500" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-lg italic">
                "Excellent methodical approach. Easy to understand and Vishal ji is expert at what he does. God bless him for sharing the knowledge."
              </p>

              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-violet-100 to-transparent rounded-tl-full opacity-50"></div>
            </div>

            {/* Testimonial 3 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-purple-100 hover:border-purple-300 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                <Quote className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex items-center gap-4 mb-6 mt-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-600 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">मुकेश रावत</h4>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-purple-500" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-lg italic">
                "गौतम ऋषि जी के शास्त्रियों को दुन कर आनंद के साथ साथ कई गई सोलाबान हुआ। किन्तु महान ने हमारे ऋषियों।"
              </p>

              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-100 to-transparent rounded-tl-full opacity-50"></div>
            </div>

            {/* Testimonial 4 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-fuchsia-100 hover:border-fuchsia-300 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                <Quote className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex items-center gap-4 mb-6 mt-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-fuchsia-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">सुमिता महगल</h4>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-fuchsia-500" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-lg italic">
                "साहस और लोन के बाद ज्ञान मीता course है। मोह जानने को मिला है जो मै पुसतकों में होती थी पाती!"
              </p>

              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-fuchsia-100 to-transparent rounded-tl-full opacity-50"></div>
            </div>

            {/* Testimonial 5 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-violet-100 hover:border-violet-300 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                <Quote className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex items-center gap-4 mb-6 mt-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-violet-600 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">अंठण पांडेय</h4>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-violet-500" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-lg italic">
                "अति पढानीय प्राचीन है विश्वाणाम् दीन का। कृपया करके और भी धारुकों पर course रखें।"
              </p>

              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-violet-100 to-transparent rounded-tl-full opacity-50"></div>
            </div>

            {/* Testimonial 6 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-purple-100 hover:border-purple-300 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                <Quote className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex items-center gap-4 mb-6 mt-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-400 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">हरिहरन शर्मा</h4>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-purple-500" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-lg italic">
                "न्याय दर्शन अतिनितिटैट विषय है। लेकिन इसी course में विशाल जी ने बड़ी आसानी से समझाया है।"
              </p>

              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-100 to-transparent rounded-tl-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Your Guru Section */}
      <div className="bg-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-20 left-0 w-96 h-96 bg-purple-200 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-violet-200 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4">
              Meet your <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Guru!</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="group relative bg-gradient-to-br from-purple-100 to-violet-100 rounded-3xl p-2 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-1.png"
                    alt="Vishal Chaurasia - Philosophy Instructor"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x700/9333ea/white?text=Vishal+Chaurasia'; }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="group relative bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                    <img
                      src="https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-1-1.png"
                      alt="Vishal with Spiritual Guru"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/400x300/a855f7/white?text=With+Guru'; }}
                    />
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                    <img
                      src="https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-2-2-300x259.png"
                      alt="Vishal Teaching"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/400x300/9333ea/white?text=Teaching'; }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
                  विशाल चौरसिया
                </h3>
                <p className="text-xl md:text-2xl text-purple-700 font-bold mb-2">
                  Graduate, IIT Patna
                </p>
                <div className="flex items-center gap-2 text-slate-600">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Philosophy Educator & Content Creator</span>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed text-lg">
                <p>
                  शिक्षणम् के संस्थापक विशाल जी एक IIT स्नातक हैं जो 2016-2023 तक भारत की एक शीर्ष PSU में सरकारी पद पर कार्यरत थे परंतु भारतीय प्राचीन ज्ञान के प्रति रुझान के चलते, उन्होंने इसी क्षेत्र में कार्य करने का निर्णय लिया।
                </p>
                <p>
                  भारतीय दर्शन के साथ साथ आध्यात्मिक और धार्मिक विषयों को वैज्ञानिक दृष्टिकोण से जन जन तक पहुँचने हेतु Hyper Quest चैनल का निर्माण किया जो भारत के शीर्ष यूट्यूब चैनलों में से एक है। विशाल जी के माध्यम से सनातन ज्ञान आज लगभग <span className="font-bold text-purple-700">2 million</span> श्रोताओं तक पहुँच रहा है जिनमें प्रवासी भारतीय भी सम्मिलित हैं।
                </p>
                <p>
                  संक्षेप में, विशाल जी का लक्ष्य दर्शन और विज्ञान को मनोरंजक और आधुनिक विधाओं के माध्यम से सभी के लिए उपयोगी बनाना है।
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-100">
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Follow him on:
                </h4>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center group cursor-pointer">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3">
                      <Youtube className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">1.5M</p>
                    <p className="text-sm text-slate-600 font-medium">Subscribers</p>
                  </div>

                  <div className="text-center group cursor-pointer">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3">
                      <Instagram className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">401K</p>
                    <p className="text-sm text-slate-600 font-medium">Followers</p>
                  </div>

                  <div className="text-center group cursor-pointer">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3">
                      <Facebook className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">470K</p>
                    <p className="text-sm text-slate-600 font-medium">Followers</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-lg">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Featured in:</h4>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <div className="grayscale hover:grayscale-0 transition-all">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/33/ABP_News_logo.png"
                      alt="ABP News"
                      className="h-10 object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).style.display='none'; }}
                    />
                  </div>
                  
                  <div className="grayscale hover:grayscale-0 transition-all">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-red-600">TED<span className="text-xl align-super">x</span></span>
                      <span className="text-lg font-bold text-slate-700">SRCC</span>
                    </div>
                  </div>
                  
                  <div className="grayscale hover:grayscale-0 transition-all">
                    <div className="bg-red-600 text-white px-4 py-2 font-serif font-bold text-sm">
                      THE TIMES OF INDIA
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Section */}
      <div id="syllabus" className="bg-gradient-to-br from-slate-50 via-purple-50 to-violet-50 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-300 rounded-full opacity-10 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4">
              Syllabus
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              A comprehensive journey through Gautama Rishi's Nyaya Sutras - the foundation of Indian logic and epistemology
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Module 1 - Introduction (FREE DEMO) */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-purple-200">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 md:p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-black text-purple-600">1</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                          Introduction
                        </h3>
                        <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                          FREE DEMO
                        </span>
                      </div>
                      <p className="text-purple-100 font-medium">Free Demo Video</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-white">
                        <Video className="h-5 w-5" />
                        <span className="text-2xl font-bold">2</span>
                      </div>
                      <p className="text-purple-100 text-sm">Videos</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-white">
                        <Clock className="h-5 w-5" />
                        <span className="text-2xl font-bold">00:06:09</span>
                      </div>
                      <p className="text-purple-100 text-sm">Duration</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <BookOpen className="h-6 w-6 text-purple-600" />
                      Topics Covered
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "An Introduction to Nyaya Darshan",
                        "What You Will Learn?"
                      ].map((topic, index) => (
                        <li key={index} className="flex items-start gap-3 group/item">
                          <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                          <span className="text-slate-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <PlayCircle className="h-6 w-6 text-purple-600" />
                      Free Preview
                    </h4>
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/zZRzMdHWp-w?autoplay=0&rel=0&modestbranding=1"
                        title="Nyaya Darshan Course Preview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 2 - Nyaya Sutra: Book 1 (Part 1) */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-violet-200">
              <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6 md:p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-black text-violet-600">2</span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                        Nyaya Sutra: Book 1 (Part 1)
                      </h3>
                      <p className="text-violet-100 font-medium">Fundamentals of Knowledge</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <span className="text-white font-semibold">Chapter 1</span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-slate-600">
                  Explore the foundations of Nyaya philosophy and the means of valid knowledge
                </p>
              </div>
            </div>

            {/* Module 3 - Nyaya Sutra: Book 1 (Part 2) */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-fuchsia-200">
              <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 p-6 md:p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-black text-fuchsia-600">3</span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                        Nyaya Sutra: Book 1 (Part 2)
                      </h3>
                      <p className="text-fuchsia-100 font-medium">Advanced Concepts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <span className="text-white font-semibold">Chapter 2</span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-slate-600">
                  Deep dive into perception, inference, and logical reasoning
                </p>
              </div>
            </div>

            {/* Module 4 - Nyaya Sutra: Book 2 (Part 1) */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-purple-200">
              <div className="bg-gradient-to-r from-purple-700 to-violet-700 p-6 md:p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-black text-purple-700">4</span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                        Nyaya Sutra: Book 2 (Part 1)
                      </h3>
                      <p className="text-purple-100 font-medium">Sources of Knowledge</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <span className="text-white font-semibold">Chapter 3</span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-slate-600">
                  Understanding Pramanas - the valid means of knowledge
                </p>
              </div>
            </div>

            {/* Module 5 - Nyaya Sutra: Book 2 (Part 2) */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-violet-200">
              <div className="bg-gradient-to-r from-violet-700 to-fuchsia-700 p-6 md:p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-black text-violet-700">5</span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                        Nyaya Sutra: Book 2 (Part 2)
                      </h3>
                      <p className="text-violet-100 font-medium">Deepening Understanding</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <span className="text-white font-semibold">Chapter 4</span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-slate-600">
                  Further exploration of epistemology and logical analysis
                </p>
              </div>
            </div>

            {/* Module 6 - Nyaya Sutra: Book 3 */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-purple-200">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 md:p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-black text-purple-600">6</span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                        Nyaya Sutra: Book 3
                      </h3>
                      <p className="text-purple-100 font-medium">Mastery of Logic</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <span className="text-white font-semibold">Chapter 5</span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-slate-600">
                  Master the complete system of Nyaya logic and debate
                </p>
              </div>
            </div>

            {/* Module 7 - Revision Part-1 */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-fuchsia-200">
              <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 p-6 md:p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-black text-fuchsia-600">7</span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                        Revision Part-1
                      </h3>
                      <p className="text-fuchsia-100 font-medium">Comprehensive Review</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <span className="text-white font-semibold">Review</span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-slate-600">
                  Review and consolidate your understanding of Books 1-2
                </p>
              </div>
            </div>

            {/* Module 8 - Revision Part-2 */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-violet-200">
              <div className="bg-gradient-to-r from-violet-700 to-purple-700 p-6 md:p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-black text-violet-700">8</span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                        Revision Part-2
                      </h3>
                      <p className="text-violet-100 font-medium">Final Consolidation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <span className="text-white font-semibold">Final Review</span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-slate-600">
                  Complete review and mastery of all Nyaya Sutras
                </p>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-extrabold text-center mb-8">
                Complete Course Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black mb-2">8</div>
                  <div className="text-purple-100 font-medium">Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black mb-2">50+</div>
                  <div className="text-purple-100 font-medium">Videos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black mb-2">1Yr</div>
                  <div className="text-purple-100 font-medium">Access</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black mb-2">5.0</div>
                  <div className="text-purple-100 font-medium">Rating</div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <a 
                  href="#enroll" 
                  className="inline-flex items-center bg-white text-purple-700 font-bold py-4 px-10 rounded-2xl text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl"
                >
                  Start Learning Today
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder's Mission - Masonry Gallery */}
      <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full opacity-10 blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center py-8 mb-8 md:mb-12">
            {/* Wisdom in Action Badge */}
            <div className="inline-flex items-center bg-purple-100 text-purple-700 text-sm font-medium px-4 py-1 rounded-full mb-4">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              Wisdom in Action
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-slate-900">Founder's</span> <span className="text-purple-500">Mission</span>
            </h2>

            {/* Subheading */}
            <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
              To Transform Modern lives with Eternal Wisdom
            </p>
          </div>

          {/* Masonry Gallery */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {/* Image 1 */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-01-scaled.png" 
                alt="Gallery Image 1" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+1'; }}
              />
            </div>

            {/* Image 2 */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-02-scaled.png" 
                alt="Gallery Image 2" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+2'; }}
              />
            </div>

            {/* Image 3 */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-03-scaled.png" 
                alt="Gallery Image 3" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+3'; }}
              />
            </div>

            {/* Image 4 */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-04-scaled.png" 
                alt="Gallery Image 4" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+4'; }}
              />
            </div>

            {/* Image 5 */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-06-scaled.png" 
                alt="Gallery Image 5" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+5'; }}
              />
            </div>

            {/* Image 6 */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-05-5-scaled.png" 
                alt="Gallery Image 6" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+6'; }}
              />
            </div>

            {/* Image 7 */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-07-scaled.png" 
                alt="Gallery Image 7" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+7'; }}
              />
            </div>

            {/* Image 8 (16) */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-16.png" 
                alt="Gallery Image 16" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+16'; }}
              />
            </div>

            {/* Image 9 (13) */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-13.png" 
                alt="Gallery Image 13" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+13'; }}
              />
            </div>

            {/* Image 10 (12) */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-12-scaled.png" 
                alt="Gallery Image 12" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+12'; }}
              />
            </div>

            {/* Image 11 */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-11-scaled.png" 
                alt="Gallery Image 11" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+11'; }}
              />
            </div>

            {/* Image 12 (15) */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-15.png" 
                alt="Gallery Image 15" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+15'; }}
              />
            </div>

            {/* Image 13 (14) */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-14-scaled.png" 
                alt="Gallery Image 14" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+14'; }}
              />
            </div>

            {/* Image 14 (8) */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-08-scaled.png" 
                alt="Gallery Image 8" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+8'; }}
              />
            </div>

            {/* Image 15 (9) */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-09-4-scaled.png" 
                alt="Gallery Image 9" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+9'; }}
              />
            </div>

            {/* Image 16 (10) */}
            <div className="break-inside-avoid relative overflow-hidden rounded-lg">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-10-3-scaled.png" 
                alt="Gallery Image 10" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+10'; }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
