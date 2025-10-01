'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface SelfHelpTestimonialsEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    reviews: Array<{
      id: string;
      name: string;
      role: string;
      content: string;
      rating: number;
    }>;
  };
  onUpdate: (testimonials: {
    title: string;
    subtitle: string;
    description: string;
    reviews: Array<{
      id: string;
      name: string;
      role: string;
      content: string;
      rating: number;
    }>;
  }) => void;
}

export default function SelfHelpTestimonialsEditor({ content, onUpdate }: SelfHelpTestimonialsEditorProps) {
  const [testimonials, setTestimonials] = useState(content || {
    title: '',
    subtitle: '',
    description: '',
    reviews: []
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(testimonials);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setTestimonials(content);
  };

  const addReview = () => {
    const newReview = {
      id: `review-${Date.now()}`,
      name: '',
      role: '',
      content: '',
      rating: 5
    };
    setTestimonials({
      ...testimonials,
      reviews: [...(testimonials.reviews || []), newReview]
    });
  };

  const removeReview = (id: string) => {
    setTestimonials({
      ...testimonials,
      reviews: (testimonials.reviews || []).filter(review => review.id !== id)
    });
  };

  const updateReview = (id: string, field: string, value: string | number) => {
    setTestimonials({
      ...testimonials,
      reviews: (testimonials.reviews || []).map(review =>
        review.id === id ? { ...review, [field]: value } : review
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            value={testimonials.title}
            onChange={(e) => setTestimonials({ ...testimonials, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={testimonials.subtitle}
            onChange={(e) => setTestimonials({ ...testimonials, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>

        <div>
          <Label htmlFor="description">Section Description</Label>
          <Textarea
            id="description"
            value={testimonials.description}
            onChange={(e) => setTestimonials({ ...testimonials, description: e.target.value })}
            placeholder="Enter section description"
            rows={3}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addReview}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Review
            </Button>
          </div>

          <div className="space-y-4">
            {(testimonials.reviews || []).map((review, index) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Review {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeReview(review.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`review-name-${review.id}`}>Name</Label>
                      <Input
                        id={`review-name-${review.id}`}
                        value={review.name}
                        onChange={(e) => updateReview(review.id, 'name', e.target.value)}
                        placeholder="Enter reviewer name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`review-role-${review.id}`}>Role</Label>
                      <Input
                        id={`review-role-${review.id}`}
                        value={review.role}
                        onChange={(e) => updateReview(review.id, 'role', e.target.value)}
                        placeholder="Enter reviewer role"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`review-content-${review.id}`}>Content</Label>
                    <Textarea
                      id={`review-content-${review.id}`}
                      value={review.content}
                      onChange={(e) => updateReview(review.id, 'content', e.target.value)}
                      placeholder="Enter review content"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`review-rating-${review.id}`}>Rating</Label>
                    <Input
                      id={`review-rating-${review.id}`}
                      type="number"
                      min="1"
                      max="5"
                      value={review.rating}
                      onChange={(e) => updateReview(review.id, 'rating', parseInt(e.target.value) || 5)}
                      placeholder="Enter rating (1-5)"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={isSaving}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
