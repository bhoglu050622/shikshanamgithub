#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Paths
const dataDir = path.join(__dirname, '..', 'data');
const importedDataPath = path.join(dataDir, 'cms-imported', 'complete-cms-data.json');
const homepageContentPath = path.join(dataDir, 'homepage-content.json');

console.log('🚀 Starting CMS data population...');

try {
  // Read the imported data
  if (!fs.existsSync(importedDataPath)) {
    console.error('❌ Imported data file not found:', importedDataPath);
    process.exit(1);
  }

  const importedData = JSON.parse(fs.readFileSync(importedDataPath, 'utf8'));
  console.log('✅ Loaded imported data');

  // Transform the data to match the CMS structure
  const cmsData = {
    hero: {
      title: importedData.homepage?.hero?.title || "Welcome to Shikshanam",
      subtitle: importedData.homepage?.hero?.subtitle || "Where AI meets Ancient India",
      description: importedData.homepage?.hero?.description || "Preserving and sharing ancient Indian wisdom with the modern world",
      ctaButtons: {
        sanskrit: {
          text: "School of Sanskrit",
          link: "/schools/sanskrit"
        },
        darshan: {
          text: "School of Darshan",
          link: "/schools/darshana"
        },
        lifeSkills: {
          text: "School of Life Skills",
          link: "/schools/self-help"
        }
      }
    },
    alignYourself: {
      title: "Two Ways to Begin Your Journey!",
      subtitle: "Learn through interactive Live Classes, or walk your own path of Swadhyaya with Self-Paced Courses.",
      description: "Choose your learning path with our comprehensive educational offerings.",
      courses: importedData.homepage?.featuredCourses?.slice(0, 4).map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        link: course.url,
        icon: "book",
        category: course.category,
        type: course.type,
        instructor: course.instructor,
        duration: course.duration,
        price: course.price,
        level: course.level,
        image: course.image
      })) || [],
      liveClasses: importedData.homepage?.featuredCourses?.filter(course => course.type === 'live').slice(0, 3).map(course => ({
        id: course.id,
        title: course.title,
        instructor: course.instructor || "Expert Teacher",
        thumbnail: course.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
        duration: course.duration || "2 hours",
        date: "2024-01-15",
        time: "7:00 PM IST",
        price: course.price || "₹299",
        rating: 4.9,
        students: 120,
        link: course.url,
        description: course.description
      })) || [],
      selfPacedCourses: importedData.homepage?.featuredCourses?.filter(course => course.type === 'self-paced').slice(0, 3).map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
        duration: course.duration || "40 hours",
        modules: 12,
        price: course.price || "₹1,999",
        rating: 4.9,
        students: 1500,
        link: course.url,
        level: course.level || "Intermediate",
        instructor: course.instructor || "Dr. Expert"
      })) || []
    },
    schools: {
      title: "Explore Our Schools",
      subtitle: "Discover the ancient wisdom through our structured learning paths",
      description: "Our schools offer comprehensive learning paths in Sanskrit, philosophy, and life skills.",
      schools: importedData.homepage?.schools?.map(school => ({
        id: school.id,
        name: school.name,
        description: school.description,
        icon: "book",
        link: school.url,
        color: "primary"
      })) || [
        {
          id: "sanskrit",
          name: "School of Sanskrit",
          description: "Master the language of the Vedas",
          icon: "book",
          link: "/schools/sanskrit",
          color: "primary"
        },
        {
          id: "darshana",
          name: "School of Darshan",
          description: "Explore Indian philosophy",
          icon: "brain",
          link: "/schools/darshana",
          color: "secondary"
        },
        {
          id: "self-help",
          name: "School of Life Skills",
          description: "Develop practical life skills",
          icon: "heart",
          link: "/schools/self-help",
          color: "accent"
        }
      ]
    },
    meetGurus: {
      title: "Meet Our Gurus",
      subtitle: "Learn from authentic teachers of ancient wisdom",
      description: "Our experienced teachers guide you through the ancient wisdom traditions.",
      gurus: importedData.homepage?.instructors?.map(instructor => ({
        id: instructor.id,
        name: instructor.name,
        title: instructor.title,
        description: instructor.description,
        image: instructor.image,
        specialties: instructor.specialties || [],
        experience: instructor.experience || "10+ years"
      })) || []
    },
    studentStories: {
      title: "Student Stories",
      subtitle: "Hear from our community of learners",
      stories: importedData.homepage?.testimonials?.slice(0, 6).map((testimonial, index) => ({
        id: `story-${index + 1}`,
        name: testimonial.name,
        story: testimonial.content,
        image: testimonial.image,
        course: testimonial.course || "Sanskrit Course"
      })) || []
    },
    testimonials: {
      title: "What Our Students Say",
      subtitle: "Real experiences from our learning community",
      testimonials: importedData.homepage?.testimonials?.map((testimonial, index) => ({
        id: `testimonial-${index + 1}`,
        name: testimonial.name,
        content: testimonial.content,
        rating: testimonial.rating || 5,
        course: testimonial.course || "Sanskrit Course",
        image: testimonial.image
      })) || []
    },
    communityPosts: {
      title: "Community Insights",
      subtitle: "Latest thoughts and discussions from our community",
      posts: importedData.blog?.posts?.slice(0, 6).map((post, index) => ({
        id: `post-${index + 1}`,
        title: post.title,
        content: post.excerpt,
        author: post.author,
        date: post.date,
        image: post.image,
        link: post.url
      })) || []
    },
    foundersMission: {
      title: "Our Mission",
      subtitle: "Bridging ancient wisdom with modern learning",
      content: "We believe in making ancient Indian wisdom accessible to everyone through modern technology and pedagogy. Our mission is to preserve, share, and make relevant the timeless wisdom of ancient India for the modern world.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
      founderName: "Vishal Chaurasia",
      founderTitle: "Founder & CEO"
    },
    contribute: {
      title: "Contribute to Our Mission",
      subtitle: "Help us spread ancient wisdom",
      content: "Join our community of contributors and help preserve and share ancient knowledge. Whether you're a teacher, researcher, or passionate learner, there are many ways to contribute to our mission.",
      ctaText: "Get Involved",
      ctaLink: "/contribute"
    },
    downloadApp: {
      title: "Download Our App",
      subtitle: "Learn on the go with our mobile application",
      features: [
        {
          id: "offline",
          title: "Offline Learning",
          description: "Download content and learn anywhere",
          icon: "download"
        },
        {
          id: "progress",
          title: "Track Progress",
          description: "Monitor your learning journey",
          icon: "chart"
        },
        {
          id: "community",
          title: "Community Access",
          description: "Connect with fellow learners",
          icon: "users"
        }
      ],
      downloadLinks: {
        android: "https://play.google.com/store",
        ios: "https://apps.apple.com/store"
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions",
      description: "Get answers to the most commonly asked questions about our platform and courses.",
      questions: [
        {
          id: "1",
          question: "What is Shikshanam?",
          answer: "Shikshanam is a platform that combines AI with ancient Indian wisdom to provide modern learning experiences. We offer courses in Sanskrit, Indian philosophy, and life skills."
        },
        {
          id: "2",
          question: "How do I get started?",
          answer: "You can start by exploring our schools - Sanskrit, Darshan, or Life Skills. Choose a course that interests you and begin your learning journey."
        },
        {
          id: "3",
          question: "Are the courses live or self-paced?",
          answer: "We offer both live classes and self-paced courses. Live classes provide interactive learning with teachers, while self-paced courses allow you to learn at your own pace."
        },
        {
          id: "4",
          question: "Do I need prior knowledge?",
          answer: "No prior knowledge is required for most of our courses. We have beginner-friendly courses that start from the basics."
        }
      ]
    }
  };

  // Write the transformed data to homepage-content.json
  fs.writeFileSync(homepageContentPath, JSON.stringify(cmsData, null, 2));
  console.log('✅ Successfully populated CMS with frontend data');
  console.log('📁 Data written to:', homepageContentPath);
  
  // Show summary
  console.log('\n📊 Data Summary:');
  console.log(`- Hero section: ${cmsData.hero.title}`);
  console.log(`- Featured courses: ${cmsData.alignYourself.courses.length}`);
  console.log(`- Live classes: ${cmsData.alignYourself.liveClasses.length}`);
  console.log(`- Self-paced courses: ${cmsData.alignYourself.selfPacedCourses.length}`);
  console.log(`- Schools: ${cmsData.schools.schools.length}`);
  console.log(`- Gurus: ${cmsData.meetGurus.gurus.length}`);
  console.log(`- Student stories: ${cmsData.studentStories.stories.length}`);
  console.log(`- Testimonials: ${cmsData.testimonials.testimonials.length}`);
  console.log(`- Community posts: ${cmsData.communityPosts.posts.length}`);
  console.log(`- FAQ questions: ${cmsData.faq.questions.length}`);
  
  console.log('\n🎉 CMS data population completed successfully!');
  console.log('💡 You can now see rich frontend data in your CMS for easy editing.');

} catch (error) {
  console.error('❌ Error populating CMS data:', error);
  process.exit(1);
}
