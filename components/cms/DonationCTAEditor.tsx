'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface DonationCTAEditorProps {
  content: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
  onChange: (content: any) => void;
}

export default function DonationCTAEditor({ content, onChange }: DonationCTAEditorProps) {
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
          <CardTitle>Call-to-Action Section</CardTitle>
          <CardDescription>
            Edit the final CTA section that encourages donations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">CTA Title</Label>
            <Input
              id="title"
              value={content.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Ready to Make a Difference?"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">CTA Subtitle</Label>
            <Textarea
              id="subtitle"
              value={content.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Join thousands of supporters in preserving ancient wisdom"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={content.buttonText}
                onChange={(e) => updateField('buttonText', e.target.value)}
                placeholder="Donate Now"
              />
            </div>
            <div>
              <Label htmlFor="buttonLink">Button Link</Label>
              <Input
                id="buttonLink"
                value={content.buttonLink}
                onChange={(e) => updateField('buttonLink', e.target.value)}
                placeholder="#donation-form"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
