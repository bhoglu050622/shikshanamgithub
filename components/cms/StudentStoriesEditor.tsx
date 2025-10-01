'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface StudentStoriesEditorProps {
  content: {
    title: string;
    subtitle: string;
    stories: Array<{
      id: string;
      name: string;
      story: string;
      image: string;
      rating: number;
    }>;
  };
  onChange: (content: any) => void;
}

export default function StudentStoriesEditor({ content, onChange }: StudentStoriesEditorProps) {
  // Safe content with defaults
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    stories: content?.stories || []
  };
  const updateField = (field: string, value: string) => {
    onChange({
      ...content,
      [field]: value
    });
  };

  const addStory = () => {
    const newStory = {
      id: `story-${Date.now()}`,
      name: "Student Name",
      story: "Student success story",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      rating: 5
    };
    onChange({
      ...content,
      stories: [...safeContent.stories, newStory]
    });
  };

  const updateStory = (index: number, field: string, value: string | number) => {
    const updatedStories = [...safeContent.stories];
    updatedStories[index] = { ...updatedStories[index], [field]: value };
    onChange({
      ...content,
      stories: updatedStories
    });
  };

  const removeStory = (index: number) => {
    const updatedStories = safeContent.stories.filter((_, i) => i !== index);
    onChange({
      ...content,
      stories: updatedStories
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Stories Section</CardTitle>
          <CardDescription>
            Edit the student stories section that showcases success stories
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
              <CardTitle>Student Stories</CardTitle>
              <CardDescription>Manage student success stories</CardDescription>
            </div>
            <Button onClick={addStory} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Story
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {safeContent.stories.map((story, index) => (
            <div key={story.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Story #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeStory(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Student Name</Label>
                  <Input
                    value={story.name}
                    onChange={(e) => updateStory(index, 'name', e.target.value)}
                    placeholder="Student name"
                  />
                </div>
                <div>
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={story.rating}
                    onChange={(e) => updateStory(index, 'rating', parseFloat(e.target.value))}
                    placeholder="5"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Image URL</Label>
                  <Input
                    value={story.image}
                    onChange={(e) => updateStory(index, 'image', e.target.value)}
                    placeholder="https://example.com/student-image.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Story</Label>
                  <Textarea
                    value={story.story}
                    onChange={(e) => updateStory(index, 'story', e.target.value)}
                    placeholder="Student success story and experience"
                    rows={4}
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
