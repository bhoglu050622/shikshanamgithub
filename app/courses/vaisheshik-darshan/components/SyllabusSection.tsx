'use client';
import { motion } from 'framer-motion';
import { Circle, BookOpen } from 'lucide-react';

export default function SyllabusSection() {
  const modules = [
    {
      number: "01",
      title: "Why Nyaya and Vaisheshik are studied together?",
      description: "Understanding the connection between these two darshanas (Free Demo Video)",
      duration: "~00:04:42",
      isFree: true
    },
    {
      number: "02",
      title: "Chapter 1: The First Sutra",
      description: "Introduction to the foundational concepts of Vaisheshik philosophy",
      duration: "~00:04:42"
    },
    {
      number: "03",
      title: "Chapter 2: Definition of Dharma",
      description: "Exploring the concept and importance of Dharma in Vaisheshik thought",
      duration: "~00:06:42"
    },
    {
      number: "04",
      title: "Chapter 3: Did Ishwara create Vedas?",
      description: "Examining the nature of creation and divine origin",
      duration: "~00:04:50"
    },
    {
      number: "05",
      title: "Chapter 4: The form of Dharma: 6 Padartha",
      description: "Understanding the six fundamental categories of existence",
      duration: "~00:06:47"
    },
    {
      number: "06",
      title: "Chapter 5: The Nine Dravyas",
      description: "Deep dive into the nine substances that constitute reality",
      duration: "~00:03:46"
    },
    {
      number: "07",
      title: "Chapter 6: The Seventeen Gunas",
      description: "Exploring the seventeen qualities that define substances",
      duration: "~00:07:28"
    },
    {
      number: "08",
      title: "Chapter 7: Karma and Its Types",
      description: "Understanding action and its various classifications",
      duration: "~00:06:11"
    },
    {
      number: "09",
      title: "Chapter 8: Similarities in Dravya, Guna and Karma",
      description: "Analyzing the relationships between substance, quality, and action",
      duration: "~00:12:40"
    },
    {
      number: "10",
      title: "Chapter 9: Similarity in Dravya and Guna",
      description: "Detailed exploration of how substance and quality relate",
      duration: "~00:05:34"
    },
    {
      number: "11",
      title: "Chapter 10: How Karma is different from Dravya and Guna",
      description: "Distinguishing action from substance and quality",
      duration: "~00:03:59"
    },
    {
      number: "12",
      title: "Chapter 11: How Dravya is different from Guna and Karma",
      description: "Understanding the unique characteristics of substance",
      duration: "~00:09:10"
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
        Syllabus — Course Journey
      </h2>
      <p className="vaisheshik-subheading text-xl mb-12 max-w-3xl mx-auto">
        A systematic exploration through 12 comprehensive chapters covering all aspects of 
        Maharshi Kanada's Vaisheshik Sutras, from fundamental concepts to advanced philosophical analysis.
      </p>

      <div className="vaisheshik-timeline max-w-5xl mx-auto">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="vaisheshik-timeline-item"
          >
            <div className="vaisheshik-card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 ${module.isFree ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-vaisheshik-primary to-vaisheshik-accent'} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {module.number}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="vaisheshik-heading text-xl mb-1">{module.title}</h3>
                    {module.isFree && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        FREE DEMO
                      </span>
                    )}
                  </div>
                  <p className="vaisheshik-subheading text-gray-600 mb-2">{module.description}</p>
                  <div className="flex items-center gap-2 text-sm text-vaisheshik-secondary font-medium">
                    <Circle className="w-3 h-3 fill-current" />
                    <span>Duration: {module.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-lg text-gray-700 mb-6">
          <span className="font-semibold text-vaisheshik-primary">30 Sessions</span> | 
          <span className="ml-2">Comprehensive coverage of all Vaisheshik Sutras</span>
        </p>
        <a 
          href="https://courses.shikshanam.in/single-checkout/643aa48ee4b0bc2eac815e74?pid=p3"
          className="vaisheshik-btn-primary inline-flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          Start Learning Now
        </a>
      </motion.div>
    </motion.div>
  );
}
