'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  BookOpen, 
  Video, 
  Award, 
  MessageCircle, 
  Users, 
  PlayCircle, 
  Star, 
  MessageSquare, 
  FileText, 
  ClipboardCheck, 
  ArrowRight, 
  Languages, 
  Clock, 
  ListChecks,
  CheckCircle,
  Download,
  Sparkles,
  Shield,
  TrendingUp,
  Zap,
  Quote,
  ChevronDown,
  Timer,
  Gift,
  Lock,
  Infinity,
  Target,
  Heart,
  Brain,
  GraduationCap
} from 'lucide-react'
import MotionWrapper, { MotionDiv, StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const currentCount = end * percentage;
      // For decimal numbers like 4.9, keep one decimal place
      if (end < 10 && end % 1 !== 0) {
        setCount(Math.round(currentCount * 10) / 10);
      } else {
        setCount(Math.floor(currentCount));
      }

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure we end exactly at the target
      }
    };

    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  // Show the final number immediately on server-side and during initial render
  if (!isMounted) {
    return <span>{end.toLocaleString()}{suffix}</span>;
  }

  return <span>{count.toLocaleString()}{suffix}</span>;
};

// Sticky CTA Component
const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <MotionDiv
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-2xl"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden md:block">
            <h4 className="font-bold text-slate-900 dark:text-white">संस्कृत भाषा प्रज्ञा</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">5200+ students already enrolled</p>
          </div>
          <a 
            href="https://courses.shikshanam.in/courses/Sanskrit-Bhasha-Pragya-65f6c26d6ec89a354dc26e5b" 
            className="bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </MotionDiv>
  );
};

