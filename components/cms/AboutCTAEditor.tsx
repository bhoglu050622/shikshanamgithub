'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw } from 'lucide-react';

interface AboutCTAEditorProps {
  content: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
  onUpdate: (cta: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  }) => void;
}

export default function AboutCTAEditor({ content, onUpdate }: AboutCTAEditorProps) {
  const [cta, setCTA] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(cta);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setCTA(content);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={cta.title}
            onChange={(e) => setCTA({ ...cta, title: e.target.value })}
            placeholder="Enter CTA title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={cta.description}
            onChange={(e) => setCTA({ ...cta, description: e.target.value })}
            placeholder="Enter CTA description"
            rows={3}
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Primary Button</h3>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="primary-text">Button Text</Label>
              <Input
                id="primary-text"
                value={cta.primaryButton.text}
                onChange={(e) => setCTA({
                  ...cta,
                  primaryButton: { ...cta.primaryButton, text: e.target.value }
                })}
                placeholder="Enter button text"
              />
            </div>

            <div>
              <Label htmlFor="primary-link">Button Link</Label>
              <Input
                id="primary-link"
                value={cta.primaryButton.link}
                onChange={(e) => setCTA({
                  ...cta,
                  primaryButton: { ...cta.primaryButton, link: e.target.value }
                })}
                placeholder="Enter button link"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Secondary Button</h3>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="secondary-text">Button Text</Label>
              <Input
                id="secondary-text"
                value={cta.secondaryButton.text}
                onChange={(e) => setCTA({
                  ...cta,
                  secondaryButton: { ...cta.secondaryButton, text: e.target.value }
                })}
                placeholder="Enter button text"
              />
            </div>

            <div>
              <Label htmlFor="secondary-link">Button Link</Label>
              <Input
                id="secondary-link"
                value={cta.secondaryButton.link}
                onChange={(e) => setCTA({
                  ...cta,
                  secondaryButton: { ...cta.secondaryButton, link: e.target.value }
                })}
                placeholder="Enter button link"
              />
            </div>
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
