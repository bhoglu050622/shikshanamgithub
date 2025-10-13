'use client';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Download, Award, Users, MessageCircle, BookOpen, Globe } from 'lucide-react';

export default function CourseHighlights() {
  const highlights = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Logic Systems Mastery",
      description: "Comprehensive coverage of Nyaya logical frameworks and reasoning"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "8-10 Hours Content",
      description: "In-depth exploration of logical systems and epistemology"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Hindi Medium",
      description: "Native language explanations for complex logical concepts"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certificate Provided",
      description: "Earn a completion certificate for your logical reasoning journey"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Logic Exercises",
      description: "Practice problems and debate scenarios for skill development"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Debate Community",
      description: "Join fellow learners in logical reasoning discussions"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Logic Q&A Sessions",
      description: "Get your logical reasoning doubts clarified by experts"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "1-Year Access",
      description: "Master logical reasoning at your own pace, revisit anytime"
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
      <h2 className="nyaya-heading text-4xl mb-4">
        Course Highlights
      </h2>
      <p className="nyaya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Everything you need to master Nyaya logic and reasoning, delivered in a structured, 
        accessible format designed for developing critical thinking skills.
      </p>

      <div className="nyaya-bento-grid">
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="nyaya-card text-center group hover:nyaya-glow relative"
            style={{
              gridColumn: index === 0 || index === 7 ? 'span 2' : 'span 1',
            }}
          >
            <div className="nyaya-icon mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              {highlight.icon}
            </div>
            <h3 className="nyaya-heading text-lg mb-2 font-bold">{highlight.title}</h3>
            <p className="nyaya-subheading text-sm text-gray-600">{highlight.description}</p>
            
            {/* Decorative corner accent */}
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-blue-200 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
