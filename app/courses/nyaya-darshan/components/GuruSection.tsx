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
      <h2 className="nyaya-heading text-4xl mb-4">
        Your Guide — विशाल चौरसिया
      </h2>
      <p className="nyaya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Learn from an experienced instructor who has dedicated his life to making ancient logical systems 
        accessible to modern learners through clear, practical explanations and reasoning techniques.
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="nyaya-card nyaya-cosmic">
          <div className="nyaya-cosmic-content">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="w-48 h-48 mx-auto md:mx-0 mb-6 rounded-full overflow-hidden border-4 border-nyaya-secondary shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Vishal Chaurasia"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="nyaya-heading text-3xl mb-2">Vishal Chaurasia</h3>
                  <p className="text-nyaya-secondary text-lg font-medium">Nyaya Logic & Reasoning Expert</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-nyaya-primary" />
                    <span className="nyaya-subheading">IIT Graduate with expertise in Indian Logic Systems</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-nyaya-primary" />
                    <span className="nyaya-subheading">Founder of Shikshanam & Hyper Quest</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-nyaya-primary" />
                    <span className="nyaya-subheading">Experienced in teaching logical reasoning and debate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-nyaya-primary" />
                    <span className="nyaya-subheading">Specialized in making complex logic accessible in Hindi</span>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="nyaya-subheading text-gray-600 italic">
                    "My mission is to bridge the gap between ancient logical wisdom and modern critical thinking. 
                    Nyaya philosophy offers sophisticated reasoning frameworks that are essential for developing 
                    strong analytical and debate skills in today's world."
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
