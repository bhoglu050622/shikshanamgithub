'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface ContactInfoEditorProps {
  content: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  onUpdate: (contactInfo: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  }) => void;
}

const iconOptions = [
  { value: 'mail', label: 'Mail' },
  { value: 'clock', label: 'Clock' },
  { value: 'map', label: 'Map' },
  { value: 'phone', label: 'Phone' },
  { value: 'user', label: 'User' },
  { value: 'globe', label: 'Globe' }
];

export default function ContactInfoEditor({ content, onUpdate }: ContactInfoEditorProps) {
  const [contactInfo, setContactInfo] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(contactInfo);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setContactInfo(content);
  };

  const addItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: '',
      description: '',
      icon: 'mail'
    };
    setContactInfo({
      ...contactInfo,
      items: [...contactInfo.items, newItem]
    });
  };

  const removeItem = (id: string) => {
    setContactInfo({
      ...contactInfo,
      items: contactInfo.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: string, field: string, value: string) => {
    setContactInfo({
      ...contactInfo,
      items: contactInfo.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            value={contactInfo.title}
            onChange={(e) => setContactInfo({ ...contactInfo, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Contact Information Items</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {contactInfo.items.map((item, index) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`item-title-${item.id}`}>Title</Label>
                    <Input
                      id={`item-title-${item.id}`}
                      value={item.title}
                      onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                      placeholder="Enter item title"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`item-description-${item.id}`}>Description</Label>
                    <Textarea
                      id={`item-description-${item.id}`}
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Enter item description"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`item-icon-${item.id}`}>Icon</Label>
                    <Select
                      value={item.icon}
                      onValueChange={(value) => updateItem(item.id, 'icon', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={isSaving}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
