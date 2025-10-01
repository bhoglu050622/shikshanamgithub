'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface AboutOfferingsEditorProps {
  content: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  onUpdate: (offerings: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  }) => void;
}

export default function AboutOfferingsEditor({ content, onUpdate }: AboutOfferingsEditorProps) {
  const [offerings, setOfferings] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(offerings);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setOfferings(content);
  };

  const addItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: '',
      description: ''
    };
    setOfferings({
      ...offerings,
      items: [...offerings.items, newItem]
    });
  };

  const removeItem = (id: string) => {
    setOfferings({
      ...offerings,
      items: offerings.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: string, field: string, value: string) => {
    setOfferings({
      ...offerings,
      items: offerings.items.map(item =>
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
            value={offerings.title}
            onChange={(e) => setOfferings({ ...offerings, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Offerings</Label>
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
            {offerings.items.map((item, index) => (
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
