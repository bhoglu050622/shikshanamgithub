'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface SchoolsListEditorProps {
  content: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
    color: string;
    features: Array<{
      id: string;
      text: string;
    }>;
  }>;
  onUpdate: (schools: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
    color: string;
    features: Array<{
      id: string;
      text: string;
    }>;
  }>) => void;
}

const iconOptions = [
  { value: 'book', label: 'Book' },
  { value: 'lightbulb', label: 'Lightbulb' },
  { value: 'users', label: 'Users' },
  { value: 'heart', label: 'Heart' },
  { value: 'star', label: 'Star' },
  { value: 'shield', label: 'Shield' }
];

const colorOptions = [
  { value: 'from-saffron-500 to-saffron-600', label: 'Saffron' },
  { value: 'from-deep-teal-500 to-deep-teal-600', label: 'Deep Teal' },
  { value: 'from-indigo-500 to-indigo-600', label: 'Indigo' },
  { value: 'from-purple-500 to-purple-600', label: 'Purple' },
  { value: 'from-green-500 to-green-600', label: 'Green' },
  { value: 'from-red-500 to-red-600', label: 'Red' }
];

export default function SchoolsListEditor({ content, onUpdate }: SchoolsListEditorProps) {
  const [schools, setSchools] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(schools);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSchools(content);
  };

  const addSchool = () => {
    const newSchool = {
      id: `school-${Date.now()}`,
      title: '',
      description: '',
      icon: 'book',
      href: '',
      color: 'from-saffron-500 to-saffron-600',
      features: []
    };
    setSchools([...schools, newSchool]);
  };

  const removeSchool = (id: string) => {
    setSchools(schools.filter(school => school.id !== id));
  };

  const updateSchool = (id: string, field: string, value: string) => {
    setSchools(schools.map(school =>
      school.id === id ? { ...school, [field]: value } : school
    ));
  };

  const addFeature = (schoolId: string) => {
    const newFeature = {
      id: `feature-${Date.now()}`,
      text: ''
    };
    setSchools(schools.map(school =>
      school.id === schoolId 
        ? { ...school, features: [...school.features, newFeature] }
        : school
    ));
  };

  const removeFeature = (schoolId: string, featureId: string) => {
    setSchools(schools.map(school =>
      school.id === schoolId 
        ? { ...school, features: school.features.filter(f => f.id !== featureId) }
        : school
    ));
  };

  const updateFeature = (schoolId: string, featureId: string, text: string) => {
    setSchools(schools.map(school =>
      school.id === schoolId 
        ? { 
            ...school, 
            features: school.features.map(f => 
              f.id === featureId ? { ...f, text } : f
            )
          }
        : school
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Schools</h3>
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
        {schools.map((school, index) => (
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
                  <Label htmlFor={`school-title-${school.id}`}>Title</Label>
                  <Input
                    id={`school-title-${school.id}`}
                    value={school.title}
                    onChange={(e) => updateSchool(school.id, 'title', e.target.value)}
                    placeholder="Enter school title"
                  />
                </div>
                <div>
                  <Label htmlFor={`school-href-${school.id}`}>Link</Label>
                  <Input
                    id={`school-href-${school.id}`}
                    value={school.href}
                    onChange={(e) => updateSchool(school.id, 'href', e.target.value)}
                    placeholder="Enter school link"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`school-description-${school.id}`}>Description</Label>
                <Textarea
                  id={`school-description-${school.id}`}
                  value={school.description}
                  onChange={(e) => updateSchool(school.id, 'description', e.target.value)}
                  placeholder="Enter school description"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`school-icon-${school.id}`}>Icon</Label>
                  <Select
                    value={school.icon}
                    onValueChange={(value) => updateSchool(school.id, 'icon', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`school-color-${school.id}`}>Color</Label>
                  <Select
                    value={school.color}
                    onValueChange={(value) => updateSchool(school.id, 'color', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Features</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addFeature(school.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Feature
                  </Button>
                </div>

                <div className="space-y-2">
                  {school.features.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Input
                        value={feature.text}
                        onChange={(e) => updateFeature(school.id, feature.id, e.target.value)}
                        placeholder="Enter feature text"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(school.id, feature.id)}
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
