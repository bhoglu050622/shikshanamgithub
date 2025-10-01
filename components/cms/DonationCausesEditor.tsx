'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface DonationCausesEditorProps {
  content: {
    title: string;
    subtitle: string;
    causes: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
      targetAmount: string;
      currentAmount: string;
      progress: number;
    }>;
  };
  onChange: (content: any) => void;
}

export default function DonationCausesEditor({ content, onChange }: DonationCausesEditorProps) {
  // Safe content with defaults
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    causes: content?.causes || []
  };

  const updateField = (field: string, value: string) => {
    onChange({
      ...safeContent,
      [field]: value
    });
  };

  const addCause = () => {
    const newCause = {
      id: `cause-${Date.now()}`,
      title: "New Cause",
      description: "Cause description",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      targetAmount: "₹10,00,000",
      currentAmount: "₹0",
      progress: 0
    };
    onChange({
      ...safeContent,
      causes: [...safeContent.causes, newCause]
    });
  };

  const updateCause = (index: number, field: string, value: string | number) => {
    const updatedCauses = [...safeContent.causes];
    updatedCauses[index] = { ...updatedCauses[index], [field]: value };
    onChange({
      ...safeContent,
      causes: updatedCauses
    });
  };

  const removeCause = (index: number) => {
    const updatedCauses = safeContent.causes.filter((_, i) => i !== index);
    onChange({
      ...safeContent,
      causes: updatedCauses
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Causes Section</CardTitle>
          <CardDescription>
            Edit the causes section that showcases donation opportunities
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
              <CardTitle>Donation Causes</CardTitle>
              <CardDescription>Manage causes and fundraising goals</CardDescription>
            </div>
            <Button onClick={addCause} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Cause
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {safeContent.causes.map((cause, index) => (
            <div key={cause.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Cause #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeCause(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={cause.title}
                    onChange={(e) => updateCause(index, 'title', e.target.value)}
                    placeholder="Student Scholarships"
                  />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={cause.image}
                    onChange={(e) => updateCause(index, 'image', e.target.value)}
                    placeholder="https://example.com/cause-image.jpg"
                  />
                </div>
                <div>
                  <Label>Target Amount</Label>
                  <Input
                    value={cause.targetAmount}
                    onChange={(e) => updateCause(index, 'targetAmount', e.target.value)}
                    placeholder="₹50,00,000"
                  />
                </div>
                <div>
                  <Label>Current Amount</Label>
                  <Input
                    value={cause.currentAmount}
                    onChange={(e) => updateCause(index, 'currentAmount', e.target.value)}
                    placeholder="₹32,50,000"
                  />
                </div>
                <div>
                  <Label>Progress (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={cause.progress}
                    onChange={(e) => updateCause(index, 'progress', parseInt(e.target.value))}
                    placeholder="65"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={cause.description}
                    onChange={(e) => updateCause(index, 'description', e.target.value)}
                    placeholder="Help deserving students access quality education"
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
