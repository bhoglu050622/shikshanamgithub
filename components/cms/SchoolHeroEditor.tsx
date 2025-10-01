'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface SchoolHeroEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    ctaButtons: {
      primary: { text: string; link: string };
      secondary: { text: string; link: string };
    };
    features: Array<{
      id: string;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  onUpdate: (hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaButtons: {
      primary: { text: string; link: string };
      secondary: { text: string; link: string };
    };
    features: Array<{
      id: string;
      icon: string;
      title: string;
      description: string;
    }>;
  }) => void;
}

const iconOptions = [
  { value: 'book', label: 'Book' },
  { value: 'users', label: 'Users' },
  { value: 'sparkles', label: 'Sparkles' },
  { value: 'heart', label: 'Heart' },
  { value: 'star', label: 'Star' },
  { value: 'shield', label: 'Shield' }
];

export default function SchoolHeroEditor({ content, onUpdate }: SchoolHeroEditorProps) {
  const [hero, setHero] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(hero);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setHero(content);
  };

  const addFeature = () => {
    const newFeature = {
      id: `feature-${Date.now()}`,
      icon: 'star',
      title: '',
      description: ''
    };
    setHero({
      ...hero,
      features: [...hero.features, newFeature]
    });
  };

  const removeFeature = (id: string) => {
    setHero({
      ...hero,
      features: hero.features.filter(feature => feature.id !== id)
    });
  };

  const updateFeature = (id: string, field: string, value: string) => {
    setHero({
      ...hero,
      features: hero.features.map(feature =>
        feature.id === id ? { ...feature, [field]: value } : feature
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={hero.title}
            onChange={(e) => setHero({ ...hero, title: e.target.value })}
            placeholder="Enter hero title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={hero.subtitle}
            onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
            placeholder="Enter hero subtitle"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={hero.description}
            onChange={(e) => setHero({ ...hero, description: e.target.value })}
            placeholder="Enter hero description"
            rows={4}
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Call-to-Action Buttons</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary-text">Primary Button Text</Label>
              <Input
                id="primary-text"
                value={hero.ctaButtons.primary.text}
                onChange={(e) => setHero({
                  ...hero,
                  ctaButtons: {
                    ...hero.ctaButtons,
                    primary: { ...hero.ctaButtons.primary, text: e.target.value }
                  }
                })}
                placeholder="Enter primary button text"
              />
            </div>
            <div>
              <Label htmlFor="primary-link">Primary Button Link</Label>
              <Input
                id="primary-link"
                value={hero.ctaButtons.primary.link}
                onChange={(e) => setHero({
                  ...hero,
                  ctaButtons: {
                    ...hero.ctaButtons,
                    primary: { ...hero.ctaButtons.primary, link: e.target.value }
                  }
                })}
                placeholder="Enter primary button link"
              />
            </div>
            <div>
              <Label htmlFor="secondary-text">Secondary Button Text</Label>
              <Input
                id="secondary-text"
                value={hero.ctaButtons.secondary.text}
                onChange={(e) => setHero({
                  ...hero,
                  ctaButtons: {
                    ...hero.ctaButtons,
                    secondary: { ...hero.ctaButtons.secondary, text: e.target.value }
                  }
                })}
                placeholder="Enter secondary button text"
              />
            </div>
            <div>
              <Label htmlFor="secondary-link">Secondary Button Link</Label>
              <Input
                id="secondary-link"
                value={hero.ctaButtons.secondary.link}
                onChange={(e) => setHero({
                  ...hero,
                  ctaButtons: {
                    ...hero.ctaButtons,
                    secondary: { ...hero.ctaButtons.secondary, link: e.target.value }
                  }
                })}
                placeholder="Enter secondary button link"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFeature}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </div>

          <div className="space-y-4">
            {hero.features.map((feature, index) => (
              <div key={feature.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Feature {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(feature.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`feature-title-${feature.id}`}>Title</Label>
                    <Input
                      id={`feature-title-${feature.id}`}
                      value={feature.title}
                      onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                      placeholder="Enter feature title"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`feature-description-${feature.id}`}>Description</Label>
                    <Textarea
                      id={`feature-description-${feature.id}`}
                      value={feature.description}
                      onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                      placeholder="Enter feature description"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`feature-icon-${feature.id}`}>Icon</Label>
                    <select
                      id={`feature-icon-${feature.id}`}
                      value={feature.icon}
                      onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    >
                      {iconOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
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
