'use client';

import { Metadata } from 'next';
import FoundersMission from '@/components/sections/FoundersMission';
import { useState, useEffect } from 'react';

// Note: This would typically be fetched server-side, but for demo purposes
const aboutContent = {
  hero: {
    title: "About Shikshanam",
    subtitle: "We are dedicated to preserving and sharing the timeless wisdom of ancient India through modern technology and innovative learning methods."
  },
  mission: {
    title: "Our Mission",
    paragraph1: "Shikshanam was born from a deep reverence for India's ancient knowledge systems. We believe that the wisdom of Sanskrit, Darshanas, and traditional self-help practices holds the key to personal growth and spiritual development in the modern world.",
    paragraph2: "Our mission is to make this profound knowledge accessible to everyone, regardless of their background or location, through carefully crafted courses, interactive tools, and expert guidance.",
    visionTitle: "Our Vision",
    visionText: "To create a global community of learners who embrace ancient wisdom for modern living, fostering personal growth, cultural understanding, and spiritual development."
  },
  offerings: {
    title: "What We Offer",
    items: [
      { title: "Sanskrit Learning", description: "Comprehensive courses from beginner to advanced levels", icon: "book" },
      { title: "Darshan Studies", description: "Deep exploration of Indian philosophical systems", icon: "compass" },
      { title: "Self-Help Wisdom", description: "Ancient practices for modern personal development", icon: "heart" },
      { title: "Expert Guidance", description: "Learn from experienced scholars and practitioners", icon: "users" }
    ]
  },
  values: {
    title: "Our Core Values",
    items: [
      { title: "Authenticity", description: "We maintain the highest standards of authenticity in our teachings, ensuring that ancient wisdom is preserved and transmitted accurately.", icon: "shield" },
      { title: "Community", description: "We foster a supportive learning community where students can connect, share experiences, and grow together on their spiritual journey.", icon: "community" },
      { title: "Innovation", description: "We combine traditional wisdom with modern technology to create engaging, effective learning experiences for the digital age.", icon: "lightbulb" }
    ]
  },
  stats: [
    { label: "Active Students", value: "10,000+", icon: "users" },
    { label: "Expert Teachers", value: "50+", icon: "teacher" },
    { label: "Courses Offered", value: "100+", icon: "book" },
    { label: "Countries Reached", value: "75+", icon: "globe" }
  ],
  cta: {
    title: "Join Our Journey",
    subtitle: "Whether you're a complete beginner or an advanced practitioner, Shikshanam offers a path for everyone to explore and embrace the wisdom of ancient India.",
    buttons: [
      { text: "Explore Courses", link: "/courses" },
      { text: "Get in Touch", link: "/contact" }
    ]
  }
};

const getIcon = (iconName: string) => {
  const icons: { [key: string]: JSX.Element } = {
    book: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    compass: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    heart: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    users: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    shield: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    community: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    lightbulb: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    teacher: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    globe: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };
  return icons[iconName] || icons.book;
};

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <main className="main-container overflow-hidden">
        {/* Hero Section with Gradient Background */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-saffron-50 via-white to-peacock-green-50">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-saffron-100 to-peacock-green-100 rounded-full">
                <span className="text-saffron-700 font-semibold text-sm tracking-wide uppercase">Welcome to Shikshanam</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-saffron-600 to-peacock-green-600">
                {aboutContent.hero.title}
              </h1>
              <p className="font-sans text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {aboutContent.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {aboutContent.stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-6 rounded-2xl bg-gradient-to-br from-saffron-50 to-peacock-green-50 transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 text-saffron-600">
                    {getIcon(stat.icon)}
                  </div>
                  <div className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="font-sans text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {aboutContent.mission.title}
                </h2>
                <p className="font-sans text-lg text-gray-700 leading-relaxed">
                  {aboutContent.mission.paragraph1}
                </p>
                <p className="font-sans text-lg text-gray-700 leading-relaxed">
                  {aboutContent.mission.paragraph2}
                </p>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-saffron-200 to-peacock-green-200 rounded-3xl opacity-20 blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-white opacity-10 rounded-br-full"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-tl-full"></div>
                  <div className="relative z-10">
                    <svg className="w-12 h-12 mb-4 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <h3 className="font-sans text-2xl font-bold mb-4">
                      {aboutContent.mission.visionTitle}
                    </h3>
                    <p className="font-sans text-lg leading-relaxed opacity-95">
                      {aboutContent.mission.visionText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {aboutContent.offerings.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-saffron-500 to-peacock-green-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutContent.offerings.items.map((item, index) => (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-saffron-100 to-peacock-green-100 rounded-2xl flex items-center justify-center mb-6 text-saffron-600 group-hover:scale-110 transition-transform duration-300">
                      {getIcon(item.icon)}
                    </div>
                    <h3 className="font-sans text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {aboutContent.values.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-saffron-500 to-peacock-green-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {aboutContent.values.items.map((item, index) => (
                <div 
                  key={index}
                  className="text-center group"
                >
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-saffron-400 to-peacock-green-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-xl">
                      {getIcon(item.icon)}
                    </div>
                  </div>
                  <h3 className="font-sans text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="font-sans text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-saffron-50 via-peacock-green-50 to-saffron-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {aboutContent.cta.title}
            </h2>
            <p className="font-sans text-xl text-gray-600 mb-10 leading-relaxed">
              {aboutContent.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {aboutContent.cta.buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.link}
                  className={
                    index === 0
                      ? "group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-saffron-600 to-peacock-green-600 text-white font-bold rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                      : "inline-flex items-center justify-center px-10 py-4 border-2 border-saffron-600 text-saffron-700 font-bold rounded-2xl hover:bg-saffron-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                  }
                >
                  <span className="relative z-10">{button.text}</span>
                  {index === 0 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-peacock-green-600 to-saffron-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FoundersMission />
    </>
  );
}
