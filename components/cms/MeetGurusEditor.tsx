'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface MeetGurusEditorProps {
  content: {
    title: string;
    subtitle: string;
    gurus: Array<{
      id: string;
      name: string;
      title: string;
      image: string;
      description: string;
      link: string;
    }>;
  };
  onChange: (content: any) => void;
}

export default function MeetGurusEditor({ content, onChange }: MeetGurusEditorProps) {
  // Safe content with defaults
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    gurus: content?.gurus || []
  };

  const updateField = (field: string, value: string) => {
    onChange({
      ...safeContent,
      [field]: value
    });
  };

  const addGuru = () => {
    const newGuru = {
      id: `guru-${Date.now()}`,
      name: "New Guru",
      title: "Guru Title",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Guru description",
      link: "/gurus/new-guru"
    };
    onChange({
      ...safeContent,
      gurus: [...safeContent.gurus, newGuru]
    });
  };

  const updateGuru = (index: number, field: string, value: string) => {
    const updatedGurus = [...safeContent.gurus];
    updatedGurus[index] = { ...updatedGurus[index], [field]: value };
    onChange({
      ...safeContent,
      gurus: updatedGurus
    });
  };

  const removeGuru = (index: number) => {
    const updatedGurus = safeContent.gurus.filter((_, i) => i !== index);
    onChange({
      ...safeContent,
      gurus: updatedGurus
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meet Gurus Section</CardTitle>
          <CardDescription>
            Edit the gurus section that showcases your teachers and mentors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={safeContent.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter section title"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Section Subtitle</Label>
            <Textarea
              id="subtitle"
              value={safeContent.subtitle}
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
              <CardTitle>Gurus</CardTitle>
              <CardDescription>Manage the gurus/teachers section</CardDescription>
            </div>
            <Button onClick={addGuru} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Guru
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {safeContent.gurus.map((guru, index) => (
            <div key={guru.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Guru #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeGuru(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={guru.name}
                    onChange={(e) => updateGuru(index, 'name', e.target.value)}
                    placeholder="Guru name"
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={guru.title}
                    onChange={(e) => updateGuru(index, 'title', e.target.value)}
                    placeholder="Guru title/position"
                  />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={guru.image}
                    onChange={(e) => updateGuru(index, 'image', e.target.value)}
                    placeholder="https://example.com/guru-image.jpg"
                  />
                </div>
                <div>
                  <Label>Link</Label>
                  <Input
                    value={guru.link}
                    onChange={(e) => updateGuru(index, 'link', e.target.value)}
                    placeholder="/gurus/guru-name"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={guru.description}
                    onChange={(e) => updateGuru(index, 'description', e.target.value)}
                    placeholder="Guru description and background"
                    rows={3}
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
