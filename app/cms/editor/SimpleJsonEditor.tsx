'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Code, Zap, Save, RotateCcw, Maximize2, Minimize2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SimpleJsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
  theme?: 'vs-dark' | 'light';
  showHeader?: boolean;
  showFooter?: boolean;
  onSave?: () => void;
  onFormat?: () => void;
  onValidate?: () => void;
  className?: string;
}

export default function SimpleJsonEditor({ 
  value, 
  onChange, 
  language = 'json',
  height = '500px',
  readOnly = false,
  theme = 'vs-dark',
  showHeader = true,
  showFooter = true,
  onSave,
  onFormat,
  onValidate,
  className = ''
}: SimpleJsonEditorProps) {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorTheme, setEditorTheme] = useState(theme);

  // Validate JSON content
  const validateContent = (content: string) => {
    if (language === 'json') {
      try {
        JSON.parse(content);
        setIsValid(true);
        setErrorMessage('');
      } catch (error) {
        setIsValid(false);
        setErrorMessage(error instanceof Error ? error.message : 'Invalid JSON');
      }
    } else {
      setIsValid(true);
      setErrorMessage('');
    }
  };

  // Format JSON content
  const formatContent = () => {
    if (language === 'json') {
      try {
        const parsed = JSON.parse(value);
        const formatted = JSON.stringify(parsed, null, 2);
        onChange(formatted);
        setIsValid(true);
        setErrorMessage('');
      } catch (error) {
        setIsValid(false);
        setErrorMessage('Cannot format invalid JSON');
      }
    }
    if (onFormat) onFormat();
  };

  // Handle content change
  const handleChange = (newValue: string) => {
    onChange(newValue);
    validateContent(newValue);
  };

  // Handle save
  const handleSave = () => {
    if (onSave) onSave();
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Toggle theme
  const toggleTheme = () => {
    setEditorTheme(editorTheme === 'vs-dark' ? 'light' : 'vs-dark');
  };

  // Validate on mount
  useEffect(() => {
    validateContent(value);
  }, [value, language]);

  const editorContainer = (
    <div className={`w-full border border-gray-300 rounded-md overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''} ${className}`}>
      {showHeader && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Code className="w-4 h-4" />
              <span className="font-mono">{language.toUpperCase()}</span>
              <Badge variant={isValid ? 'default' : 'destructive'} className="text-xs">
                {isValid ? 'Valid' : 'Invalid'}
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleTheme}
                className="h-6 px-2 text-xs"
              >
                {editorTheme === 'vs-dark' ? '☀️' : '🌙'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleFullscreen}
                className="h-6 px-2 text-xs"
              >
                {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: isFullscreen ? 'calc(100vh - 120px)' : height }}>
        <textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className={`w-full h-full p-4 font-mono text-sm border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none ${
            editorTheme === 'vs-dark' 
              ? 'bg-gray-900 text-gray-100' 
              : 'bg-white text-gray-900'
          }`}
          style={{ 
            height: '100%',
            minHeight: isFullscreen ? 'calc(100vh - 120px)' : height
          }}
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="off"
          data-gramm="false"
          readOnly={readOnly}
          placeholder="Enter your JSON content here..."
        />
      </div>

      {showFooter && (
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3" />
              <span>Simple JSON Editor</span>
              {!isValid && (
                <div className="flex items-center space-x-1 text-red-600">
                  <AlertCircle className="w-3 h-3" />
                  <span>Invalid JSON</span>
                </div>
              )}
              {isValid && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  <span>Valid JSON</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={formatContent}
                className="h-6 px-2 text-xs"
                disabled={!isValid}
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Format
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSave}
                className="h-6 px-2 text-xs"
              >
                <Save className="w-3 h-3 mr-1" />
                Save
              </Button>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            <div>Ctrl+F Format • Ctrl+S Save</div>
          </div>
        </div>
      )}

      {!isValid && errorMessage && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-2">
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>JSON Error: {errorMessage}</span>
          </div>
        </div>
      )}
    </div>
  );

  return editorContainer;
}
