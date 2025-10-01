'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface DarshanaLearningPathEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    phases: Array<{
      id: string;
      title: string;
      titleSanskrit: string;
      description: string;
      detailedDescription: string;
      duration: string;
      modules: Array<{
        id: string;
        text: string;
      }>;
      badge: string;
    }>;
  };
  onUpdate: (learningPath: {
    title: string;
    subtitle: string;
    description: string;
    phases: Array<{
      id: string;
      title: string;
      titleSanskrit: string;
      description: string;
      detailedDescription: string;
      duration: string;
      modules: Array<{
        id: string;
        text: string;
      }>;
      badge: string;
    }>;
  }) => void;
}

export default function DarshanaLearningPathEditor({ content, onUpdate }: DarshanaLearningPathEditorProps) {
  const [learningPath, setLearningPath] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(learningPath);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setLearningPath(content);
  };

  const addPhase = () => {
    const newPhase = {
      id: `phase-${Date.now()}`,
      title: '',
      titleSanskrit: '',
      description: '',
      detailedDescription: '',
      duration: '',
      modules: [],
      badge: ''
    };
    setLearningPath({
      ...learningPath,
      phases: [...learningPath.phases, newPhase]
    });
  };

  const removePhase = (id: string) => {
    setLearningPath({
      ...learningPath,
      phases: learningPath.phases.filter(phase => phase.id !== id)
    });
  };

  const updatePhase = (id: string, field: string, value: string) => {
    setLearningPath({
      ...learningPath,
      phases: learningPath.phases.map(phase =>
        phase.id === id ? { ...phase, [field]: value } : phase
      )
    });
  };

  const addModule = (phaseId: string) => {
    const newModule = {
      id: `module-${Date.now()}`,
      text: ''
    };
    setLearningPath({
      ...learningPath,
      phases: learningPath.phases.map(phase =>
        phase.id === phaseId 
          ? { ...phase, modules: [...phase.modules, newModule] }
          : phase
      )
    });
  };

  const removeModule = (phaseId: string, moduleId: string) => {
    setLearningPath({
      ...learningPath,
      phases: learningPath.phases.map(phase =>
        phase.id === phaseId 
          ? { ...phase, modules: phase.modules.filter(m => m.id !== moduleId) }
          : phase
      )
    });
  };

  const updateModule = (phaseId: string, moduleId: string, text: string) => {
    setLearningPath({
      ...learningPath,
      phases: learningPath.phases.map(phase =>
        phase.id === phaseId 
          ? { 
              ...phase, 
              modules: phase.modules.map(m => 
                m.id === moduleId ? { ...m, text } : m
              )
            }
          : phase
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
            value={learningPath.title}
            onChange={(e) => setLearningPath({ ...learningPath, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={learningPath.subtitle}
            onChange={(e) => setLearningPath({ ...learningPath, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>

        <div>
          <Label htmlFor="description">Section Description</Label>
          <Textarea
            id="description"
            value={learningPath.description}
            onChange={(e) => setLearningPath({ ...learningPath, description: e.target.value })}
            placeholder="Enter section description"
            rows={3}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Learning Phases</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPhase}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Phase
            </Button>
          </div>

          <div className="space-y-6">
            {learningPath.phases.map((phase, index) => (
              <div key={phase.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Phase {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePhase(phase.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`phase-title-${phase.id}`}>Title</Label>
                      <Input
                        id={`phase-title-${phase.id}`}
                        value={phase.title}
                        onChange={(e) => updatePhase(phase.id, 'title', e.target.value)}
                        placeholder="Enter phase title"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`phase-sanskrit-${phase.id}`}>Sanskrit Title</Label>
                      <Input
                        id={`phase-sanskrit-${phase.id}`}
                        value={phase.titleSanskrit}
                        onChange={(e) => updatePhase(phase.id, 'titleSanskrit', e.target.value)}
                        placeholder="Enter Sanskrit title"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`phase-description-${phase.id}`}>Description</Label>
                    <Input
                      id={`phase-description-${phase.id}`}
                      value={phase.description}
                      onChange={(e) => updatePhase(phase.id, 'description', e.target.value)}
                      placeholder="Enter phase description"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`phase-detailed-${phase.id}`}>Detailed Description</Label>
                    <Textarea
                      id={`phase-detailed-${phase.id}`}
                      value={phase.detailedDescription}
                      onChange={(e) => updatePhase(phase.id, 'detailedDescription', e.target.value)}
                      placeholder="Enter detailed description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`phase-duration-${phase.id}`}>Duration</Label>
                      <Input
                        id={`phase-duration-${phase.id}`}
                        value={phase.duration}
                        onChange={(e) => updatePhase(phase.id, 'duration', e.target.value)}
                        placeholder="e.g., 2-3 weeks"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`phase-badge-${phase.id}`}>Badge</Label>
                      <Input
                        id={`phase-badge-${phase.id}`}
                        value={phase.badge}
                        onChange={(e) => updatePhase(phase.id, 'badge', e.target.value)}
                        placeholder="e.g., Foundation"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Modules</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addModule(phase.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Module
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {phase.modules.map((module) => (
                        <div key={module.id} className="flex items-center space-x-2">
                          <Input
                            value={module.text}
                            onChange={(e) => updateModule(phase.id, module.id, e.target.value)}
                            placeholder="Enter module name"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeModule(phase.id, module.id)}
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
