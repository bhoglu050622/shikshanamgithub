'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Eye, 
  Code, 
  Palette, 
  Image, 
  Video, 
  Link, 
  Type, 
  Layout,
  Move,
  Copy,
  Trash2,
  Plus,
  Settings,
  Wand2,
  Sparkles,
  Zap,
  RefreshCw,
  Download,
  Upload,
  Edit,
  Undo,
  Redo,
  Maximize,
  Minimize,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Target,
  BarChart3,
  Clock,
  Star,
  TrendingUp,
  Users,
  Globe,
  Shield,
  ArrowRight,
  ChevronDown,
  MoreHorizontal,
  BookOpen,
  GraduationCap,
  Heart,
  DollarSign,
  MessageSquare,
  FileText,
  Package,
  Lightbulb as Bulb,
  CheckCircle as Check,
  AlertTriangle,
  Info as InfoIcon
} from 'lucide-react';

interface EnhancedEditorProps {
  content: any;
  onChange: (content: any) => void;
  sectionName: string;
  onSave?: () => void;
  onPreview?: () => void;
  onReset?: () => void;
}

interface DragItem {
  id: string;
  type: 'text' | 'image' | 'video' | 'button' | 'card' | 'section';
  content: any;
  position: { x: number; y: number };
}

export default function EnhancedEditor({ 
  content, 
  onChange, 
  sectionName, 
  onSave, 
  onPreview, 
  onReset 
}: EnhancedEditorProps) {
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'preview'>('visual');
  const [isEditing, setIsEditing] = useState(false);
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [dragItems, setDragItems] = useState<DragItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([content]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && content) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
        if (onSave) onSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [content, autoSave, onSave]);

  // History management
  const addToHistory = useCallback((newContent: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newContent);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  }, [history, historyIndex, onChange]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  }, [history, historyIndex, onChange]);

  // Drag and drop functionality
  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find the closest drop zone
    const dropZone = document.elementFromPoint(e.clientX, e.clientY);
    if (dropZone) {
      setDragOver(dropZone.id);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setDragOver(null);
    
    try {
      const itemData = JSON.parse(e.dataTransfer.getData('application/json'));
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newItem = {
        ...itemData,
        position: { x, y }
      };
      
      setDragItems(prev => [...prev, newItem]);
      addToHistory({ ...content, dragItems: [...dragItems, newItem] });
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  // Inline editing
  const startEditing = (elementId: string) => {
    setIsEditing(true);
    setEditingElement(elementId);
  };

  const stopEditing = () => {
    setIsEditing(false);
    setEditingElement(null);
  };

  const updateElement = (elementId: string, newContent: any) => {
    const updatedContent = {
      ...content,
      [elementId]: { ...content[elementId], ...newContent }
    };
    onChange(updatedContent);
    addToHistory(updatedContent);
  };

  // Element templates
  const elementTemplates = [
    {
      id: 'text-block',
      type: 'text',
      name: 'Text Block',
      icon: Type,
      template: {
        text: 'Click to edit this text',
        fontSize: '16px',
        fontWeight: '400',
        color: '#333333',
        textAlign: 'left'
      }
    },
    {
      id: 'heading',
      type: 'text',
      name: 'Heading',
      icon: Type,
      template: {
        text: 'Click to edit this heading',
        fontSize: '24px',
        fontWeight: '700',
        color: '#000000',
        textAlign: 'left'
      }
    },
    {
      id: 'image',
      type: 'image',
      name: 'Image',
      icon: Image,
      template: {
        src: 'https://via.placeholder.com/400x300',
        alt: 'Placeholder image',
        width: '400px',
        height: '300px'
      }
    },
    {
      id: 'button',
      type: 'button',
      name: 'Button',
      icon: Target,
      template: {
        text: 'Click me',
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '6px',
        border: 'none'
      }
    },
    {
      id: 'card',
      type: 'card',
      name: 'Card',
      icon: Layout,
      template: {
        title: 'Card Title',
        content: 'Card content goes here',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px'
      }
    }
  ];

  const renderElement = (element: any, elementId: string) => {
    const isCurrentlyEditing = editingElement === elementId;
    
    switch (element.type) {
      case 'text':
        return (
          <div
            key={elementId}
            className={`relative group ${isCurrentlyEditing ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => startEditing(elementId)}
          >
            {isCurrentlyEditing ? (
              <Textarea
                value={element.text}
                onChange={(e) => updateElement(elementId, { text: e.target.value })}
                onBlur={stopEditing}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    stopEditing();
                  }
                }}
                className="w-full min-h-[100px] resize-none"
                autoFocus
              />
            ) : (
              <div
                style={{
                  fontSize: element.fontSize || '16px',
                  fontWeight: element.fontWeight || '400',
                  color: element.color || '#333333',
                  textAlign: element.textAlign || 'left'
                }}
                className="p-2 hover:bg-gray-50 rounded cursor-text"
              >
                {element.text}
              </div>
            )}
            {!isCurrentlyEditing && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline" className="bg-white/80">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        );
        
      case 'image':
        return (
          <div
            key={elementId}
            className={`relative group ${isCurrentlyEditing ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => startEditing(elementId)}
          >
            <NextImage
              src={element.src}
              alt={element.alt}
              width={element.width ? parseInt(element.width) : 400}
              height={element.height ? parseInt(element.height) : 300}
              style={{
                width: element.width || '100%',
                height: element.height || 'auto'
              }}
              className="rounded-lg"
            />
            {!isCurrentlyEditing && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline" className="bg-white/80">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        );
        
      case 'button':
        return (
          <div
            key={elementId}
            className={`relative group ${isCurrentlyEditing ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => startEditing(elementId)}
          >
            <button
              style={{
                backgroundColor: element.backgroundColor || '#3b82f6',
                color: element.color || '#ffffff',
                padding: element.padding || '12px 24px',
                borderRadius: element.borderRadius || '6px',
                border: element.border || 'none'
              }}
              className="hover:opacity-90 transition-opacity"
            >
              {element.text}
            </button>
            {!isCurrentlyEditing && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline" className="bg-white/80">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        );
        
      case 'card':
        return (
          <div
            key={elementId}
            className={`relative group ${isCurrentlyEditing ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => startEditing(elementId)}
          >
            <div
              style={{
                backgroundColor: element.backgroundColor || '#ffffff',
                border: element.border || '1px solid #e5e7eb',
                borderRadius: element.borderRadius || '8px',
                padding: element.padding || '16px'
              }}
              className="hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-2">{element.title}</h3>
              <p className="text-gray-600">{element.content}</p>
            </div>
            {!isCurrentlyEditing && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline" className="bg-white/80">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                <Wand2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Enhanced Editor - {sectionName}
                </h1>
                <p className="text-sm text-gray-600">
                  Drag, drop, and edit content with real-time preview
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* History Controls */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={undo}
                  disabled={historyIndex === 0}
                  className="px-2"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={redo}
                  disabled={historyIndex === history.length - 1}
                  className="px-2"
                >
                  <Redo className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Auto-save Toggle */}
              <Button
                size="sm"
                variant={autoSave ? "primary" : "outline"}
                onClick={() => setAutoSave(!autoSave)}
                className="px-3"
              >
                <Zap className="w-4 h-4 mr-1" />
                Auto-save
              </Button>
              
              {/* Help */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowHelp(!showHelp)}
                className="px-3"
              >
                <Info className="w-4 h-4 mr-1" />
                Help
              </Button>
              
              {/* Settings */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSettings(!showSettings)}
                className="px-3"
              >
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </Button>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {lastSaved && (
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Saved {lastSaved.toLocaleTimeString()}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>History: {historyIndex + 1}/{history.length}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={onSave}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={onPreview}
                className="bg-white/80 backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                variant="outline"
                onClick={onReset}
                className="bg-white/80 backdrop-blur-sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Help Panel */}
      {showHelp && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-semibold text-blue-800 mb-2">Enhanced Editor Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-medium mb-1">Drag & Drop:</h4>
                <ul className="space-y-1">
                  <li>• Drag elements from the sidebar to add them</li>
                  <li>• Click and drag to reposition elements</li>
                  <li>• Use the move handle to reorder content</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Inline Editing:</h4>
                <ul className="space-y-1">
                  <li>• Click any text to edit it directly</li>
                  <li>• Press Enter to save, Escape to cancel</li>
                  <li>• Use the toolbar for formatting options</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Keyboard Shortcuts:</h4>
                <ul className="space-y-1">
                  <li>• Ctrl+Z: Undo</li>
                  <li>• Ctrl+Y: Redo</li>
                  <li>• Ctrl+S: Save</li>
                  <li>• Ctrl+P: Preview</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Real-time Preview:</h4>
                <ul className="space-y-1">
                  <li>• Changes appear instantly</li>
                  <li>• Use the preview tab for full-screen view</li>
                  <li>• Auto-save every 2 seconds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Editor */}
      <div className="flex h-screen">
        {/* Sidebar - Element Library */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
              Element Library
            </h3>
            
            <div className="space-y-2">
              {elementTemplates.map(template => (
                <div
                  key={template.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, {
                    id: template.id,
                    type: template.type as any,
                    content: template.template,
                    position: { x: 0, y: 0 }
                  })}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-move group"
                >
                  <div className="flex items-center space-x-3">
                    <template.icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{template.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{template.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Editor Tabs */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="flex-1 flex flex-col">
            <div className="border-b border-gray-200 px-6 py-3">
              <TabsList className="bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="visual" className="flex items-center space-x-2 px-4 py-2">
                  <Palette className="w-4 h-4" />
                  <span>Visual Editor</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center space-x-2 px-4 py-2">
                  <Code className="w-4 h-4" />
                  <span>Code Editor</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center space-x-2 px-4 py-2">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Visual Editor */}
            <TabsContent value="visual" className="flex-1 p-6">
              <div
                ref={editorRef}
                className="min-h-[600px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                  backgroundImage: isDragging ? 'radial-gradient(circle, #3b82f6 1px, transparent 1px)' : 'none',
                  backgroundSize: '20px 20px'
                }}
              >
                {Object.entries(content || {}).map(([key, element]: [string, any]) => (
                  <div key={key} className="mb-4">
                    {renderElement(element, key)}
                  </div>
                ))}
                
                {Object.keys(content || {}).length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Layout className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium mb-2">Start building your content</p>
                    <p className="text-sm">Drag elements from the sidebar to get started</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Code Editor */}
            <TabsContent value="code" className="flex-1 p-6">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">content.json</span>
                  </div>
                </div>
                <textarea
                  className="w-full h-[600px] bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
                  value={JSON.stringify(content, null, 2)}
                  onChange={(e) => {
                    try {
                      const newContent = JSON.parse(e.target.value);
                      onChange(newContent);
                      addToHistory(newContent);
                    } catch (error) {
                      // Invalid JSON, don't update
                    }
                  }}
                  placeholder="Enter JSON content..."
                />
              </div>
            </TabsContent>

            {/* Preview */}
            <TabsContent value="preview" className="flex-1 p-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Live Preview</h3>
                  <p className="text-sm text-gray-600">See how your content will look to visitors</p>
                </div>
                <div className="p-6">
                  {Object.entries(content || {}).map(([key, element]: [string, any]) => (
                    <div key={key} className="mb-4">
                      {renderElement(element, key)}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
