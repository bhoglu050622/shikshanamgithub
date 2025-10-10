'use client'

import React from 'react';
import Image from 'next/image';

// Icon Components
const BookOpen = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const Clock = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
);

const ScrollText = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/>
    </svg>
);

const Bell = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
);

const FileCheck = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/>
    </svg>
);

const GraduationCap = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
);

const Star = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
);

const Users = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);

const MessageSquarePlus = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/><line x1="12" y1="7" x2="12" y2="13"/><line x1="9" y1="10" x2="15" y2="10"/>
    </svg>
);

const PlayCircle = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
    </svg>
);

const Lightbulb = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
    </svg>
);

const Heart = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
);

const Brain = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
);

const Youtube = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
    </svg>
);

const Instagram = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);

const Facebook = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
);

const ChevronDown = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m6 9 6 6 6-6"/>
    </svg>
);

const Sparkles = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
);

const Atom = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>
    </svg>
);

const Eye = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
);

export default function AdvaitaVedantaCoursePage() {
  const features = [
    { icon: <Bell className="h-8 w-8 text-purple-600" />, text: "Free Future Updates", subtitle: "Lifetime Access" },
    { icon: <Eye className="h-8 w-8 text-purple-600" />, text: "All 46 Shlokas Covered", subtitle: "Complete" },
    { icon: <Clock className="h-8 w-8 text-purple-600" />, text: "7+ Hrs. of Content", subtitle: "Comprehensive" },
    { icon: <FileCheck className="h-8 w-8 text-purple-600" />, text: "Quizzes & Notes", subtitle: "Learning Support" },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 font-sans text-slate-800 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full opacity-20 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Course Image */}
          <div className="flex justify-center items-center order-1 lg:order-1">
            <div className="relative w-full max-w-lg group">
                {/* Decorative background elements */}
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity"></div>
                
                {/* Main image card with NEW badge */}
                <div className="relative">
                  {/* NEW Badge */}
                  <div className="absolute -top-4 -left-4 z-20">
                    <div className="bg-yellow-400 text-black font-black px-4 py-2 rounded-lg transform -rotate-12 shadow-lg border-2 border-yellow-500">
                      <span className="text-2xl">NEW</span>
                    </div>
                  </div>

                  <div className="relative bg-white p-2 rounded-3xl shadow-2xl border-4 border-white transform group-hover:scale-105 transition-transform duration-500">
                    <div className="relative overflow-hidden rounded-2xl">
                        <Image 
                            src="https://shikshanam.in/wp-content/uploads/2025/03/ALL-course-thumbnail-1.png" 
                            alt="Advaita Vedanta Darshan - Drig Drishya Viveka Course" 
                            width={600}
                            height={600}
                            className="rounded-2xl w-full h-auto shadow-lg"
                            onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x600/9333ea/white?text=Advaita+Vedanta'; }}
                        />
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-2">
            {/* Badge */}
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full border-2 border-purple-200 animate-pulse">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700 font-bold text-sm">Discover the Seer and Seen</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                Advaita Vedanta Darshan: A Journey Through Drig Drishya Viveka
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-700 font-bold mb-8 italic flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <span className="text-2xl">🔮</span> 
              <span>जीवन का वास्तविक लक्ष्य क्या है ?</span>
              <span className="text-2xl">🔮</span>
            </p>

            {/* Course Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 mb-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-purple-600" />
                  <div className="text-left">
                    <p className="text-sm text-slate-600 font-medium">Skill Level</p>
                    <p className="text-lg font-bold text-pink-600">Beginner</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                  <div className="text-left">
                    <p className="text-sm text-slate-600 font-medium">Language</p>
                    <p className="text-lg font-bold text-pink-600">हिन्दी</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-10">
              <a 
                href="#enroll" 
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white font-bold py-4 px-12 rounded-xl text-xl hover:from-orange-600 hover:via-orange-700 hover:to-orange-600 transition-all transform hover:scale-105 shadow-2xl overflow-hidden w-full lg:w-auto animate-pulse hover:animate-none"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  ENROLL NOW
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-30 transition-opacity"></div>
                {/* Animated shine effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Course Highlights</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-purple-100 hover:border-purple-300 text-center overflow-hidden">
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-purple-700 transition-colors">
                    {feature.text}
                  </h3>
                  <p className="text-sm text-slate-600">{feature.subtitle}</p>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-purple-200 to-pink-200 opacity-0 group-hover:opacity-100 rounded-bl-full transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-12">
            क्या आप भी इन प्रश्नों का उत्तर ढूंढ रहे हैं ?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Question 1 */}
            <div className="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-pink-200 hover:border-pink-400">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-center text-slate-900 font-bold text-lg leading-tight">
                जीवन का वास्तविक लक्ष्य क्या है ?
              </p>
            </div>

            {/* Question 2 */}
            <div className="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-pink-200 hover:border-pink-400">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Atom className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-center text-slate-900 font-bold text-lg leading-tight">
                क्या ये संसार सच में मिथ्या है?
              </p>
            </div>

            {/* Question 3 */}
            <div className="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-pink-200 hover:border-pink-400">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-center text-slate-900 font-bold text-lg leading-tight">
                अद्वैत वेदांत से जीवन कैसे जिया जाये ?
              </p>
            </div>

            {/* Question 4 */}
            <div className="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-pink-200 hover:border-pink-400">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-center text-slate-900 font-bold text-lg leading-tight">
                मैं और ये संसार एक कैसे हो सकते हैं ?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Preview Section */}
      <div className="bg-gradient-to-br from-pink-700 via-purple-700 to-pink-800 py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              तो आज ही जुड़ें वेदान्त [उपनिषदों] के अद्वैत दर्शन से!
            </h2>
            <p className="text-lg md:text-xl text-pink-100 max-w-3xl mx-auto">
              Discover the Unity of the Seer and Seen through a Verse-by-Verse Analysis of <em>Drig Drishya Viveka</em>.
            </p>
          </div>

          {/* Video Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <div className="relative aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/TJpKpXZaKJw?autoplay=0&rel=0&modestbranding=1"
                  title="Advaita Vedanta Darshan - Drig Drishya Viveka Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
              
              {/* Video Footer */}
              <div className="p-6 md:p-8 bg-gradient-to-r from-pink-50 to-purple-50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      दर्शन क्या है ?
                    </h3>
                    <p className="text-slate-600 flex items-center gap-2">
                      <PlayCircle className="h-5 w-5 text-pink-600" />
                      Watch the course introduction
                    </p>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-2xl shadow-lg border-2 border-pink-200">
                    <p className="text-sm text-slate-600 font-medium">Start Today</p>
                    <p className="text-xs text-pink-600">Tap to Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Social Proof Section */}
      <div className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              <span className="text-slate-900">हजारों </span>
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">छात्रों</span>
              <span className="text-slate-900"> ने अपनाया शिक्षणम् को!</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {/* Students */}
            <div className="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-pink-100 hover:border-pink-300 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-5xl font-extrabold text-pink-600 mb-2">70K+</p>
              <p className="text-slate-600 font-semibold text-lg">Students</p>
            </div>

            {/* Rating */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-purple-100 hover:border-purple-300 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-white" fill="currentColor" />
                </div>
              </div>
              <p className="text-5xl font-extrabold text-purple-600 mb-2">4.9</p>
              <p className="text-slate-600 font-semibold text-lg">Rating</p>
              <div className="flex justify-center gap-1 mt-2">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" />
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-pink-100 hover:border-pink-300 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <MessageSquarePlus className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-5xl font-extrabold text-pink-600 mb-2">2.3K+</p>
              <p className="text-slate-600 font-semibold text-lg">Positive Reviews</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a 
              href="#enroll" 
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-5 px-16 rounded-2xl text-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">ENROLL NOW</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-30 transition-opacity"></div>
              {/* Animated shine effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Meet Your Guru Section */}
      <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-16 md:py-24">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-slate-900">Meet your </span>
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Guru!</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            
            {/* Left Column: Images */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4 relative">
                {/* Large image on left */}
                <div className="row-span-2">
                  <div className="group relative bg-white p-2 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-full">
                    <div className="relative overflow-hidden rounded-2xl h-full">
                      <Image 
                        src="https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-1.png" 
                        alt="Vishal Chaurasia - Guru" 
                        width={400}
                        height={600}
                        className="rounded-2xl w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/400x600/9333ea/white?text=Guru'; }}
                      />
                    </div>
                  </div>
                </div>

                {/* Top right image */}
                <div>
                  <div className="group relative bg-white p-2 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image 
                        src="https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-1-1.png" 
                        alt="Vishal Chaurasia with Traditional Guru" 
                        width={300}
                        height={300}
                        className="rounded-2xl w-full h-auto"
                        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/300x300/9333ea/white?text=Guru+2'; }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom right image */}
                <div>
                  <div className="group relative bg-white p-2 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image 
                        src="https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-2-2-300x259.png" 
                        alt="Vishal Chaurasia Teaching" 
                        width={300}
                        height={259}
                        className="rounded-2xl w-full h-auto"
                        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/300x259/9333ea/white?text=Guru+3'; }}
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl -z-10"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full opacity-20 blur-3xl -z-10"></div>
              </div>
            </div>

            {/* Right Column: Bio & Info */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Name & Title */}
              <div className="text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">विशाल चौरसिया</h3>
                <p className="text-xl text-purple-700 font-bold mb-6">Graduate, IIT Patna</p>
              </div>

              {/* Bio */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-purple-100 space-y-4">
                <p className="text-slate-700 leading-relaxed text-lg">
                  शिक्षणम् के संस्थापक विशाल जी एक IIT स्नातक हैं जो 2016-2023 तक भारत की एक शीर्ष PSU में सहकारी पद पर कार्यरत थे। अपने प्रतिष्ठान के चलते, उन्होंने इसी क्षेत्र में कार्य करने का निर्णय लिया।
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  भारतीय दर्शनों के साथ साथ आध्यात्मिक और धार्मिक विषयों को वैज्ञानिक दृष्टिकोण से जन जन तक पहुंचने हेतु Hyper Quest चैनल का निर्माण किया जो भारत के शीर्ष युवा चैनलों में से एक है। विशाल जी के माध्यम से सनातन ज्ञान आज लगभग 2 million श्रोताओं तक पहुंच रहा है जिनमें प्रवासी भारतीय भी सम्मिलित हैं।
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  संक्षेप में, विशाल जी का लक्ष्य दर्शन और विज्ञान को मनोवैज्ञानिक और आध्यात्मिक विधाओं के माध्यम से सभी के लिए उपयोगी बनाना है।
                </p>
              </div>

              {/* Social Media Stats */}
              <div>
                <p className="text-lg font-bold text-slate-900 mb-4">Follow him on:</p>
                <div className="grid grid-cols-3 gap-4">
                  {/* YouTube */}
                  <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-red-200 hover:border-red-400 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Youtube className="h-7 w-7 text-white" fill="currentColor" />
                      </div>
                    </div>
                    <p className="text-2xl font-extrabold text-red-600 mb-1">1.5M</p>
                    <p className="text-sm text-slate-600 font-semibold">Subscribers</p>
                  </div>

                  {/* Instagram */}
                  <div className="group bg-gradient-to-br from-pink-50 to-purple-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-pink-200 hover:border-pink-400 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Instagram className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl font-extrabold text-pink-600 mb-1">401K</p>
                    <p className="text-sm text-slate-600 font-semibold">Followers</p>
                  </div>

                  {/* Facebook */}
                  <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-blue-200 hover:border-blue-400 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Facebook className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl font-extrabold text-blue-600 mb-1">470K</p>
                    <p className="text-sm text-slate-600 font-semibold">Followers</p>
                  </div>
                </div>
              </div>

              {/* Featured In */}
              <div>
                <p className="text-lg font-bold text-slate-900 mb-4">Featured in:</p>
                <div className="grid grid-cols-3 gap-4">
                  {/* ABP News */}
                  <div className="group bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-red-600 font-black text-xl mb-1">ABP</div>
                      <div className="text-red-600 font-bold text-sm">न्यूज़</div>
                    </div>
                  </div>

                  {/* TEDx SRCC */}
                  <div className="group bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-red-600 font-black text-lg">TED<sup>x</sup></div>
                      <div className="text-slate-700 font-bold text-xs">SRCC</div>
                    </div>
                  </div>

                  {/* The Times of India */}
                  <div className="group bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-red-600 font-black text-xs leading-tight">THE TIMES</div>
                      <div className="text-red-600 font-black text-xs">OF INDIA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center lg:text-left pt-4">
                <a 
                  href="#enroll" 
                  className="group relative inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-10 rounded-2xl text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10">Join the Journey</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Syllabus
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {/* Course Introduction with Video */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-xl border-2 border-pink-200 overflow-hidden">
              {/* Module Header */}
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 md:px-8 py-5 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <ChevronDown className="h-6 w-6 text-white" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Course Introduction
                  </h3>
                </div>
              </div>

              {/* Module Content */}
              <div className="p-6 md:p-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
                  <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 border-b-2 border-slate-200">
                    <PlayCircle className="h-5 w-5 text-pink-600" />
                    <p className="text-slate-700 font-semibold">5 Videos</p>
                  </div>
                </div>
                
                <div className="space-y-2 px-4">
                  <p className="text-slate-700 font-medium">• दर्शन क्या है और क्यों आवश्यक हैं?</p>
                  <p className="text-slate-700 font-medium">• दर्शन की स्वरूप परिभाषा</p>
                  <p className="text-slate-700 font-medium">• वेदान्त का परिचय</p>
                  <p className="text-slate-700 font-medium">• इस अद्वैत वेदान्तम् आदि से अंतर</p>
                  <p className="text-slate-700 font-medium">• अद्वैत का इतिहास</p>
                </div>
              </div>
            </div>

            {/* Syllabus Modules */}
            {[
              { title: "श्लोक १: द्रग् और दृश्य", duration: "00:14:43" },
              { title: "श्लोक २: दृष्टा की प्रकृति", duration: null },
              { title: "श्लोक ३: इंद्रियाँ और मन", duration: null },
              { title: "श्लोक १४", duration: null },
              { title: "श्लोक ३: आत्मा और मन", duration: null },
              { title: "श्लोक ४५: आत्मति शक्ति", duration: null },
              { title: "श्लोक १६: व्यावहारिक जीव", duration: null },
              { title: "श्लोक १७: जीविता", duration: null },
              { title: "श्लोक १८: वर्ग और ब्रह्म", duration: null },
              { title: "श्लोक १९: आत्मति का नाश", duration: null },
              { title: "श्लोक २०: वर्ग", duration: null },
              { title: "श्लोक २१: व्यावहारिक जीव", duration: null },
            ].map((module, index) => (
              <div key={index} className="group bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 hover:border-purple-300 overflow-hidden">
                <div className="px-6 md:px-8 py-5 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <ChevronDown className="h-5 w-5 text-slate-600 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {module.title}
                    </h3>
                  </div>
                  {module.duration && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="h-4 w-4" />
                      <p className="text-sm font-semibold">Duration - {module.duration}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Course Summary */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white text-center">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                Complete Course Overview
              </h3>
              <p className="text-lg md:text-xl mb-8 leading-relaxed">
                Explore all 46 Shlokas of Drig Drishya Viveka with detailed explanations, philosophical insights, and practical applications for modern life.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
                  <p className="text-4xl font-extrabold mb-2">46</p>
                  <p className="text-sm font-semibold">Shlokas Covered</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
                  <p className="text-4xl font-extrabold mb-2">7+</p>
                  <p className="text-sm font-semibold">Hours of Content</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
                  <p className="text-4xl font-extrabold mb-2">100%</p>
                  <p className="text-sm font-semibold">Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder's Mission - Masonry Gallery */}
      <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header Section */}
          <div className="text-center py-8 mb-8 md:mb-12">
            {/* Wisdom in Action Badge */}
            <div className="inline-flex items-center bg-purple-50 text-purple-600 text-sm font-medium px-4 py-2 rounded-full mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Wisdom in Action
            </div>
            
            {/* Main Heading */}
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              <span className="text-slate-900">Founder's </span>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Mission</span>
            </h2>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-600 mt-4 max-w-3xl mx-auto">
              To Transform Modern lives with Eternal Wisdom
            </p>
          </div>

          {/* Masonry Gallery */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-01-scaled.png', alt: 'Gallery Image 1' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-02-scaled.png', alt: 'Gallery Image 2' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-03-scaled.png', alt: 'Gallery Image 3' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-04-scaled.png', alt: 'Gallery Image 4' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-06-scaled.png', alt: 'Gallery Image 5' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-05-5-scaled.png', alt: 'Gallery Image 6' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-07-scaled.png', alt: 'Gallery Image 7' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-16.png', alt: 'Gallery Image 16' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-13.png', alt: 'Gallery Image 13' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-12-scaled.png', alt: 'Gallery Image 12' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-11-scaled.png', alt: 'Gallery Image 11' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-15.png', alt: 'Gallery Image 15' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-14-scaled.png', alt: 'Gallery Image 14' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-08-scaled.png', alt: 'Gallery Image 8' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-09-4-scaled.png', alt: 'Gallery Image 9' },
              { src: 'https://shikshanam.in/wp-content/uploads/2025/07/1-10-3-scaled.png', alt: 'Gallery Image 10' },
            ].map((image, idx) => (
              <div 
                key={idx} 
                className="break-inside-avoid relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <Image 
                  src={image.src} 
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => { 
                    (e.target as HTMLImageElement).onerror = null; 
                    (e.target as HTMLImageElement).src = `https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+${idx + 1}`; 
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