// The main Course Page Component
export default function SanskritBhashaPragyaCoursePage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  const features = [
    { icon: <BookOpen className="h-6 w-6 text-orange-500" />, text: "30+ Pre-recorded Lessons" },
    { icon: <Video className="h-6 w-6 text-orange-500" />, text: "Live Q&A Every Sunday" },
    { icon: <Award className="h-6 w-6 text-orange-500" />, text: "Completion Certificate" },
    { icon: <MessageCircle className="h-6 w-6 text-orange-500" />, text: "Active Community Forum"},
  ];
  
  const secondaryFeatures = [
      {title: "Skill Level", description: "Beginner Friendly", icon: <GraduationCap className="h-8 w-8" />},
      {title: "Language", description: "Taught in Hindi", icon: <Languages className="h-8 w-8" />},
      {title: "Lifetime Access", description: "Learn at Your Pace", icon: <Infinity className="h-8 w-8" />},
      {title: "Community", description: "5200+ Students", icon: <Users className="h-8 w-8" /> },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      image: "https://placehold.co/100x100/f97316/white?text=P",
      rating: 5,
      text: "This course transformed my understanding of Sanskrit. The teaching methodology is exceptional!"
    },
    {
      name: "Rajesh Kumar",
      role: "Sanskrit Enthusiast",
      image: "https://placehold.co/100x100/f97316/white?text=R",
      rating: 5,
      text: "Acharyaji's explanations make complex concepts crystal clear. Highly recommended!"
    },
    {
      name: "Anita Patel",
      role: "Student",
      image: "https://placehold.co/100x100/f97316/white?text=A",
      rating: 5,
      text: "From zero knowledge to confident Sanskrit speaker. This course is worth every rupee!"
    }
  ];

  const faqs = [
    {
      question: "Do I need any prior Sanskrit knowledge?",
      answer: "No! This course is designed for absolute beginners. We start from the very basics and gradually build your skills."
    },
    {
      question: "What is the duration of the course?",
      answer: "The course contains 30+ pre-recorded lessons that you can complete at your own pace. Most students finish within 8-12 weeks."
    },
    {
      question: "Will I get a certificate?",
      answer: "Yes! Upon successful completion of the course, you'll receive a certificate that you can share on LinkedIn and other platforms."
    },
    {
      question: "Is there any live support?",
      answer: "Absolutely! We have live Q&A sessions every Sunday where you can interact with Acharyaji and clear your doubts."
    },
    {
      question: "What if I'm not satisfied with the course?",
      answer: "We offer a 7-day money-back guarantee. If you're not satisfied, we'll refund your payment, no questions asked."
    }
  ];

  const whoIsThisFor = [
    {
      icon: <Target className="h-8 w-8 text-orange-500" />,
      title: "Spiritual Seekers",
      description: "Want to read sacred texts in their original language"
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "Language Learners",
      description: "Passionate about learning ancient languages"
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Cultural Enthusiasts",
      description: "Desire to connect with Indian heritage and culture"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
      title: "Students & Scholars",
      description: "Need Sanskrit for academic or research purposes"
    }
  ];

  return (
    <>
      <StickyCTA />
      <div className="bg-gradient-to-br from-slate-50 via-orange-50 to-slate-50 font-sans text-slate-800 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-slate-100">
        
        {/* Hero Section with Animation */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-purple-500/5"></div>
          <div className="container mx-auto px-6 py-12 md:py-20 relative">
            <StaggerContainer>
        <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
                <StaggerItem>
          <div className="text-center lg:text-left mb-12 lg:mb-0">
                    <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200 text-sm font-semibold px-4 py-1">
                      <Sparkles className="h-4 w-4 mr-1 inline-block" />
                      Sanskrit for Beginners
                    </Badge>
                    
                    <MotionDiv
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-slate-900 via-orange-700 to-slate-900 dark:from-white dark:via-orange-400 dark:to-white bg-clip-text text-transparent mt-2 mb-6 leading-tight">
              संस्कृत भाषा प्रज्ञा
            </h1>
                    </MotionDiv>
                    
                    <MotionDiv
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8">
              Master the fundamentals of Sanskrit with Acharya Srinidhi V. An immersive learning experience designed to take you from beginner to confident speaker, all in Hindi.
            </p>
                    </MotionDiv>

                    <MotionDiv
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
            <ul className="mt-8 space-y-4 text-left max-w-md mx-auto lg:mx-0">
              {features.map((feature, index) => (
                          <MotionDiv
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="flex items-center group cursor-pointer"
                          >
                            <div className="flex-shrink-0 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-full p-3 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                            <span className="ml-4 text-slate-700 dark:text-slate-300 font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{feature.text}</span>
                          </MotionDiv>
              ))}
            </ul>
                    </MotionDiv>

                    <MotionDiv
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                      <a 
                        href="https://courses.shikshanam.in/courses/Sanskrit-Bhasha-Pragya-65f6c26d6ec89a354dc26e5b" 
                        className="group bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                Enroll Now
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a 
                        href="#syllabus" 
                        className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold py-4 px-8 rounded-xl text-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <Download className="h-5 w-5" />
                View Syllabus
              </a>
                    </MotionDiv>
            </div>
                </StaggerItem>

          {/* Right Column: Image */}
                <StaggerItem>
                  <MotionDiv
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="flex justify-center items-center"
                  >
                    <div className="relative w-full max-w-sm group">
                        <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-orange-300 to-orange-400 dark:from-orange-700 dark:to-orange-800 rounded-3xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-500"></div>
                        <div className="relative bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-2xl border-4 border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform duration-500">
                            <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 text-white rounded-2xl">
                        <Image 
                            src="https://shikshanam.in/wp-content/uploads/2024/12/shikshanam-course-thumbnail-7.png" 
                            alt="Acharya Srinidhi V." 
                            className="rounded-xl w-full h-auto"
                            onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x600/f97316/white?text=Acharya'; }}
                        />
                                <div className="mt-6">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Acharya Srinidhi V.</h3>
                            <p className="text-slate-300">Sanskrit Guru, 12+ Years Experience</p>
                        </div>
                    </div>
                </div>
            </div>
                  </MotionDiv>
                </StaggerItem>
        </div>

        {/* Secondary Features Section */}
        <div className="mt-20 md:mt-28">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                {secondaryFeatures.map((feature, index) => (
                        <MotionDiv
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -8, scale: 1.05 }}
                        >
                           <Card className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border-2 border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 h-full">
                              <div className="text-orange-600 dark:text-orange-400 mb-3 flex justify-center">{feature.icon}</div>
                              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">{feature.title}</h4>
                              <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
                          </Card>
                        </MotionDiv>
                ))}
            </div>
        </div>
            </StaggerContainer>
      </div>
        </section>

        {/* Who Is This For Section */}
        <section className="bg-white dark:bg-slate-900 py-16 md:py-24">
          <div className="container mx-auto px-6">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                Perfect For You
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Who Is This Course For?
              </h2>
              <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                This comprehensive Sanskrit course is designed for learners from all walks of life
              </p>
            </MotionDiv>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whoIsThisFor.map((persona, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="text-center h-full hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl">
                          {persona.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{persona.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{persona.description}</CardDescription>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section with Video */}
        <section className="bg-gradient-to-br from-orange-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 py-16 md:py-24">
          <div className="container mx-auto px-6">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-orange-700 dark:from-white dark:to-orange-400 bg-clip-text text-transparent leading-tight">
                  तो ये संस्कृत कोर्स आपके लिए है!
              </h2>
              <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300">
                  To help you write, understand, and speak Sanskrit with confidence and clarity.
              </p>
            </MotionDiv>

            {/* Video Preview Section */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <div className="relative aspect-video rounded-3xl shadow-2xl overflow-hidden ring-4 ring-orange-200 dark:ring-orange-800">
                  <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/SEHrRi3hkDk?autoplay=0&rel=0&modestbranding=1"
                      title="Mastering Sanskrit: Language of Wisdom - Sanskrit Bhasha Pragya"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                  ></iframe>
              </div>
            </MotionDiv>

            {/* Stats Section with Animated Counters */}
            <div className="mt-16 text-center">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                      <TrendingUp className="h-8 w-8 inline-block mr-2 text-green-500" />
                      Trusted by Thousands: Enroll Today!
                  </h3>
                </MotionDiv>
                
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <MotionDiv
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 border-2 border-orange-200 dark:border-orange-700">
                        <CardContent className="p-8">
                          <div className="flex justify-center items-center h-16 w-16 mx-auto bg-orange-200 dark:bg-orange-700 rounded-full mb-4">
                             <Users className="h-8 w-8 text-orange-600 dark:text-orange-200" />
                          </div>
                          <p className="text-5xl font-extrabold text-slate-900 dark:text-white">
                            <AnimatedCounter end={5200} suffix="+" />
                          </p>
                          <p className="text-slate-700 dark:text-slate-300 font-medium mt-2">Students Enrolled</p>
                        </CardContent>
                      </Card>
                    </MotionDiv>
                    
                    <MotionDiv
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 border-2 border-yellow-200 dark:border-yellow-700">
                        <CardContent className="p-8">
                          <div className="flex justify-center items-center h-16 w-16 mx-auto bg-yellow-200 dark:bg-yellow-700 rounded-full mb-4">
                             <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-200 fill-current" />
                          </div>
                          <p className="text-5xl font-extrabold text-slate-900 dark:text-white">
                            <AnimatedCounter end={4.9} suffix="/5" />
                          </p>
                          <p className="text-slate-700 dark:text-slate-300 font-medium mt-2">Average Rating</p>
                        </CardContent>
                      </Card>
                    </MotionDiv>
                    
                    <MotionDiv
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-2 border-green-200 dark:border-green-700">
                        <CardContent className="p-8">
                          <div className="flex justify-center items-center h-16 w-16 mx-auto bg-green-200 dark:bg-green-700 rounded-full mb-4">
                             <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-200" />
                          </div>
                          <p className="text-5xl font-extrabold text-slate-900 dark:text-white">
                            <AnimatedCounter end={475} suffix="+" />
                          </p>
                          <p className="text-slate-700 dark:text-slate-300 font-medium mt-2">Positive Reviews</p>
                        </CardContent>
                      </Card>
                    </MotionDiv>
                </div>
            </div>

            {/* CTA Button */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
                <a 
                  href="https://courses.shikshanam.in/courses/Sanskrit-Bhasha-Pragya-65f6c26d6ec89a354dc26e5b" 
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-5 px-12 rounded-2xl text-xl hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <Zap className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    ENROLL NOW
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </a>
            </MotionDiv>
          </div>
        </section>

        {/* Bonus Section - Redesigned */}
        <section className="bg-white dark:bg-slate-900 py-16 md:py-24">
          <div className="container mx-auto px-6">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                <Gift className="h-4 w-4 mr-1 inline-block" />
                Limited Time Offer
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Exclusive Benefits Valued at <span className="text-orange-600 dark:text-orange-400">₹10,000!</span>
              </h2>
              <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300">
                  Enroll today and get instant access to these exclusive bonuses, completely free.
              </p>
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  badge: "Bonus 1",
                  number: "500+",
                  icon: <BookOpen className="h-8 w-8 text-orange-500" />,
                  title: "Words and Growing!",
                  description: "Enhance your Sanskrit vocabulary, with regular updates!",
                  value: "₹3500"
                },
                {
                  badge: "Bonus 2",
                  number: "12+",
                  icon: <FileText className="h-8 w-8 text-orange-500" />,
                  title: "Practice Sheets",
                  description: "Strengthen your skills with hands-on practice sheets.",
                  value: "₹3000"
                },
                {
                  badge: "Bonus 3",
                  number: "30+",
                  icon: <ClipboardCheck className="h-8 w-8 text-orange-500" />,
                  title: "Notes & Quizzes",
                  description: "Revise with ease. Assess with confidence.",
                  value: "₹3500"
                }
              ].map((bonus, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-4">
                          <div>
                              <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 mb-2">
                                {bonus.badge}
                              </Badge>
                              <p className="text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">{bonus.number}</p>
                          </div>
                          <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 p-4 rounded-2xl">
                              {bonus.icon}
                          </div>
                      </div>
                      <CardTitle className="text-2xl">{bonus.title}</CardTitle>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 w-fit">
                        EXCLUSIVE
                      </Badge>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-base mb-6">{bonus.description}</CardDescription>
                      <div className="flex justify-between items-center mb-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <span className="text-slate-500 dark:text-slate-400 line-through">Value: {bonus.value}</span>
                          <span className="text-3xl font-bold text-green-600 dark:text-green-400">FREE</span>
                      </div>
                      <a href="#enroll" className="w-full bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 text-white font-bold py-3 px-6 rounded-xl text-center flex items-center justify-center hover:from-slate-900 hover:to-black dark:hover:from-slate-600 dark:hover:to-slate-700 transition-all shadow-lg group">
                          <span>Get Bonus</span>
                          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 py-16 md:py-24">
          <div className="container mx-auto px-6">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                <Star className="h-4 w-4 mr-1 inline-block fill-current" />
                Student Success Stories
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                What Our Students Say
              </h2>
              <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Join thousands of satisfied learners who transformed their lives through Sanskrit
              </p>
            </MotionDiv>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-white dark:bg-slate-800 hover:shadow-2xl transition-shadow duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-4 border-orange-200 dark:border-orange-800"
                        />
                        <div className="flex-grow">
                          <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                          <CardDescription>{testimonial.role}</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-orange-200 dark:text-orange-800" />
                        <p className="text-slate-600 dark:text-slate-300 italic pl-6">"{testimonial.text}"</p>
                      </div>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>

            {/* Trust Indicators */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-8">
                <div className="flex flex-wrap items-center justify-center gap-8 text-center">
                  <div className="flex items-center gap-3">
                    <Shield className="h-10 w-10 text-green-600 dark:text-green-400" />
                    <div className="text-left">
                      <p className="font-bold text-slate-900 dark:text-white">7-Day Money-Back</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">100% Satisfaction Guaranteed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    <div className="text-left">
                      <p className="font-bold text-slate-900 dark:text-white">Secure Payment</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">SSL Encrypted Checkout</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Infinity className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                    <div className="text-left">
                      <p className="font-bold text-slate-900 dark:text-white">Lifetime Access</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Learn at Your Own Pace</p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* Guru Section - Redesigned */}
        <section className="bg-white dark:bg-slate-900 py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 lg:gap-24 items-center">

              {/* Left Column: Image Collage with Animation */}
              <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative mb-12 lg:mb-0 p-8"
              >
                 <div className="absolute top-0 left-0 w-full h-full bg-orange-100 dark:bg-orange-900/30 rounded-full transform scale-75 blur-3xl"></div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="col-span-2">
                    <MotionDiv whileHover={{ scale: 1.05, rotate: 2 }} transition={{ duration: 0.3 }}>
                      <Image
                          src="https://shikshanam.in/wp-content/uploads/2024/03/image-5.png"
                          alt="Acharya V. Shrīnidhi"
                          className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5] ring-4 ring-orange-200 dark:ring-orange-800"
                          onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/400x500/f97316/white?text=Guru'; }}
                      />
                    </MotionDiv>
                  </div>
                  <MotionDiv whileHover={{ scale: 1.05, rotate: -2 }} transition={{ duration: 0.3 }}>
                    <Image
                        src="https://shikshanam.in/wp-content/uploads/2024/03/image-7.png"
                        alt="Acharya teaching"
                        className="rounded-2xl shadow-xl w-full object-cover aspect-square ring-2 ring-orange-200 dark:ring-orange-800"
                        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/400x400/334155/white?text=Teaching'; }}
                    />
                  </MotionDiv>
                  <MotionDiv whileHover={{ scale: 1.05, rotate: 2 }} transition={{ duration: 0.3 }}>
                    <Image
                        src="https://shikshanam.in/wp-content/uploads/2024/03/image-6.png"
                        alt="Acharya in a traditional setting"
                        className="rounded-2xl shadow-xl w-full object-cover aspect-square ring-2 ring-orange-200 dark:ring-orange-800"
                        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/400x400/334155/white?text=Wisdom'; }}
                    />
                  </MotionDiv>
                </div>
              </MotionDiv>

              {/* Right Column: Text Content */}
              <MotionDiv
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <Badge className="mb-4 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                  Meet Your Guru
                </Badge>
                <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-orange-700 dark:from-white dark:to-orange-400 bg-clip-text text-transparent mt-2">
                  आचार्य वि श्रीनिधिः
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 mt-1">(पूर्वमीमांसाध्यापकः, बेङ्गलूरु)</p>
                
                <p className="text-lg text-slate-600 dark:text-slate-300 mt-6 prose prose-lg max-w-xl mx-auto lg:mx-0">
                  आचार्य वि श्रीनिधि जी भाग्यनगरस्थ स्वामि-नारायण-गुरुकुलतः स्वकीयां प्रारम्भिक-गुरुकुल-शिक्षणाम् अपूरयन्, अनन्तरं श्री विश्वेतीर्थ-स्वामिनां सान्निध्ये इमं प्राचीन-शास्त्रम् अजानन्। गुरुकुल-पद्धत्या द्वादश-वर्षाणाम् अध्ययनस्य अभ्यासं कृत्वा, अद्यत्वे सः दिल्लीस्थ-वेद-विज्ञान-गुरुकुलस्य अध्यापकः अस्ति।
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 prose prose-lg max-w-xl mx-auto lg:mx-0">
                  आचार्यस्य श्रीनिधेः दृष्टिः न केवलं शिक्षकस्य, अपितु संस्कृतस्य सौन्दर्यस्य लोकस्य पुरतः प्रसारकस्य च। सः तादृशान् प्रयोगात्मकान् सत्रान् आयोजयति येषु संस्कृतं सर्वेभ्यः सुलभं भवति।
                </p>

                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto lg:mx-0">
                    <MotionDiv whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-5 rounded-xl flex items-center shadow-md">
                      <div className="flex-shrink-0 bg-orange-200 dark:bg-orange-700 rounded-full p-3">
                        <Award className="h-6 w-6 text-orange-700 dark:text-orange-200" />
                      </div>
                      <span className="ml-4 font-semibold text-slate-800 dark:text-slate-100">12+ years Gurukul Experience</span>
                    </MotionDiv>
                    <MotionDiv whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-5 rounded-xl flex items-center shadow-md">
                      <div className="flex-shrink-0 bg-purple-200 dark:bg-purple-700 rounded-full p-3">
                        <Languages className="h-6 w-6 text-purple-700 dark:text-purple-200" />
                      </div>
                      <span className="ml-4 font-semibold text-slate-800 dark:text-slate-100">Speaks Sanskrit Fluently</span>
                    </MotionDiv>
                  </div>
                </div>
              </MotionDiv>

            </div>
          </div>
        </section>

        {/* Syllabus Section with Accordion */}
        <section id="syllabus" className="bg-gradient-to-br from-slate-50 via-orange-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 md:py-24">
          <div className="container mx-auto px-6">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                Comprehensive Learning Path
              </Badge>
              <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-orange-700 to-slate-900 dark:from-white dark:via-orange-400 dark:to-white bg-clip-text text-transparent leading-tight">
                  Course Syllabus
              </h2>
              <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Master Sanskrit step-by-step with our structured curriculum designed for complete beginners to confident speakers.
              </p>
            </MotionDiv>

            {/* Free Demo Video Section */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <Card className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-700 dark:to-orange-800 p-8 text-white">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div className="flex-grow">
                              <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-2">
                                  <PlayCircle className="h-8 w-8" />
                                  Free Demo: संस्कृत वर्णमाला और शब्दों के प्रयोग
                              </h3>
                              <p className="text-orange-100">Get a taste of our teaching methodology</p>
                          </div>
                          <div className="flex items-center gap-6">
                              <div className="text-center bg-white/20 rounded-lg px-4 py-2">
                                  <div className="text-3xl font-bold">5</div>
                                  <div className="text-sm text-orange-100">Videos</div>
                              </div>
                              <div className="text-center bg-white/20 rounded-lg px-4 py-2">
                                  <div className="text-3xl font-bold">2</div>
                                  <div className="text-sm text-orange-100">Hours</div>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <CardContent className="p-8">
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8 ring-4 ring-orange-200 dark:ring-orange-800">
                          <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube.com/embed/SEHrRi3hkDk?autoplay=0&rel=0&modestbranding=1"
                              title="Sanskrit Bhasha Pragya - Free Demo Video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                          ></iframe>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                          <div>
                              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                  <CheckCircle className="h-6 w-6 text-green-500" />
                                  What You'll Learn
                              </h4>
                              <ul className="space-y-4">
                                  {[
                                      "आपकी संस्कृत कैसी सीखनी चाहिए ?",
                                      "संस्कृत वर्णमाला और सही उच्चारण",
                                      "शब्द कितने प्रकार के होते हैं ?",
                                      "शब्दों का लिंग निर्धारण कैसे करें ?",
                                      "सर्वनाम और क्रियावाचक पद"
                                  ].map((topic, index) => (
                                      <MotionDiv
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3"
                                      >
                                          <div className="w-7 h-7 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                              <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full"></div>
                                          </div>
                                          <span className="text-slate-700 dark:text-slate-300 font-medium">{topic}</span>
                                      </MotionDiv>
                                  ))}
                              </ul>
                          </div>
                          
                          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-8 rounded-2xl border-2 border-orange-200 dark:border-orange-800">
                              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                  <Sparkles className="h-6 w-6 text-orange-500" />
                                  Why Start Here?
                              </h4>
                              <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                                  {[
                                      "Perfect for absolute beginners",
                                      "Learn correct pronunciation",
                                      "Understand word structure",
                                      "Build strong foundation"
                                  ].map((benefit, index) => (
                                      <li key={index} className="flex items-center gap-3">
                                          <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                                          <span className="font-medium">{benefit}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>
                  </CardContent>
              </Card>
            </MotionDiv>

            {/* Course Modules with Accordion */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Complete Course Modules</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300">7 comprehensive modules covering all aspects of Sanskrit</p>
              </div>
              
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                      {[
                          { 
                            title: "विभक्ति, लिंग और वचन", 
                            description: "Master declensions, gender, and number",
                            topics: ["Understanding 8 vibhaktis (cases)", "Recognizing gender patterns", "Singular, dual & plural forms", "Practical declension tables"]
                          },
                          { 
                            title: "क्रिया पद और लकार", 
                            description: "Learn verb forms and tenses",
                            topics: ["10 lakaras (tense-moods)", "Conjugation patterns", "Active & passive voice", "Imperative & conditional"]
                          },
                          { 
                            title: "विशेषण, विशेष्य और अव्यय पद", 
                            description: "Adjectives, nouns, and indeclinables",
                            topics: ["Adjective agreement", "Noun formations", "Indeclinable particles", "Descriptive expressions"]
                          },
                          { 
                            title: "कृत प्रत्ययवान् पद/अव्यय", 
                            description: "Derived words and particles",
                            topics: ["Primary derivatives (krit pratyaya)", "Secondary derivatives", "Participles & gerunds", "Word formation rules"]
                          },
                          { 
                            title: "उपसर्ग और प्रशासक वाक्य", 
                            description: "Prefixes and administrative sentences",
                            topics: ["22 upasargas (prefixes)", "Prefix meanings & usage", "Formal sentence structures", "Administrative vocabulary"]
                          },
                          { 
                            title: "सन्धि और समास", 
                            description: "Sandhi and compound words",
                            topics: ["Vowel sandhi rules", "Consonant sandhi rules", "6 types of samasa", "Breaking compounds"]
                          },
                          { 
                            title: "संस्कृत सम्भाषण", 
                            description: "Conversational Sanskrit",
                            topics: ["Daily conversation phrases", "Practical dialogues", "Cultural expressions", "Speaking practice sessions"]
                          }
                      ].map((module, index) => (
                          <AccordionItem key={index} value={`module-${index}`} className="border-slate-200 dark:border-slate-700">
                              <AccordionTrigger className="hover:no-underline group">
                                  <div className="flex items-center gap-4 w-full text-left">
                                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                                          {index + 1}
                                      </div>
                                      <div className="flex-grow">
                                          <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                              {module.title}
                                          </h4>
                                          <p className="text-sm text-slate-600 dark:text-slate-400">{module.description}</p>
                                      </div>
                                      <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 flex-shrink-0">
                                          <div className="flex items-center gap-1">
                                              <Video className="h-4 w-4" />
                                              <span>5+</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                              <Clock className="h-4 w-4" />
                                              <span>2h</span>
                                          </div>
                                      </div>
                                  </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                  <div className="pl-16 pr-4 pb-4">
                                      <h5 className="font-semibold text-slate-800 dark:text-white mb-3">What you'll learn:</h5>
                                      <ul className="space-y-2">
                                          {module.topics.map((topic, topicIndex) => (
                                              <li key={topicIndex} className="flex items-start gap-2">
                                                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                                  <span className="text-slate-600 dark:text-slate-300">{topic}</span>
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                              </AccordionContent>
                          </AccordionItem>
                      ))}
                  </Accordion>
                </CardContent>
              </Card>
            </MotionDiv>


            {/* FAQ Section */}
            <div className="mb-16">
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                      Frequently Asked Questions
                    </Badge>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Have Questions? We've Got Answers</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-300">Everything you need to know about the course</p>
                </div>
              </MotionDiv>
              
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`faq-${index}`} className="border-b border-slate-200 dark:border-slate-700">
                              <AccordionTrigger className="text-left hover:no-underline group py-4">
                                  <span className="font-semibold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors pr-4">
                                    {faq.question}
                                  </span>
                              </AccordionTrigger>
                              <AccordionContent className="pt-2 pb-6">
                                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                      {faq.answer}
                                  </p>
                              </AccordionContent>
                          </AccordionItem>
                      ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Final CTA Section */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative bg-gradient-to-r from-orange-600 via-orange-700 to-orange-600 dark:from-orange-700 dark:via-orange-800 dark:to-orange-700 rounded-3xl p-8 md:p-16 text-white overflow-hidden shadow-2xl">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                  </div>
                  
                  <div className="relative z-10">
                      <h3 className="text-3xl md:text-5xl font-extrabold mb-6">
                        Ready to Start Your Sanskrit Journey?
                      </h3>
                      <p className="text-xl md:text-2xl text-orange-100 mb-10 max-w-3xl mx-auto">
                          Join 5,200+ students who have already begun their journey into the beautiful world of Sanskrit.
                      </p>
                      <a 
                          href="https://courses.shikshanam.in/courses/Sanskrit-Bhasha-Pragya-65f6c26d6ec89a354dc26e5b" 
                          className="group inline-flex items-center gap-3 bg-white text-orange-700 dark:text-orange-800 font-bold py-5 px-12 rounded-2xl text-xl hover:bg-orange-50 dark:hover:bg-orange-100 transition-all transform hover:scale-105 shadow-2xl"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                          <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                          Enroll Now - Start Learning Today
                          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </a>
                      
                      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-orange-100">
                          <div className="flex items-center gap-2">
                              <Shield className="h-5 w-5" />
                              7-Day Money-Back Guarantee
                          </div>
                          <div className="flex items-center gap-2">
                              <Infinity className="h-5 w-5" />
                              Lifetime Access
                          </div>
                          <div className="flex items-center gap-2">
                              <Award className="h-5 w-5" />
                              Certificate Included
                          </div>
                      </div>
                  </div>
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* Founder's Mission Section - Redesigned */}
        <section className="bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 py-16 md:py-24">
          <div className="container mx-auto px-6">
            {/* Heading Section */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                <Sparkles className="h-4 w-4 mr-1 inline-block" />
                Wisdom in Action
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="text-slate-900 dark:text-white">Founder's</span>{" "}
                <span className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-400 dark:to-purple-500 bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                To Transform Modern Lives with Eternal Wisdom
              </p>
            </MotionDiv>
            
            {/* Masonry Gallery with Animations */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {[
                "https://shikshanam.in/wp-content/uploads/2025/07/1-01-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-02-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-03-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-04-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-06-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-05-5-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-07-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-16.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-13.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-12-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-11-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-15.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-14-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-08-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-09-4-scaled.png",
                "https://shikshanam.in/wp-content/uploads/2025/07/1-10-3-scaled.png"
              ].map((src, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="break-inside-avoid relative overflow-hidden rounded-2xl shadow-lg ring-2 ring-purple-200 dark:ring-purple-800"
                >
                  <Image 
                    src={src} 
                    alt={`Gallery Image ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src=`https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+${index + 1}`; }}
                  />
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}