'use client';

import { motion } from 'framer-motion';
import { BookOpen, Brain, Users, Sunrise, CheckCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

const whyCourseData = [
  {
    icon: BookOpen,
    title: 'दैनिक-तनाव को दूर कर पाएंगे',
    titleEn: 'Relief from Daily Stress',
    description: 'Learn to manage and eliminate daily stress through ancient Yoga philosophy principles',
    color: 'from-saffron-500 to-saffron-600'
  },
  {
    icon: Brain,
    title: 'कठिन निर्णयों को आसानी से ले पाएंगे',
    titleEn: 'Make Difficult Decisions Easily',
    description: 'Develop clarity of mind to make better decisions using Yoga wisdom',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: Users,
    title: 'सभी प्रकार के भय से मुक्त होंगे',
    titleEn: 'Freedom from All Types of Fears',
    description: 'Overcome various fears and anxieties through spiritual understanding',
    color: 'from-saffron-500 to-saffron-600'
  },
  {
    icon: Sunrise,
    title: 'गीता के गूढ़ रहस्यों को समझ पाएंगे',
    titleEn: 'Understand Deep Secrets of Gita',
    description: 'Gain profound insights into ancient scriptures and spiritual teachings',
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
              <span className="text-saffron-600">क्यों पढ़ें योग दर्शन?</span>
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Discover the profound wisdom of Patanjali's Yoga Sutras and transform your understanding of life, consciousness, and spiritual growth.
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
                <h3 className="text-xl font-semibold text-high-contrast mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-saffron-600 mb-3">
                  {item.titleEn}
                </p>
                <p className="text-wisdom-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 bg-gradient-to-r from-saffron-50 to-teal-50 p-8 rounded-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-display text-high-contrast mb-4">
                Why Choose This Course?
              </h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-wisdom-600">Comprehensive coverage of all 195 Yoga Sutras</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-wisdom-600">Practical applications for modern life</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-wisdom-600">Taught by experienced instructor</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-wisdom-600">Clear Hindi explanations</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-wisdom-600">Lifetime access to materials</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-wisdom-600">Community support included</p>
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
