'use client';

import { 
  Video, 
  Clock, 
  BookOpen, 
  RefreshCw, 
  FileText, 
  Calendar, 
  Award, 
  MessageCircle,
  HelpCircle,
  Users
} from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem, MotionInView } from '@/components/motion/MotionWrapper';

const courseHighlights = [
  {
    icon: Video,
    title: 'Recorded Sessions',
    description: 'Access all video lectures at your convenience',
    color: 'from-gold-500 to-gold-600'
  },
  {
    icon: Clock,
    title: '3+ Hrs. of Content',
    description: 'Comprehensive coverage of all topics',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: BookOpen,
    title: 'All Shlokas Covered',
    description: 'Complete analysis of all 18 Shlokas',
    color: 'from-gold-500 to-gold-600'
  },
  {
    icon: RefreshCw,
    title: 'Free Future Updates',
    description: 'Get all future content updates at no extra cost',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: FileText,
    title: 'Quizzes & Notes',
    description: 'Interactive quizzes and study notes included',
    color: 'from-gold-500 to-gold-600'
  },
  {
    icon: Calendar,
    title: '1 yr Access',
    description: 'Learn at your own pace with year-long access',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Receive a certificate upon course completion',
    color: 'from-gold-500 to-gold-600'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Group',
    description: 'Join exclusive WhatsApp community',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: HelpCircle,
    title: 'Live QnA',
    description: 'Get your questions answered in live sessions',
    color: 'from-gold-500 to-gold-600'
  },
  {
    icon: Users,
    title: 'Community Access',
    description: 'Connect with fellow spiritual seekers',
    color: 'from-teal-500 to-teal-600'
  }
];

export default function CourseHighlights() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Features / Highlights
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need for a complete learning experience
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {courseHighlights.map((highlight, index) => (
              <MotionInView
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="card-premium p-6 text-center group hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${highlight.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-high-contrast mb-2">
                  {highlight.title}
                </h3>
                <p className="text-wisdom-600 leading-relaxed text-xs">
                  {highlight.description}
                </p>
              </MotionInView>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
