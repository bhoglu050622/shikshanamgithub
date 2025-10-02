'use client';

import React from 'react';
import CoursesCodeEditor from '@/components/cms/CoursesCodeEditor';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CoursesCodeEditorPage() {
  const handleSave = (courses: any[]) => {
    console.log('Courses saved:', courses.length);
    // You can add additional save logic here
  };

  const handlePreview = (course: any) => {
    console.log('Preview course:', course.title);
    // You can add preview logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/cms/courses">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>

        {/* Code Editor */}
        <CoursesCodeEditor 
          onSave={handleSave}
          onPreview={handlePreview}
        />
      </div>
    </div>
  );
}
