'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface SchoolsEditorProps {
  content: {
    title: string;
    subtitle: string;
    schools: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      link: string;
      color: string;
    }>;
  };
  onChange: (content: any) => void;
}

export default function SchoolsEditor({ content, onChange }: SchoolsEditorProps) {
  // Add comprehensive null checks and default values
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    schools: content?.schools || []
  };

  const updateField = (field: string, value: string) => {
    onChange({
      ...safeContent,
      [field]: value
    });
  };

  const addSchool = () => {
    const newSchool = {
      id: `school-${Date.now()}`,
      name: "New School",
      description: "School description",
      icon: "book",
      link: "/schools/new-school",
      color: "primary"
    };
    onChange({
      ...safeContent,
      schools: [...(safeContent.schools || []), newSchool]
    });
  };

  const updateSchool = (index: number, field: string, value: string) => {
    const updatedSchools = [...(safeContent.schools || [])];
    updatedSchools[index] = { ...updatedSchools[index], [field]: value };
    onChange({
      ...safeContent,
      schools: updatedSchools
    });
  };

  const removeSchool = (index: number) => {
    const updatedSchools = (safeContent.schools || []).filter((_, i) => i !== index);
    onChange({
      ...safeContent,
      schools: updatedSchools
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Schools Section</CardTitle>
          <CardDescription>
            Edit the schools section that showcases different learning paths
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={safeContent.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter section title"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Section Subtitle</Label>
            <Textarea
              id="subtitle"
              value={safeContent.subtitle || ''}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Enter section subtitle"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Schools</CardTitle>
              <CardDescription>Manage the different schools/learning paths</CardDescription>
            </div>
            <Button onClick={addSchool} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add School
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(safeContent.schools || []).map((school, index) => (
            <div key={school.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">School #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSchool(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={school.name}
                    onChange={(e) => updateSchool(index, 'name', e.target.value)}
                    placeholder="School name"
                  />
                </div>
                <div>
                  <Label>Icon</Label>
                  <Input
                    value={school.icon}
                    onChange={(e) => updateSchool(index, 'icon', e.target.value)}
                    placeholder="book, users, etc."
                  />
                </div>
                <div>
                  <Label>Link</Label>
                  <Input
                    value={school.link}
                    onChange={(e) => updateSchool(index, 'link', e.target.value)}
                    placeholder="/schools/school-name"
                  />
                </div>
                <div>
                  <Label>Color</Label>
                  <Input
                    value={school.color}
                    onChange={(e) => updateSchool(index, 'color', e.target.value)}
                    placeholder="primary, secondary, accent"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={school.description}
                    onChange={(e) => updateSchool(index, 'description', e.target.value)}
                    placeholder="School description"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
