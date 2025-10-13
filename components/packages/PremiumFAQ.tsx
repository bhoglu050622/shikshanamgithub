'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface PremiumFAQProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
}

export function PremiumFAQ({ 
  faqs, 
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about this package",
  showSearch = false
}: PremiumFAQProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-saffron-100 to-amber-100 mb-6">
          <HelpCircle className="w-8 h-8 text-saffron-600" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          {title}
        </h2>
        <p className="text-xl text-slate-600">{subtitle}</p>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg border-2 border-slate-200 focus:border-saffron-400 focus:ring-saffron-400 rounded-xl"
          />
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <Card 
            key={index}
            className="border-2 border-slate-200 hover:border-saffron-300 transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-6 flex items-center justify-between hover:bg-saffron-50/50 transition-colors"
            >
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-slate-800 leading-relaxed">
                  {faq.question}
                </h3>
                {faq.category && (
                  <span className="text-xs text-saffron-600 font-medium mt-2 inline-block">
                    {faq.category}
                  </span>
                )}
              </div>
              <div className="flex-shrink-0">
                {expandedIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-saffron-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                )}
              </div>
            </button>
            
            {expandedIndex === index && (
              <CardContent className="px-6 pb-6 pt-0">
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No questions found matching your search.</p>
        </div>
      )}
    </div>
  );
}

