'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw } from 'lucide-react';

interface SchoolsHeroEditorProps {
  content: {
    title: string;
    subtitle: string;
  };
  onUpdate: (hero: { title: string; subtitle: string }) => void;
}

export default function SchoolsHeroEditor({ content, onUpdate }: SchoolsHeroEditorProps) {
  const [hero, setHero] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(hero);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setHero(content);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={hero.title}
            onChange={(e) => setHero({ ...hero, title: e.target.value })}
            placeholder="Enter hero title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Textarea
            id="subtitle"
            value={hero.subtitle}
            onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
            placeholder="Enter hero subtitle"
            rows={3}
          />
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
