'use client';

import React from 'react';
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
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface SchoolsCTAEditorProps {
  content: any;
  onChange: (newContent: any) => void;
}

export default function SchoolsCTAEditor({ content, onChange }: SchoolsCTAEditorProps) {
  const [editingField, setEditingField] = React.useState<string | null>(null);
  const [tempValue, setTempValue] = React.useState<string>('');

  const handleFieldEdit = (field: string, currentValue: any) => {
    setEditingField(field);
    setTempValue(typeof currentValue === 'object' ? JSON.stringify(currentValue, null, 2) : String(currentValue));
  };

  const handleFieldSave = () => {
    if (editingField) {
      const newContent = { ...content };
      try {
        newContent[editingField] = JSON.parse(tempValue);
      } catch {
        newContent[editingField] = tempValue;
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

  const addNewItem = (arrayField: string) => {
    const newContent = { ...content };
    if (!newContent[arrayField]) newContent[arrayField] = [];
    
    const newItem = {
      title: 'New Item',
      description: 'Item description',
      link: '/link',
      buttonText: 'Learn More'
    };
    
    newContent[arrayField] = [...newContent[arrayField], newItem];
    onChange(newContent);
  };

  const removeItem = (arrayField: string, index: number) => {
    const newContent = { ...content };
    if (newContent[arrayField]) {
      newContent[arrayField] = newContent[arrayField].filter((_: any, i: number) => i !== index);
      onChange(newContent);
    }
  };

  const updateArrayItem = (arrayField: string, index: number, field: string, value: any) => {
    const newContent = { ...content };
    if (newContent[arrayField] && newContent[arrayField][index]) {
      newContent[arrayField][index] = {
        ...newContent[arrayField][index],
        [field]: value
      };
      onChange(newContent);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Schools CTA Editor</h3>
          <p className="text-sm text-gray-600">Manage call-to-action content for schools section</p>
        </div>
        <Badge variant="outline" className="text-blue-600">
          <Info className="w-3 h-3 mr-1" />
          Schools CTA
        </Badge>
      </div>

      <Separator />

      {/* Main CTA Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Main CTA Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              {editingField === 'title' ? (
                <div className="space-y-2">
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
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
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                  <span className="text-sm">{content?.title || 'No title set'}</span>
                  <Button size="sm" variant="outline" onClick={() => handleFieldEdit('title', content?.title || '')}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>

            <div>
              <Label>Subtitle</Label>
              {editingField === 'subtitle' ? (
                <div className="space-y-2">
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
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
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                  <span className="text-sm">{content?.subtitle || 'No subtitle set'}</span>
                  <Button size="sm" variant="outline" onClick={() => handleFieldEdit('subtitle', content?.subtitle || '')}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>Description</Label>
            {editingField === 'description' ? (
              <div className="space-y-2">
                <Textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  rows={3}
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
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                <span className="text-sm">{content?.description || 'No description set'}</span>
                <Button size="sm" variant="outline" onClick={() => handleFieldEdit('description', content?.description || '')}>
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Button Text</Label>
              {editingField === 'buttonText' ? (
                <div className="space-y-2">
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
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
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                  <span className="text-sm">{content?.buttonText || 'No button text set'}</span>
                  <Button size="sm" variant="outline" onClick={() => handleFieldEdit('buttonText', content?.buttonText || '')}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>

            <div>
              <Label>Button Link</Label>
              {editingField === 'buttonLink' ? (
                <div className="space-y-2">
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
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
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                  <span className="text-sm">{content?.buttonLink || 'No button link set'}</span>
                  <Button size="sm" variant="outline" onClick={() => handleFieldEdit('buttonLink', content?.buttonLink || '')}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">CTA Items</CardTitle>
            <Button size="sm" onClick={() => addNewItem('ctaItems')}>
              <Plus className="w-3 h-3 mr-1" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {content?.ctaItems?.map((item: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">CTA Item {index + 1}</h4>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeItem('ctaItems', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Title</Label>
                  <Input
                    value={item.title || ''}
                    onChange={(e) => updateArrayItem('ctaItems', index, 'title', e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Button Text</Label>
                  <Input
                    value={item.buttonText || ''}
                    onChange={(e) => updateArrayItem('ctaItems', index, 'buttonText', e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Link</Label>
                  <Input
                    value={item.link || ''}
                    onChange={(e) => updateArrayItem('ctaItems', index, 'link', e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Description</Label>
                  <Textarea
                    value={item.description || ''}
                    onChange={(e) => updateArrayItem('ctaItems', index, 'description', e.target.value)}
                    rows={2}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          )) || (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="w-8 h-8 mx-auto mb-2" />
              <p>No CTA items added yet</p>
              <Button size="sm" onClick={() => addNewItem('ctaItems')} className="mt-2">
                <Plus className="w-3 h-3 mr-1" />
                Add First Item
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
