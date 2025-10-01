'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit, 
  Eye,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface UniversalEditorProps {
  content: any;
  onChange: (newContent: any) => void;
  sectionName: string;
}

export default function UniversalEditor({ content, onChange, sectionName }: UniversalEditorProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const [isAddingField, setIsAddingField] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');

  // Initialize content if empty
  useEffect(() => {
    if (!content || Object.keys(content).length === 0) {
      const defaultContent = {
        title: `${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} Section`,
        description: `Content for ${sectionName} section`,
        ...getDefaultFieldsForSection(sectionName)
      };
      onChange(defaultContent);
    }
  }, [content, sectionName, onChange]);

  const getDefaultFieldsForSection = (section: string) => {
    const defaults: Record<string, any> = {
      hero: {
        title: 'Hero Title',
        subtitle: 'Hero Subtitle',
        description: 'Hero description text',
        image: '/assets/hero-image.jpg',
        cta: { text: 'Call to Action', link: '/action' }
      },
      syllabus: {
        title: 'Syllabus',
        description: 'Course curriculum overview',
        modules: [
          { title: 'Module 1', duration: '1 week', topics: ['Topic 1', 'Topic 2'] }
        ]
      },
      outcomes: {
        title: 'Learning Outcomes',
        description: 'What students will achieve',
        benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3']
      },
      testimonials: {
        title: 'Testimonials',
        description: 'Student feedback',
        reviews: [
          { name: 'Student Name', role: 'Role', text: 'Testimonial text' }
        ]
      },
      pricing: {
        title: 'Pricing',
        description: 'Course pricing options',
        plans: [
          { name: 'Basic Plan', price: '$99', features: ['Feature 1', 'Feature 2'] }
        ]
      },
      faq: {
        title: 'FAQ',
        description: 'Frequently asked questions',
        questions: [
          { question: 'Question 1?', answer: 'Answer 1' }
        ]
      }
    };
    return defaults[section] || { title: 'Section Title', description: 'Section description' };
  };

  const handleFieldEdit = (fieldPath: string, currentValue: any) => {
    setEditingField(fieldPath);
    setTempValue(typeof currentValue === 'object' ? JSON.stringify(currentValue, null, 2) : String(currentValue));
  };

  const handleFieldSave = () => {
    if (editingField) {
      const newContent = { ...content };
      const fieldParts = editingField.split('.');
      
      let current = newContent;
      for (let i = 0; i < fieldParts.length - 1; i++) {
        if (!current[fieldParts[i]]) current[fieldParts[i]] = {};
        current = current[fieldParts[i]];
      }
      
      try {
        // Try to parse as JSON first, fallback to string
        current[fieldParts[fieldParts.length - 1]] = JSON.parse(tempValue);
      } catch {
        current[fieldParts[fieldParts.length - 1]] = tempValue;
      }
      
      onChange(newContent);
      setEditingField(null);
      setTempValue('');
    }
  };

  const handleFieldCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleAddField = () => {
    if (newFieldName && newFieldValue) {
      const newContent = { ...content };
      try {
        newContent[newFieldName] = JSON.parse(newFieldValue);
      } catch {
        newContent[newFieldName] = newFieldValue;
      }
      onChange(newContent);
      setNewFieldName('');
      setNewFieldValue('');
      setIsAddingField(false);
    }
  };

  const handleDeleteField = (fieldPath: string) => {
    const newContent = { ...content };
    const fieldParts = fieldPath.split('.');
    
    let current = newContent;
    for (let i = 0; i < fieldParts.length - 1; i++) {
      current = current[fieldParts[i]];
    }
    delete current[fieldParts[fieldParts.length - 1]];
    
    onChange(newContent);
  };

  const renderField = (key: string, value: any, path: string = '') => {
    const fullPath = path ? `${path}.${key}` : key;
    const isEditing = editingField === fullPath;

    return (
      <div key={fullPath} className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-700">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Label>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleFieldEdit(fullPath, value)}
              disabled={isEditing}
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDeleteField(fullPath)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="min-h-[100px] font-mono text-sm"
              placeholder="Enter value (JSON or text)..."
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleFieldSave}>
                <Save className="w-3 h-3 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleFieldCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-gray-50 rounded-lg border">
            {typeof value === 'object' ? (
              <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                {JSON.stringify(value, null, 2)}
              </pre>
            ) : (
              <p className="text-sm text-gray-600">{String(value)}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderContent = (obj: any, path: string = '') => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
          <Card key={key} className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">{key.charAt(0).toUpperCase() + key.slice(1)}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderContent(value, path ? `${path}.${key}` : key)}
            </CardContent>
          </Card>
        );
      } else {
        return renderField(key, value, path);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} Editor
          </h3>
          <p className="text-sm text-gray-600">
            Universal editor for {sectionName} section content
          </p>
        </div>
        <Badge variant="outline" className="text-blue-600">
          <Info className="w-3 h-3 mr-1" />
          Universal Editor
        </Badge>
      </div>

      <Separator />

      {content && Object.keys(content).length > 0 ? (
        <div className="space-y-4">
          {renderContent(content)}
          
          {!isAddingField ? (
            <Button
              variant="outline"
              onClick={() => setIsAddingField(true)}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Field
            </Button>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Add New Field</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label>Field Name</Label>
                  <Input
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    placeholder="e.g., subtitle, description"
                  />
                </div>
                <div>
                  <Label>Field Value</Label>
                  <Textarea
                    value={newFieldValue}
                    onChange={(e) => setNewFieldValue(e.target.value)}
                    placeholder="Enter value (JSON or text)..."
                    className="min-h-[80px]"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleAddField}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Add Field
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsAddingField(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No content available for this section.</p>
          <Button 
            onClick={() => {
              const defaultContent = getDefaultFieldsForSection(sectionName);
              onChange(defaultContent);
            }}
            className="mt-4"
          >
            Initialize Section
          </Button>
        </div>
      )}
    </div>
  );
}
