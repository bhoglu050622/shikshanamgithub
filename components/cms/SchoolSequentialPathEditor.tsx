'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface SchoolSequentialPathEditorProps {
  content: {
    title: string;
    subtitle: string;
    levels: Array<{
      id: string;
      title: string;
      description: string;
      duration: string;
      difficulty: string;
      features: Array<{
        id: string;
        text: string;
      }>;
    }>;
  };
  onUpdate: (sequentialPath: {
    title: string;
    subtitle: string;
    levels: Array<{
      id: string;
      title: string;
      description: string;
      duration: string;
      difficulty: string;
      features: Array<{
        id: string;
        text: string;
      }>;
    }>;
  }) => void;
}

export default function SchoolSequentialPathEditor({ content, onUpdate }: SchoolSequentialPathEditorProps) {
  const [sequentialPath, setSequentialPath] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(sequentialPath);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSequentialPath(content);
  };

  const addLevel = () => {
    const newLevel = {
      id: `level-${Date.now()}`,
      title: '',
      description: '',
      duration: '',
      difficulty: '',
      features: []
    };
    setSequentialPath({
      ...sequentialPath,
      levels: [...sequentialPath.levels, newLevel]
    });
  };

  const removeLevel = (id: string) => {
    setSequentialPath({
      ...sequentialPath,
      levels: sequentialPath.levels.filter(level => level.id !== id)
    });
  };

  const updateLevel = (id: string, field: string, value: string) => {
    setSequentialPath({
      ...sequentialPath,
      levels: sequentialPath.levels.map(level =>
        level.id === id ? { ...level, [field]: value } : level
      )
    });
  };

  const addFeature = (levelId: string) => {
    const newFeature = {
      id: `feature-${Date.now()}`,
      text: ''
    };
    setSequentialPath({
      ...sequentialPath,
      levels: sequentialPath.levels.map(level =>
        level.id === levelId 
          ? { ...level, features: [...level.features, newFeature] }
          : level
      )
    });
  };

  const removeFeature = (levelId: string, featureId: string) => {
    setSequentialPath({
      ...sequentialPath,
      levels: sequentialPath.levels.map(level =>
        level.id === levelId 
          ? { ...level, features: level.features.filter(f => f.id !== featureId) }
          : level
      )
    });
  };

  const updateFeature = (levelId: string, featureId: string, text: string) => {
    setSequentialPath({
      ...sequentialPath,
      levels: sequentialPath.levels.map(level =>
        level.id === levelId 
          ? { 
              ...level, 
              features: level.features.map(f => 
                f.id === featureId ? { ...f, text } : f
              )
            }
          : level
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
            value={sequentialPath.title}
            onChange={(e) => setSequentialPath({ ...sequentialPath, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={sequentialPath.subtitle}
            onChange={(e) => setSequentialPath({ ...sequentialPath, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Learning Levels</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addLevel}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Level
            </Button>
          </div>

          <div className="space-y-6">
            {sequentialPath.levels.map((level, index) => (
              <div key={level.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Level {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeLevel(level.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`level-title-${level.id}`}>Title</Label>
                      <Input
                        id={`level-title-${level.id}`}
                        value={level.title}
                        onChange={(e) => updateLevel(level.id, 'title', e.target.value)}
                        placeholder="Enter level title"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`level-difficulty-${level.id}`}>Difficulty</Label>
                      <Input
                        id={`level-difficulty-${level.id}`}
                        value={level.difficulty}
                        onChange={(e) => updateLevel(level.id, 'difficulty', e.target.value)}
                        placeholder="e.g., Beginner, Intermediate, Advanced"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`level-description-${level.id}`}>Description</Label>
                    <Textarea
                      id={`level-description-${level.id}`}
                      value={level.description}
                      onChange={(e) => updateLevel(level.id, 'description', e.target.value)}
                      placeholder="Enter level description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`level-duration-${level.id}`}>Duration</Label>
                    <Input
                      id={`level-duration-${level.id}`}
                      value={level.duration}
                      onChange={(e) => updateLevel(level.id, 'duration', e.target.value)}
                      placeholder="e.g., 3 months, 6 months"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Features</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addFeature(level.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {level.features.map((feature) => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Input
                            value={feature.text}
                            onChange={(e) => updateFeature(level.id, feature.id, e.target.value)}
                            placeholder="Enter feature text"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeFeature(level.id, feature.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
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
