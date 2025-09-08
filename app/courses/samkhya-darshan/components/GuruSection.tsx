'use client';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

export default function GuruSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="samkhya-heading text-4xl mb-4">
        Your Guide — विशाल चौरसिया
      </h2>
      <p className="samkhya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Learn from an experienced instructor who has dedicated his life to making ancient wisdom 
        accessible to modern seekers through clear, practical explanations.
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="samkhya-card samkhya-cosmic">
          <div className="samkhya-cosmic-content">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="w-48 h-48 mx-auto md:mx-0 mb-6 rounded-full overflow-hidden border-4 border-samkhya-secondary shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Vishal Chaurasia"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="samkhya-heading text-3xl mb-2">Vishal Chaurasia</h3>
                  <p className="text-samkhya-secondary text-lg font-medium">Samkhya Philosophy Expert</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-samkhya-primary" />
                    <span className="samkhya-subheading">IIT Graduate with deep knowledge of Indian Philosophy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-samkhya-primary" />
                    <span className="samkhya-subheading">Founder of Shikshanam & Hyper Quest</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-samkhya-primary" />
                    <span className="samkhya-subheading">Experienced in making ancient wisdom accessible</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-samkhya-primary" />
                    <span className="samkhya-subheading">Specialized in translating complex concepts into clear Hindi</span>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="samkhya-subheading text-gray-600 italic">
                    "My mission is to bridge the gap between ancient wisdom and modern understanding. 
                    Samkhya philosophy offers profound insights into the nature of reality that are 
                    as relevant today as they were thousands of years ago."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
