'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Eye, 
  Edit, 
  RefreshCw,
  Check,
  AlertCircle,
  Clock,
  Zap,
  Download,
  Upload,
  Copy,
  Trash2,
  Settings,
  Palette,
  Type,
  Image,
  Link,
  Code,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { useAutoSave } from '@/lib/cms/auto-save';
import AutoSaveIndicator from './AutoSaveIndicator';

interface ContentField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'rich' | 'image' | 'link' | 'select' | 'checkbox';
  value: any;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  description?: string;
}

interface EnhancedContentEditorProps {
  contentId: string;
  content: any;
  onSave: (content: any) => Promise<boolean>;
  onPreview?: (content: any) => void;
  fields: ContentField[];
  title: string;
  description?: string;
}

export default function EnhancedContentEditor({
  contentId,
  content,
  onSave,
  onPreview,
  fields,
  title,
  description
}: EnhancedContentEditorProps) {
  const [localContent, setLocalContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Auto-save functionality
  const autoSaveState = useAutoSave(localContent, {
    onSave: onSave,
    delay: 3000, // 3 seconds delay
    enabled: isEditing
  });

  // Update local content when props change
  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setLocalContent((prev: any) => ({
      ...prev,
      [fieldId]: value
    }));
    setActiveField(fieldId);
  };

  const handleSave = async () => {
    const success = await onSave(localContent);
    if (success) {
      setIsEditing(false);
      setActiveField(null);
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(localContent);
    }
    setShowPreview(!showPreview);
  };

  const handleReset = () => {
    setLocalContent(content);
    setIsEditing(false);
    setActiveField(null);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(localContent, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contentId}-content.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedContent = JSON.parse(e.target?.result as string);
          setLocalContent(importedContent);
        } catch (error) {
          console.error('Error importing content:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const renderField = (field: ContentField) => {
    const value = localContent[field.id] || field.value || '';

    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full"
            onFocus={() => setActiveField(field.id)}
            onBlur={() => setActiveField(null)}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full min-h-[100px]"
            onFocus={() => setActiveField(field.id)}
            onBlur={() => setActiveField(null)}
          />
        );

      case 'rich':
        return (
          <div className="border border-gray-200 rounded-lg">
            {/* Rich text toolbar */}
            <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50">
              <Button variant="ghost" size="sm">
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Underline className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <Button variant="ghost" size="sm">
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignRight className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <Button variant="ghost" size="sm">
                <List className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Link className="w-4 h-4" />
              </Button>
            </div>
            <Textarea
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="w-full min-h-[200px] border-0 resize-none"
              onFocus={() => setActiveField(field.id)}
              onBlur={() => setActiveField(null)}
            />
          </div>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">{field.label}</label>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            <Input
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder="Image URL"
              className="w-full"
            />
            {value && (
              <div className="mt-2">
                <NextImage
                  src={value}
                  alt="Preview"
                  width={400}
                  height={128}
                  className="max-w-full h-32 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        );

      case 'link':
        return (
          <div className="space-y-2">
            <Input
              value={value.url || ''}
              onChange={(e) => handleFieldChange(field.id, { ...value, url: e.target.value })}
              placeholder="URL"
              className="w-full"
            />
            <Input
              value={value.text || ''}
              onChange={(e) => handleFieldChange(field.id, { ...value, text: e.target.value })}
              placeholder="Link Text"
              className="w-full"
            />
          </div>
        );

      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full"
          />
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <AutoSaveIndicator {...autoSaveState} />
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={handlePreview}
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>{showPreview ? 'Edit' : 'Preview'}</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleExport}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
              <label className="cursor-pointer">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <span>
                    <Upload className="w-4 h-4" />
                    <span>Import</span>
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Edit className="w-5 h-5" />
                  <span>Content Editor</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {isEditing && (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                      <Edit className="w-3 h-3 mr-1" />
                      Editing
                    </Badge>
                  )}
                  <Button
                    variant={isEditing ? 'primary' : 'outline'}
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>{isEditing ? 'Stop Editing' : 'Start Editing'}</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {activeField === field.id && (
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        <Edit className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>
                  {field.description && (
                    <p className="text-xs text-gray-500">{field.description}</p>
                  )}
                  {renderField(field)}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleSave}
                disabled={!isEditing || autoSaveState.isSaving}
                className="w-full flex items-center space-x-2"
              >
                {autoSaveState.isSaving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>
                  {autoSaveState.isSaving ? 'Saving...' : 'Save Changes'}
                </span>
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(JSON.stringify(localContent, null, 2))}
                className="w-full flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy JSON</span>
              </Button>
            </CardContent>
          </Card>

          {/* Content Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Content Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Content ID:</span>
                <span className="font-mono text-xs">{contentId}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Fields:</span>
                <span>{fields.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Auto-save Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Auto-save</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AutoSaveIndicator {...autoSaveState} />
              {autoSaveState.lastSaved && (
                <p className="text-xs text-gray-500 mt-2">
                  Last saved: {autoSaveState.lastSaved.toLocaleTimeString()}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
