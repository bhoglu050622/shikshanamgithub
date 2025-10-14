'use client';


import { BookOpen, Clock, Play, Lock } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem, MotionInView } from '@/components/motion/MotionWrapper';

const chapters = [
  {
    number: 1,
    title: "Introduction to Prashna Upanishad",
    hasDemo: true,
    duration: "00:04:57"
  },
  {
    number: 2,
    title: "प्रश्न 1: Origin of Creation and Beings",
    hasDemo: true,
    duration: "2:40:00"
  },
  {
    number: 3,
    title: "प्रश्न 2: The Five Life Forces",
    hasDemo: false,
    duration: "1:30:00"
  },
  {
    number: 4,
    title: "प्रश्न 3: Distribution and Origin of Prana",
    hasDemo: false,
    duration: "1:00:00"
  },
  {
    number: 5,
    title: "प्रश्न 4: States of Consciousness",
    hasDemo: false,
    duration: "1:30:00"
  },
  {
    number: 6,
    title: "प्रश्न 5: Meditation on Om",
    hasDemo: false,
    duration: "1:00:00"
  },
  {
    number: 7,
    title: "प्रश्न 6: The Person of Sixteen Parts",
    hasDemo: false,
    duration: "1:00:00"
  }
];

export default function SyllabusSection() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Syllabus
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Complete coverage of all 6 profound questions through 7 comprehensive chapters
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="max-w-5xl mx-auto">
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <MotionInView
                  key={chapter.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="card-premium p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{chapter.number}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-high-contrast mb-1">
                          {chapter.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center space-x-2 text-wisdom-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{chapter.duration}</span>
                          </div>
                          {chapter.hasDemo && (
                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                              Free Demo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {chapter.hasDemo ? (
                        <div className="flex items-center space-x-2 text-green-600">
                          <Play className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-wisdom-400">
                          <Lock className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </MotionInView>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 bg-gradient-to-r from-gold-50 to-teal-50 p-8 rounded-3xl text-center border border-gold-200/30 shadow-sm">
            <h3 className="text-2xl font-display text-high-contrast mb-4">
              Complete Learning Journey
            </h3>
            <p className="text-wisdom-600">
              <span className="font-semibold text-high-contrast">Total Duration:</span> 7+ Hours • 
              <span className="font-semibold text-high-contrast"> 7 Comprehensive Chapters</span> • 
              <span className="font-semibold text-high-contrast"> 1-Year Access</span>
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
