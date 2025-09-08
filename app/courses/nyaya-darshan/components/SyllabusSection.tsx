'use client';
import { motion } from 'framer-motion';
import { Circle, ArrowRight } from 'lucide-react';

export default function SyllabusSection() {
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

      <div className="nyaya-timeline max-w-4xl mx-auto">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="nyaya-timeline-item"
          >
            <div className="nyaya-card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-nyaya-primary to-nyaya-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {module.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="nyaya-heading text-2xl mb-2">{module.title}</h3>
                  <p className="nyaya-subheading text-gray-600 mb-4">{module.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-3 py-1 bg-nyaya-light text-nyaya-primary rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                {index < modules.length - 1 && (
                  <div className="flex-shrink-0 mt-8">
                    <ArrowRight className="w-6 h-6 text-nyaya-secondary" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
