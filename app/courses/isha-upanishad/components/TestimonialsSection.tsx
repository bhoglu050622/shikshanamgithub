'use client';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5,
      text: "This course transformed my understanding of spirituality. The way Vishal sir explains complex concepts in simple Hindi is remarkable. I now have a deeper connection with my spiritual practice."
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi, India", 
      rating: 5,
      text: "The Isha Upanishad course opened my eyes to the profound wisdom of our ancient texts. The quizzes and notes helped me retain the knowledge. Highly recommended for anyone seeking spiritual growth."
    },
    {
      name: "Anita Patel",
      location: "Ahmedabad, India",
      rating: 5,
      text: "As a beginner in spiritual studies, I was worried about understanding Sanskrit texts. But this course made everything so accessible. The certificate is a beautiful addition to my spiritual journey."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Enrolled" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "98%", label: "Completion Rate" },
    { number: "50+", label: "Countries Reached" }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-saffron-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-saffron-800 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-saffron-700 max-w-2xl mx-auto">
            Join thousands of spiritual seekers who have transformed their lives through this course
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-saffron-600 mb-2">{stat.number}</div>
              <div className="text-saffron-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-saffron-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-saffron-700 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-saffron-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-saffron-700 font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-saffron-800">{testimonial.name}</div>
                  <div className="text-sm text-saffron-600">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-lg p-8 shadow-md">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-saffron-800 mb-2">
              Trusted by Spiritual Seekers Worldwide
            </h3>
            <p className="text-saffron-700">
              Join a growing community of learners on their spiritual journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-saffron-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h4 className="font-semibold text-saffron-800 mb-1">Verified Learning</h4>
              <p className="text-sm text-saffron-700">Authentic spiritual education with certified instructors</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-saffron-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-saffron-800 mb-1">Global Community</h4>
              <p className="text-sm text-saffron-700">Connect with spiritual seekers from around the world</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-saffron-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h4 className="font-semibold text-saffron-800 mb-1">Lifetime Access</h4>
              <p className="text-sm text-saffron-700">Learn at your own pace with permanent access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
