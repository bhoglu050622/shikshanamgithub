'use client';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: "🧘‍♂️",
      title: "अपने अस्तित्व को गहराई से समझ पाएंगे",
      english: "Understand your existence deeply"
    },
    {
      icon: "🌟",
      title: "पाखंड-रहित आध्यात्मिक विकास कर पाएंगे",
      english: "Achieve authentic spiritual development"
    },
    {
      icon: "🌌",
      title: "ब्रह्मांड और आत्मा के सम्बन्धों का ज्ञान होगा",
      english: "Gain knowledge of universe-soul relationships"
    },
    {
      icon: "☮️",
      title: "आंतरिक सुख और शांति की अनुभव करेंगे",
      english: "Experience inner happiness and peace"
    }
  ];

  const whyStudyUpanishads = [
    {
      icon: "🔬",
      title: "Scientific Approach",
      description: "Upanishads connect you to the true scientific form of Sanatan Dharma, away from superstitions, miracles, magic, and other hypocrisies."
    },
    {
      icon: "🌱",
      title: "Personal Development",
      description: "The study of Upanishads gives rise to a feeling of inner peace and completeness along with personal development in this confusing life."
    },
    {
      icon: "❓",
      title: "Answers to Life's Questions",
      description: "Upanishads answer difficult questions arising from topics like life, death, karma, universe, world, Atman, etc."
    }
  ];

  return (
    <section id="benefits-section" className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        {/* Course Benefits */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair text-white mb-4">
            इस कोर्स के बाद आप किस योग्य होंगे ?
          </h2>
          <div className="w-24 h-1 bg-pink-500 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-8 hover:border-pink-500 transition-colors duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-playfair text-white mb-3">{benefit.title}</h3>
              <p className="text-pink-400 font-medium">{benefit.english}</p>
            </div>
          ))}
        </div>

        {/* Why Study Upanishads */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair text-white mb-4">
            उपनिषदों का अध्ययन क्यों करें?
          </h2>
          <div className="w-24 h-1 bg-pink-500 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyStudyUpanishads.map((item, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border border-pink-500/30 rounded-lg p-8 text-center hover:border-pink-400 transition-colors duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-playfair text-white mb-4">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-playfair text-white mb-6">
            आप भी बढ़ाएँ ज्ञान की ओर कदम !
          </h3>
          <a 
            href="https://shikshanam.in/isha-upanishad-course/#:~:text=Enroll%20now"
            rel="noopener noreferrer"
          >
            <button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg animate-button-bob">
              Join and Learn Today!
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
