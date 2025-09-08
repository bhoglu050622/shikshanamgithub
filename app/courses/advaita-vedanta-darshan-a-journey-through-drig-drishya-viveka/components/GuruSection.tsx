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
      <h2 className="advaita-heading text-4xl mb-4">
        Your Guide — विशाल चौरसिया
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        Learn from an experienced instructor who has dedicated his life to making ancient wisdom 
        accessible to modern seekers through clear, practical explanations and systematic teaching.
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="advaita-card advaita-nonduality">
          <div className="advaita-nonduality-content">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="w-48 h-48 mx-auto md:mx-0 mb-6 rounded-full overflow-hidden border-4 border-advaita-secondary shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Vishal Chaurasia"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="advaita-heading text-3xl mb-2">Vishal Chaurasia</h3>
                  <p className="text-advaita-secondary text-lg font-medium">Advaita Vedanta Expert</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-advaita-primary" />
                    <span className="advaita-subheading">IIT Graduate with expertise in Advaita Vedanta</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-advaita-primary" />
                    <span className="advaita-subheading">Founder of Shikshanam & Hyper Quest</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-advaita-primary" />
                    <span className="advaita-subheading">Dedicated to making ancient wisdom accessible</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-advaita-primary" />
                    <span className="advaita-subheading">Specialized in translating sacred wisdom into practical guidance</span>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="advaita-subheading text-gray-600 italic">
                    "Drig-Drishya Viveka offers the most profound insights into the nature of reality. 
                    My mission is to help students understand the unity behind apparent diversity and 
                    realize their true nature through systematic study of this timeless wisdom."
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
