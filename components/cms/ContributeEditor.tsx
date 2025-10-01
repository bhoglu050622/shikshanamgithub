'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ContributeEditorProps {
  content: {
    title: string;
    subtitle: string;
    content: string;
    ctaText: string;
    ctaLink: string;
  };
  onChange: (content: any) => void;
}

export default function ContributeEditor({ content, onChange }: ContributeEditorProps) {
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
          <CardTitle>Contribute Section</CardTitle>
          <CardDescription>
            Edit the contribute section that encourages community participation
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
          <CardTitle>Contribute Content</CardTitle>
          <CardDescription>Edit the contribution call-to-action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Enter contribution content"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ctaText">CTA Button Text</Label>
              <Input
                id="ctaText"
                value={content.ctaText}
                onChange={(e) => updateField('ctaText', e.target.value)}
                placeholder="Get Involved"
              />
            </div>
            <div>
              <Label htmlFor="ctaLink">CTA Button Link</Label>
              <Input
                id="ctaLink"
                value={content.ctaLink}
                onChange={(e) => updateField('ctaLink', e.target.value)}
                placeholder="/contribute"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
