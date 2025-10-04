'use client';

import { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Code, Zap, Save, RotateCcw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SimpleJsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
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
  onSave,
  onFormat,
  onValidate,
  className = ''
}: SimpleJsonEditorProps) {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
    validateContent(newValue);
  };

  // Handle save
  const handleSave = () => {
    if (onSave) onSave();
  };

  // Validate on mount
  useEffect(() => {
    validateContent(value);
  }, [value, language, validateContent]);

  return (
    <div className={`relative border rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              JSON Editor
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

      {/* Editor */}
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
          className={`w-full p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            !isValid ? 'border-red-300 bg-red-50' : 'border-gray-200'
          }`}
          style={{ height }}
          placeholder="Enter JSON content here..."
        />
        {!isValid && errorMessage && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs p-2">
            Error: {errorMessage}
          </div>
        )}
      </div>

      {/* Footer */}
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
    </div>
  );
}