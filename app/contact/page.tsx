'use client';

import { Metadata } from 'next';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      details: ['support@shikshanam.com', 'info@shikshanam.com'],
      description: 'Send us an email anytime'
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Us',
      details: ['+91 XXX XXX XXXX'],
      description: 'Mon-Fri from 9am to 6pm IST'
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visit Us',
      details: ['India'],
      description: 'Come say hello at our office'
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Response Time',
      details: ['Within 24 hours'],
      description: 'We respond quickly'
    }
  ];

  const faqs = [
    {
      question: 'How can I enroll in a course?',
      answer: 'Simply browse our courses, select the one you\'re interested in, and click on the enrollment button. You\'ll be guided through the registration process.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 7-day money-back guarantee for all our courses. If you\'re not satisfied, contact our support team for a refund.'
    },
    {
      question: 'Can I access courses on mobile devices?',
      answer: 'Absolutely! Our platform is fully responsive and works seamlessly on all devices including smartphones and tablets.'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'YouTube', icon: '📹', url: '#' }
  ];

  return (
    <main className="main-container overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-saffron-50 via-white to-peacock-green-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-saffron-100 to-peacock-green-100 rounded-full">
            <span className="text-saffron-700 font-semibold text-sm tracking-wide uppercase">Let's Connect</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-saffron-600 to-peacock-green-600">Touch</span>
          </h1>
          <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have questions, feedback, or need support, our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-saffron-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="font-sans text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                <div className="space-y-1 mb-2">
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="font-sans text-saffron-600 font-medium">{detail}</p>
                  ))}
                </div>
                <p className="font-sans text-sm text-gray-500">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                <p className="font-sans text-gray-600 mb-8">Fill out the form below and we'll get back to you soon.</p>
                
                {formStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-green-900">Message sent successfully!</h4>
                      <p className="text-sm text-green-700">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all duration-200`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all duration-200`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all duration-200`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all duration-200"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all duration-200`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="course">Course Related</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback</option>
                    </select>
                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all duration-200 resize-none`}
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                    <p className="mt-2 text-sm text-gray-500">{formData.message.length} / 1000 characters</p>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="group relative w-full bg-gradient-to-r from-saffron-600 to-peacock-green-600 text-white font-bold py-4 px-8 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {formStatus === 'submitting' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-peacock-green-600 to-saffron-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Help */}
              <div className="bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-3xl p-8 text-white shadow-xl">
                <svg className="w-12 h-12 mb-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-sans text-2xl font-bold mb-3">Quick Help</h3>
                <p className="mb-6 opacity-95 leading-relaxed">
                  Need immediate assistance? Check our comprehensive Help Center for instant answers to common questions.
                </p>
                <a
                  href="/help"
                  className="inline-flex items-center bg-white text-saffron-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  Visit Help Center
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="font-sans text-xl font-bold text-gray-900 mb-4">Connect With Us</h3>
                <p className="text-gray-600 mb-6">Follow us on social media for updates, tips, and inspiration.</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-12 h-12 bg-gradient-to-br from-saffron-100 to-peacock-green-100 rounded-xl flex items-center justify-center text-xl hover:scale-110 hover:shadow-lg transition-all duration-300"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQs Preview */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="font-sans text-xl font-bold text-gray-900 mb-4">Common Questions</h3>
                <div className="space-y-4">
                  {faqs.slice(0, 2).map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="/help"
                  className="inline-flex items-center text-saffron-600 hover:text-saffron-700 font-medium mt-4"
                >
                  View all FAQs
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Additional Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-saffron-50 to-peacock-green-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            We're Here to Help You Succeed
          </h2>
          <p className="font-sans text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Your journey with ancient wisdom starts here. Whether you're just beginning or looking to deepen your practice, 
            our team is dedicated to supporting you every step of the way.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-sans text-lg font-bold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">Get help from experienced instructors and support staff</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-sans text-lg font-bold text-gray-900 mb-2">Fast Response</h3>
              <p className="text-gray-600 text-sm">We respond to all inquiries within 24 hours</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="font-sans text-lg font-bold text-gray-900 mb-2">100% Satisfaction</h3>
              <p className="text-gray-600 text-sm">We're committed to your learning success</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
