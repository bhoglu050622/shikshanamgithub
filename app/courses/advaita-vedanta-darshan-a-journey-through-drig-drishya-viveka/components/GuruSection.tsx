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
      <h2 className="advaita-heading text-4xl mb-4">
        Meet Your Guru
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        Learn from विशाल चौरसिया, an experienced instructor dedicated to making ancient wisdom 
        accessible to modern seekers.
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="advaita-card advaita-nonduality">
          <div className="advaita-nonduality-content">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="w-48 h-48 mx-auto md:mx-0 mb-6 rounded-full overflow-hidden border-4 border-advaita-secondary shadow-lg bg-gradient-to-br from-slate-100 to-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Vishal Chaurasia"
                    width={192}
                    height={192}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="advaita-heading text-3xl mb-2">विशाल चौरसिया</h3>
                  <p className="text-advaita-secondary text-lg font-medium">Graduate, IIT Patna</p>
                  <p className="text-gray-600 text-base mt-1">Founder of Shikshanam / Hyper Quest</p>
                </div>

                <div className="space-y-4">
                  <div className="pt-4 border-t border-advaita-secondary/20">
                    <h4 className="font-bold text-lg mb-3">Bio:</h4>
                    <p className="advaita-subheading text-gray-700 leading-relaxed">
                      He worked in a top PSU during 2016-2023, but due to his deep interest in ancient knowledge, 
                      he shifted focus to bring philosophical & spiritual content to larger audiences via Hyper Quest 
                      and Shikshanam. His aim: make Darshana + philosophy accessible, modern, and useful.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="w-5 h-5 text-advaita-primary" />
                    <span>IIT Patna Alumni</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-5 h-5 text-advaita-primary" />
                    <span>Philosophy Expert</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-5 h-5 text-advaita-primary" />
                    <span>Community Builder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
