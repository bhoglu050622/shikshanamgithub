'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw } from 'lucide-react';

interface SelfHelpCTAEditorProps {
  content: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  onUpdate: (cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  }) => void;
}

export default function SelfHelpCTAEditor({ content, onUpdate }: SelfHelpCTAEditorProps) {
  const [cta, setCTA] = useState(content || {
    title: '',
    description: '',
    buttonText: '',
    buttonLink: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(cta);
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="buttonText">Button Text</Label>
            <Input
              id="buttonText"
              value={cta.buttonText}
              onChange={(e) => setCTA({ ...cta, buttonText: e.target.value })}
              placeholder="Enter button text"
            />
          </div>
          <div>
            <Label htmlFor="buttonLink">Button Link</Label>
            <Input
              id="buttonLink"
              value={cta.buttonLink}
              onChange={(e) => setCTA({ ...cta, buttonLink: e.target.value })}
              placeholder="Enter button link"
            />
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
