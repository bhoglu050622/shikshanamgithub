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
      <h2 className="nyaya-heading text-4xl mb-4">
        Your Guide — विशाल चौरसिया
      </h2>
      <p className="nyaya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Learn from an experienced instructor who has dedicated his life to making ancient logical systems 
        accessible to modern learners through clear, practical explanations and reasoning techniques.
      </p>

      <div className="max-w-6xl mx-auto">
        <div className="nyaya-card nyaya-cosmic">
          <div className="nyaya-cosmic-content">
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 text-center md:text-left">
                <div className="relative inline-block">
                  <div className="w-64 h-64 mx-auto md:mx-0 mb-6 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-white relative">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                      alt="Vishal Chaurasia"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative geometric element */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl -z-10 blur-xl opacity-50"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl -z-10 blur-lg opacity-50"></div>
                </div>
              </div>
              
              <div className="md:col-span-3 space-y-6">
                <div>
                  <h3 className="nyaya-heading text-4xl mb-3 font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                    Vishal Chaurasia
                  </h3>
                  <p className="text-amber-600 text-xl font-bold mb-2">Nyaya Logic & Reasoning Expert</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">IIT Graduate</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Philosophy Scholar</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">1000+ Students</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <span className="nyaya-subheading text-sm font-medium text-slate-700">IIT Graduate with expertise in Indian Logic Systems</span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="nyaya-subheading text-sm font-medium text-slate-700">Founder of Shikshanam & Hyper Quest</span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span className="nyaya-subheading text-sm font-medium text-slate-700">Experienced in teaching logical reasoning and debate</span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <span className="nyaya-subheading text-sm font-medium text-slate-700">Specialized in making complex logic accessible in Hindi</span>
                  </div>
                </div>

                <div className="pt-4 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border-l-4 border-blue-600">
                  <p className="nyaya-subheading text-gray-700 italic leading-relaxed text-base">
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
