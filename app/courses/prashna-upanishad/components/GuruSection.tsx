'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Users, BookOpen, Star, CheckCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

export default function GuruSection() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Meet Your Guru
            </h2>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Instructor Photo & Info */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block mb-8">
                <div className="w-64 h-64 bg-gradient-to-br from-gold-100 to-teal-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 relative overflow-hidden shadow-lg">
                  {/* Placeholder for instructor photo */}
                  <div className="w-56 h-56 bg-gradient-to-br from-gold-200 to-teal-200 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-gold-300 to-teal-300 rounded-full flex items-center justify-center">
                      <span className="text-6xl">👨‍🏫</span>
                    </div>
                  </div>
                  
                  {/* Warm, candle-lit mood frame */}
                  <div className="absolute inset-0 border-4 border-gold-300 rounded-full opacity-30"></div>
                  <div className="absolute inset-4 border-2 border-gold-400 rounded-full opacity-20"></div>
                  
                  {/* Accents */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold-400 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gold-400 rounded-full opacity-60 animate-pulse animation-delay-2000"></div>
                </div>
              </div>

              <h3 className="text-3xl font-display text-high-contrast mb-2">
                विशाल चौरसिया
              </h3>
              <p className="text-xl text-gold-600 mb-4">
                Founder of Shikshanam / Hyper Quest
              </p>
              <p className="text-lg text-wisdom-600 mb-4">
                Graduate, IIT Patna
              </p>
            </div>

            {/* Bio & Details */}
            <div className="space-y-6">
              <div className="card-premium p-6">
                <h4 className="text-xl font-semibold text-high-contrast mb-4">
                  Bio
                </h4>
                <div className="space-y-3 text-wisdom-600 leading-relaxed">
                  <p>
                    Worked in a PSU 2016–2023, but had affinity for ancient wisdom.
                  </p>
                  <p>
                    Founded Hyper Quest YouTube / educational initiative to bring dharmic, philosophical content to wide audience.
                  </p>
                  <p>
                    Aims to make philosophy + spirituality accessible and modern.
                  </p>
                </div>
              </div>

              <div className="card-premium p-6">
                <h4 className="text-lg font-semibold text-high-contrast mb-4">
                  Images
                </h4>
                <div className="space-y-2 text-wisdom-600">
                  <p>• Portrait of Vishal Chaurasia</p>
                  <p>• Vishal with Shri Shri Ravi Shankar Gurudev</p>
                </div>
              </div>

              <div className="card-premium p-6 bg-gradient-to-r from-gold-50 to-teal-50 border border-gold-200/30">
                <h4 className="text-lg font-semibold text-high-contrast mb-4 text-center">
                  Featured in
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-semibold text-high-contrast">Media</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-semibold text-high-contrast">Community</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-semibold text-high-contrast">Recognition</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-semibold text-high-contrast">Featured</p>
                    </div>
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
