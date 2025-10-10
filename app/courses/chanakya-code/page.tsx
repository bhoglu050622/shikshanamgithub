'use client'

import React from 'react';

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

const TrendingUp = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
);

const Target = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
);

const Briefcase = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
);

const Shield = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
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

const Handshake = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>
    </svg>
);

const Brain = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
);

const Zap = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
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

const Crown = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
    </svg>
);

export default function ChanakyaCodeCoursePage() {
  const features = [
    { icon: <Clock className="h-8 w-8 text-amber-600" />, text: "6+ Hrs. of Content", subtitle: "Comprehensive" },
    { icon: <BookOpen className="h-8 w-8 text-amber-600" />, text: "20 Lessons", subtitle: "Step by Step" },
    { icon: <Target className="h-8 w-8 text-amber-600" />, text: "10+ Worksheets", subtitle: "Practice" },
    { icon: <Shield className="h-8 w-8 text-amber-600" />, text: "1 Year Access", subtitle: "Learn at Pace" },
    { icon: <Users className="h-8 w-8 text-amber-600" />, text: "WhatsApp Group", subtitle: "Community" },
    { icon: <GraduationCap className="h-8 w-8 text-amber-600" />, text: "Certification", subtitle: "Get Certified" },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 font-sans text-slate-800 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200 rounded-full opacity-30 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-100 to-orange-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Hero Section - Replicating the image */}
      <div className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600 py-20 md:py-32 overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Chanakya Image */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/50 to-transparent blur-3xl"></div>
                <img 
                  src="https://shikshanam.in/wp-content/uploads/2024/12/Acharya-Chanakya-1.png" 
                  alt="Acharya Chanakya - Master Strategist" 
                  className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
                  onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/500x600/991b1b/white?text=Chanakya'; }}
                />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-2 bg-white/90 text-amber-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  <Crown className="w-5 h-5" />
                  <span>MASTER STRATEGIC BUSINESS WISDOM</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="text-white drop-shadow-2xl">
                  CHANAKYA'S CODE
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl font-bold mb-8 text-amber-900 bg-white/80 inline-block px-6 py-2 rounded-lg">
                Master Negotiation & Business Tactics
              </p>

              <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Chanakya's Code isn't just a course—it's your strategic toolkit to excel in business and leadership.
              </p>

              {/* CTA Button */}
              <div className="mb-10">
                <a 
                  href="#enroll" 
                  className="group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-900 to-orange-700 text-white font-bold py-5 px-16 rounded-xl text-xl hover:from-amber-800 hover:to-orange-600 transition-all transform hover:scale-105 shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Zap className="h-6 w-6" />
                    ENROLL NOW
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </a>
              </div>

              <p className="text-base text-white italic bg-amber-900/30 inline-block px-4 py-2 rounded-lg backdrop-blur-sm">
                "In the game of power, knowledge is the ultimate weapon." - Chanakya
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tagline Section */}
      <div className="bg-white py-12 border-y-2 border-amber-200">
        <div className="container mx-auto px-6">
          <p className="text-center text-xl md:text-2xl font-bold text-slate-700">
            Ready to <span className="text-amber-600">EXCEL</span> in Business?
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Your Success <span className="text-amber-600">Toolkit</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-100 hover:border-amber-400 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
                  {feature.text}
                </h3>
                <p className="text-sm text-slate-600">{feature.subtitle}</p>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-amber-200 to-orange-200 opacity-0 group-hover:opacity-100 rounded-bl-full transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>

      {/* What Will You Learn Section */}
      <div className="bg-white py-20 border-y-2 border-amber-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-4">
            What Will You <span className="text-amber-600">LEARN?</span>
          </h2>
          <p className="text-center text-slate-600 text-lg mb-12 max-w-3xl mx-auto">
            Chanakya's Code isn't just a course—it's your strategic toolkit to excel in business and leadership.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Learning 1 */}
            <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Handshake className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-center text-amber-700 font-extrabold text-lg mb-2">Persuasion Tactics</h3>
              <p className="text-center text-slate-700 font-semibold text-sm leading-tight">
                Convince investors to fund your vision!
              </p>
            </div>

            {/* Learning 2 */}
            <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-center text-amber-700 font-extrabold text-lg mb-2">Negotiation Mastery</h3>
              <p className="text-center text-slate-700 font-semibold text-sm leading-tight">
                Negotiating higher profit margins with clients!
              </p>
            </div>

            {/* Learning 3 */}
            <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Crown className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-center text-amber-700 font-extrabold text-lg mb-2">Leadership Excellence</h3>
              <p className="text-center text-slate-700 font-semibold text-sm leading-tight">
                Inspiring your team to exceed targets!
              </p>
            </div>

            {/* Learning 4 */}
            <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-center text-amber-700 font-extrabold text-lg mb-2">Team Building Skills</h3>
              <p className="text-center text-slate-700 font-semibold text-sm leading-tight">
                Reducing hiring costs and missed deadlines!
              </p>
            </div>

            {/* Learning 5 */}
            <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-center text-amber-700 font-extrabold text-lg mb-2">Competitive Strategies</h3>
              <p className="text-center text-slate-700 font-semibold text-sm leading-tight">
                Gaining a larger market share quickly!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Preview Section */}
      <div className="bg-gradient-to-br from-slate-100 to-amber-50 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
              Unlock the <span className="text-amber-600">Chanakya Code</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Learn the ancient strategies that built empires, adapted for modern business excellence.
            </p>
          </div>

          {/* Video Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 border-4 border-amber-300">
              <div className="relative aspect-video bg-slate-100">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/TJpKpXZaKJw?autoplay=0&rel=0&modestbranding=1"
                  title="Chanakya's Code Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
              
              {/* Video Footer */}
              <div className="p-6 md:p-8 bg-gradient-to-r from-amber-500 to-orange-500">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white mb-2">
                      Master the Art of Strategy
                    </h3>
                    <p className="text-white/90 flex items-center gap-2">
                      <PlayCircle className="h-5 w-5 text-white" />
                      Watch the course preview
                    </p>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-amber-200">
                    <p className="text-sm text-amber-700 font-bold">START NOW</p>
                    <p className="text-xs text-slate-600">Limited Seats</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Social Proof Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              <span className="text-slate-900">Join </span>
              <span className="text-amber-600">Thousands</span>
              <span className="text-slate-900"> of Success Stories!</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-5xl font-black text-amber-600 mb-2">15K+</p>
              <p className="text-slate-700 font-bold text-lg">Business Leaders</p>
            </div>

            <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-white" fill="currentColor" />
                </div>
              </div>
              <p className="text-5xl font-black text-amber-600 mb-2">4.8</p>
              <p className="text-slate-700 font-bold text-lg">Average Rating</p>
              <div className="flex justify-center gap-1 mt-2">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500" fill="currentColor" />
                ))}
              </div>
            </div>

            <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <MessageSquarePlus className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-5xl font-black text-amber-600 mb-2">3.5K+</p>
              <p className="text-slate-700 font-bold text-lg">Success Stories</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a 
              href="#enroll" 
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-6 px-20 rounded-2xl text-xl hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-2xl overflow-hidden border-2 border-amber-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Crown className="h-6 w-6" />
                START YOUR JOURNEY
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Meet Your Guru Section */}
      <div className="bg-gradient-to-br from-slate-100 to-amber-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-slate-900">Meet your </span>
              <span className="text-amber-600">MENTORS!</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          {/* Instructor 1: Ravi Singh Choudhary */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-amber-200 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Ravi Singh Choudhary</h3>
                <p className="text-xl text-amber-600 font-bold mb-4">Author of Chanakya's Intelligence</p>
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed text-lg">
                <p>
                  As an acclaimed author of five books, including <em>Rishi Intelligence</em> and <em>Chanakya's Intelligence</em>, Ravi Singh Choudhary offers profound insights into leadership, strategy, and governance inspired by Chanakya's works. His expertise seamlessly integrates Chanakya's timeless principles into practical frameworks for effective decision-making, team management, and strategic foresight.
                </p>
                <p>
                  Ravi Singh Choudhary, a B.Tech graduate in Mechanical Engineering, brings over six years of industry experience, with key roles at HEC Ranchi and Vedanta. Drawing from his deep expertise in Indian knowledge systems, Ravi has developed and delivered corporate training modules on Tarkashastra for TVS and Arthashastra for Hi-Tech Gears, bridging ancient Indian strategies with modern business challenges.
                </p>
                <p>
                  Ravi's commitment to promoting India's rich intellectual heritage extends to his role as Convenor of the 10th World Ayurveda Congress and contributor to India's New Education Policy, where he advocates for integrating Indian Knowledge Systems (IKS) into formal education.
                </p>
                <p>
                  With a research focus on Arthashastra, Nyaya, and Vaisheshika, Ravi Singh Choudhary combines ancient wisdom with contemporary practices to guide individuals and organizations in achieving leadership excellence and sustainable growth.
                </p>
              </div>
            </div>
          </div>

          {/* Instructor 2: Vishal Chaurasia */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            
            {/* Left Column: Images */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4 relative">
                <div className="row-span-2">
                  <div className="group relative bg-white p-2 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-full border-2 border-amber-200">
                    <div className="relative overflow-hidden rounded-2xl h-full">
                      <img 
                        src="https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-1.png" 
                        alt="Vishal Chaurasia" 
                        className="rounded-2xl w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/400x600/d97706/white?text=Mentor'; }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="group relative bg-white p-2 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-amber-200">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img 
                        src="https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-1-1.png" 
                        alt="Vishal Chaurasia with Guru" 
                        className="rounded-2xl w-full h-auto"
                        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/300x300/d97706/white?text=Mentor+2'; }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="group relative bg-white p-2 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-amber-200">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img 
                        src="https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-2-2-300x259.png" 
                        alt="Vishal Chaurasia Teaching" 
                        className="rounded-2xl w-full h-auto"
                        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/300x259/d97706/white?text=Mentor+3'; }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Info */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Vishal Chaurasia</h3>
                <p className="text-xl text-amber-600 font-bold mb-6">Founder of Hyper Quest, Alumnus-IIT Patna</p>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-amber-200 space-y-4">
                <p className="text-slate-700 leading-relaxed text-lg">
                  An IIT Patna alumnus and a Cultural Entrepreneur, Vishal Chaurasia combines his expertise in Indian philosophy and modern education to foster transformative learning experiences. As the founder of Shikshanam, a platform dedicated to teaching Hindu Darshans, Sanskrit, and Upanishads, Vishal has revolutionized how ancient wisdom is taught, making it accessible to over 1 lakh learners globally.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  With a background in engineering and a passion for knowledge, Vishal has honed exceptional leadership skills, demonstrated through his ability to scale Hyper Quest, a YouTube channel with 1.5 million subscribers, into a leading platform for intellectual exploration and philosophical discourse.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  A dedicated educator and strategist, Vishal is known for his innovative approach to teaching and his commitment to integrating ancient Indian wisdom with contemporary business and leadership frameworks.
                </p>
              </div>

              {/* Social Media Stats */}
              <div>
                <p className="text-lg font-bold text-slate-900 mb-4">Connect With The Community:</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Youtube className="h-7 w-7 text-white" fill="currentColor" />
                      </div>
                    </div>
                    <p className="text-2xl font-black text-amber-600 mb-1">1.5M</p>
                    <p className="text-sm text-slate-700 font-bold">Subscribers</p>
                  </div>

                  <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Instagram className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl font-black text-amber-600 mb-1">401K</p>
                    <p className="text-sm text-slate-700 font-bold">Followers</p>
                  </div>

                  <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 hover:border-amber-400 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Facebook className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl font-black text-amber-600 mb-1">470K</p>
                    <p className="text-sm text-slate-700 font-bold">Followers</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center lg:text-left pt-4">
                <a 
                  href="#enroll" 
                  className="group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-4 px-10 rounded-2xl text-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-2xl overflow-hidden border-2 border-amber-300"
                >
                  <span className="relative z-10">START YOUR JOURNEY</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              SYLLABUS: <span className="text-amber-600">10 Secret Chanakya Codes</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {[
              { 
                code: "Secret Chanakya Code 1", 
                title: "Introduction to Chanakya's Strategy", 
                subtitle: "A Business Case Study on How Monopolies Are Built" 
              },
              { 
                code: "Secret Chanakya Code 2", 
                title: "Why becoming Rich is Important?", 
                subtitle: "Case study on the Power of Money" 
              },
              { 
                code: "Secret Chanakya Code 3", 
                title: "How to Become a Formidable Leader/CEO", 
                subtitle: "Case Study on Business Leadership" 
              },
              { 
                code: "Secret Chanakya Code 4", 
                title: "How to Build a Winning Team", 
                subtitle: "Case Study: Building a High-Performance Core Team" 
              },
              { 
                code: "Secret Chanakya Code 5", 
                title: "Conducting Efficient Team Meetings", 
                subtitle: "Case Studies: The Power and Pitfalls of Effective Team Meetings" 
              },
              { 
                code: "Secret Chanakya Code 6", 
                title: "How to Close High Stake Deals", 
                subtitle: "Case Studies: How Persuasion Skills Drive Success in Business" 
              },
              { 
                code: "Secret Chanakya Code 7", 
                title: "Finding the Right Business Partner or Co-Founder", 
                subtitle: "Case Studies: Nurturing Professional Relationships for Success" 
              },
              { 
                code: "Secret Chanakya Code 8", 
                title: "A Strategic Approach to Market Dominance", 
                subtitle: "Case Studies: How Business Giants Built Global Monopolies" 
              },
              { 
                code: "Secret Chanakya Code 9", 
                title: "Maximizing Profits by Profit Prioritization", 
                subtitle: "Case Studies: Winning Business Models and the Art of Profit Prioritization" 
              },
              { 
                code: "Secret Chanakya Code 10", 
                title: "Unveiling The DNA of a Business", 
                subtitle: "Case Studies: Understanding the Strategic Hierarchy of Business Foundations" 
              },
            ].map((module, index) => (
              <div key={index} className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:border-amber-400 overflow-hidden">
                <div className="px-6 md:px-8 py-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-amber-700 font-bold text-sm mb-1">{module.code}</p>
                      <h3 className="text-lg md:text-xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors mb-2">
                        {module.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{module.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Course Summary */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white text-center border-4 border-amber-300">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                Complete Success Package
              </h3>
              <p className="text-lg md:text-xl mb-8 leading-relaxed">
                10 Secret Codes • 1 Year Access • Worksheets • WhatsApp Community • Certification
              </p>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 hover:bg-white/30 transition-all">
                  <p className="text-4xl font-black mb-2">20</p>
                  <p className="text-sm font-bold">Lessons</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 hover:bg-white/30 transition-all">
                  <p className="text-4xl font-black mb-2">6+</p>
                  <p className="text-sm font-bold">Hours Content</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 hover:bg-white/30 transition-all">
                  <p className="text-4xl font-black mb-2">10+</p>
                  <p className="text-sm font-bold">Worksheets</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 hover:bg-white/30 transition-all">
                  <p className="text-4xl font-black mb-2">1</p>
                  <p className="text-sm font-bold">Year Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Ready to <span className="text-amber-900">EXCEL?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto">
            Join the elite circle of business leaders who have mastered Chanakya's Code
          </p>
          
          <a 
            href="#enroll" 
            className="group relative inline-flex items-center justify-center bg-white text-amber-700 font-bold py-6 px-20 rounded-2xl text-2xl hover:bg-amber-50 transition-all transform hover:scale-110 shadow-2xl overflow-hidden border-4 border-amber-300"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Crown className="h-8 w-8 text-amber-600" />
              ENROLL NOW
              <Crown className="h-8 w-8 text-amber-600" />
            </span>
          </a>
          
          <p className="mt-8 text-amber-900 font-bold text-lg bg-white/80 inline-block px-6 py-3 rounded-lg">
            ⚡ Limited Time Offer • Join Today ⚡
          </p>
        </div>
      </div>
    </div>
  );
}

