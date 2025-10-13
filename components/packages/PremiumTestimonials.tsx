'use client';

import React from 'react';
import { Star, Quote, MapPin, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location?: string;
  rating: number;
  text: string;
  course: string;
  image?: string;
  featured?: boolean;
}

interface PremiumTestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export function PremiumTestimonials({ 
  testimonials, 
  title = "Student Success Stories",
  subtitle = "Hear from students who have transformed their lives"
}: PremiumTestimonialsProps) {
  const featuredTestimonials = testimonials.filter(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          {title}
        </h2>
        <p className="text-xl text-slate-600">{subtitle}</p>
      </div>

      {/* Featured Testimonials */}
      {featuredTestimonials.length > 0 && (
        <div className="space-y-8">
          {featuredTestimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="relative overflow-hidden border-2 border-saffron-200 shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-saffron-100/30 to-amber-100/30 rounded-full blur-3xl -z-0" />
              
              <CardContent className="p-8 md:p-12 relative">
                <Badge className="mb-6 bg-gradient-to-r from-saffron-500 to-amber-600 text-white border-0">
                  Featured Review
                </Badge>
                
                <div className="grid md:grid-cols-[auto,1fr] gap-8 items-start">
                  {/* Student Info */}
                  <div className="flex flex-col items-center text-center md:w-48">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-saffron-200 to-amber-200 flex items-center justify-center text-4xl font-bold text-saffron-700 shadow-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-slate-800 mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600 mb-2">{testimonial.role}</p>
                    {testimonial.location && (
                      <div className="flex items-center text-xs text-slate-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </div>
                    )}
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial Content */}
                  <div className="space-y-4">
                    <Quote className="w-12 h-12 text-saffron-200" />
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                    <div className="pt-4">
                      <Badge variant="outline" className="text-saffron-700 border-saffron-300">
                        {testimonial.course}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Regular Testimonials Grid */}
      {regularTestimonials.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularTestimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="border-2 border-slate-200 hover:border-saffron-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 transform"
            >
              <CardContent className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-slate-700 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Student Info */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-200 to-amber-200 flex items-center justify-center text-lg font-bold text-saffron-700">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                    </div>
                  </div>
                  {testimonial.location && (
                    <div className="flex items-center text-xs text-slate-500 ml-13">
                      <MapPin className="w-3 h-3 mr-1" />
                      {testimonial.location}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

