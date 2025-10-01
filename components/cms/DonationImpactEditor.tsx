'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface DonationImpactEditorProps {
  content: {
    title: string;
    subtitle: string;
    stats: Array<{
      id: string;
      number: string;
      label: string;
      description: string;
    }>;
  };
  onChange: (content: any) => void;
}

export default function DonationImpactEditor({ content, onChange }: DonationImpactEditorProps) {
  // Safe content with defaults
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    stats: content?.stats || []
  };

  const updateField = (field: string, value: string) => {
    onChange({
      ...safeContent,
      [field]: value
    });
  };

  const addStat = () => {
    const newStat = {
      id: `stat-${Date.now()}`,
      number: "0",
      label: "New Stat",
      description: "Stat description"
    };
    onChange({
      ...safeContent,
      stats: [...safeContent.stats, newStat]
    });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const updatedStats = [...safeContent.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    onChange({
      ...safeContent,
      stats: updatedStats
    });
  };

  const removeStat = (index: number) => {
    const updatedStats = safeContent.stats.filter((_, i) => i !== index);
    onChange({
      ...safeContent,
      stats: updatedStats
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Impact Section</CardTitle>
          <CardDescription>
            Edit the impact section that shows donation statistics
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
              <CardTitle>Impact Statistics</CardTitle>
              <CardDescription>Manage impact statistics and numbers</CardDescription>
            </div>
            <Button onClick={addStat} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Statistic
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {safeContent.stats.map((stat, index) => (
            <div key={stat.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Statistic #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeStat(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Number</Label>
                  <Input
                    value={stat.number}
                    onChange={(e) => updateStat(index, 'number', e.target.value)}
                    placeholder="10,000+"
                  />
                </div>
                <div>
                  <Label>Label</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    placeholder="Students Helped"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={stat.description}
                    onChange={(e) => updateStat(index, 'description', e.target.value)}
                    placeholder="Learners who have benefited from our programs"
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
