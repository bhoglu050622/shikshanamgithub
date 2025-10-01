'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface DonationHeroEditorProps {
  content: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  onChange: (content: any) => void;
}

export default function DonationHeroEditor({ content, onChange }: DonationHeroEditorProps) {
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
          <CardTitle>Donation Hero Section</CardTitle>
          <CardDescription>
            Edit the main hero section of the donation page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Hero Title</Label>
            <Input
              id="title"
              value={content.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter the hero title"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Hero Subtitle</Label>
            <Textarea
              id="subtitle"
              value={content.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Enter the hero subtitle"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="backgroundImage">Background Image URL</Label>
            <Input
              id="backgroundImage"
              value={content.backgroundImage}
              onChange={(e) => updateField('backgroundImage', e.target.value)}
              placeholder="https://example.com/hero-image.jpg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
