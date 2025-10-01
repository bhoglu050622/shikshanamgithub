'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface HeroEditorProps {
  content: {
    title: string;
    subtitle: string;
    ctaButtons: {
      sanskrit: { text: string; link: string; };
      darshan: { text: string; link: string; };
      lifeSkills: { text: string; link: string; };
    };
  };
  onChange: (content: any) => void;
}

export default function HeroEditor({ content, onChange }: HeroEditorProps) {
  // Add comprehensive null checks and default values
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    ctaButtons: {
      sanskrit: {
        text: content?.ctaButtons?.sanskrit?.text || '',
        link: content?.ctaButtons?.sanskrit?.link || ''
      },
      darshan: {
        text: content?.ctaButtons?.darshan?.text || '',
        link: content?.ctaButtons?.darshan?.link || ''
      },
      lifeSkills: {
        text: content?.ctaButtons?.lifeSkills?.text || '',
        link: content?.ctaButtons?.lifeSkills?.link || ''
      }
    }
  };

  const updateField = (field: string, value: string) => {
    onChange({
      ...safeContent,
      [field]: value
    });
  };

  const updateCTAButton = (button: string, field: string, value: string) => {
    const currentContent = content || {};
    const currentCtaButtons = currentContent.ctaButtons || {};
    const currentButton = currentCtaButtons[button as keyof typeof currentCtaButtons] || {};
    
    onChange({
      ...currentContent,
      ctaButtons: {
        ...currentCtaButtons,
        [button]: {
          ...currentButton,
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>
            Edit the main hero section that appears at the top of your homepage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Main Title</Label>
            <Input
              id="title"
              value={safeContent.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter the main title"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea
              id="subtitle"
              value={safeContent.subtitle || ''}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Enter the subtitle"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Call-to-Action Buttons</CardTitle>
          <CardDescription>
            Configure the three main action buttons in the hero section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sanskrit Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
            <div>
              <Label htmlFor="sanskrit-text">Sanskrit Button Text</Label>
              <Input
                id="sanskrit-text"
                value={safeContent.ctaButtons.sanskrit.text || ''}
                onChange={(e) => updateCTAButton('sanskrit', 'text', e.target.value)}
                placeholder="Button text"
              />
            </div>
            <div>
              <Label htmlFor="sanskrit-link">Sanskrit Button Link</Label>
              <Input
                id="sanskrit-link"
                value={safeContent.ctaButtons.sanskrit.link || ''}
                onChange={(e) => updateCTAButton('sanskrit', 'link', e.target.value)}
                placeholder="#school-of-sanskrit"
              />
            </div>
          </div>

          {/* Darshan Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
            <div>
              <Label htmlFor="darshan-text">Darshan Button Text</Label>
              <Input
                id="darshan-text"
                value={safeContent.ctaButtons.darshan.text || ''}
                onChange={(e) => updateCTAButton('darshan', 'text', e.target.value)}
                placeholder="Button text"
              />
            </div>
            <div>
              <Label htmlFor="darshan-link">Darshan Button Link</Label>
              <Input
                id="darshan-link"
                value={safeContent.ctaButtons.darshan.link || ''}
                onChange={(e) => updateCTAButton('darshan', 'link', e.target.value)}
                placeholder="#school-of-darshan"
              />
            </div>
          </div>

          {/* Life Skills Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
            <div>
              <Label htmlFor="life-skills-text">Life Skills Button Text</Label>
              <Input
                id="life-skills-text"
                value={safeContent.ctaButtons.lifeSkills.text || ''}
                onChange={(e) => updateCTAButton('lifeSkills', 'text', e.target.value)}
                placeholder="Button text"
              />
            </div>
            <div>
              <Label htmlFor="life-skills-link">Life Skills Button Link</Label>
              <Input
                id="life-skills-link"
                value={safeContent.ctaButtons.lifeSkills.link || ''}
                onChange={(e) => updateCTAButton('lifeSkills', 'link', e.target.value)}
                placeholder="#school-of-life-skills"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
