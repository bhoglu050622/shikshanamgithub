'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface FoundersMissionEditorProps {
  content: {
    title: string;
    subtitle: string;
    content: string;
    image: string;
    founderName: string;
    founderTitle: string;
  };
  onChange: (content: any) => void;
}

export default function FoundersMissionEditor({ content, onChange }: FoundersMissionEditorProps) {
  const updateField = (field: string, value: string) => {
    onChange({
      ...content,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Founder's Mission Section</CardTitle>
          <CardDescription>
            Edit the founder's mission section that showcases your organization's purpose
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={content.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter section title"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Section Subtitle</Label>
            <Textarea
              id="subtitle"
              value={content.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Enter section subtitle"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mission Content</CardTitle>
          <CardDescription>Edit the mission statement and founder information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="content">Mission Content</Label>
            <Textarea
              id="content"
              value={content.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Enter mission statement"
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={content.image}
              onChange={(e) => updateField('image', e.target.value)}
              placeholder="https://example.com/mission-image.jpg"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="founderName">Founder Name</Label>
              <Input
                id="founderName"
                value={content.founderName}
                onChange={(e) => updateField('founderName', e.target.value)}
                placeholder="Founder name"
              />
            </div>
            <div>
              <Label htmlFor="founderTitle">Founder Title</Label>
              <Input
                id="founderTitle"
                value={content.founderTitle}
                onChange={(e) => updateField('founderTitle', e.target.value)}
                placeholder="Founder title/position"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
