'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  RotateCcw, 
  Eye, 
  Copy, 
  Search, 
  Replace,
  Undo,
  Redo,
  AlignLeft,
  CheckCircle,
  AlertCircle,
  Code,
  Settings,
  Download,
  Upload,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface ValidationError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
}

interface EnhancedCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave?: () => void;
  onFormat?: () => void;
  language?: 'json' | 'yaml' | 'xml';
  height?: string;
  placeholder?: string;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  showMinimap?: boolean;
  enableSearch?: boolean;
  enableUndoRedo?: boolean;
  enableAutoFormat?: boolean;
  className?: string;
}

export default function EnhancedCodeEditor({
  value,
  onChange,
  onSave,
  onFormat,
  language = 'json',
  height = '500px',
  placeholder = 'Enter your code here...',
  readOnly = false,
  showLineNumbers = true,
  showMinimap = false,
  enableSearch = true,
  enableUndoRedo = true,
  enableAutoFormat = true,
  className = ''
}: EnhancedCodeEditorProps) {
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceQuery, setReplaceQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isValid, setIsValid] = useState(true);
  const [characterCount, setCharacterCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Initialize history
  useEffect(() => {
    if (history.length === 0) {
      setHistory([value]);
      setHistoryIndex(0);
    }
  }, [history.length, value]);

  // Update character and line counts
  useEffect(() => {
    setCharacterCount(value.length);
    setLineCount(value.split('\n').length);
    setWordCount(value.split(/\s+/).filter(word => word.length > 0).length);
  }, [value]);

  // Validate JSON in real-time
  useEffect(() => {
    if (language === 'json') {
      validateJSON(value);
    }
  }, [value, language]);

  const validateJSON = (jsonString: string) => {
    try {
      JSON.parse(jsonString);
      setValidationErrors([]);
      setIsValid(true);
    } catch (error: any) {
      const match = error.message.match(/position (\d+)/);
      const position = match ? parseInt(match[1]) : 0;
      const lines = jsonString.substring(0, position).split('\n');
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;
      
      setValidationErrors([{
        line,
        column,
        message: error.message,
        severity: 'error'
      }]);
      setIsValid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Add to history if different from last entry
    if (enableUndoRedo && newValue !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newValue);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+S - Save
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      onSave?.();
    }
    
    // Ctrl+F - Search
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      setShowSearch(true);
    }
    
    // Ctrl+H - Replace
    if (e.ctrlKey && e.key === 'h') {
      e.preventDefault();
      setShowReplace(true);
    }
    
    // Ctrl+Z - Undo
    if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      if (enableUndoRedo && historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        onChange(history[newIndex]);
      }
    }
    
    // Ctrl+Y or Ctrl+Shift+Z - Redo
    if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
      e.preventDefault();
      if (enableUndoRedo && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        onChange(history[newIndex]);
      }
    }
    
    // Ctrl+Shift+F - Format
    if (e.ctrlKey && e.shiftKey && e.key === 'f') {
      e.preventDefault();
      handleFormat();
    }
  };

  const handleFormat = () => {
    if (language === 'json') {
      try {
        const parsed = JSON.parse(value);
        const formatted = JSON.stringify(parsed, null, 2);
        onChange(formatted);
        onFormat?.();
      } catch (error) {
        console.error('Cannot format invalid JSON:', error);
      }
    }
  };

  const handleSearch = () => {
    if (!searchQuery) return;
    
    const lines = value.split('\n');
    const results: number[] = [];
    
    lines.forEach((line, lineIndex) => {
      const index = line.toLowerCase().indexOf(searchQuery.toLowerCase());
      if (index !== -1) {
        results.push(lineIndex);
      }
    });
    
    setSearchResults(results);
    setCurrentSearchIndex(0);
  };

  const handleReplace = () => {
    if (!searchQuery || !replaceQuery) return;
    
    const regex = new RegExp(searchQuery, 'gi');
    const newValue = value.replace(regex, replaceQuery);
    onChange(newValue);
  };

  const handleReplaceAll = () => {
    if (!searchQuery || !replaceQuery) return;
    
    const regex = new RegExp(searchQuery, 'gi');
    const newValue = value.replace(regex, replaceQuery);
    onChange(newValue);
    setSearchResults([]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };

  const downloadContent = () => {
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content.${language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateLineNumbers = () => {
    const lines = value.split('\n');
    return lines.map((_, index) => index + 1);
  };

  const getSyntaxHighlightedValue = () => {
    if (language === 'json') {
      return value
        .replace(/(".*?")\s*:/g, '<span class="text-blue-600 font-semibold">$1</span>:')
        .replace(/:\s*(".*?")/g, ': <span class="text-green-600">$1</span>')
        .replace(/:\s*(true|false)/g, ': <span class="text-purple-600">$1</span>')
        .replace(/:\s*(\d+)/g, ': <span class="text-orange-600">$1</span>')
        .replace(/([{}[\]])/g, '<span class="text-gray-600 font-bold">$1</span>');
    }
    return value;
  };

  return (
    <div className={`enhanced-code-editor overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onSave}
            disabled={!isValid}
            className="text-xs"
          >
            <Save className="w-3 h-3 mr-1" />
            Save
          </Button>
          
          {enableAutoFormat && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleFormat}
              disabled={!isValid}
              className="text-xs"
            >
              <AlignLeft className="w-3 h-3 mr-1" />
              Format
            </Button>
          )}
          
          {enableUndoRedo && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (historyIndex > 0) {
                    const newIndex = historyIndex - 1;
                    setHistoryIndex(newIndex);
                    onChange(history[newIndex]);
                  }
                }}
                disabled={historyIndex <= 0}
                className="text-xs"
              >
                <Undo className="w-3 h-3 mr-1" />
                Undo
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (historyIndex < history.length - 1) {
                    const newIndex = historyIndex + 1;
                    setHistoryIndex(newIndex);
                    onChange(history[newIndex]);
                  }
                }}
                disabled={historyIndex >= history.length - 1}
                className="text-xs"
              >
                <Redo className="w-3 h-3 mr-1" />
                Redo
              </Button>
            </>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={copyToClipboard}
            className="text-xs"
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={downloadContent}
            className="text-xs"
          >
            <Download className="w-3 h-3 mr-1" />
            Export
          </Button>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            {isValid ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <AlertCircle className="w-3 h-3 text-red-500" />
            )}
            <span>{isValid ? 'Valid' : 'Invalid'} JSON</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span>{lineCount} lines</span>
            <span>•</span>
            <span>{characterCount} chars</span>
            <span>•</span>
            <span>{wordCount} words</span>
          </div>
        </div>
      </div>

      {/* Search/Replace Bar */}
      {(showSearch || showReplace) && (
        <div className="p-3 bg-blue-50 border-b border-blue-200">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs"
            />
            <Button size="sm" onClick={handleSearch} className="text-xs">
              <Search className="w-3 h-3 mr-1" />
              Find
            </Button>
            
            {showReplace && (
              <>
                <Input
                  placeholder="Replace with..."
                  value={replaceQuery}
                  onChange={(e) => setReplaceQuery(e.target.value)}
                  className="text-xs"
                />
                <Button size="sm" onClick={handleReplace} className="text-xs">
                  <Replace className="w-3 h-3 mr-1" />
                  Replace
                </Button>
                <Button size="sm" onClick={handleReplaceAll} className="text-xs">
                  Replace All
                </Button>
              </>
            )}
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowSearch(false);
                setShowReplace(false);
                setSearchQuery('');
                setReplaceQuery('');
                setSearchResults([]);
              }}
              className="text-xs"
            >
              Close
            </Button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="mt-2 text-xs text-gray-600">
              Found {searchResults.length} results
            </div>
          )}
        </div>
      )}

      {/* Editor Container */}
      <div className="relative overflow-x-auto">
        {/* Line Numbers */}
        {showLineNumbers && (
          <div 
            ref={lineNumbersRef}
            className="absolute left-0 top-0 w-12 bg-gray-100 border-r border-gray-300 text-xs text-gray-500 font-mono leading-6 pl-2 select-none"
            style={{ height: height }}
          >
            {generateLineNumbers().map((lineNum) => (
              <div key={lineNum} className="leading-6">
                {lineNum}
              </div>
            ))}
          </div>
        )}

        {/* Main Editor */}
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`font-mono text-sm bg-white border-0 resize-none focus:ring-0 focus:outline-none overflow-x-auto ${
            showLineNumbers ? 'pl-14' : 'pl-4'
          } pr-4 py-3`}
          style={{ 
            height: height,
            lineHeight: '1.5rem',
            whiteSpace: 'pre',
            wordBreak: 'break-all',
            overflowWrap: 'break-word',
            minWidth: '100%',
            width: 'max-content'
          }}
        />

        {/* Error Indicators */}
        {validationErrors.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-50 border-t border-red-200 p-2">
            <div className="flex items-center space-x-2 text-xs text-red-600">
              <AlertCircle className="w-3 h-3" />
              <span>Line {validationErrors[0].line}: {validationErrors[0].message}</span>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 bg-gray-50 border-t border-gray-200 rounded-b-lg text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <span>Language: {language.toUpperCase()}</span>
          <span>Encoding: UTF-8</span>
          <span>Line endings: LF</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowSearch(true)}
            className="text-xs h-6 px-2"
          >
            <Search className="w-3 h-3 mr-1" />
            Find
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowReplace(true)}
            className="text-xs h-6 px-2"
          >
            <Replace className="w-3 h-3 mr-1" />
            Replace
          </Button>
        </div>
      </div>
    </div>
  );
}
