/**
 * Data Sync - Sync frontend data with CMS
 * This module extracts data from frontend components and syncs with CMS
 */

import { getAllFrontendData } from './frontend-data-extractor';

// Sync all frontend data
export const syncFrontendData = () => {
  const frontendData = getAllFrontendData();
  
  return {
    courses: frontendData.courses.map(course => ({ id: course.id, data: course })),
    packages: frontendData.packages.map(pkg => ({ id: pkg.id, data: pkg })),
    
    // About Us data with all sections
    about: [{
      id: 'about',
      data: {
        // Hero section
        hero: {
          title: 'About Shikshanam',
          subtitle: 'Preserving Ancient Wisdom for Modern Times',
          description: 'Shikshanam is dedicated to preserving and sharing the profound wisdom of ancient Indian traditions through modern educational platforms.',
          image: '/images/about/hero.jpg',
          backgroundImage: '/images/about/background.jpg'
        },
        
        // Mission section
        mission: {
          title: 'Our Mission',
          subtitle: 'Making Ancient Wisdom Accessible',
          description: 'We are committed to making ancient Indian wisdom accessible to everyone through innovative learning experiences.',
          content: 'Our mission is to bridge the gap between traditional knowledge and modern education, ensuring that the profound teachings of our ancestors remain relevant and accessible to future generations.',
          image: '/images/about/mission.jpg',
          stats: {
            students: '10,000+',
            courses: '50+',
            years: '5+',
            countries: '25+'
          }
        },
        
        // Values section
        values: {
          title: 'Our Values',
          subtitle: 'Guiding Principles',
          description: 'The core values that drive everything we do at Shikshanam.',
          values: [
            {
              title: 'Respect for Traditional Knowledge',
              description: 'We honor and preserve the authentic teachings of ancient masters.',
              icon: 'book',
              color: 'blue'
            },
            {
              title: 'Innovation in Teaching Methods',
              description: 'We use modern technology to make ancient wisdom more accessible.',
              icon: 'lightbulb',
              color: 'yellow'
            },
            {
              title: 'Accessibility for All Learners',
              description: 'We believe education should be available to everyone, regardless of background.',
              icon: 'heart',
              color: 'green'
            },
            {
              title: 'Preservation of Cultural Heritage',
              description: 'We are committed to preserving and passing on our rich cultural heritage.',
              icon: 'shield',
              color: 'purple'
            }
          ]
        },
        
        // Offerings section
        offerings: {
          title: 'What We Offer',
          subtitle: 'Comprehensive Learning Solutions',
          description: 'Our diverse range of educational offerings designed to meet every learner\'s needs.',
          offerings: [
            {
              title: 'Sanskrit Courses',
              description: 'Master the language of the gods with our comprehensive Sanskrit programs.',
              icon: 'book',
              link: '/courses/sanskrit',
              featured: true
            },
            {
              title: 'Philosophy Programs',
              description: 'Explore the six classical schools of Indian philosophy.',
              icon: 'lightbulb',
              link: '/courses/philosophy',
              featured: true
            },
            {
              title: 'Life Skills Training',
              description: 'Practical wisdom for modern living and personal development.',
              icon: 'heart',
              link: '/courses/life-skills',
              featured: true
            },
            {
              title: 'Spiritual Practices',
              description: 'Meditation, yoga, and other spiritual practices for inner growth.',
              icon: 'lotus',
              link: '/courses/spiritual-practices',
              featured: false
            }
          ]
        },
        
        // CTA section
        cta: {
          title: 'Join Our Community',
          subtitle: 'Start Your Journey Today',
          description: 'Become part of our growing community of learners and teachers.',
          buttons: [
            {
              text: 'Explore Courses',
              link: '/courses',
              variant: 'primary'
            },
            {
              text: 'Meet Our Teachers',
              link: '/gurus',
              variant: 'secondary'
            }
          ],
          backgroundImage: '/images/about/cta-bg.jpg'
        },
        
        // Team section
        team: [
          {
            name: 'Dr. Vishal Chaurasia',
            role: 'Founder & Spiritual Guide',
            bio: 'Renowned scholar in Sanskrit and ancient Indian philosophy with over 20 years of teaching experience.',
            image: '/images/team/vishal.jpg',
            specialties: ['Sanskrit', 'Vedanta', 'Yoga Philosophy'],
            social: {
              linkedin: 'https://linkedin.com/in/vishal-chaurasia',
              twitter: 'https://twitter.com/vishal_chaurasia'
            }
          },
          {
            name: 'Dr. Priya Sharma',
            role: 'Academic Director',
            bio: 'Expert in Vedic studies and traditional education with a focus on women\'s spiritual development.',
            image: '/images/team/priya.jpg',
            specialties: ['Vedic Studies', 'Women\'s Spirituality', 'Traditional Education'],
            social: {
              linkedin: 'https://linkedin.com/in/priya-sharma',
              twitter: 'https://twitter.com/priya_sharma'
            }
          }
        ]
      }
    }],
    
    // Contact data with all sections
    contact: [{
      id: 'contact',
      data: {
        // Hero section
        hero: {
          title: 'Get in Touch',
          subtitle: 'We\'d love to hear from you',
          description: 'Have questions about our courses or need support? Reach out to us.',
          image: '/images/contact/hero.jpg',
          backgroundImage: '/images/contact/background.jpg'
        },
        
        // Form section
        form: {
          title: 'Send us a Message',
          subtitle: 'We\'ll get back to you within 24 hours',
          fields: [
            {
              name: 'name',
              label: 'Full Name',
              type: 'text',
              required: true,
              placeholder: 'Enter your full name'
            },
            {
              name: 'email',
              label: 'Email Address',
              type: 'email',
              required: true,
              placeholder: 'Enter your email address'
            },
            {
              name: 'phone',
              label: 'Phone Number',
              type: 'tel',
              required: false,
              placeholder: 'Enter your phone number'
            },
            {
              name: 'subject',
              label: 'Subject',
              type: 'select',
              required: true,
              options: [
                'General Inquiry',
                'Course Information',
                'Technical Support',
                'Partnership',
                'Other'
              ]
            },
            {
              name: 'message',
              label: 'Message',
              type: 'textarea',
              required: true,
              placeholder: 'Tell us how we can help you',
              rows: 5
            }
          ],
          submitText: 'Send Message',
          successMessage: 'Thank you! We\'ll get back to you soon.',
          errorMessage: 'Something went wrong. Please try again.'
        },
        
        // Contact Info section
        contactInfo: {
          title: 'Contact Information',
          subtitle: 'Multiple ways to reach us',
          email: {
            address: 'info@shikshanam.com',
            label: 'General Inquiries',
            icon: 'mail'
          },
          phone: {
            number: '+91 98765 43210',
            label: 'Phone Support',
            icon: 'phone',
            hours: '9 AM - 6 PM IST'
          },
          address: {
            street: '123 Wisdom Lane',
            city: 'Varanasi',
            state: 'Uttar Pradesh',
            pincode: '221001',
            country: 'India',
            label: 'Our Office',
            icon: 'map-pin'
          },
          hours: {
            weekdays: '9:00 AM - 6:00 PM',
            weekends: '10:00 AM - 4:00 PM',
            timezone: 'IST',
            label: 'Business Hours',
            icon: 'clock'
          }
        },
        
        // Quick Help section
        quickHelp: {
          title: 'Quick Help',
          subtitle: 'Common questions and answers',
          faqs: [
            {
              question: 'How do I enroll in a course?',
              answer: 'Browse our courses and click "Enroll" on any course you\'re interested in.',
              category: 'Enrollment'
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept credit cards, debit cards, UPI, and net banking.',
              category: 'Payment'
            },
            {
              question: 'Do you offer certificates?',
              answer: 'Yes, we provide certificates upon successful completion of courses.',
              category: 'Certificates'
            },
            {
              question: 'Can I access courses on mobile?',
              answer: 'Yes, our platform is fully responsive and works on all devices.',
              category: 'Technical'
            }
          ],
          categories: ['Enrollment', 'Payment', 'Certificates', 'Technical']
        },
        
        // Social Media section
        social: {
          title: 'Follow Us',
          subtitle: 'Stay connected on social media',
          platforms: [
            {
              name: 'Facebook',
              url: 'https://facebook.com/shikshanam',
              icon: 'facebook',
              followers: '5.2K'
            },
            {
              name: 'Twitter',
              url: 'https://twitter.com/shikshanam',
              icon: 'twitter',
              followers: '3.8K'
            },
            {
              name: 'Instagram',
              url: 'https://instagram.com/shikshanam',
              icon: 'instagram',
              followers: '7.1K'
            },
            {
              name: 'YouTube',
              url: 'https://youtube.com/shikshanam',
              icon: 'youtube',
              subscribers: '12.5K'
            }
          ]
        }
      }
    }],
    
    // Donation data with all sections
    donation: [{
      id: 'donation',
      data: {
        // Hero section
        hero: {
          title: 'Support Our Mission',
          subtitle: 'Help us preserve and share ancient wisdom',
          description: 'Your contribution helps us create more courses, maintain our platform, and reach more students worldwide.',
          image: '/images/donation/hero.jpg',
          backgroundImage: '/images/donation/background.jpg',
          ctaText: 'Make a Donation',
          ctaLink: '#donate'
        },
        
        // Impact section
        impact: {
          title: 'Your Impact',
          subtitle: 'See how your donations make a difference',
          description: 'Every contribution helps us reach more students and preserve ancient wisdom.',
          stats: [
            {
              number: '10,000+',
              label: 'Students Helped',
              icon: 'users',
              color: 'blue'
            },
            {
              number: '50+',
              label: 'Courses Created',
              icon: 'book',
              color: 'green'
            },
            {
              number: '25+',
              label: 'Countries Reached',
              icon: 'globe',
              color: 'purple'
            },
            {
              number: '100+',
              label: 'Teachers Supported',
              icon: 'graduation-cap',
              color: 'orange'
            }
          ],
          stories: [
            {
              title: 'Rekha\'s Journey',
              description: 'From a small village in Bihar to becoming a Sanskrit teacher',
              impact: 'Helped 500+ students learn Sanskrit',
              image: '/images/stories/rekha.jpg',
              location: 'Bihar, India'
            },
            {
              title: 'Global Reach',
              description: 'Our courses now reach students in 25+ countries',
              impact: 'Bridging cultures through education',
              image: '/images/stories/global.jpg',
              location: 'Worldwide'
            }
          ]
        },
        
        // Causes section
        causes: {
          title: 'Our Causes',
          subtitle: 'What we support with your donations',
          description: 'Your donations directly support these important initiatives.',
          causes: [
            {
              title: 'Free Education for Underprivileged',
              description: 'Providing free access to Sanskrit and philosophy courses for students who cannot afford them.',
              goal: '₹5,00,000',
              raised: '₹3,20,000',
              progress: 64,
              icon: 'heart',
              color: 'red'
            },
            {
              title: 'Teacher Training Programs',
              description: 'Training more teachers to spread ancient wisdom across India.',
              goal: '₹3,00,000',
              raised: '₹1,80,000',
              progress: 60,
              icon: 'graduation-cap',
              color: 'blue'
            },
            {
              title: 'Digital Infrastructure',
              description: 'Improving our platform to reach more students worldwide.',
              goal: '₹2,00,000',
              raised: '₹1,50,000',
              progress: 75,
              icon: 'laptop',
              color: 'green'
            }
          ]
        },
        
        // Donation Options section
        donationOptions: {
          title: 'Donation Options',
          subtitle: 'Choose how you want to contribute',
          description: 'Multiple ways to support our mission.',
          options: [
            {
              title: 'One-time Donation',
              description: 'Make a single contribution to support our mission.',
              amounts: [500, 1000, 2500, 5000, 10000],
              customAmount: true,
              popular: true
            },
            {
              title: 'Monthly Support',
              description: 'Become a monthly supporter and help us plan long-term initiatives.',
              amounts: [500, 1000, 2500, 5000],
              customAmount: true,
              popular: false
            },
            {
              title: 'Sponsor a Student',
              description: 'Directly support a student\'s education journey.',
              amount: 10000,
              customAmount: false,
              popular: false
            }
          ],
          paymentMethods: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'PayPal'],
          taxBenefits: 'Donations are tax-deductible under Section 80G'
        },
        
        // Testimonials section
        testimonials: {
          title: 'Donor Stories',
          subtitle: 'Hear from our supporters',
          description: 'See how our donors are making a difference.',
          testimonials: [
            {
              name: 'Rajesh Kumar',
              role: 'Software Engineer',
              location: 'Bangalore',
              quote: 'Supporting Shikshanam has been one of the most fulfilling decisions of my life. Knowing that my contribution helps preserve our ancient wisdom gives me great satisfaction.',
              image: '/images/testimonials/rajesh.jpg',
              donationAmount: '₹5,000'
            },
            {
              name: 'Priya Sharma',
              role: 'Teacher',
              location: 'Delhi',
              quote: 'As an educator myself, I understand the importance of quality education. Shikshanam is doing incredible work, and I\'m proud to support them.',
              image: '/images/testimonials/priya.jpg',
              donationAmount: '₹2,500'
            }
          ]
        },
        
        // FAQ section
        faq: {
          title: 'Frequently Asked Questions',
          subtitle: 'Common questions about donations',
          description: 'Get answers to common questions about supporting our mission.',
          questions: [
            {
              question: 'How will my donation be used?',
              answer: 'Your donations are used to create new courses, support teachers, provide free education to underprivileged students, and maintain our platform.',
              category: 'Usage'
            },
            {
              question: 'Are donations tax-deductible?',
              answer: 'Yes, all donations to Shikshanam are tax-deductible under Section 80G of the Income Tax Act.',
              category: 'Tax'
            },
            {
              question: 'Can I donate anonymously?',
              answer: 'Yes, you can choose to donate anonymously if you prefer.',
              category: 'Privacy'
            },
            {
              question: 'How can I track the impact of my donation?',
              answer: 'We send regular updates to all donors about how their contributions are making a difference.',
              category: 'Impact'
            }
          ]
        },
        
        // CTA section
        cta: {
          title: 'Ready to Make a Difference?',
          subtitle: 'Join thousands of supporters',
          description: 'Your contribution, no matter the size, helps us preserve and share ancient wisdom.',
          buttons: [
            {
              text: 'Donate Now',
              link: '#donate',
              variant: 'primary'
            },
            {
              text: 'Learn More',
              link: '/about',
              variant: 'secondary'
            }
          ],
          backgroundImage: '/images/donation/cta-bg.jpg'
        }
      }
    }],
    
    // Career data with all sections
    career: [{
      id: 'career',
      data: {
        // Hero section
        hero: {
          title: 'Join Our Mission',
          subtitle: 'Build the future of education with us',
          description: 'We\'re looking for passionate individuals who want to make a difference in education.',
          image: '/images/career/hero.jpg',
          backgroundImage: '/images/career/background.jpg',
          ctaText: 'View Open Positions',
          ctaLink: '#jobs'
        },
        
        // Culture section
        culture: {
          title: 'Our Culture',
          subtitle: 'What it\'s like to work at Shikshanam',
          description: 'We believe in creating an environment where everyone can thrive and grow.',
          values: [
            {
              title: 'Innovation',
              description: 'We encourage creative thinking and new approaches to education.',
              icon: 'lightbulb',
              color: 'yellow'
            },
            {
              title: 'Respect',
              description: 'We value diverse perspectives and treat everyone with dignity.',
              icon: 'heart',
              color: 'red'
            },
            {
              title: 'Learning',
              description: 'We believe in continuous learning and personal growth.',
              icon: 'book',
              color: 'blue'
            },
            {
              title: 'Impact',
              description: 'We focus on making a meaningful difference in education.',
              icon: 'target',
              color: 'green'
            }
          ],
          environment: 'Collaborative, supportive, and growth-oriented',
          perks: [
            'Flexible working hours',
            'Remote work options',
            'Learning and development budget',
            'Health and wellness programs',
            'Team building activities',
            'Professional development opportunities'
          ]
        },
        
        // Benefits section
        benefits: {
          title: 'Benefits & Perks',
          subtitle: 'We take care of our team',
          description: 'Comprehensive benefits package designed to support your well-being and growth.',
          categories: [
            {
              title: 'Health & Wellness',
              benefits: [
                'Comprehensive health insurance',
                'Mental health support',
                'Gym membership reimbursement',
                'Wellness programs'
              ],
              icon: 'heart',
              color: 'red'
            },
            {
              title: 'Learning & Development',
              benefits: [
                'Learning budget for courses',
                'Conference attendance',
                'Internal training programs',
                'Mentorship opportunities'
              ],
              icon: 'graduation-cap',
              color: 'blue'
            },
            {
              title: 'Work-Life Balance',
              benefits: [
                'Flexible working hours',
                'Remote work options',
                'Generous vacation policy',
                'Family-friendly policies'
              ],
              icon: 'clock',
              color: 'green'
            },
            {
              title: 'Financial Benefits',
              benefits: [
                'Competitive salary',
                'Performance bonuses',
                'Stock options',
                'Retirement planning'
              ],
              icon: 'dollar-sign',
              color: 'yellow'
            }
          ]
        },
        
        // Open Positions section
        jobs: {
          title: 'Open Positions',
          subtitle: 'Current job opportunities',
          description: 'Join our team and help us transform education.',
          positions: [
            {
              title: 'Senior Frontend Developer',
              department: 'Engineering',
              location: 'Remote / Bangalore',
              type: 'Full-time',
              experience: '3-5 years',
              description: 'We\'re looking for a skilled frontend developer to help us build amazing learning experiences.',
              requirements: [
                'Strong experience with React/Next.js',
                'Proficiency in TypeScript',
                'Experience with modern CSS frameworks',
                'Understanding of accessibility standards'
              ],
              benefits: [
                'Competitive salary',
                'Health insurance',
                'Learning budget',
                'Flexible hours'
              ],
              applyLink: '/careers/senior-frontend-developer'
            },
            {
              title: 'Content Creator',
              department: 'Education',
              location: 'Remote / Varanasi',
              type: 'Full-time',
              experience: '2-4 years',
              description: 'Create engaging educational content for our Sanskrit and philosophy courses.',
              requirements: [
                'Strong background in Sanskrit or Indian philosophy',
                'Experience in content creation',
                'Excellent writing skills',
                'Understanding of educational pedagogy'
              ],
              benefits: [
                'Competitive salary',
                'Health insurance',
                'Learning budget',
                'Flexible hours'
              ],
              applyLink: '/careers/content-creator'
            },
            {
              title: 'UX/UI Designer',
              department: 'Design',
              location: 'Remote / Mumbai',
              type: 'Full-time',
              experience: '2-4 years',
              description: 'Design intuitive and beautiful user experiences for our learning platform.',
              requirements: [
                'Strong portfolio in UX/UI design',
                'Experience with design tools (Figma, Sketch)',
                'Understanding of user research',
                'Knowledge of accessibility standards'
              ],
              benefits: [
                'Competitive salary',
                'Health insurance',
                'Learning budget',
                'Flexible hours'
              ],
              applyLink: '/careers/ux-ui-designer'
            }
          ]
        },
        
        // Application Process section
        applicationProcess: {
          title: 'Application Process',
          subtitle: 'How to join our team',
          description: 'Our streamlined process to find the right fit for both you and us.',
          steps: [
            {
              step: 1,
              title: 'Apply Online',
              description: 'Submit your application through our careers page.',
              duration: '5 minutes',
              icon: 'send'
            },
            {
              step: 2,
              title: 'Initial Screening',
              description: 'We review your application and portfolio.',
              duration: '1-2 days',
              icon: 'search'
            },
            {
              step: 3,
              title: 'Interview',
              description: 'Video interview with our team members.',
              duration: '30-45 minutes',
              icon: 'video'
            },
            {
              step: 4,
              title: 'Technical Assessment',
              description: 'Practical assessment relevant to the role.',
              duration: '1-2 hours',
              icon: 'code'
            },
            {
              step: 5,
              title: 'Final Interview',
              description: 'Meet with senior team members.',
              duration: '45-60 minutes',
              icon: 'users'
            },
            {
              step: 6,
              title: 'Offer',
              description: 'We extend an offer to successful candidates.',
              duration: '1-2 days',
              icon: 'check-circle'
            }
          ]
        }
      }
    }],
    
    // Accessibility data with all sections
    accessibility: [{
      id: 'accessibility',
      data: {
        // Hero section
        hero: {
          title: 'Accessibility Statement',
          subtitle: 'Committed to inclusive education',
          description: 'We believe education should be accessible to everyone, regardless of ability.',
          image: '/images/accessibility/hero.jpg',
          backgroundImage: '/images/accessibility/background.jpg'
        },
        
        // Statement section
        statement: {
          title: 'Our Commitment',
          subtitle: 'Making education accessible to all',
          description: 'We are committed to ensuring that our platform is accessible to all users, including those with disabilities.',
          content: 'Shikshanam is dedicated to providing an inclusive learning environment where everyone can access and benefit from our educational content. We continuously work to improve the accessibility of our platform and ensure compliance with international accessibility standards.',
          lastUpdated: 'January 15, 2024',
          compliance: 'WCAG 2.1 AA compliant'
        },
        
        // Features section
        features: {
          title: 'Accessibility Features',
          subtitle: 'How we make our platform accessible',
          description: 'We implement various accessibility features to ensure our platform is usable by everyone.',
          categories: [
            {
              title: 'Visual Accessibility',
              features: [
                'High contrast mode for better visibility',
                'Text size adjustment options',
                'Color-blind friendly color schemes',
                'Clear typography and spacing'
              ],
              icon: 'eye',
              color: 'blue'
            },
            {
              title: 'Motor Accessibility',
              features: [
                'Keyboard navigation support',
                'Large click targets',
                'Customizable interaction timeouts',
                'Voice control compatibility'
              ],
              icon: 'mouse-pointer',
              color: 'green'
            },
            {
              title: 'Cognitive Accessibility',
              features: [
                'Clear navigation structure',
                'Consistent interface design',
                'Progress indicators',
                'Error prevention and recovery'
              ],
              icon: 'brain',
              color: 'purple'
            },
            {
              title: 'Auditory Accessibility',
              features: [
                'Audio descriptions for videos',
                'Transcripts for all content',
                'Visual indicators for audio cues',
                'Subtitles and captions'
              ],
              icon: 'volume-2',
              color: 'orange'
            }
          ]
        },
        
        // Compliance section
        compliance: {
          title: 'Compliance Standards',
          subtitle: 'Meeting international accessibility standards',
          description: 'We follow established accessibility guidelines to ensure our platform meets the highest standards.',
          standards: [
            {
              name: 'WCAG 2.1 AA',
              description: 'Web Content Accessibility Guidelines 2.1 Level AA',
              status: 'Compliant',
              icon: 'check-circle',
              color: 'green'
            },
            {
              name: 'Section 508',
              description: 'US Federal accessibility requirements',
              status: 'Compliant',
              icon: 'check-circle',
              color: 'green'
            },
            {
              name: 'ADA Compliance',
              description: 'Americans with Disabilities Act compliance',
              status: 'Compliant',
              icon: 'check-circle',
              color: 'green'
            }
          ],
          testing: {
            title: 'Regular Testing',
            description: 'We regularly test our platform for accessibility compliance.',
            methods: [
              'Automated accessibility testing',
              'Manual testing with assistive technologies',
              'User testing with people with disabilities',
              'Expert accessibility audits'
            ]
          }
        },
        
        // Support section
        support: {
          title: 'Accessibility Support',
          subtitle: 'We\'re here to help',
          description: 'If you encounter any accessibility barriers, we\'re here to help.',
          contact: {
            email: 'accessibility@shikshanam.com',
            phone: '+91 98765 43210',
            hours: '9 AM - 6 PM IST, Monday to Friday'
          },
          feedback: {
            title: 'Report Accessibility Issues',
            description: 'Help us improve by reporting any accessibility barriers you encounter.',
            form: {
              fields: [
                {
                  name: 'issue',
                  label: 'Describe the accessibility issue',
                  type: 'textarea',
                  required: true,
                  placeholder: 'Please describe the accessibility barrier you encountered...'
                },
                {
                  name: 'page',
                  label: 'Page or section where you encountered the issue',
                  type: 'text',
                  required: true,
                  placeholder: 'e.g., /courses/sanskrit-basics'
                },
                {
                  name: 'assistiveTechnology',
                  label: 'Assistive technology used (if any)',
                  type: 'text',
                  required: false,
                  placeholder: 'e.g., Screen reader, voice control, etc.'
                }
              ],
              submitText: 'Report Issue',
              successMessage: 'Thank you for your feedback. We\'ll review and address this issue.'
            }
          }
        }
      }
    }],
    
    // Privacy Policy data with all sections
    privacy: [{
      id: 'privacy',
      data: {
        // Hero section
        hero: {
          title: 'Privacy Policy',
          subtitle: 'Your privacy matters to us',
          description: 'We are committed to protecting your personal information and being transparent about how we use it.',
          lastUpdated: 'January 15, 2024',
          effectiveDate: 'January 15, 2024'
        },
        
        // Introduction section
        introduction: {
          title: 'Introduction',
          content: 'At Shikshanam, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform.',
          scope: 'This policy applies to all users of our platform, including students, teachers, and visitors to our website.'
        },
        
        // Data Collection section
        dataCollection: {
          title: 'Information We Collect',
          subtitle: 'What data we gather and why',
          description: 'We collect information to provide you with the best possible educational experience.',
          categories: [
            {
              title: 'Account Information',
              description: 'Information you provide when creating an account',
              data: [
                'Full name and email address',
                'Profile picture (optional)',
                'Educational background',
                'Learning preferences and goals'
              ],
              purpose: 'To create and manage your account'
            },
            {
              title: 'Learning Data',
              description: 'Information about your learning progress and activities',
              data: [
                'Course enrollment and completion status',
                'Quiz scores and assessment results',
                'Time spent on different lessons',
                'Learning preferences and progress'
              ],
              purpose: 'To personalize your learning experience'
            },
            {
              title: 'Payment Information',
              description: 'Financial information for course purchases',
              data: [
                'Payment method details (encrypted)',
                'Billing address',
                'Transaction history',
                'Refund requests'
              ],
              purpose: 'To process payments and manage subscriptions'
            },
            {
              title: 'Usage Analytics',
              description: 'Anonymous data about how you use our platform',
              data: [
                'Pages visited and time spent',
                'Features used most frequently',
                'Device and browser information',
                'Error logs and performance data'
              ],
              purpose: 'To improve our platform and user experience'
            }
          ]
        },
        
        // Data Usage section
        dataUsage: {
          title: 'How We Use Your Information',
          subtitle: 'Purposes for which we use your data',
          description: 'We use your information only for legitimate educational and business purposes.',
          purposes: [
            {
              title: 'Provide Educational Services',
              description: 'Deliver courses, track progress, and provide personalized learning experiences.',
              examples: [
                'Recommend relevant courses based on your interests',
                'Track your learning progress and achievements',
                'Provide certificates upon course completion',
                'Enable interactive learning features'
              ]
            },
            {
              title: 'Improve Our Platform',
              description: 'Analyze usage patterns to enhance our educational offerings.',
              examples: [
                'Identify popular courses and content',
                'Improve user interface and experience',
                'Develop new features based on user needs',
                'Optimize platform performance'
              ]
            },
            {
              title: 'Communication',
              description: 'Send important updates and educational content.',
              examples: [
                'Course announcements and updates',
                'Learning tips and educational resources',
                'Platform maintenance notifications',
                'Marketing communications (with consent)'
              ]
            },
            {
              title: 'Security and Compliance',
              description: 'Protect our platform and comply with legal requirements.',
              examples: [
                'Prevent fraud and unauthorized access',
                'Comply with legal and regulatory requirements',
                'Enforce our terms of service',
                'Protect intellectual property rights'
              ]
            }
          ]
        },
        
        // Data Protection section
        dataProtection: {
          title: 'How We Protect Your Data',
          subtitle: 'Security measures we implement',
          description: 'We implement comprehensive security measures to protect your personal information.',
          measures: [
            {
              title: 'Encryption',
              description: 'All data is encrypted in transit and at rest using industry-standard encryption protocols.',
              icon: 'shield',
              color: 'blue'
            },
            {
              title: 'Access Controls',
              description: 'Strict access controls ensure only authorized personnel can access your data.',
              icon: 'lock',
              color: 'green'
            },
            {
              title: 'Regular Audits',
              description: 'We conduct regular security audits and assessments to identify and address vulnerabilities.',
              icon: 'search',
              color: 'purple'
            },
            {
              title: 'Data Backup',
              description: 'Regular backups ensure your data is safe and can be recovered if needed.',
              icon: 'database',
              color: 'orange'
            }
          ],
          retention: {
            title: 'Data Retention',
            description: 'We retain your data only as long as necessary for the purposes outlined in this policy.',
            periods: [
              'Account data: Until account deletion or 3 years of inactivity',
              'Learning progress: 5 years for educational records',
              'Payment data: 7 years for tax and accounting purposes',
              'Analytics data: 2 years in anonymized form'
            ]
          }
        },
        
        // Cookies section
        cookies: {
          title: 'Cookies and Tracking',
          subtitle: 'How we use cookies and similar technologies',
          description: 'We use cookies and similar technologies to enhance your experience on our platform.',
          types: [
            {
              title: 'Essential Cookies',
              description: 'Required for basic platform functionality',
              examples: ['Authentication', 'Security', 'Load balancing'],
              canDisable: false
            },
            {
              title: 'Analytics Cookies',
              description: 'Help us understand how you use our platform',
              examples: ['Page views', 'Time spent', 'Feature usage'],
              canDisable: true
            },
            {
              title: 'Preference Cookies',
              description: 'Remember your settings and preferences',
              examples: ['Language settings', 'Theme preferences', 'Accessibility options'],
              canDisable: true
            },
            {
              title: 'Marketing Cookies',
              description: 'Used for targeted advertising (with consent)',
              examples: ['Ad personalization', 'Campaign tracking', 'Conversion measurement'],
              canDisable: true
            }
          ],
          management: {
            title: 'Cookie Management',
            description: 'You can control cookies through your browser settings or our cookie preferences center.',
            options: [
              'Accept all cookies',
              'Accept essential cookies only',
              'Customize cookie preferences',
              'Withdraw consent at any time'
            ]
          }
        },
        
        // Your Rights section
        yourRights: {
          title: 'Your Privacy Rights',
          subtitle: 'What you can do with your data',
          description: 'You have several rights regarding your personal information.',
          rights: [
            {
              title: 'Access',
              description: 'Request a copy of your personal data',
              icon: 'eye',
              color: 'blue'
            },
            {
              title: 'Correction',
              description: 'Update or correct inaccurate information',
              icon: 'edit',
              color: 'green'
            },
            {
              title: 'Deletion',
              description: 'Request deletion of your personal data',
              icon: 'trash',
              color: 'red'
            },
            {
              title: 'Portability',
              description: 'Export your data in a machine-readable format',
              icon: 'download',
              color: 'purple'
            },
            {
              title: 'Restriction',
              description: 'Limit how we process your data',
              icon: 'pause',
              color: 'orange'
            },
            {
              title: 'Objection',
              description: 'Object to certain types of data processing',
              icon: 'stop',
              color: 'yellow'
            }
          ]
        },
        
        // Contact section
        contact: {
          title: 'Contact Us',
          subtitle: 'Questions about your privacy?',
          description: 'If you have any questions about this Privacy Policy or your personal data, please contact us.',
          email: 'privacy@shikshanam.com',
          phone: '+91 98765 43210',
          address: '123 Wisdom Lane, Varanasi, Uttar Pradesh 221001, India',
          dataProtectionOfficer: {
            name: 'Dr. Priya Sharma',
            email: 'dpo@shikshanam.com',
            role: 'Data Protection Officer'
          }
        }
      }
    }],
    
    // Terms of Service data with all sections
    terms: [{
      id: 'terms',
      data: {
        // Hero section
        hero: {
          title: 'Terms of Service',
          subtitle: 'Please read these terms carefully',
          description: 'By using our platform, you agree to these terms and conditions.',
          lastUpdated: 'January 15, 2024',
          effectiveDate: 'January 15, 2024'
        },
        
        // Introduction section
        introduction: {
          title: 'Introduction',
          content: 'Welcome to Shikshanam. These Terms of Service ("Terms") govern your use of our educational platform and services. By accessing or using our platform, you agree to be bound by these Terms.',
          scope: 'These Terms apply to all users of our platform, including students, teachers, and visitors.'
        },
        
        // Acceptance section
        acceptance: {
          title: 'Acceptance of Terms',
          content: 'By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not use our platform.',
          requirements: [
            'You must be at least 13 years old to use our platform',
            'You must provide accurate and complete information',
            'You must comply with all applicable laws and regulations',
            'You must not violate any third-party rights'
          ]
        },
        
        // Use of Platform section
        useOfPlatform: {
          title: 'Use of Platform',
          subtitle: 'How you can use our services',
          description: 'You may use our platform for educational purposes in accordance with these Terms.',
          permittedUses: [
            'Access and view educational content',
            'Participate in courses and learning activities',
            'Interact with other students and teachers',
            'Download materials for personal use',
            'Share content with proper attribution'
          ],
          prohibitedUses: [
            'Violate any applicable laws or regulations',
            'Infringe on intellectual property rights',
            'Distribute malware or harmful code',
            'Attempt to gain unauthorized access',
            'Use the platform for commercial purposes without permission',
            'Harass, abuse, or harm other users',
            'Share false or misleading information'
          ]
        },
        
        // Intellectual Property section
        intellectualProperty: {
          title: 'Intellectual Property',
          subtitle: 'Ownership and use of content',
          description: 'All content on our platform is protected by copyright and other intellectual property laws.',
          ownership: {
            title: 'Our Content',
            description: 'We own or have licensed all content on our platform, including courses, videos, text, images, and software.',
            rights: [
              'All content is protected by copyright',
              'Unauthorized use is prohibited',
              'You may not copy, distribute, or modify our content',
              'You may not create derivative works without permission'
            ]
          },
          userContent: {
            title: 'Your Content',
            description: 'You retain ownership of content you create, but grant us certain rights to use it.',
            rights: [
              'You retain ownership of your original content',
              'You grant us a license to use your content on our platform',
              'You are responsible for ensuring you have the right to share content',
              'You must not share content that infringes on others\' rights'
            ]
          }
        },
        
        // User Accounts section
        userAccounts: {
          title: 'User Accounts',
          subtitle: 'Account creation and management',
          description: 'You are responsible for maintaining the security of your account.',
          requirements: [
            'Provide accurate and complete information',
            'Keep your login credentials secure',
            'Notify us immediately of any unauthorized access',
            'You are responsible for all activities under your account'
          ],
          termination: {
            title: 'Account Termination',
            description: 'We may terminate your account for violations of these Terms.',
            reasons: [
              'Violation of these Terms',
              'Fraudulent or illegal activity',
              'Abuse of other users',
              'Inactivity for extended periods'
            ]
          }
        },
        
        // Payment Terms section
        paymentTerms: {
          title: 'Payment Terms',
          subtitle: 'Fees and payment policies',
          description: 'Payment terms for our premium services and courses.',
          fees: [
            'Course fees are clearly displayed before purchase',
            'All fees are non-refundable unless otherwise stated',
            'We may change fees with 30 days notice',
            'Payment is required before accessing premium content'
          ],
          refunds: {
            title: 'Refund Policy',
            description: 'Our refund policy for course purchases.',
            conditions: [
              'Refunds are available within 7 days of purchase',
              'Refunds are not available for completed courses',
              'Refunds are processed within 5-10 business days',
              'Contact support for refund requests'
            ]
          }
        },
        
        // Privacy section
        privacy: {
          title: 'Privacy',
          subtitle: 'How we handle your information',
          description: 'Your privacy is important to us. Please review our Privacy Policy for details.',
          keyPoints: [
            'We collect and use your information as described in our Privacy Policy',
            'You can control your privacy settings in your account',
            'We do not sell your personal information to third parties',
            'We implement security measures to protect your data'
          ]
        },
        
        // Limitation of Liability section
        limitationOfLiability: {
          title: 'Limitation of Liability',
          subtitle: 'Our liability is limited',
          description: 'We provide our platform "as is" and our liability is limited as described below.',
          limitations: [
            'We are not liable for any indirect, incidental, or consequential damages',
            'Our total liability is limited to the amount you paid for our services',
            'We do not guarantee uninterrupted or error-free service',
            'We are not responsible for third-party content or services'
          ],
          disclaimers: [
            'We make no warranties about the accuracy or completeness of content',
            'We do not guarantee that our platform will meet your requirements',
            'We are not responsible for any loss of data or information',
            'We do not guarantee the availability of our platform'
          ]
        },
        
        // Indemnification section
        indemnification: {
          title: 'Indemnification',
          subtitle: 'You agree to indemnify us',
          description: 'You agree to defend and indemnify us against certain claims.',
          scope: 'You agree to indemnify and hold harmless Shikshanam from any claims, damages, or expenses arising from your use of our platform or violation of these Terms.'
        },
        
        // Dispute Resolution section
        disputeResolution: {
          title: 'Dispute Resolution',
          subtitle: 'How we resolve disputes',
          description: 'We prefer to resolve disputes through negotiation and mediation.',
          process: [
            'First, contact us to discuss the issue',
            'We will attempt to resolve the matter through negotiation',
            'If negotiation fails, we may use mediation',
            'As a last resort, disputes may be resolved through arbitration'
          ],
          governingLaw: 'These Terms are governed by the laws of India.'
        },
        
        // Changes to Terms section
        changesToTerms: {
          title: 'Changes to Terms',
          subtitle: 'We may update these terms',
          description: 'We may update these Terms from time to time.',
          process: [
            'We will notify you of significant changes',
            'Changes will be posted on our platform',
            'Continued use constitutes acceptance of new terms',
            'You may terminate your account if you disagree with changes'
          ]
        },
        
        // Contact section
        contact: {
          title: 'Contact Us',
          subtitle: 'Questions about these terms?',
          description: 'If you have any questions about these Terms, please contact us.',
          email: 'legal@shikshanam.com',
          phone: '+91 98765 43210',
          address: '123 Wisdom Lane, Varanasi, Uttar Pradesh 221001, India'
        }
      }
    }],
    
    // Help Center data with all sections
    help: [{
      id: 'help',
      data: {
        // Hero section
        hero: {
          title: 'Help Center',
          subtitle: 'Find answers to your questions',
          description: 'Browse our comprehensive help resources to get the support you need.',
          searchPlaceholder: 'Search for help articles, tutorials, and FAQs...',
          popularTopics: [
            'How to enroll in a course',
            'Payment and billing',
            'Technical issues',
            'Account settings'
          ]
        },
        
        // Categories section
        categories: {
          title: 'Help Categories',
          subtitle: 'Browse by topic',
          description: 'Find help organized by common topics and issues.',
          categories: [
            {
              name: 'Getting Started',
              description: 'New to our platform? Start here.',
              icon: 'play-circle',
              color: 'blue',
              articleCount: 12,
              faqs: [
                {
                  question: 'How do I create an account?',
                  answer: 'Click the "Sign Up" button in the top right corner and follow the registration process. You\'ll need to provide your name, email, and create a password.',
                  category: 'Account'
                },
                {
                  question: 'How do I enroll in a course?',
                  answer: 'Browse our courses and click "Enroll" on any course you\'re interested in. You\'ll be redirected to the payment page if the course is paid.',
                  category: 'Enrollment'
                },
                {
                  question: 'What do I need to get started?',
                  answer: 'All you need is a computer or mobile device with internet access. No special software is required.',
                  category: 'Requirements'
                }
              ]
            },
            {
              name: 'Technical Support',
              description: 'Having technical issues? We\'re here to help.',
              icon: 'wrench',
              color: 'green',
              articleCount: 18,
              faqs: [
                {
                  question: 'The video is not playing',
                  answer: 'Check your internet connection and try refreshing the page. If the problem persists, try using a different browser.',
                  category: 'Video'
                },
                {
                  question: 'I can\'t access my course',
                  answer: 'Make sure you\'re logged in and the course is enrolled. Check your internet connection and try clearing your browser cache.',
                  category: 'Access'
                },
                {
                  question: 'The page is loading slowly',
                  answer: 'This could be due to a slow internet connection. Try closing other tabs and applications to free up bandwidth.',
                  category: 'Performance'
                }
              ]
            },
            {
              name: 'Payment & Billing',
              description: 'Questions about payments and subscriptions.',
              icon: 'credit-card',
              color: 'purple',
              articleCount: 8,
              faqs: [
                {
                  question: 'What payment methods do you accept?',
                  answer: 'We accept credit cards, debit cards, UPI, and net banking. All payments are processed securely.',
                  category: 'Payment Methods'
                },
                {
                  question: 'How do I get a refund?',
                  answer: 'Refunds are available within 7 days of purchase. Contact our support team with your order details.',
                  category: 'Refunds'
                },
                {
                  question: 'Is my payment information secure?',
                  answer: 'Yes, all payment information is encrypted and processed securely. We never store your full payment details.',
                  category: 'Security'
                }
              ]
            },
            {
              name: 'Account & Profile',
              description: 'Manage your account and profile settings.',
              icon: 'user',
              color: 'orange',
              articleCount: 10,
              faqs: [
                {
                  question: 'How do I change my password?',
                  answer: 'Go to your account settings and click on "Change Password". You\'ll need to enter your current password first.',
                  category: 'Security'
                },
                {
                  question: 'Can I change my email address?',
                  answer: 'Yes, you can change your email address in your account settings. You\'ll need to verify the new email address.',
                  category: 'Profile'
                },
                {
                  question: 'How do I delete my account?',
                  answer: 'Contact our support team to request account deletion. This action cannot be undone.',
                  category: 'Account Management'
                }
              ]
            }
          ]
        },
        
        // Tutorials section
        tutorials: {
          title: 'Video Tutorials',
          subtitle: 'Step-by-step guides',
          description: 'Watch our video tutorials to learn how to use our platform effectively.',
          tutorials: [
            {
              title: 'How to Navigate the Platform',
              description: 'Learn the basics of using our learning management system',
              duration: '5 minutes',
              difficulty: 'Beginner',
              link: '/tutorials/navigation',
              thumbnail: '/images/tutorials/navigation.jpg',
              views: 1250
            },
            {
              title: 'Setting Up Your Profile',
              description: 'Customize your learning experience and preferences',
              duration: '3 minutes',
              difficulty: 'Beginner',
              link: '/tutorials/profile-setup',
              thumbnail: '/images/tutorials/profile-setup.jpg',
              views: 980
            },
            {
              title: 'Enrolling in Courses',
              description: 'Step-by-step guide to enrolling in courses',
              duration: '4 minutes',
              difficulty: 'Beginner',
              link: '/tutorials/enrollment',
              thumbnail: '/images/tutorials/enrollment.jpg',
              views: 2100
            },
            {
              title: 'Using the Mobile App',
              description: 'Learn how to use our mobile application',
              duration: '6 minutes',
              difficulty: 'Beginner',
              link: '/tutorials/mobile-app',
              thumbnail: '/images/tutorials/mobile-app.jpg',
              views: 1750
            }
          ]
        },
        
        // Support section
        support: {
          title: 'Contact Support',
          subtitle: 'We\'re here to help',
          description: 'Can\'t find what you\'re looking for? Contact our support team.',
          contactMethods: [
            {
              title: 'Email Support',
              description: 'Get help via email',
              contact: 'support@shikshanam.com',
              responseTime: 'Within 24 hours',
              icon: 'mail',
              color: 'blue'
            },
            {
              title: 'Phone Support',
              description: 'Speak with our support team',
              contact: '+91 98765 43210',
              responseTime: 'Immediate',
              icon: 'phone',
              color: 'green'
            },
            {
              title: 'Live Chat',
              description: 'Chat with us in real-time',
              contact: 'Available on our website',
              responseTime: 'Immediate',
              icon: 'message-circle',
              color: 'purple'
            }
          ],
          hours: {
            title: 'Support Hours',
            description: 'When our support team is available',
            schedule: [
              'Monday - Friday: 9 AM - 6 PM IST',
              'Saturday: 10 AM - 4 PM IST',
              'Sunday: Closed',
              'Holidays: Limited support'
            ]
          }
        },
        
        // Community section
        community: {
          title: 'Community Support',
          subtitle: 'Help from fellow learners',
          description: 'Connect with other students and get help from the community.',
          forums: [
            {
              title: 'General Discussion',
              description: 'General questions and discussions',
              memberCount: 2500,
              recentPosts: 15,
              link: '/community/general'
            },
            {
              title: 'Technical Help',
              description: 'Technical issues and solutions',
              memberCount: 1800,
              recentPosts: 8,
              link: '/community/technical'
            },
            {
              title: 'Course Discussions',
              description: 'Discuss specific courses and topics',
              memberCount: 3200,
              recentPosts: 22,
              link: '/community/courses'
            }
          ]
        }
      }
    }],
    
    // Wisdom data
    wisdom: [{
      id: 'wisdom',
      data: {
        title: 'Wisdom Articles',
        subtitle: 'Ancient insights for modern life',
        description: 'Explore our collection of articles on spirituality, philosophy, and traditional wisdom.',
        categories: [
          {
            name: 'Spiritual Philosophy',
            articles: [
              {
                title: 'The Essence of Dharma',
                excerpt: 'Understanding the fundamental principles of righteous living',
                author: 'Dr. Vishal Chaurasia',
                readTime: '8 min',
                link: '/articles/essence-of-dharma'
              }
            ]
          },
          {
            name: 'Meditation & Mindfulness',
            articles: [
              {
                title: 'Breathing Techniques for Inner Peace',
                excerpt: 'Simple practices for daily mindfulness',
                author: 'Dr. Priya Sharma',
                readTime: '6 min',
                link: '/articles/breathing-techniques'
              }
            ]
          }
        ],
        featured: [
          {
            title: 'The Path of Self-Discovery',
            excerpt: 'A journey through ancient wisdom and modern insights',
            author: 'Dr. Vishal Chaurasia',
            readTime: '12 min',
            image: '/images/wisdom/self-discovery.jpg',
            link: '/articles/path-of-self-discovery'
          }
        ]
      }
    }],
    
    // Gurus data
    gurus: [{
      id: 'gurus',
      data: {
        title: 'Meet Our Gurus',
        subtitle: 'Learn from spiritual masters and scholars',
        description: 'Our platform features teachings from renowned spiritual teachers and scholars.',
        featured: [
          {
            name: 'Dr. Vishal Chaurasia',
            title: 'Founder & Spiritual Guide',
            bio: 'Renowned scholar in Sanskrit and ancient Indian philosophy with over 20 years of teaching experience.',
            specialties: ['Sanskrit', 'Vedanta', 'Yoga Philosophy', 'Meditation'],
            image: '/images/gurus/vishal.jpg',
            courses: ['Tantra Darshan', 'Yoga Philosophy', 'Sanskrit Basics'],
            rating: 4.9,
            students: '5000+'
          },
          {
            name: 'Dr. Priya Sharma',
            title: 'Academic Director',
            bio: 'Expert in Vedic studies and traditional education with a focus on women\'s spiritual development.',
            specialties: ['Vedic Studies', 'Women\'s Spirituality', 'Traditional Education'],
            image: '/images/gurus/priya.jpg',
            courses: ['Vedic Wisdom', 'Women\'s Spirituality', 'Traditional Education'],
            rating: 4.8,
            students: '3000+'
          }
        ],
        allGurus: [
          {
            name: 'Swami Ananda',
            title: 'Meditation Master',
            specialties: ['Meditation', 'Mindfulness', 'Spiritual Practice'],
            courses: ['Meditation Basics', 'Advanced Meditation'],
            rating: 4.7,
            students: '2000+'
          }
        ]
      }
    }],
    
    // Tools data
    tools: [{
      id: 'tools',
      data: {
        title: 'Spiritual Tools',
        subtitle: 'Enhance your spiritual journey',
        description: 'Discover our collection of spiritual tools, calculators, and assessments.',
        categories: [
          {
            name: 'Calculators',
            tools: [
              {
                title: 'Chakra Calculator',
                description: 'Calculate your dominant chakra based on birth date',
                link: '/tools/chakra-calculator',
                icon: 'lotus'
              },
              {
                title: 'Mantra Generator',
                description: 'Generate personalized mantras for meditation',
                link: '/tools/mantra-generator',
                icon: 'om'
              }
            ]
          },
          {
            name: 'Assessments',
            tools: [
              {
                title: 'Spiritual Readiness Assessment',
                description: 'Evaluate your spiritual development level',
                link: '/tools/spiritual-assessment',
                icon: 'compass'
              },
              {
                title: 'Meditation Progress Tracker',
                description: 'Track your meditation practice and progress',
                link: '/tools/meditation-tracker',
                icon: 'chart'
              }
            ]
          }
        ],
        featured: [
          {
            title: 'Guna Profiler',
            description: 'Discover your dominant guna (sattva, rajas, tamas)',
            link: '/tools/guna-profiler',
            icon: 'balance',
            popular: true
          }
        ]
      }
    }],
    
    // Blog data
    blog: [{
      id: 'blog',
      data: {
        title: 'Blog',
        subtitle: 'Latest insights and updates',
        description: 'Stay updated with our latest articles, course announcements, and spiritual insights.',
        categories: [
          {
            name: 'Spiritual Insights',
            posts: [
              {
                title: 'The Power of Morning Meditation',
                excerpt: 'How starting your day with meditation can transform your life',
                author: 'Dr. Vishal Chaurasia',
                date: '2024-01-15',
                readTime: '5 min',
                link: '/blog/morning-meditation'
              }
            ]
          },
          {
            name: 'Course Updates',
            posts: [
              {
                title: 'New Course: Advanced Sanskrit Grammar',
                excerpt: 'Master the complexities of Sanskrit grammar with our new course',
                author: 'Dr. Priya Sharma',
                date: '2024-01-14',
                readTime: '3 min',
                link: '/blog/advanced-sanskrit-grammar'
              }
            ]
          }
        ],
        featured: [
          {
            title: 'The Future of Spiritual Education',
            excerpt: 'How technology is revolutionizing the way we learn ancient wisdom',
            author: 'Dr. Vishal Chaurasia',
            date: '2024-01-12',
            readTime: '8 min',
            image: '/images/blog/future-education.jpg',
            link: '/blog/future-spiritual-education'
          }
        ],
        tags: ['meditation', 'sanskrit', 'yoga', 'philosophy', 'spirituality', 'education']
      }
    }],
    
    // Schools data
    schools: [{
      id: 'schools',
      data: {
        title: 'Our Schools',
        subtitle: 'Structured learning paths for every journey',
        description: 'Explore our specialized schools, each focusing on different aspects of spiritual and traditional education.',
        featured: [
          {
            name: 'School of Sanskrit',
            description: 'Master the language of the gods',
            icon: 'book',
            link: '/schools/sanskrit',
            color: 'blue',
            courses: ['Sanskrit Basics', 'Advanced Grammar', 'Vedic Literature'],
            students: '2000+',
            rating: 4.8
          },
          {
            name: 'School of Darshan',
            description: 'Explore the six classical schools of Indian philosophy',
            icon: 'lightbulb',
            link: '/schools/darshan',
            color: 'purple',
            courses: ['Nyaya', 'Vaisheshika', 'Samkhya', 'Yoga', 'Mimamsa', 'Vedanta'],
            students: '1500+',
            rating: 4.7
          },
          {
            name: 'School of Life Skills',
            description: 'Practical wisdom for modern living',
            icon: 'heart',
            link: '/schools/life-skills',
            color: 'green',
            courses: ['Mindfulness', 'Ethics', 'Leadership', 'Wellness'],
            students: '3000+',
            rating: 4.9
          }
        ],
        allSchools: [
          {
            name: 'School of Yoga',
            description: 'Physical and spiritual practice',
            courses: ['Hatha Yoga', 'Raja Yoga', 'Bhakti Yoga'],
            students: '1000+',
            rating: 4.6
          }
        ]
      }
    }]
  };
};
