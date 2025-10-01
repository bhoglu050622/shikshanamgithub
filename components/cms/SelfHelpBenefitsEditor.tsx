'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface SelfHelpBenefitsEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    advantages: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  onUpdate: (benefits: {
    title: string;
    subtitle: string;
    description: string;
    advantages: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  }) => void;
}

export default function SelfHelpBenefitsEditor({ content, onUpdate }: SelfHelpBenefitsEditorProps) {
  const [benefits, setBenefits] = useState(content || {
    title: '',
    subtitle: '',
    description: '',
    advantages: []
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(benefits);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setBenefits(content);
  };

  const addAdvantage = () => {
    const newAdvantage = {
      id: `advantage-${Date.now()}`,
      title: '',
      description: ''
    };
    setBenefits({
      ...benefits,
      advantages: [...(benefits.advantages || []), newAdvantage]
    });
  };

  const removeAdvantage = (id: string) => {
    setBenefits({
      ...benefits,
      advantages: (benefits.advantages || []).filter(advantage => advantage.id !== id)
    });
  };

  const updateAdvantage = (id: string, field: string, value: string) => {
    setBenefits({
      ...benefits,
      advantages: (benefits.advantages || []).map(advantage =>
        advantage.id === id ? { ...advantage, [field]: value } : advantage
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
            value={benefits.title}
            onChange={(e) => setBenefits({ ...benefits, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={benefits.subtitle}
            onChange={(e) => setBenefits({ ...benefits, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>

        <div>
          <Label htmlFor="description">Section Description</Label>
          <Textarea
            id="description"
            value={benefits.description}
            onChange={(e) => setBenefits({ ...benefits, description: e.target.value })}
            placeholder="Enter section description"
            rows={3}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Advantages</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAdvantage}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Advantage
            </Button>
          </div>

          <div className="space-y-4">
            {(benefits.advantages || []).map((advantage, index) => (
              <div key={advantage.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Advantage {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeAdvantage(advantage.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`advantage-title-${advantage.id}`}>Title</Label>
                    <Input
                      id={`advantage-title-${advantage.id}`}
                      value={advantage.title}
                      onChange={(e) => updateAdvantage(advantage.id, 'title', e.target.value)}
                      placeholder="Enter advantage title"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`advantage-description-${advantage.id}`}>Description</Label>
                    <Textarea
                      id={`advantage-description-${advantage.id}`}
                      value={advantage.description}
                      onChange={(e) => updateAdvantage(advantage.id, 'description', e.target.value)}
                      placeholder="Enter advantage description"
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
