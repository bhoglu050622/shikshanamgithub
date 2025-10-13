'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { prashnaDemoVideos } from '../../courseData';
import { demoCardVariants, modalBackdropVariants, modalContentVariants, safeVariants } from '../../motion.config';

export default function DemoCarousel() {
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openDemo = (index: number) => {
    setSelectedDemo(index);
  };

  const closeDemo = () => {
    setSelectedDemo(null);
  };

  const nextDemo = () => {
    setCurrentIndex((prev) => (prev + 1) % (prashnaDemoVideos?.length || 1));
  };

  const prevDemo = () => {
    setCurrentIndex((prev) => (prev - 1 + (prashnaDemoVideos?.length || 1)) % (prashnaDemoVideos?.length || 1));
  };

  return (
    <>
      <section className="py-16 px-4 bg-gradient-to-b from-white to-[#FFF9F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B4A] mb-4">
              Watch Free Demo Videos
            </h2>
            <p className="text-lg text-gray-600">
              Experience the teaching style before enrolling
            </p>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {prashnaDemoVideos?.map((demo, index) => (
              <motion.div
                key={index}
                variants={safeVariants(demoCardVariants)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="prashna-demo-card cursor-pointer"
                onClick={() => openDemo(index)}
              >
                <div className="prashna-demo-thumbnail">
                  <img 
                    src={demo.url?.replace('/embed/', '/vi/').split('?')[0] + '/maxresdefault.jpg'} 
                    alt={demo.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/480x270/0D3B4A/FFFFFF?text=Video';
                    }}
                  />
                  <div className="prashna-demo-play-button">
                    <Play className="w-8 h-8" />
                  </div>
                  {demo.isFree && (
                    <div className="absolute top-4 left-4 bg-[#10B981] text-white px-3 py-1 rounded-full text-sm font-bold">
                      Free Demo
                    </div>
                  )}
                </div>
                <div className="prashna-demo-info">
                  <h3 className="text-lg font-semibold text-[#0D3B4A] mb-2">{demo.title}</h3>
                  {demo.description && (
                    <p className="text-sm text-gray-600 mb-3">{demo.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-[#D97B2A]">
                    <Clock className="w-4 h-4" />
                    <span>{demo.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden">
            <div className="relative">
              <motion.div
                key={currentIndex}
                variants={safeVariants(demoCardVariants)}
                initial="hidden"
                animate="visible"
                className="prashna-demo-card cursor-pointer"
                onClick={() => openDemo(currentIndex)}
              >
                <div className="prashna-demo-thumbnail">
                  <img 
                    src={prashnaDemoVideos?.[currentIndex]?.url?.replace('/embed/', '/vi/').split('?')[0] + '/maxresdefault.jpg'} 
                    alt={prashnaDemoVideos?.[currentIndex]?.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/480x270/0D3B4A/FFFFFF?text=Video';
                    }}
                  />
                  <div className="prashna-demo-play-button">
                    <Play className="w-8 h-8" />
                  </div>
                </div>
                <div className="prashna-demo-info">
                  <h3 className="text-lg font-semibold text-[#0D3B4A] mb-2">
                    {prashnaDemoVideos?.[currentIndex]?.title}
                  </h3>
                  {prashnaDemoVideos?.[currentIndex]?.description && (
                    <p className="text-sm text-gray-600 mb-3">
                      {prashnaDemoVideos?.[currentIndex]?.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-[#D97B2A]">
                    <Clock className="w-4 h-4" />
                    <span>{prashnaDemoVideos?.[currentIndex]?.duration}</span>
                  </div>
                </div>
              </motion.div>

              {/* Carousel Controls */}
              {(prashnaDemoVideos?.length || 0) > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevDemo(); }}
                    className="absolute left-2 top-1/3 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
                    aria-label="Previous demo"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#0D3B4A]" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextDemo(); }}
                    className="absolute right-2 top-1/3 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
                    aria-label="Next demo"
                  >
                    <ChevronRight className="w-6 h-6 text-[#0D3B4A]" />
                  </button>
                </>
              )}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {prashnaDemoVideos?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-[#D97B2A] w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to demo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedDemo !== null && (
          <motion.div
            className="prashna-modal-backdrop"
            variants={safeVariants(modalBackdropVariants)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeDemo}
          >
            <motion.div
              className="prashna-modal-content"
              variants={safeVariants(modalContentVariants)}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeDemo}
                className="prashna-modal-close"
                aria-label="Close video"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={prashnaDemoVideos?.[selectedDemo]?.url}
                  title={prashnaDemoVideos?.[selectedDemo]?.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#0D3B4A] mb-2">
                  {prashnaDemoVideos?.[selectedDemo]?.title}
                </h3>
                {prashnaDemoVideos?.[selectedDemo]?.description && (
                  <p className="text-gray-600 mb-4">
                    {prashnaDemoVideos?.[selectedDemo]?.description}
                  </p>
                )}
                <div className="flex items-center gap-2 text-[#D97B2A]">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{prashnaDemoVideos?.[selectedDemo]?.duration}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

