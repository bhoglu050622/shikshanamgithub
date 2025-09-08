'use client';

export default function CourseInfoSection() {
  const features = [
    {
      icon: "📚",
      title: "Recorded Sessions",
      description: "3+ Hrs. of Content"
    },
    {
      icon: "📖",
      title: "All Shlokas Covered",
      description: "Complete 18 Shlokas"
    },
    {
      icon: "🔄",
      title: "Free Future Updates",
      description: "Lifetime Access"
    },
    {
      icon: "📝",
      title: "Quizzes & Notes",
      description: "Interactive Learning"
    },
    {
      icon: "⏰",
      title: "1yr Access",
      description: "Flexible Learning"
    },
    {
      icon: "🏆",
      title: "Certification",
      description: "Verified Certificate"
    },
    {
      icon: "💬",
      title: "Whatsapp Group",
      description: "Community Support"
    },
    {
      icon: "🎯",
      title: "Live QnA",
      description: "Direct Interaction"
    },
    {
      icon: "👥",
      title: "Community Access",
      description: "Peer Learning"
    }
  ];

  return (
    <section id="course-info-section" className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Pricing Card */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full text-2xl font-bold mb-4 animate-pulse">
            ₹999
          </div>
          <div className="text-gray-400 text-lg">
            <span className="line-through">M.R.P.- ₹1,799</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:border-pink-500 transition-colors duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-4xl font-bold text-pink-500 mb-2">1000+</div>
            <div className="text-gray-300">Students</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-4xl font-bold text-pink-500 mb-2">4.9</div>
            <div className="text-gray-300">Rating</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-4xl font-bold text-pink-500 mb-2">500+</div>
            <div className="text-gray-300">Positive Reviews</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a 
            href="https://shikshanam.in/isha-upanishad-course/#:~:text=Enroll%20now"
            rel="noopener noreferrer"
          >
            <button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg animate-button-bob">
              Enroll Now
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
