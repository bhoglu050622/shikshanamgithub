'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
      <h2 className="vaisheshik-heading text-4xl mb-4">
        Your Teacher — विशाल चौरसिया
      </h2>
      <p className="vaisheshik-subheading text-xl mb-12 max-w-3xl mx-auto">
        Learn from an experienced instructor who has dedicated his life to making ancient wisdom 
        accessible to modern seekers through clear, logical explanations and systematic teaching.
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="vaisheshik-card vaisheshik-logical">
          <div className="vaisheshik-logical-content">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="w-48 h-48 mx-auto md:mx-0 mb-6 rounded-full overflow-hidden border-4 border-vaisheshik-secondary shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Vishal Chaurasia"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="vaisheshik-heading text-3xl mb-2">Vishal Chaurasia</h3>
                  <p className="text-vaisheshik-secondary text-lg font-medium">Vaisheshika Philosophy Expert</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-vaisheshik-primary" />
                    <span className="vaisheshik-subheading">IIT Graduate with expertise in Indian Philosophy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-vaisheshik-primary" />
                    <span className="vaisheshik-subheading">Founder of Shikshanam & Hyper Quest</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-vaisheshik-primary" />
                    <span className="vaisheshik-subheading">Passionate about making philosophy accessible</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-vaisheshik-primary" />
                    <span className="vaisheshik-subheading">Specialized in logical and analytical thinking</span>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="vaisheshik-subheading text-gray-600 italic">
                    "Vaisheshika philosophy offers the most systematic approach to understanding reality. 
                    My mission is to help students develop logical thinking and analytical skills through 
                    the study of ancient wisdom that remains relevant today."
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
