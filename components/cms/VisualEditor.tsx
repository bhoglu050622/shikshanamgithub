'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  Image, 
  List, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Palette,
  Type,
  Save,
  Eye
} from 'lucide-react';

interface VisualEditorProps {
  content: any;
  onChange: (content: any) => void;
  section: string;
}

export default function VisualEditor({ content, onChange, section }: VisualEditorProps) {
  const [previewMode, setPreviewMode] = useState(false);
  const [localContent, setLocalContent] = useState(content || {});

  const handleTextChange = (field: string, value: string) => {
    const newContent = { ...localContent, [field]: value };
    setLocalContent(newContent);
    onChange(newContent);
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...(localContent[field] || [])];
    newArray[index] = value;
    const newContent = { ...localContent, [field]: newArray };
    setLocalContent(newContent);
    onChange(newContent);
  };

  const addArrayItem = (field: string) => {
    const newArray = [...(localContent[field] || []), ''];
    const newContent = { ...localContent, [field]: newArray };
    setLocalContent(newContent);
    onChange(newContent);
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = (localContent[field] || []).filter((_: any, i: number) => i !== index);
    const newContent = { ...localContent, [field]: newArray };
    setLocalContent(newContent);
    onChange(newContent);
  };

  const renderTextField = (field: string, label: string, placeholder?: string, multiline = false) => {
    const value = localContent[field] || '';
    
    return (
      <div className="space-y-2">
        <Label htmlFor={field} className="text-sm font-medium text-slate-700">
          {label}
        </Label>
        {multiline ? (
          <Textarea
            id={field}
            value={value}
            onChange={(e) => handleTextChange(field, e.target.value)}
            placeholder={placeholder}
            className="min-h-[100px]"
          />
        ) : (
          <Input
            id={field}
            value={value}
            onChange={(e) => handleTextChange(field, e.target.value)}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  };

  const renderArrayField = (field: string, label: string, placeholder?: string) => {
    const items = localContent[field] || [];
    
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-slate-700">
            {label}
          </Label>
          <Button
            type="button"
            size="sm"
            onClick={() => addArrayItem(field)}
            className="bg-saffron-600 hover:bg-saffron-700 text-white"
          >
            Add Item
          </Button>
        </div>
        <div className="space-y-2">
          {items.map((item: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={item}
                onChange={(e) => handleArrayChange(field, index, e.target.value)}
                placeholder={placeholder}
                className="flex-1"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => removeArrayItem(field, index)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </Button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-slate-500 italic">No items yet. Click "Add Item" to get started.</p>
          )}
        </div>
      </div>
    );
  };

  const renderSectionEditor = () => {
    switch (section) {
      case 'hero':
        return (
          <div className="space-y-6">
            {renderTextField('title', 'Main Title', 'Enter the main headline')}
            {renderTextField('subtitle', 'Subtitle', 'Enter the subtitle')}
            {renderTextField('description', 'Description', 'Enter the description', true)}
            {renderTextField('ctaText', 'Call to Action Text', 'e.g., Get Started')}
            {renderTextField('ctaLink', 'Call to Action Link', 'e.g., /signup')}
            {renderTextField('backgroundImage', 'Background Image URL', 'Enter image URL')}
          </div>
        );
      
      case 'testimonials':
        return (
          <div className="space-y-6">
            {renderTextField('title', 'Section Title', 'Enter section title')}
            {renderTextField('subtitle', 'Subtitle', 'Enter subtitle')}
            {renderArrayField('testimonials', 'Testimonials', 'Enter testimonial text')}
          </div>
        );
      
      case 'faq':
        return (
          <div className="space-y-6">
            {renderTextField('title', 'Section Title', 'Enter section title')}
            {renderArrayField('questions', 'FAQ Questions', 'Enter question')}
            {renderArrayField('answers', 'FAQ Answers', 'Enter answer')}
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            {renderTextField('title', 'Title', 'Enter title')}
            {renderTextField('content', 'Content', 'Enter content', true)}
            {renderArrayField('items', 'Items', 'Enter item')}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Editor Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {section.charAt(0).toUpperCase() + section.slice(1)} Editor
          </h3>
          <p className="text-sm text-slate-600">
            Edit the {section} section content
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={previewMode ? "outline" : "default"}
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
            className={previewMode ? "" : "bg-saffron-600 hover:bg-saffron-700 text-white"}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <Card className="max-w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Type className="w-5 h-5 text-saffron-600" />
            <span>Content Editor</span>
          </CardTitle>
          <CardDescription>
            Use the form below to edit the {section} section. Changes are saved automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-full overflow-hidden">
          {previewMode ? (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Preview</h4>
                <div className="text-sm text-slate-600">
                  <p><strong>Title:</strong> {localContent.title || 'Not set'}</p>
                  <p><strong>Content:</strong> {localContent.content || 'Not set'}</p>
                  {localContent.items && (
                    <div>
                      <strong>Items:</strong>
                      <ul className="list-disc list-inside ml-4">
                        {localContent.items.map((item: string, index: number) => (
                          <li key={index}>{item || 'Empty'}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-full">
              {renderSectionEditor()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
