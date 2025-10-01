'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface DarshanaSchoolsEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    schools: Array<{
      id: string;
      name: string;
      sanskrit: string;
      description: string;
      detailedDescription: string;
      keyConcepts: Array<{
        id: string;
        text: string;
      }>;
      founder: string;
      text: string;
      duration: string;
      difficulty: string;
      students: string;
      rating: number;
    }>;
  };
  onUpdate: (darshanas: {
    title: string;
    subtitle: string;
    description: string;
    schools: Array<{
      id: string;
      name: string;
      sanskrit: string;
      description: string;
      detailedDescription: string;
      keyConcepts: Array<{
        id: string;
        text: string;
      }>;
      founder: string;
      text: string;
      duration: string;
      difficulty: string;
      students: string;
      rating: number;
    }>;
  }) => void;
}

export default function DarshanaSchoolsEditor({ content, onUpdate }: DarshanaSchoolsEditorProps) {
  const [darshanas, setDarshanas] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(darshanas);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setDarshanas(content);
  };

  const addSchool = () => {
    const newSchool = {
      id: `school-${Date.now()}`,
      name: '',
      sanskrit: '',
      description: '',
      detailedDescription: '',
      keyConcepts: [],
      founder: '',
      text: '',
      duration: '',
      difficulty: '',
      students: '',
      rating: 0
    };
    setDarshanas({
      ...darshanas,
      schools: [...darshanas.schools, newSchool]
    });
  };

  const removeSchool = (id: string) => {
    setDarshanas({
      ...darshanas,
      schools: darshanas.schools.filter(school => school.id !== id)
    });
  };

  const updateSchool = (id: string, field: string, value: string | number) => {
    setDarshanas({
      ...darshanas,
      schools: darshanas.schools.map(school =>
        school.id === id ? { ...school, [field]: value } : school
      )
    });
  };

  const addConcept = (schoolId: string) => {
    const newConcept = {
      id: `concept-${Date.now()}`,
      text: ''
    };
    setDarshanas({
      ...darshanas,
      schools: darshanas.schools.map(school =>
        school.id === schoolId 
          ? { ...school, keyConcepts: [...school.keyConcepts, newConcept] }
          : school
      )
    });
  };

  const removeConcept = (schoolId: string, conceptId: string) => {
    setDarshanas({
      ...darshanas,
      schools: darshanas.schools.map(school =>
        school.id === schoolId 
          ? { ...school, keyConcepts: school.keyConcepts.filter(c => c.id !== conceptId) }
          : school
      )
    });
  };

  const updateConcept = (schoolId: string, conceptId: string, text: string) => {
    setDarshanas({
      ...darshanas,
      schools: darshanas.schools.map(school =>
        school.id === schoolId 
          ? { 
              ...school, 
              keyConcepts: school.keyConcepts.map(c => 
                c.id === conceptId ? { ...c, text } : c
              )
            }
          : school
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
            value={darshanas.title}
            onChange={(e) => setDarshanas({ ...darshanas, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={darshanas.subtitle}
            onChange={(e) => setDarshanas({ ...darshanas, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>

        <div>
          <Label htmlFor="description">Section Description</Label>
          <Textarea
            id="description"
            value={darshanas.description}
            onChange={(e) => setDarshanas({ ...darshanas, description: e.target.value })}
            placeholder="Enter section description"
            rows={3}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Philosophical Schools</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSchool}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add School
            </Button>
          </div>

          <div className="space-y-6">
            {darshanas.schools.map((school, index) => (
              <div key={school.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">School {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSchool(school.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`school-name-${school.id}`}>Name</Label>
                      <Input
                        id={`school-name-${school.id}`}
                        value={school.name}
                        onChange={(e) => updateSchool(school.id, 'name', e.target.value)}
                        placeholder="Enter school name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`school-sanskrit-${school.id}`}>Sanskrit</Label>
                      <Input
                        id={`school-sanskrit-${school.id}`}
                        value={school.sanskrit}
                        onChange={(e) => updateSchool(school.id, 'sanskrit', e.target.value)}
                        placeholder="Enter Sanskrit name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`school-description-${school.id}`}>Description</Label>
                    <Input
                      id={`school-description-${school.id}`}
                      value={school.description}
                      onChange={(e) => updateSchool(school.id, 'description', e.target.value)}
                      placeholder="Enter short description"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`school-detailed-${school.id}`}>Detailed Description</Label>
                    <Textarea
                      id={`school-detailed-${school.id}`}
                      value={school.detailedDescription}
                      onChange={(e) => updateSchool(school.id, 'detailedDescription', e.target.value)}
                      placeholder="Enter detailed description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`school-founder-${school.id}`}>Founder</Label>
                      <Input
                        id={`school-founder-${school.id}`}
                        value={school.founder}
                        onChange={(e) => updateSchool(school.id, 'founder', e.target.value)}
                        placeholder="Enter founder name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`school-duration-${school.id}`}>Duration</Label>
                      <Input
                        id={`school-duration-${school.id}`}
                        value={school.duration}
                        onChange={(e) => updateSchool(school.id, 'duration', e.target.value)}
                        placeholder="e.g., 6-8 weeks"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`school-difficulty-${school.id}`}>Difficulty</Label>
                      <Input
                        id={`school-difficulty-${school.id}`}
                        value={school.difficulty}
                        onChange={(e) => updateSchool(school.id, 'difficulty', e.target.value)}
                        placeholder="e.g., Intermediate"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`school-students-${school.id}`}>Students</Label>
                      <Input
                        id={`school-students-${school.id}`}
                        value={school.students}
                        onChange={(e) => updateSchool(school.id, 'students', e.target.value)}
                        placeholder="e.g., 1,200+"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`school-rating-${school.id}`}>Rating</Label>
                      <Input
                        id={`school-rating-${school.id}`}
                        type="number"
                        step="0.1"
                        value={school.rating}
                        onChange={(e) => updateSchool(school.id, 'rating', parseFloat(e.target.value) || 0)}
                        placeholder="e.g., 4.8"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Key Concepts</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addConcept(school.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Concept
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {school.keyConcepts.map((concept) => (
                        <div key={concept.id} className="flex items-center space-x-2">
                          <Input
                            value={concept.text}
                            onChange={(e) => updateConcept(school.id, concept.id, e.target.value)}
                            placeholder="Enter concept"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeConcept(school.id, concept.id)}
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
