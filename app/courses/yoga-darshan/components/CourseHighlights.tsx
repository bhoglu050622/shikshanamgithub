'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Download, 
  GraduationCap, 
  Languages, 
  Users, 
  MessageCircle,
  CheckCircle
} from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

const courseHighlights = [
  {
    icon: BookOpen,
    title: '195 Sutras Explained',
    description: 'Complete coverage of all Patanjali Yoga Sutras with detailed explanations',
    color: 'from-saffron-500 to-saffron-600'
  },
  {
    icon: Clock,
    title: '8+ Hours Video Content',
    description: 'Comprehensive video lessons with lifetime access',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: Award,
    title: 'Lifetime Access',
    description: 'Learn at your own pace with unlimited access to all materials',
    color: 'from-saffron-500 to-saffron-600'
  },
  {
    icon: Download,
    title: 'Downloadable Notes & Quizzes',
    description: 'Get comprehensive study materials and self-assessment tools',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: GraduationCap,
    title: 'Certificate of Completion',
    description: 'Receive a certificate upon successful completion of the course',
    color: 'from-saffron-500 to-saffron-600'
  },
  {
    icon: Languages,
    title: 'Hindi Medium Simplicity',
    description: 'Clear explanations in Hindi for better understanding',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Join a community of like-minded spiritual seekers',
    color: 'from-saffron-500 to-saffron-600'
  },
  {
    icon: MessageCircle,
    title: 'Q&A Sessions',
    description: 'Get your doubts cleared through interactive Q&A sessions',
    color: 'from-teal-500 to-teal-600'
  }
];

export default function CourseHighlights() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Course Highlights
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to master the profound wisdom of Patanjali's Yoga Sutras
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-6 text-center group hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${highlight.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-high-contrast mb-3">
                  {highlight.title}
                </h3>
                <p className="text-wisdom-600 leading-relaxed text-sm">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 bg-gradient-to-r from-saffron-50 to-teal-50 p-8 rounded-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-display text-high-contrast mb-6">
                What Makes This Course Special?
              </h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Complete Coverage</h4>
                  <p className="text-wisdom-600 text-sm">All 195 Yoga Sutras explained in detail with practical applications</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Languages className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Hindi Medium</h4>
                  <p className="text-wisdom-600 text-sm">Clear explanations in Hindi for better understanding and retention</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Lifetime Access</h4>
                  <p className="text-wisdom-600 text-sm">Learn at your own pace with unlimited access to all course materials</p>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">All features included in the course price</span>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
