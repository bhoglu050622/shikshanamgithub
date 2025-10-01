'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface TestimonialsEditorProps {
  content: {
    title: string;
    subtitle: string;
    testimonials: Array<{
      id: string;
      name: string;
      role: string;
      content: string;
      image: string;
      rating: number;
    }>;
  };
  onChange: (content: any) => void;
}

export default function TestimonialsEditor({ content, onChange }: TestimonialsEditorProps) {
  // Safe content with defaults
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    testimonials: content?.testimonials || []
  };

  const updateField = (field: string, value: string) => {
    onChange({
      ...safeContent,
      [field]: value
    });
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: `testimonial-${Date.now()}`,
      name: "Customer Name",
      role: "Customer Role",
      content: "Testimonial content",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      rating: 5
    };
    onChange({
      ...safeContent,
      testimonials: [...safeContent.testimonials, newTestimonial]
    });
  };

  const updateTestimonial = (index: number, field: string, value: string | number) => {
    const updatedTestimonials = [...safeContent.testimonials];
    updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
    onChange({
      ...safeContent,
      testimonials: updatedTestimonials
    });
  };

  const removeTestimonial = (index: number) => {
    const updatedTestimonials = safeContent.testimonials.filter((_, i) => i !== index);
    onChange({
      ...safeContent,
      testimonials: updatedTestimonials
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Testimonials Section</CardTitle>
          <CardDescription>
            Edit the testimonials section that showcases customer feedback
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
              <CardTitle>Testimonials</CardTitle>
              <CardDescription>Manage customer testimonials</CardDescription>
            </div>
            <Button onClick={addTestimonial} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {safeContent.testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Testimonial #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeTestimonial(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                    placeholder="Customer name"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input
                    value={testimonial.role}
                    onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                    placeholder="Customer role/position"
                  />
                </div>
                <div>
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={testimonial.rating}
                    onChange={(e) => updateTestimonial(index, 'rating', parseFloat(e.target.value))}
                    placeholder="5"
                  />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={testimonial.image}
                    onChange={(e) => updateTestimonial(index, 'image', e.target.value)}
                    placeholder="https://example.com/customer-image.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Testimonial Content</Label>
                  <Textarea
                    value={testimonial.content}
                    onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                    placeholder="Customer testimonial text"
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
