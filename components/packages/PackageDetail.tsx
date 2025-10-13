'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PackageDetailProps } from '@/lib/types/packages';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  Users, 
  Award, 
  BookOpen, 
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth/AuthContext';
import { SSOLoginModal } from '@/components/auth/SSOLoginModal';

export function PackageDetail({ 
  package: pkg, 
  sessions = [], 
  onBuy, 
  onClaimSeat 
}: PackageDetailProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedTestimonials, setExpandedTestimonials] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const { isLoggedIn } = useAuth();

  const savings = pkg.originalPriceInr ? pkg.originalPriceInr - pkg.priceInr : 0;
  const savingsPercent = pkg.originalPriceInr ? Math.round((savings / pkg.originalPriceInr) * 100) : 0;

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const toggleTestimonials = () => {
    setExpandedTestimonials(!expandedTestimonials);
  };

  const handleBuyClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    onBuy(pkg.sku);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    onBuy(pkg.sku);
  };

  return (
    <div className="min-h-screen bg-parchment-ivory">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-saffron-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                {pkg.name}
              </h1>
              <p className="text-xl text-slate-600 mb-6">
                {pkg.shortDescription}
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-saffron-600">
                    ₹{pkg.priceInr.toLocaleString()}
                  </span>
                  {pkg.originalPriceInr && pkg.originalPriceInr > pkg.priceInr && (
                    <span className="text-xl text-slate-400 line-through">
                      ₹{pkg.originalPriceInr.toLocaleString()}
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <Badge className="bg-emerald-600 text-white font-semibold px-3 py-1">
                    Save ₹{savings.toLocaleString()} ({savingsPercent}%)
                  </Badge>
                )}
              </div>

              <Button
                size="lg"
                className="bg-saffron-600 hover:bg-saffron-700 text-white px-8 py-3 text-lg"
                onClick={handleBuyClick}
                aria-label={`Buy ${pkg.name} for ₹${pkg.priceInr.toLocaleString()}`}
              >
                Buy Now
              </Button>
            </div>

            {pkg.thumbnailUrl && (
              <div className="relative">
                <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-saffron-50 to-amber-50">
                  <Image
                    src={pkg.thumbnailUrl}
                    alt={pkg.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-saffron-600" />
                  About This Package
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none">
                  {pkg.longDescription.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Included Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-saffron-600" />
                  Included Courses ({pkg.includedCourses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pkg.includedCourses.map((course, index) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-saffron-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-saffron-600">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800">{course.title}</h4>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.duration}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-saffron-400 text-saffron-600 hover:bg-saffron-50"
                        onClick={() => window.open(course.link, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Course
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Sessions */}
            {sessions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-saffron-600" />
                    Upcoming Live Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-saffron-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-saffron-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{session.title}</h4>
                            <p className="text-sm text-slate-500">
                              {new Date(session.date).toLocaleDateString('en-IN', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            <p className="text-sm text-slate-500">
                              {session.seatRemaining} of {session.maxSeats} seats remaining
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-saffron-600 hover:bg-saffron-700 text-white"
                          onClick={() => onClaimSeat?.(session.id)}
                          disabled={session.seatRemaining === 0}
                        >
                          {session.seatRemaining === 0 ? 'Seats Full' : 'Claim Seat'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* FAQ */}
            {pkg.faq && pkg.faq.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pkg.faq.map((item, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg">
                        <button
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                          onClick={() => toggleFaq(index)}
                        >
                          <span className="font-medium text-slate-800">{item.question}</span>
                          {expandedFaq === index ? (
                            <ChevronUp className="h-5 w-5 text-slate-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-500" />
                          )}
                        </button>
                        {expandedFaq === index && (
                          <div className="px-4 pb-4">
                            <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Testimonials */}
            {pkg.testimonials && pkg.testimonials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>What Students Say</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pkg.testimonials.slice(0, expandedTestimonials ? undefined : 2).map((testimonial) => (
                      <div key={testimonial.id} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          {testimonial.avatarUrl && (
                            <Image
                              src={testimonial.avatarUrl}
                              alt={testimonial.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          )}
                          <div>
                            <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "w-4 h-4",
                                    i < testimonial.rating ? "text-yellow-400" : "text-slate-300"
                                  )}
                                >
                                  ★
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600 italic">"{testimonial.content}"</p>
                      </div>
                    ))}
                    {pkg.testimonials.length > 2 && (
                      <Button
                        variant="outline"
                        onClick={toggleTestimonials}
                        className="w-full"
                      >
                        {expandedTestimonials ? 'Show Less' : `Show ${pkg.testimonials.length - 2} More`}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Package Features */}
            <Card>
              <CardHeader>
                <CardTitle>Package Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pkg.livePassCount && pkg.livePassCount > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{pkg.livePassCount} Live Sessions</p>
                      <p className="text-sm text-slate-500">Interactive learning with experts</p>
                    </div>
                  </div>
                )}

                {pkg.mentorHours && pkg.mentorHours > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{pkg.mentorHours} Hours Mentoring</p>
                      <p className="text-sm text-slate-500">One-on-one guidance</p>
                    </div>
                  </div>
                )}

                {pkg.certificateIncluded && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Award className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Certificate Included</p>
                      <p className="text-sm text-slate-500">Verified completion certificate</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-saffron-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-saffron-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{pkg.includedCourses.length} Courses</p>
                    <p className="text-sm text-slate-500">Comprehensive curriculum</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            {pkg.prerequisites && pkg.prerequisites.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pkg.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Buy Button */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-saffron-600">
                      ₹{pkg.priceInr.toLocaleString()}
                    </span>
                    {pkg.originalPriceInr && pkg.originalPriceInr > pkg.priceInr && (
                      <span className="text-lg text-slate-400 line-through ml-2">
                        ₹{pkg.originalPriceInr.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-saffron-600 hover:bg-saffron-700 text-white"
                    onClick={handleBuyClick}
                  >
                    Buy Now
                  </Button>
                  <p className="text-xs text-slate-500 mt-2">
                    Lifetime access • 30-day money-back guarantee
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <SSOLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
