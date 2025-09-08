'use client';

export default function TeacherSection() {
  const socialStats = [
    { platform: "YouTube", count: "2M", label: "Subscribers" },
    { platform: "Instagram", count: "50K", label: "Followers" },
    { platform: "Facebook", count: "30K", label: "Followers" }
  ];

  return (
    <section id="teacher-section" className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair text-white mb-4">Meet your Guru!</h2>
          <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Teacher Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-2xl p-8">
              <div className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="w-32 h-32 bg-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-white font-bold">विशाल</span>
                </div>
                <h3 className="text-2xl font-playfair text-white mb-2">विशाल चौरसिया</h3>
                <p className="text-pink-400 font-semibold mb-4">Graduate, IIT Patna</p>
                <div className="text-gray-300 text-sm leading-relaxed">
                  शिक्षणम् के संस्थापक विशाल जी एक IIT स्नातक हैं जो 2016-2023 तक भारत की एक शीर्ष PSU में सरकारी पद पर कार्यरत थे परंतु भारतीय प्राचीन ज्ञान के प्रति रुझान के चलते, उन्होनें इसी क्षेत्र में कार्य करने का निर्णय लिया ।
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Details */}
          <div className="space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-playfair text-white mb-4">About the Teacher</h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                भारतीय दर्शनों के साथ साथ आध्यात्मिक और धार्मिक विषयों को वैज्ञानिक दृष्टिकोण से जन जन तक पहुँचने हेतु Hyper Quest चैनल का निर्माण किया जो भारत के शीर्ष यूट्यूब चैनलों में से एक है ।
              </p>
              <p className="text-gray-300 leading-relaxed">
                विशाल जी के माध्यम से सनातन ज्ञान आज लगभग 2 million श्रोताओं तक पहुँच रहा है जिनमें प्रवासी भारतीय भी सम्मिलित हैं ।
              </p>
            </div>

            {/* Social Stats */}
            <div className="grid grid-cols-3 gap-4">
              {socialStats.map((stat, index) => (
                <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-pink-500 mb-1">{stat.count}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-pink-500/10 to-pink-600/10 border border-pink-500/30 rounded-lg p-6">
              <h4 className="text-lg font-playfair text-white mb-3">Mission</h4>
              <p className="text-gray-300 leading-relaxed">
                संक्षेप में, विशाल जी का लक्ष्य दर्शन और विज्ञान को मनोरंजक और आधुनिक विधाओं के माध्यम से सभी के लिए उपयोगी बनाना है ।
              </p>
            </div>

            {/* Featured In */}
            <div className="text-center">
              <h4 className="text-lg font-playfair text-white mb-4">Featured in:</h4>
              <div className="flex justify-center items-center gap-4 text-gray-400">
                <span>• IIT Patna Alumni</span>
                <span>• Top PSU Executive</span>
                <span>• YouTube Creator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
