'use client';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Download, Award, Users, MessageCircle, BookOpen, Globe, Brain } from 'lucide-react';

export default function CourseHighlights() {
  const highlights = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Detailed Atomism & Padārtha",
      description: "Comprehensive explanation of atomic theory and six categories"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Hindi + English Clarity",
      description: "Bilingual explanations for better understanding"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "1-Year Access",
      description: "Learn at your own pace, revisit anytime"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Quizzes & Notes",
      description: "Interactive quizzes and downloadable study materials"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Logical Insight",
      description: "Develop analytical thinking and reasoning skills"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certificate Provided",
      description: "Earn a completion certificate for your learning journey"
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
      <h2 className="vaisheshik-heading text-4xl mb-4">
        Course Highlights
      </h2>
      <p className="vaisheshik-subheading text-xl mb-12 max-w-3xl mx-auto">
        Everything you need to master Vaisheshika philosophy, delivered in a structured, 
        accessible format designed for modern learners seeking logical clarity.
      </p>

      <div className="vaisheshik-grid vaisheshik-grid-4">
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="vaisheshik-card text-center group hover:vaisheshik-glow"
          >
            <div className="vaisheshik-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              {highlight.icon}
            </div>
            <h3 className="vaisheshik-heading text-lg mb-2">{highlight.title}</h3>
            <p className="vaisheshik-subheading text-sm text-gray-600">{highlight.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
