'use client';

import { motion } from 'framer-motion';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import AnimatedBackground from './AnimatedBackground';

export default function HeroSection() {
  return (
    <section className="yoga-hero-section"
            suppressHydrationWarning
          >
      <AnimatedBackground />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/95 via-[#3B82F6]/90 to-purple-900/20" />
      
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32"
            suppressHydrationWarning
          >
        <div className="max-w-4xl mx-auto text-center"
            suppressHydrationWarning
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <svg className="w-16 h-16 mx-auto mb-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full text-white font-semibold text-sm md:text-base"
            suppressHydrationWarning
          >
              योग दर्शन • Path to Liberation
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
            योग दर्शन
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-4 font-medium"
          >
            Yoga Philosophy through Patanjali Yoga Sutras
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Journey through all 195 Sutras of Maharshi Patanjali. Master the art of controlling mental modifications and discover the path to spiritual liberation through authentic Yoga philosophy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <ProtectedExternalLink
              href="https://courses.shikshanam.in/single-checkout/6440e5d6e4b0c4378b6240e5?pid=p2"
              className="group px-8 py-4 bg-white text-[#8B5CF6] font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
            >
              <span>Begin Your Journey - ₹3,999</span>
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
            <div className="flex items-center gap-2"
            suppressHydrationWarning
          >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
              </svg>
              <span><strong>195 Sutras</strong> Complete</span>
            </div>
            <div className="flex items-center gap-2"
            suppressHydrationWarning
          >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span><strong>4.9/5</strong> Rating</span>
            </div>
            <div className="flex items-center gap-2"
            suppressHydrationWarning
          >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"></path>
              </svg>
              <span><strong>8+ Hours</strong> Content</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
