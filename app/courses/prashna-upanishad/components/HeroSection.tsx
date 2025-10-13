'use client';

import { motion } from 'framer-motion';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import AnimatedBackground from './AnimatedBackground';

export default function HeroSection() {
  return (
    <section className="prashna-hero-section">
      <AnimatedBackground />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/95 via-[#1E3A8A]/90 to-indigo-900/20" />
      
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <svg className="w-16 h-16 mx-auto mb-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full text-white font-semibold text-sm md:text-base">
              प्रश्न उपनिषद् • Cosmic Questions
                </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            style={{ 
              fontFamily: '"Noto Sans Devanagari", sans-serif',
              textShadow: '2px 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            प्रश्न उपनिषद्
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-4 font-medium"
          >
            Prashna Upanishad - Six Cosmic Questions
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Explore the six profound questions about the universe, life force (Prana), and ultimate reality. Discover the wisdom that answers humanity's deepest spiritual inquiries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <ProtectedExternalLink
              href="https://courses.shikshanam.in/single-checkout/prashna-upanishad-course?pid=p1"
              className="group px-8 py-4 bg-white text-[#1E40AF] font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
            >
              <span>Discover Cosmic Wisdom</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
                </ProtectedExternalLink>
                
            <a
              href="#course-details"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-lg border-2 border-white/30 hover:border-white/60 hover:bg-white/20 transition-all duration-300"
            >
              Explore Course
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm md:text-base text-white/80"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <span><strong>6 Questions</strong> Answered</span>
                        </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span><strong>Prana</strong> Wisdom</span>
                      </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span><strong>Cosmic</strong> Insights</span>
                    </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
