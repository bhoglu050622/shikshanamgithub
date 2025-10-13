'use client'

import { motion } from 'framer-motion'
import { FileText, BookOpen, Keyboard, Headphones, Download, Clock, Users } from 'lucide-react'

const treasuryResources = [
  {
    title: "Blogs",
    description: "Guides, stories, grammar tips",
    icon: FileText,
    route: "/blogs/sanskrit",
    color: "from-teal-primary to-teal-primary/80",
    meta: "5 min read",
    lastUpdated: "2 days ago"
  },
  {
    title: "Glossaries",
    description: "Curated vocab lists with audio",
    icon: BookOpen,
    route: "/glossaries/sanskrit",
    color: "from-purple-primary to-purple-primary/80",
    meta: "500+ words",
    lastUpdated: "1 week ago"
  },
  {
    title: "Practice Sheets",
    description: "Printable PDFs & answer keys",
    icon: FileText,
    route: "/practice/sanskrit",
    color: "from-coral-primary to-coral-primary/80",
    meta: "20+ sheets",
    lastUpdated: "3 days ago"
  },
  {
    title: "Study Groups",
    description: "Join fellow learners",
    icon: Users,
    route: "/community/study-groups",
    color: "from-coral-primary to-coral-primary/80",
    meta: "Active community",
    lastUpdated: "Live"
  }
]

interface ResourceCardProps {
  resource: typeof treasuryResources[0]
  index: number
}

function ResourceCard({ resource, index }: ResourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      <div className="bg-white rounded-2xl p-6 h-full shadow-lg border border-teal-primary/20 group-hover:shadow-xl transition-all duration-300">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${resource.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            <resource.icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-dark-text mb-2 group-hover:text-teal-primary transition-colors">
              {resource.title}
            </h3>
            <p className="text-muted-gray text-sm mb-4 leading-relaxed">
              {resource.description}
            </p>
            
            {/* Meta information */}
            <div className="flex items-center justify-between text-xs text-muted-gray mb-4">
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{resource.meta}</span>
              </span>
              <span>Updated {resource.lastUpdated}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-teal-primary text-sm font-medium group-hover:text-teal-primary/80 transition-colors">
              <Download className="w-4 h-4" />
              <span>Explore</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ResourcesTreasury() {
  return (
    <section className="section-padding bg-light-cyan">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display text-dark-text mb-4">
            The School's Treasury
          </h2>
          <p className="text-body text-muted-gray max-w-2xl mx-auto">
            Access our comprehensive collection of Sanskrit resources, 
            tools, and learning materials. Everything you need for your journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {treasuryResources.map((resource, index) => (
            <ResourceCard
              key={index}
              resource={resource}
              index={index}
            />
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-primary/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-dark-text mb-4">
              Need something specific?
            </h3>
            <p className="text-muted-gray mb-6">
              Can't find what you're looking for? Our community and support team are here to help you find the right resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="btn-sanskrit-primary px-6 py-3">
                Request Resource
              </button>
              <button className="btn-sanskrit-outline px-6 py-3">
                Browse All
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
