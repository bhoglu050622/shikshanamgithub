'use client';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function SyllabusSection() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const modules = [
    {
      number: "01",
      title: "Introduction to Nyaya Philosophy",
      description: "Understanding the historical context and foundational concepts of Nyaya logical systems",
      topics: ["Historical Background", "Basic Principles", "Nyaya vs Other Schools"]
    },
    {
      number: "02", 
      title: "The Four Pramanas (Means of Knowledge)",
      description: "Deep dive into perception, inference, comparison, and testimony as valid sources of knowledge",
      topics: ["Pratyaksha (Perception)", "Anumana (Inference)", "Upamana (Comparison)", "Shabda (Testimony)"]
    },
    {
      number: "03",
      title: "Nyaya Logical System",
      description: "Exploring the five-membered syllogism and logical reasoning framework",
      topics: ["Five-Membered Syllogism", "Logical Structure", "Valid vs Invalid Arguments"]
    },
    {
      number: "04",
      title: "Vaisheshika Atomic Theory",
      description: "Understanding the ancient Indian atomic theory and six categories of reality",
      topics: ["Atomic Theory", "Six Categories", "Substance & Quality"]
    },
    {
      number: "05",
      title: "Debate and Argumentation",
      description: "Mastering classical Indian debate techniques and logical discourse",
      topics: ["Debate Techniques", "Logical Fallacies", "Argument Construction"]
    },
    {
      number: "06",
      title: "Epistemology and Logic",
      description: "Understanding the nature of knowledge and logical reasoning processes",
      topics: ["Nature of Knowledge", "Logical Reasoning", "Truth and Validity"]
    },
    {
      number: "07",
      title: "Liberation through Knowledge",
      description: "The Nyaya path to liberation through correct knowledge and logical understanding",
      topics: ["Knowledge as Liberation", "Removal of Ignorance", "Practical Applications"]
    },
    {
      number: "08",
      title: "Modern Applications",
      description: "Connecting ancient Nyaya logic with contemporary reasoning and critical thinking",
      topics: ["Modern Logic", "Critical Thinking", "Scientific Reasoning"]
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
        Course Journey — Logic and Reasoning Mastery
      </h2>
      <p className="nyaya-subheading text-xl mb-12 max-w-3xl mx-auto">
        A systematic exploration of Nyaya philosophy, from basic logical concepts to advanced reasoning techniques. 
        Each module builds upon the previous one, creating a comprehensive understanding of Indian logic.
      </p>

      <div className="max-w-5xl mx-auto relative">
        {/* Vertical Logic Tree Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-400 to-amber-500 hidden md:block"></div>

        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="relative mb-8 ml-0 md:ml-20"
          >
            {/* Connection Node */}
            <div className="absolute -left-20 top-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white hidden md:flex">
              {module.number}
            </div>

            {/* Connection Line to Card */}
            <div className="absolute -left-4 top-10 w-4 h-1 bg-gradient-to-r from-blue-500 to-blue-400 hidden md:block"></div>

            <motion.div
              className="nyaya-card cursor-pointer group"
              onClick={() => setExpandedModule(expandedModule === index ? null : index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="md:hidden w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {module.number}
                    </span>
                    <h3 className="nyaya-heading text-xl md:text-2xl font-bold group-hover:text-blue-700 transition-colors">
                      {module.title}
                    </h3>
                  </div>
                  <p className="nyaya-subheading text-gray-600 mb-4 leading-relaxed">{module.description}</p>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: expandedModule === index ? 'auto' : 0, opacity: expandedModule === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 pt-2">
                      {module.topics.map((topic, topicIndex) => (
                        <motion.span
                          key={topicIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: topicIndex * 0.05 }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl text-sm font-medium border border-blue-200"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {topic}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  animate={{ rotate: expandedModule === index ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 mt-2"
                >
                  <ArrowRight className="w-6 h-6 text-amber-500" />
                </motion.div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Module {module.number}</span>
                  <span className="text-blue-600 font-semibold">Click to expand</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
