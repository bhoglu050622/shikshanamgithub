'use client';

import { motion } from 'framer-motion';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import AnimatedBackground from './AnimatedBackground';

export default function HeroSection() {
  return (
    <section className="sanskrit-hero-section">
      <AnimatedBackground />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF6E3]/95 via-[#FDF6E3]/90 to-[#FF6B35]/20" />
      
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-6 py-2 bg-[#FF6B35]/10 border-2 border-[#FF6B35]/30 rounded-full text-[#8B4513] font-semibold text-sm md:text-base">
              देवभाषा संस्कृतम् • Divine Language
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{ 
              fontFamily: '"Noto Sans Devanagari", sans-serif',
              color: '#8B4513',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            संस्कृत भाषा प्रज्ञा
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#654321] mb-4 font-medium"
          >
            Online Sanskrit Course in Hindi for Beginners
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-[#8B6F47] mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Master the divine language from Devanagari script to reading Bhagavad Gita. Join 10,000+ students learning from traditional Gurukul Acharya through modern online platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <ProtectedExternalLink
              href="https://courses.shikshanam.in/single-checkout/sanskrit-course?pid=p1"
              className="group px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
            >
              <span>Start Learning - ₹1,499</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </ProtectedExternalLink>

            <a
              href="#course-details"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#8B4513] font-semibold text-lg rounded-lg border-2 border-[#FF6B35]/30 hover:border-[#FF6B35] transition-all duration-300"
            >
              Explore Course
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm md:text-base text-[#8B6F47]"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              <span><strong>10,000+</strong> Students</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span><strong>4.9/5</strong> Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
              </svg>
              <span><strong>1 Year</strong> Access</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

