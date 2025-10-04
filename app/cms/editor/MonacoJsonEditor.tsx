'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { AlertCircle, Code, Zap, Save, RotateCcw, Maximize2, Minimize2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-pulse" />
        <p className="text-sm text-gray-600">Loading Monaco Editor...</p>
      </div>
    </div>
  )
});

interface MonacoJsonEditorProps {
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

export default function MonacoJsonEditor({ 
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
}: MonacoJsonEditorProps) {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorTheme, setEditorTheme] = useState(theme);
  const [isMonacoReady, setIsMonacoReady] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Validate JSON content
  const validateContent = useCallback((content: string) => {
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
  }, [language]);

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
  const handleChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
      validateContent(newValue);
    }
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

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Validate on mount
  useEffect(() => {
    validateContent(value);
  }, [value, language, validateContent]);

  // Handle Monaco Editor mount
  const handleEditorDidMount = () => {
    setIsMonacoReady(true);
  };

  return (
    <div
      className={`relative border rounded-lg overflow-hidden ${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-white' 
          : ''
      } ${className}`}
    >
      {showHeader && (
        <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Monaco JSON Editor
              </span>
            </div>
            {!isValid && (
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                Invalid JSON
              </Badge>
            )}
            {isValid && (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Valid JSON
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-xs"
            >
              {editorTheme === 'vs-dark' ? '☀️' : '🌙'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-xs"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}

      <div style={{ height: isFullscreen ? 'calc(100vh - 120px)' : height }}>
        {!isClient ? (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-pulse" />
              <p className="text-sm text-gray-600">Loading Monaco Editor...</p>
            </div>
          </div>
        ) : (
          <Suspense fallback={
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-pulse" />
                <p className="text-sm text-gray-600">Loading Monaco Editor...</p>
              </div>
            </div>
          }>
            <MonacoEditor
              height={isFullscreen ? 'calc(100vh - 120px)' : height}
              language={language}
              theme={editorTheme}
              value={value}
              onChange={handleChange}
              onMount={handleEditorDidMount}
              options={{
                readOnly,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: 'on',
                wordWrap: 'on',
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                formatOnPaste: true,
                formatOnType: true,
                bracketPairColorization: { enabled: true },
                guides: {
                  bracketPairs: true,
                  indentation: true
                },
                suggest: {
                  showKeywords: true,
                  showSnippets: true
                }
              }}
            />
          </Suspense>
        )}
      </div>

      {showFooter && (
        <div className="flex items-center justify-between p-3 bg-gray-50 border-t">
          <div className="flex items-center space-x-4">
            {!isValid && errorMessage && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMessage}</span>
              </div>
            )}
            {isValid && (
              <div className="flex items-center space-x-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Valid JSON</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={formatContent}
              disabled={!isValid}
              className="text-xs"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Format
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onValidate}
              className="text-xs"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Validate
            </Button>
            {onSave && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                className="text-xs"
              >
                <Save className="w-3 h-3 mr-1" />
                Save
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
