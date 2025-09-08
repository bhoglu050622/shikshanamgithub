'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Users, BookOpen, Star, CheckCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

const instructorStats = [
  {
    icon: GraduationCap,
    title: 'IIT Patna Graduate',
    description: 'Engineering background with deep spiritual understanding'
  },
  {
    icon: Award,
    title: 'Founder & CEO',
    description: 'Shikshanam & Hyper Quest - Leading educational platforms'
  },
  {
    icon: Users,
    title: '10,000+ Students',
    description: 'Taught thousands of students across various courses'
  },
  {
    icon: BookOpen,
    title: 'Ancient Scriptures Expert',
    description: 'Specialized in decoding ancient texts into modern Hindi'
  }
];

export default function GuruSection() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Meet Your Guru — <span className="text-saffron-600">विशाल चौरसिया</span>
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Learn from an experienced instructor who combines modern education with ancient wisdom
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Instructor Photo & Info */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block mb-8">
                <div className="w-64 h-64 bg-gradient-to-br from-saffron-100 to-teal-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 relative overflow-hidden">
                  {/* Placeholder for instructor photo */}
                  <div className="w-56 h-56 bg-gradient-to-br from-saffron-200 to-teal-200 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-saffron-300 to-teal-300 rounded-full flex items-center justify-center">
                      <span className="text-6xl">👨‍🏫</span>
                    </div>
                  </div>
                  
                  {/* Saffron halo/mandala frame */}
                  <div className="absolute inset-0 border-4 border-saffron-300 rounded-full opacity-30"></div>
                  <div className="absolute inset-4 border-2 border-saffron-400 rounded-full opacity-20"></div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-saffron-400 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-teal-400 rounded-full opacity-60"></div>
              </div>

              <h3 className="text-2xl font-display text-high-contrast mb-2">
                Vishal Chaurasia
              </h3>
              <p className="text-lg text-saffron-600 mb-4">
                Founder of Shikshanam & Hyper Quest
              </p>
              <p className="text-wisdom-600 leading-relaxed mb-6">
                Graduate of IIT Patna with extensive experience in decoding ancient scriptures 
                into practical, modern Hindi. Specialized in making complex spiritual concepts 
                accessible to contemporary learners.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {instructorStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-premium p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">
                    {stat.title}
                  </h4>
                  <p className="text-wisdom-600 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 bg-gradient-to-r from-saffron-50 to-teal-50 p-8 rounded-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-display text-high-contrast mb-6">
                Why Learn from Vishal Chaurasia?
              </h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Modern Education</h4>
                  <p className="text-wisdom-600 text-sm">IIT graduate with strong analytical and teaching skills</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Ancient Wisdom</h4>
                  <p className="text-wisdom-600 text-sm">Deep understanding of traditional scriptures and philosophy</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Proven Experience</h4>
                  <p className="text-wisdom-600 text-sm">Successfully taught thousands of students across various courses</p>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-4 bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                ))}
              </div>
              <div className="text-left">
                <p className="font-semibold text-high-contrast">4.8/5 Average Rating</p>
                <p className="text-sm text-wisdom-600">Based on 150+ student reviews</p>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
