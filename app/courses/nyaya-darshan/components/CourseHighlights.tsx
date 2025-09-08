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
      title: "Lifetime Access",
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

      <div className="nyaya-grid nyaya-grid-4">
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="nyaya-card text-center group hover:nyaya-glow"
          >
            <div className="nyaya-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              {highlight.icon}
            </div>
            <h3 className="nyaya-heading text-lg mb-2">{highlight.title}</h3>
            <p className="nyaya-subheading text-sm text-gray-600">{highlight.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
