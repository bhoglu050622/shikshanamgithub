'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, BookOpen, Save, Upload, Eye, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function HelpPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
        size="lg"
      >
        <HelpCircle className="w-6 h-6" />
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl border p-6 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
              CMS Guide
            </h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </Button>
          </div>
          
          <div className="space-y-4 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Getting Started
              </h4>
              <p className="text-blue-800">
                Click "Edit" on any content file to open the editor. Make your changes and save them.
              </p>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                How to Edit Content
              </h4>
              <ol className="text-green-800 space-y-1 list-decimal list-inside">
                <li>Click "Edit" button on any content file</li>
                <li>Modify the JSON content in the editor</li>
                <li>Click "Save & Publish" to save changes</li>
                <li>Changes will appear on the live website</li>
              </ol>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                Important Notes
              </h4>
              <ul className="text-yellow-800 space-y-1 list-disc list-inside">
                <li>Always validate JSON syntax before saving</li>
                <li>Test changes on the live site after publishing</li>
                <li>Backup important content before major changes</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Preview Changes
              </h4>
              <p className="text-gray-700">
                After saving, visit the corresponding page on your website to see the changes live.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
