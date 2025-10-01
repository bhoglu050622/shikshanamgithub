'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface DarshanaAppEditorProps {
  content: {
    title: string;
    description: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  onUpdate: (app: {
    title: string;
    description: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  }) => void;
}

export default function DarshanaAppEditor({ content, onUpdate }: DarshanaAppEditorProps) {
  const [app, setApp] = useState(content || {
    title: '',
    subtitle: '',
    description: '',
    features: []
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(app);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setApp(content);
  };

  const addFeature = () => {
    const newFeature = {
      id: `feature-${Date.now()}`,
      title: '',
      description: ''
    };
    setApp({
      ...app,
      features: [...app.features, newFeature]
    });
  };

  const removeFeature = (id: string) => {
    setApp({
      ...app,
      features: app.features.filter(feature => feature.id !== id)
    });
  };

  const updateFeature = (id: string, field: string, value: string) => {
    setApp({
      ...app,
      features: (app.features || []).map(feature =>
        feature.id === id ? { ...feature, [field]: value } : feature
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
            value={app.title}
            onChange={(e) => setApp({ ...app, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={app.description}
            onChange={(e) => setApp({ ...app, description: e.target.value })}
            placeholder="Enter section description"
            rows={3}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">App Features</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFeature}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </div>

          <div className="space-y-4">
            {(app.features || []).map((feature, index) => (
              <div key={feature.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Feature {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(feature.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`feature-title-${feature.id}`}>Title</Label>
                    <Input
                      id={`feature-title-${feature.id}`}
                      value={feature.title}
                      onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                      placeholder="Enter feature title"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`feature-description-${feature.id}`}>Description</Label>
                    <Textarea
                      id={`feature-description-${feature.id}`}
                      value={feature.description}
                      onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                      placeholder="Enter feature description"
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
