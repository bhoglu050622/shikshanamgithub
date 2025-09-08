'use client';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Download, Award, Users, MessageCircle, BookOpen, Globe, Calendar } from 'lucide-react';

export default function CourseHighlights() {
  const highlights = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "46 Verses Explained",
      description: "Comprehensive coverage of all verses in Drig-Drishya Viveka"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Lifetime Access",
      description: "One-time payment, learn at your own pace"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Hindi Language",
      description: "Native language explanations for better understanding"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Structured Release",
      description: "New content on Mondays, Wednesdays & Fridays"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certificate Provided",
      description: "Earn a completion certificate for your journey"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Q&A",
      description: "Support from fellow learners and instructors"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Downloadable Resources",
      description: "Access notes and materials offline"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "November 15 Launch",
      description: "Be among the first to experience this wisdom"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="advaita-heading text-4xl mb-4">
        Course Highlights
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        Everything you need to master the essence of non-duality, delivered in a structured, 
        accessible format designed for modern seekers of truth.
      </p>

      <div className="advaita-grid advaita-grid-4">
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="advaita-card text-center group hover:advaita-glow"
          >
            <div className="advaita-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              {highlight.icon}
            </div>
            <h3 className="advaita-heading text-lg mb-2">{highlight.title}</h3>
            <p className="advaita-subheading text-sm text-gray-600">{highlight.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
