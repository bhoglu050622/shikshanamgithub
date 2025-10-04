'use client';

import { useEffect, useState } from 'react';

interface MonacoCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
}

export default function MonacoCodeEditor({ 
  value, 
  onChange, 
  language = 'json',
  height = '400px',
  readOnly = false
}: MonacoCodeEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-md flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Advanced Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-300 rounded-md overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-sm text-gray-600 font-mono">
          {language.toUpperCase()} • Advanced Editor
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        className="w-full p-4 font-mono text-sm bg-white text-gray-900 focus:outline-none resize-none"
        style={{ height: height }}
        placeholder="Enter your JSON content here..."
        spellCheck={false}
      />
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-xs text-gray-500">
        💡 Tip: Use Ctrl+F to find, Ctrl+H to replace, and ensure valid JSON syntax
      </div>
    </div>
  );
}