'use client';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Download, Award, Users, MessageCircle, BookOpen, FileText, Gift } from 'lucide-react';

export default function CourseHighlights() {
  const highlights = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "All 46 Shlokas Covered",
      description: "Complete verse-by-verse study of Drig Drishya Viveka"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "7+ Hrs. of Content",
      description: "Comprehensive video lectures and explanations"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Quizzes & Notes",
      description: "Test your knowledge and access study materials"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certification",
      description: "Earn a verified certificate upon completion"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "1 Yr Access",
      description: "Learn at your own pace for one full year"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp Group",
      description: "Connect with fellow learners and instructors"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Access",
      description: "Join a community of spiritual seekers"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live QnA",
      description: "Get your questions answered by experts"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Free Future Updates",
      description: "Access all new content added to the course"
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
