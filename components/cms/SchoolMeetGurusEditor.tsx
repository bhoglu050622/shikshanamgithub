'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface SchoolMeetGurusEditorProps {
  content: {
    title: string;
    subtitle: string;
    gurus: Array<{
      id: string;
      name: string;
      title: string;
      description: string;
      image: string;
      specialties: Array<{
        id: string;
        text: string;
      }>;
    }>;
  };
  onUpdate: (meetGurus: {
    title: string;
    subtitle: string;
    gurus: Array<{
      id: string;
      name: string;
      title: string;
      description: string;
      image: string;
      specialties: Array<{
        id: string;
        text: string;
      }>;
    }>;
  }) => void;
}

export default function SchoolMeetGurusEditor({ content, onUpdate }: SchoolMeetGurusEditorProps) {
  const [meetGurus, setMeetGurus] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(meetGurus);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setMeetGurus(content);
  };

  const addGuru = () => {
    const newGuru = {
      id: `guru-${Date.now()}`,
      name: '',
      title: '',
      description: '',
      image: '',
      specialties: []
    };
    setMeetGurus({
      ...meetGurus,
      gurus: [...meetGurus.gurus, newGuru]
    });
  };

  const removeGuru = (id: string) => {
    setMeetGurus({
      ...meetGurus,
      gurus: meetGurus.gurus.filter(guru => guru.id !== id)
    });
  };

  const updateGuru = (id: string, field: string, value: string) => {
    setMeetGurus({
      ...meetGurus,
      gurus: meetGurus.gurus.map(guru =>
        guru.id === id ? { ...guru, [field]: value } : guru
      )
    });
  };

  const addSpecialty = (guruId: string) => {
    const newSpecialty = {
      id: `specialty-${Date.now()}`,
      text: ''
    };
    setMeetGurus({
      ...meetGurus,
      gurus: meetGurus.gurus.map(guru =>
        guru.id === guruId 
          ? { ...guru, specialties: [...guru.specialties, newSpecialty] }
          : guru
      )
    });
  };

  const removeSpecialty = (guruId: string, specialtyId: string) => {
    setMeetGurus({
      ...meetGurus,
      gurus: meetGurus.gurus.map(guru =>
        guru.id === guruId 
          ? { ...guru, specialties: guru.specialties.filter(s => s.id !== specialtyId) }
          : guru
      )
    });
  };

  const updateSpecialty = (guruId: string, specialtyId: string, text: string) => {
    setMeetGurus({
      ...meetGurus,
      gurus: meetGurus.gurus.map(guru =>
        guru.id === guruId 
          ? { 
              ...guru, 
              specialties: guru.specialties.map(s => 
                s.id === specialtyId ? { ...s, text } : s
              )
            }
          : guru
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
            value={meetGurus.title}
            onChange={(e) => setMeetGurus({ ...meetGurus, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={meetGurus.subtitle}
            onChange={(e) => setMeetGurus({ ...meetGurus, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Gurus</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addGuru}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Guru
            </Button>
          </div>

          <div className="space-y-6">
            {meetGurus.gurus.map((guru, index) => (
              <div key={guru.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Guru {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeGuru(guru.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`guru-name-${guru.id}`}>Name</Label>
                      <Input
                        id={`guru-name-${guru.id}`}
                        value={guru.name}
                        onChange={(e) => updateGuru(guru.id, 'name', e.target.value)}
                        placeholder="Enter guru name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`guru-title-${guru.id}`}>Title</Label>
                      <Input
                        id={`guru-title-${guru.id}`}
                        value={guru.title}
                        onChange={(e) => updateGuru(guru.id, 'title', e.target.value)}
                        placeholder="Enter guru title"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`guru-description-${guru.id}`}>Description</Label>
                    <Textarea
                      id={`guru-description-${guru.id}`}
                      value={guru.description}
                      onChange={(e) => updateGuru(guru.id, 'description', e.target.value)}
                      placeholder="Enter guru description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`guru-image-${guru.id}`}>Image URL</Label>
                    <Input
                      id={`guru-image-${guru.id}`}
                      value={guru.image}
                      onChange={(e) => updateGuru(guru.id, 'image', e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Specialties</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addSpecialty(guru.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Specialty
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {guru.specialties.map((specialty) => (
                        <div key={specialty.id} className="flex items-center space-x-2">
                          <Input
                            value={specialty.text}
                            onChange={(e) => updateSpecialty(guru.id, specialty.id, e.target.value)}
                            placeholder="Enter specialty"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeSpecialty(guru.id, specialty.id)}
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
