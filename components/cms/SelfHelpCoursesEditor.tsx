'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface SelfHelpCoursesEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    programs: Array<{
      id: string;
      title: string;
      description: string;
      duration: string;
      difficulty: string;
      students: string;
      rating: number;
      features: Array<{
        id: string;
        text: string;
      }>;
    }>;
  };
  onUpdate: (courses: {
    title: string;
    subtitle: string;
    description: string;
    programs: Array<{
      id: string;
      title: string;
      description: string;
      duration: string;
      difficulty: string;
      students: string;
      rating: number;
      features: Array<{
        id: string;
        text: string;
      }>;
    }>;
  }) => void;
}

export default function SelfHelpCoursesEditor({ content, onUpdate }: SelfHelpCoursesEditorProps) {
  const [courses, setCourses] = useState(content || {
    title: '',
    subtitle: '',
    description: '',
    programs: []
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(courses);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setCourses(content);
  };

  const addProgram = () => {
    const newProgram = {
      id: `program-${Date.now()}`,
      title: '',
      description: '',
      duration: '',
      difficulty: '',
      students: '',
      rating: 0,
      features: []
    };
    setCourses({
      ...courses,
      programs: [...(courses.programs || []), newProgram]
    });
  };

  const removeProgram = (id: string) => {
    setCourses({
      ...courses,
      programs: (courses.programs || []).filter(program => program.id !== id)
    });
  };

  const updateProgram = (id: string, field: string, value: string | number) => {
    setCourses({
      ...courses,
      programs: (courses.programs || []).map(program =>
        program.id === id ? { ...program, [field]: value } : program
      )
    });
  };

  const addFeature = (programId: string) => {
    const newFeature = {
      id: `feature-${Date.now()}`,
      text: ''
    };
    setCourses({
      ...courses,
      programs: (courses.programs || []).map(program =>
        program.id === programId
          ? { ...program, features: [...(program.features || []), newFeature] }
          : program
      )
    });
  };

  const removeFeature = (programId: string, featureId: string) => {
    setCourses({
      ...courses,
      programs: (courses.programs || []).map(program =>
        program.id === programId 
          ? { ...program, features: (program.features || []).filter(f => f.id !== featureId) }
          : program
      )
    });
  };

  const updateFeature = (programId: string, featureId: string, text: string) => {
    setCourses({
      ...courses,
      programs: (courses.programs || []).map(program =>
        program.id === programId 
          ? { 
              ...program, 
              features: (program.features || []).map(f => 
                f.id === featureId ? { ...f, text } : f
              )
            }
          : program
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
            value={courses.title}
            onChange={(e) => setCourses({ ...courses, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={courses.subtitle}
            onChange={(e) => setCourses({ ...courses, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>

        <div>
          <Label htmlFor="description">Section Description</Label>
          <Textarea
            id="description"
            value={courses.description}
            onChange={(e) => setCourses({ ...courses, description: e.target.value })}
            placeholder="Enter section description"
            rows={3}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Programs</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addProgram}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Program
            </Button>
          </div>

          <div className="space-y-6">
            {(courses.programs || []).map((program, index) => (
              <div key={program.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Program {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeProgram(program.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`program-title-${program.id}`}>Title</Label>
                    <Input
                      id={`program-title-${program.id}`}
                      value={program.title}
                      onChange={(e) => updateProgram(program.id, 'title', e.target.value)}
                      placeholder="Enter program title"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`program-description-${program.id}`}>Description</Label>
                    <Textarea
                      id={`program-description-${program.id}`}
                      value={program.description}
                      onChange={(e) => updateProgram(program.id, 'description', e.target.value)}
                      placeholder="Enter program description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`program-duration-${program.id}`}>Duration</Label>
                      <Input
                        id={`program-duration-${program.id}`}
                        value={program.duration}
                        onChange={(e) => updateProgram(program.id, 'duration', e.target.value)}
                        placeholder="e.g., 8 weeks"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`program-difficulty-${program.id}`}>Difficulty</Label>
                      <Input
                        id={`program-difficulty-${program.id}`}
                        value={program.difficulty}
                        onChange={(e) => updateProgram(program.id, 'difficulty', e.target.value)}
                        placeholder="e.g., Beginner"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`program-students-${program.id}`}>Students</Label>
                      <Input
                        id={`program-students-${program.id}`}
                        value={program.students}
                        onChange={(e) => updateProgram(program.id, 'students', e.target.value)}
                        placeholder="e.g., 3,200+"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`program-rating-${program.id}`}>Rating</Label>
                    <Input
                      id={`program-rating-${program.id}`}
                      type="number"
                      step="0.1"
                      value={program.rating}
                      onChange={(e) => updateProgram(program.id, 'rating', parseFloat(e.target.value) || 0)}
                      placeholder="e.g., 4.9"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Features</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addFeature(program.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {(program.features || []).map((feature) => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Input
                            value={feature.text}
                            onChange={(e) => updateFeature(program.id, feature.id, e.target.value)}
                            placeholder="Enter feature"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeFeature(program.id, feature.id)}
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
