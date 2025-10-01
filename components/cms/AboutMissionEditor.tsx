'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw } from 'lucide-react';

interface AboutMissionEditorProps {
  content: {
    title: string;
    description: string;
    vision: {
      title: string;
      description: string;
    };
  };
  onUpdate: (mission: {
    title: string;
    description: string;
    vision: {
      title: string;
      description: string;
    };
  }) => void;
}

export default function AboutMissionEditor({ content, onUpdate }: AboutMissionEditorProps) {
  const [mission, setMission] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(mission);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setMission(content);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Mission Title</Label>
          <Input
            id="title"
            value={mission.title}
            onChange={(e) => setMission({ ...mission, title: e.target.value })}
            placeholder="Enter mission title"
          />
        </div>

        <div>
          <Label htmlFor="description">Mission Description</Label>
          <Textarea
            id="description"
            value={mission.description}
            onChange={(e) => setMission({ ...mission, description: e.target.value })}
            placeholder="Enter mission description"
            rows={4}
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Vision</h3>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="vision-title">Vision Title</Label>
              <Input
                id="vision-title"
                value={mission.vision.title}
                onChange={(e) => setMission({
                  ...mission,
                  vision: { ...mission.vision, title: e.target.value }
                })}
                placeholder="Enter vision title"
              />
            </div>

            <div>
              <Label htmlFor="vision-description">Vision Description</Label>
              <Textarea
                id="vision-description"
                value={mission.vision.description}
                onChange={(e) => setMission({
                  ...mission,
                  vision: { ...mission.vision, description: e.target.value }
                })}
                placeholder="Enter vision description"
                rows={3}
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
