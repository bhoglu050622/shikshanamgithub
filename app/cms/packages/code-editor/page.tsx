'use client';

import React from 'react';
import PackagesCodeEditor from '@/components/cms/PackagesCodeEditor';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PackagesCodeEditorPage() {
  const handleSave = (packages: any[]) => {
    console.log('Packages saved:', packages.length);
    // You can add additional save logic here
  };

  const handlePreview = (pkg: any) => {
    console.log('Preview package:', pkg.title);
    // You can add preview logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/cms/packages">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Packages
              </Button>
            </Link>
          </div>
        </div>

        {/* Code Editor */}
        <PackagesCodeEditor 
          onSave={handleSave}
          onPreview={handlePreview}
        />
      </div>
    </div>
  );
}
