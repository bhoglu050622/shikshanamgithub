'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Target, 
  Award, 
  BookOpen, 
  Heart,
  Globe,
  Lightbulb,
  Shield
} from 'lucide-react';

import { 
  UniversalCMSProvider, 
  UniversalCMS,
  CMSCard,
  CMSButton,
  CMSLink,
  CMSText,
  CMSImage,
  CMSAdminPanel
} from '@/components/cms/UniversalCMS';
import { useCMSContent } from '@/lib/cms/hooks';

const sections = [
  { id: 'hero', name: 'Hero Section', icon: Users, description: 'Main about page introduction' },
  { id: 'mission', name: 'Mission & Vision', icon: Target, description: 'Our mission and vision statements' },
  { id: 'values', name: 'Our Values', icon: Heart, description: 'Core values and principles' },
  { id: 'team', name: 'Our Team', icon: Users, description: 'Team members and leadership' },
  { id: 'story', name: 'Our Story', icon: BookOpen, description: 'How we started and our journey' },
  { id: 'achievements', name: 'Achievements', icon: Award, description: 'Key milestones and accomplishments' },
  { id: 'impact', name: 'Impact', icon: Globe, description: 'Our global impact and reach' }
];

function AboutCMSContent() {
  const { content, loading, error, updateContent } = useCMSContent('/api/cms/about');
  const [previewMode, setPreviewMode] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <CMSText variant="secondary">Loading about content...</CMSText>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CMSCard className="max-w-md">
          <div className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <Users className="w-12 h-12 mx-auto" />
            </div>
            <CMSText variant="primary" as="h2" className="text-xl font-semibold mb-2">
              Error Loading Content
            </CMSText>
            <CMSText variant="secondary" className="mb-4">{error}</CMSText>
            <CMSButton onClick={() => window.location.reload()}>
              Try Again
            </CMSButton>
          </div>
        </CMSCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CMS Admin Panel */}
      <CMSAdminPanel 
        pageId="about"
        pageTitle="About Page"
        sections={sections}
      />

      {/* Main CMS Interface */}
      <UniversalCMS
        pageId="about"
        pageTitle="About Page"
        sections={sections}
        onUpdate={updateContent}
      >
        {/* Preview Content */}
        <div className="space-y-8">
          {/* Hero Section */}
          <CMSCard elementId="hero" className="text-center py-16">
            <CMSText variant="primary" as="h1" className="text-4xl font-bold mb-4">
              {content?.hero?.title || 'About Shikshanam'}
            </CMSText>
            <CMSText variant="secondary" className="text-xl mb-8 max-w-3xl mx-auto">
              {content?.hero?.subtitle || 'Preserving and sharing ancient Indian wisdom with the modern world through innovative technology and authentic teaching.'}
            </CMSText>
            <div className="flex justify-center space-x-4">
              <CMSButton variant="primary" elementId="hero-learn">
                Learn More
              </CMSButton>
              <CMSButton variant="secondary" elementId="hero-contact">
                Contact Us
              </CMSButton>
            </div>
          </CMSCard>

          {/* Mission & Vision */}
          <CMSCard elementId="mission" className="py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CMSCard elementId="mission-card" className="p-8">
                <Target className="w-12 h-12 text-blue-600 mb-4" />
                <CMSText variant="primary" as="h2" className="text-2xl font-bold mb-4">
                  {content?.mission?.title || 'Our Mission'}
                </CMSText>
                <CMSText variant="secondary">
                  {content?.mission?.description || 'To make ancient Indian wisdom accessible to everyone through modern technology, authentic teaching, and innovative learning methods.'}
                </CMSText>
              </CMSCard>
              <CMSCard elementId="vision-card" className="p-8">
                <Lightbulb className="w-12 h-12 text-yellow-600 mb-4" />
                <CMSText variant="primary" as="h2" className="text-2xl font-bold mb-4">
                  {content?.vision?.title || 'Our Vision'}
                </CMSText>
                <CMSText variant="secondary">
                  {content?.vision?.description || 'A world where ancient wisdom and modern knowledge work together to create a more enlightened and compassionate society.'}
                </CMSText>
              </CMSCard>
            </div>
          </CMSCard>

          {/* Values */}
          <CMSCard elementId="values" className="py-12">
            <CMSText variant="primary" as="h2" className="text-3xl font-bold text-center mb-8">
              {content?.values?.title || 'Our Core Values'}
            </CMSText>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: BookOpen, title: 'Authenticity', description: 'Preserving the original teachings and traditions' },
                { icon: Heart, title: 'Compassion', description: 'Serving humanity with love and understanding' },
                { icon: Shield, title: 'Integrity', description: 'Maintaining the highest ethical standards' },
                { icon: Globe, title: 'Inclusivity', description: 'Making wisdom accessible to all' },
                { icon: Lightbulb, title: 'Innovation', description: 'Using technology to enhance learning' },
                { icon: Award, title: 'Excellence', description: 'Striving for the highest quality in everything' }
              ].map((value, index) => (
                <CMSCard key={index} elementId={`value-${index}`} className="text-center p-6">
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <CMSText variant="primary" as="h3" className="text-xl font-semibold mb-2">
                    {value.title}
                  </CMSText>
                  <CMSText variant="secondary">
                    {value.description}
                  </CMSText>
                </CMSCard>
              ))}
            </div>
          </CMSCard>

          {/* Team */}
          <CMSCard elementId="team" className="py-12">
            <CMSText variant="primary" as="h2" className="text-3xl font-bold text-center mb-8">
              {content?.team?.title || 'Meet Our Team'}
            </CMSText>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Dr. Priya Sharma', role: 'Founder & CEO', description: 'PhD in Sanskrit Literature' },
                { name: 'Rajesh Kumar', role: 'Head of Technology', description: '20+ years in EdTech' },
                { name: 'Meera Patel', role: 'Content Director', description: 'Sanskrit Scholar & Teacher' }
              ].map((member, index) => (
                <CMSCard key={index} elementId={`team-${index}`} className="text-center p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <CMSText variant="primary" as="h3" className="text-xl font-semibold mb-1">
                    {member.name}
                  </CMSText>
                  <CMSText variant="accent" className="mb-2">
                    {member.role}
                  </CMSText>
                  <CMSText variant="secondary" className="text-sm">
                    {member.description}
                  </CMSText>
                </CMSCard>
              ))}
            </div>
          </CMSCard>

          {/* Our Story */}
          <CMSCard elementId="story" className="py-12">
            <CMSText variant="primary" as="h2" className="text-3xl font-bold text-center mb-8">
              {content?.story?.title || 'Our Story'}
            </CMSText>
            <div className="max-w-4xl mx-auto">
              <CMSText variant="secondary" className="text-lg leading-relaxed mb-6">
                {content?.story?.description || 'Shikshanam was born from a simple yet profound realization: the ancient wisdom of India holds timeless truths that can guide us in our modern lives. Founded in 2020, we began as a small team of Sanskrit scholars and technology enthusiasts who believed that the gap between ancient wisdom and modern learning could be bridged.'}
              </CMSText>
              <CMSText variant="secondary" className="text-lg leading-relaxed">
                {content?.story?.journey || 'Today, we serve thousands of learners worldwide, offering authentic Sanskrit education, philosophical insights, and practical wisdom that transforms lives. Our journey continues as we explore new ways to make ancient knowledge accessible to the digital generation.'}
              </CMSText>
            </div>
          </CMSCard>

          {/* Achievements */}
          <CMSCard elementId="achievements" className="py-12">
            <CMSText variant="primary" as="h2" className="text-3xl font-bold text-center mb-8">
              {content?.achievements?.title || 'Our Achievements'}
            </CMSText>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: '10,000+', label: 'Students Taught' },
                { number: '50+', label: 'Courses Created' },
                { number: '25+', label: 'Countries Reached' },
                { number: '98%', label: 'Satisfaction Rate' }
              ].map((achievement, index) => (
                <CMSCard key={index} elementId={`achievement-${index}`} className="text-center p-6">
                  <CMSText variant="accent" as="h3" className="text-3xl font-bold mb-2">
                    {achievement.number}
                  </CMSText>
                  <CMSText variant="secondary">
                    {achievement.label}
                  </CMSText>
                </CMSCard>
              ))}
            </div>
          </CMSCard>

          {/* Impact */}
          <CMSCard elementId="impact" className="py-12">
            <CMSText variant="primary" as="h2" className="text-3xl font-bold text-center mb-8">
              {content?.impact?.title || 'Our Global Impact'}
            </CMSText>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CMSCard elementId="impact-stats" className="p-8">
                <CMSText variant="primary" as="h3" className="text-xl font-semibold mb-4">
                  By the Numbers
                </CMSText>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <CMSText variant="secondary">Students Worldwide</CMSText>
                    <CMSText variant="accent" className="font-semibold">10,000+</CMSText>
                  </div>
                  <div className="flex justify-between">
                    <CMSText variant="secondary">Courses Completed</CMSText>
                    <CMSText variant="accent" className="font-semibold">25,000+</CMSText>
                  </div>
                  <div className="flex justify-between">
                    <CMSText variant="secondary">Languages Supported</CMSText>
                    <CMSText variant="accent" className="font-semibold">8</CMSText>
                  </div>
                </div>
              </CMSCard>
              <CMSCard elementId="impact-stories" className="p-8">
                <CMSText variant="primary" as="h3" className="text-xl font-semibold mb-4">
                  Success Stories
                </CMSText>
                <CMSText variant="secondary" className="mb-4">
                  "Shikshanam helped me connect with my cultural roots while living abroad. The Sanskrit course was life-changing."
                </CMSText>
                <CMSText variant="accent" className="font-semibold">
                  - Priya, Software Engineer in Canada
                </CMSText>
              </CMSCard>
            </div>
          </CMSCard>
        </div>
      </UniversalCMS>
    </div>
  );
}

export default function AboutCMSEnhanced() {
  return (
    <UniversalCMSProvider pageId="about">
      <AboutCMSContent />
    </UniversalCMSProvider>
  );
}
