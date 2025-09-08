'use client';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Download, Award, Users, MessageCircle, BookOpen, Globe } from 'lucide-react';

export default function CourseHighlights() {
  const highlights = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Core Principles Breakdown",
      description: "Clear explanation of Samkhya's fundamental concepts"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "6-8 Hours Content",
      description: "Comprehensive coverage in digestible modules"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Hindi Medium",
      description: "Native language explanations for better understanding"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certificate Provided",
      description: "Earn a completion certificate for your learning journey"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Downloadable Resources",
      description: "Access notes, summaries, and exercises offline"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "Join fellow learners in discussion forums"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Q&A Sessions",
      description: "Get your doubts clarified by the instructor"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Lifetime Access",
      description: "Learn at your own pace, revisit anytime"
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
      <h2 className="samkhya-heading text-4xl mb-4">
        Course Highlights
      </h2>
      <p className="samkhya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Everything you need to master Samkhya philosophy, delivered in a structured, 
        accessible format designed for modern learners.
      </p>

      <div className="samkhya-grid samkhya-grid-4">
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="samkhya-card text-center group hover:samkhya-glow"
          >
            <div className="samkhya-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              {highlight.icon}
            </div>
            <h3 className="samkhya-heading text-lg mb-2">{highlight.title}</h3>
            <p className="samkhya-subheading text-sm text-gray-600">{highlight.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
