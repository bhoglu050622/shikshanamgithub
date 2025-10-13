'use client';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Student Feedback",
      text: "Testimonial Image 1"
    },
    {
      name: "Student Feedback",
      text: "Testimonial Image 2"
    },
    {
      name: "Student Feedback",
      text: "Testimonial Image 3"
    },
    {
      name: "Student Feedback",
      text: "Testimonial Image 4"
    },
    {
      name: "Student Feedback",
      text: "Testimonial Image 5"
    },
    {
      name: "Student Feedback",
      text: "Testimonial Image 6"
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
            Here's what our students are saying about the course!
          </h2>
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
              <div className="aspect-square bg-saffron-100 rounded-lg flex items-center justify-center mb-4">
                <p className="text-saffron-700 font-medium">{testimonial.text}</p>
              </div>
              <p className="text-center text-saffron-800 font-semibold">{testimonial.name}</p>
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
              <h4 className="font-semibold text-saffron-800 mb-1">1-Year Access</h4>
              <p className="text-sm text-saffron-700">Learn at your own pace with permanent access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
