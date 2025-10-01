'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface DarshanaMissionEditorProps {
  content: {
    title: string;
    quote: string;
    values: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  onUpdate: (mission: {
    title: string;
    quote: string;
    values: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  }) => void;
}

export default function DarshanaMissionEditor({ content, onUpdate }: DarshanaMissionEditorProps) {
  const [mission, setMission] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(mission);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setMission(content);
  };

  const addValue = () => {
    const newValue = {
      id: `value-${Date.now()}`,
      title: '',
      description: ''
    };
    setMission({
      ...mission,
      values: [...mission.values, newValue]
    });
  };

  const removeValue = (id: string) => {
    setMission({
      ...mission,
      values: mission.values.filter(value => value.id !== id)
    });
  };

  const updateValue = (id: string, field: string, value: string) => {
    setMission({
      ...mission,
      values: mission.values.map(val =>
        val.id === id ? { ...val, [field]: value } : val
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
            value={mission.title}
            onChange={(e) => setMission({ ...mission, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="quote">Mission Quote</Label>
          <Textarea
            id="quote"
            value={mission.quote}
            onChange={(e) => setMission({ ...mission, quote: e.target.value })}
            placeholder="Enter mission quote"
            rows={3}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Values</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addValue}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Value
            </Button>
          </div>

          <div className="space-y-4">
            {mission.values.map((value, index) => (
              <div key={value.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Value {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeValue(value.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`value-title-${value.id}`}>Title</Label>
                    <Input
                      id={`value-title-${value.id}`}
                      value={value.title}
                      onChange={(e) => updateValue(value.id, 'title', e.target.value)}
                      placeholder="Enter value title"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`value-description-${value.id}`}>Description</Label>
                    <Textarea
                      id={`value-description-${value.id}`}
                      value={value.description}
                      onChange={(e) => updateValue(value.id, 'description', e.target.value)}
                      placeholder="Enter value description"
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
