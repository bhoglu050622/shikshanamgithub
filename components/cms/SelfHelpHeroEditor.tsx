'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface SelfHelpHeroEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    ctaButtons: {
      primary: { text: string; link: string };
      secondary: { text: string; link: string };
    };
    stats: Array<{
      id: string;
      number: string;
      label: string;
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
    stats: Array<{
      id: string;
      number: string;
      label: string;
    }>;
  }) => void;
}

export default function SelfHelpHeroEditor({ content, onUpdate }: SelfHelpHeroEditorProps) {
  // Add null checks and default values
  const safeContent = content || {
    title: '',
    subtitle: '',
    description: '',
    ctaButtons: {
      primary: { text: '', link: '' },
      secondary: { text: '', link: '' }
    },
    stats: []
  };

  const [hero, setHero] = useState(safeContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(hero);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setHero(safeContent);
  };

  const addStat = () => {
    const newStat = {
      id: `stat-${Date.now()}`,
      number: '',
      label: ''
    };
    setHero({
      ...hero,
      stats: [...(hero.stats || []), newStat]
    });
  };

  const removeStat = (id: string) => {
    setHero({
      ...hero,
      stats: (hero.stats || []).filter(stat => stat.id !== id)
    });
  };

  const updateStat = (id: string, field: string, value: string) => {
    setHero({
      ...hero,
      stats: (hero.stats || []).map(stat =>
        stat.id === id ? { ...stat, [field]: value } : stat
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
                value={hero.ctaButtons?.primary?.text || ''}
                onChange={(e) => setHero({
                  ...hero,
                  ctaButtons: {
                    ...(hero.ctaButtons || {}),
                    primary: { ...(hero.ctaButtons?.primary || {}), text: e.target.value }
                  }
                })}
                placeholder="Enter primary button text"
              />
            </div>
            <div>
              <Label htmlFor="primary-link">Primary Button Link</Label>
              <Input
                id="primary-link"
                value={hero.ctaButtons?.primary?.link || ''}
                onChange={(e) => setHero({
                  ...hero,
                  ctaButtons: {
                    ...(hero.ctaButtons || {}),
                    primary: { ...(hero.ctaButtons?.primary || {}), link: e.target.value }
                  }
                })}
                placeholder="Enter primary button link"
              />
            </div>
            <div>
              <Label htmlFor="secondary-text">Secondary Button Text</Label>
              <Input
                id="secondary-text"
                value={hero.ctaButtons?.secondary?.text || ''}
                onChange={(e) => setHero({
                  ...hero,
                  ctaButtons: {
                    ...(hero.ctaButtons || {}),
                    secondary: { ...(hero.ctaButtons?.secondary || {}), text: e.target.value }
                  }
                })}
                placeholder="Enter secondary button text"
              />
            </div>
            <div>
              <Label htmlFor="secondary-link">Secondary Button Link</Label>
              <Input
                id="secondary-link"
                value={hero.ctaButtons?.secondary?.link || ''}
                onChange={(e) => setHero({
                  ...hero,
                  ctaButtons: {
                    ...(hero.ctaButtons || {}),
                    secondary: { ...(hero.ctaButtons?.secondary || {}), link: e.target.value }
                  }
                })}
                placeholder="Enter secondary button link"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Statistics</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addStat}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Stat
            </Button>
          </div>

          <div className="space-y-4">
            {(hero.stats || []).map((stat, index) => (
              <div key={stat.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Stat {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeStat(stat.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`stat-number-${stat.id}`}>Number</Label>
                    <Input
                      id={`stat-number-${stat.id}`}
                      value={stat.number}
                      onChange={(e) => updateStat(stat.id, 'number', e.target.value)}
                      placeholder="Enter stat number"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`stat-label-${stat.id}`}>Label</Label>
                    <Input
                      id={`stat-label-${stat.id}`}
                      value={stat.label}
                      onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                      placeholder="Enter stat label"
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
