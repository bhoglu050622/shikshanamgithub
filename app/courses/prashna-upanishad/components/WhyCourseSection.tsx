'use client';

import { motion } from 'framer-motion';
import { BookOpen, Brain, Users, Flame, HelpCircle, MessageCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

const whyCourseData = [
  {
    icon: HelpCircle,
    title: 'Six Transformative Questions',
    description: 'Unpack the profound questions of Prashna Upanishad that lead to spiritual awakening',
    color: 'from-muted-saffron-500 to-muted-saffron-600'
  },
  {
    icon: Brain,
    title: 'In-depth Hindi Explanations',
    description: 'Simple yet comprehensive explanations that make ancient wisdom accessible',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: Flame,
    title: 'Spiritual Depth & Practical Clarity',
    description: 'Blend of profound spiritual insights with practical life applications',
    color: 'from-muted-saffron-500 to-muted-saffron-600'
  },
  {
    icon: MessageCircle,
    title: 'For Seekers of Meaning',
    description: 'Perfect for those seeking deeper understanding, not just ritualistic knowledge',
    color: 'from-teal-500 to-teal-600'
  }
];

export default function WhyCourseSection() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              <span className="text-muted-saffron-600">इस पाठ्यक्रम को क्यों चुनें?</span>
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Discover the profound wisdom hidden within the six questions of Prashna Upanishad and transform your understanding of life's deepest mysteries.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyCourseData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-high-contrast mb-3">
                  {item.title}
                </h3>
                <p className="text-wisdom-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 bg-gradient-to-r from-muted-saffron-50 to-teal-50 p-8 rounded-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-display text-high-contrast mb-4">
                Why Choose This Course?
              </h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-muted-saffron-500 to-muted-saffron-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <p className="text-wisdom-600">Comprehensive coverage of all six questions from Prashna Upanishad</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <p className="text-wisdom-600">Practical applications for modern spiritual seekers</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-muted-saffron-500 to-muted-saffron-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <p className="text-wisdom-600">Taught by experienced instructor with deep Upanishadic knowledge</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <p className="text-wisdom-600">Clear Hindi explanations for better understanding</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-muted-saffron-500 to-muted-saffron-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">5</span>
                    </div>
                    <p className="text-wisdom-600">Lifetime access to all course materials</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">6</span>
                    </div>
                    <p className="text-wisdom-600">Community support and Q&A sessions included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
