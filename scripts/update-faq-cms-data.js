const fs = require('fs');
const path = require('path');

// Function to update FAQ data in CMS
async function updateFaqCmsData() {
  console.log('🔄 Updating FAQ data in CMS...');
  
  try {
    // Read current homepage content
    const homepageContentPath = path.join(process.cwd(), 'data', 'homepage-content.json');
    const homepageContent = JSON.parse(fs.readFileSync(homepageContentPath, 'utf8'));
    
    // Update FAQ section with correct data
    homepageContent.faq = {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our courses, platform, and learning experience.",
      description: "Get answers to the most commonly asked questions about our platform and courses.",
      questions: [
        {
          id: "faq-1",
          question: "How do I sign up?",
          answer: "To signup simply click on Login. A popup will appear. Click on signup. The next screen will prompt you to enter your details such as name, email and password, fill all the details and click next. Your account will be created. Alternatively, you can also use your google account to signup on our platform."
        },
        {
          id: "faq-2",
          question: "What is the validity of the course?",
          answer: "All of our courses come with lifetime validity. You just have to pay for them once and you can access them as long as you want."
        },
        {
          id: "faq-3",
          question: "Are there any prerequisites for taking this course?",
          answer: "No, there are no prerequisites for enrolling in this course. Anyone with a curiosity for the Ancient Hindu Philosophy is welcome to join."
        },
        {
          id: "faq-4",
          question: "How can I access the courses after purchasing them?",
          answer: "Courses once purchased can be accessed either through the Dashboard section. You will have to login on the platform first to get access to all your purchased courses. You can also use our android app to access all the courses."
        },
        {
          id: "faq-5",
          question: "Can I download course content?",
          answer: "Yes, you can download course lectures on single device using our mobile app. Click here to download our mobile app."
        },
        {
          id: "faq-6",
          question: "How do I contact customer support?",
          answer: "In case of any difficulties technical or non-technical our team can be reached out at support@shikshanam.in"
        },
        {
          id: "faq-7",
          question: "I am unable to access the Course, what should I do?",
          answer: "Please check whether you are using the same email, which was used for purchasing the course. Check for the course in your Dashboard section. If the course is still not available, please drop an email to support@shikshanam.in"
        },
        {
          id: "faq-8",
          question: "After payments, can I get a refund?",
          answer: "You can view our complimentary demo videos and thoroughly review all the provided information and reviews before making a purchase. We do not currently offer refunds."
        }
      ]
    };
    
    // Save updated content
    fs.writeFileSync(homepageContentPath, JSON.stringify(homepageContent, null, 2));
    
    console.log('✅ Successfully updated FAQ data in CMS');
    console.log(`📁 Data written to: ${homepageContentPath}`);
    
    // Log summary
    console.log('\n📊 FAQ Data Summary:');
    console.log(`- Title: ${homepageContent.faq.title}`);
    console.log(`- Subtitle: ${homepageContent.faq.subtitle}`);
    console.log(`- Questions: ${homepageContent.faq.questions.length}`);
    
    console.log('\n🎉 FAQ CMS data updated successfully!');
    console.log('💡 The FAQ section now matches the frontend content.');
    
    return homepageContent;
  } catch (error) {
    console.error('❌ Error updating FAQ CMS data:', error);
    return null;
  }
}

// Run the update
if (require.main === module) {
  updateFaqCmsData();
}

module.exports = { updateFaqCmsData };
