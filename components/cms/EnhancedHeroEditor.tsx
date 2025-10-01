'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, RotateCcw, Plus, Trash2, Palette, Image, Link, Upload } from 'lucide-react';
import { COLOR_PALETTES, ICON_OPTIONS, BACKGROUND_OPTIONS } from '@/lib/cms/enhanced-types';

interface EnhancedHeroEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    background?: {
      type: 'color' | 'image' | 'gradient';
      value: string;
      opacity?: number;
      position?: string;
      size?: string;
      repeat?: string;
    };
    ctaButtons: {
      sanskrit: {
        text: string;
        link: string;
        color?: string;
        backgroundColor?: string;
        hoverColor?: string;
        borderColor?: string;
        borderRadius?: string;
        padding?: string;
        fontSize?: string;
        fontWeight?: string;
      };
      darshan: {
        text: string;
        link: string;
        color?: string;
        backgroundColor?: string;
        hoverColor?: string;
        borderColor?: string;
        borderRadius?: string;
        padding?: string;
        fontSize?: string;
        fontWeight?: string;
      };
      lifeSkills: {
        text: string;
        link: string;
        color?: string;
        backgroundColor?: string;
        hoverColor?: string;
        borderColor?: string;
        borderRadius?: string;
        padding?: string;
        fontSize?: string;
        fontWeight?: string;
      };
    };
    features: Array<{
      id: string;
      icon: {
        name: string;
        color?: string;
        size?: string;
        backgroundColor?: string;
        borderRadius?: string;
      };
      title: string;
      description: string;
      card?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: string;
        shadowColor?: string;
        shadowIntensity?: string;
        padding?: string;
      };
    }>;
  };
  onUpdate: (hero: any) => void;
}

export default function EnhancedHeroEditor({ content, onUpdate }: EnhancedHeroEditorProps) {
  const [hero, setHero] = useState(content || {
    title: '',
    subtitle: '',
    description: '',
    backgroundImage: '',
    ctaButtons: {
      primary: { text: '', link: '' },
      secondary: { text: '', link: '' }
    },
    features: []
  });
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

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
    setHero(content);
  };

  const updateButton = (buttonKey: string, field: string, value: string) => {
    setHero({
      ...hero,
      ctaButtons: {
        ...hero.ctaButtons,
        [buttonKey]: {
          ...(hero.ctaButtons as any)[buttonKey],
          [field]: value
        }
      }
    });
  };

  const updateFeature = (id: string, field: string, value: any) => {
    setHero({
      ...hero,
      features: (hero.features || []).map(feature =>
        feature.id === id ? { ...feature, [field]: value } : feature
      )
    });
  };

  const addFeature = () => {
    const newFeature = {
      id: `feature-${Date.now()}`,
      icon: {
        name: 'star',
        color: '#F59E0B',
        size: '24px',
        backgroundColor: '#FEF3C7',
        borderRadius: '8px'
      },
      title: '',
      description: '',
      card: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderRadius: '12px',
        shadowColor: '#000000',
        shadowIntensity: '0.1',
        padding: '24px'
      }
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

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Edit the main content of the hero section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="background">
          <Card>
            <CardHeader>
              <CardTitle>Background Customization</CardTitle>
              <CardDescription>Customize the background of the hero section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="background-type">Background Type</Label>
                <select
                  id="background-type"
                  value={hero.background?.type || 'color'}
                  onChange={(e) => setHero({
                    ...hero,
                    background: {
                      ...hero.background,
                      type: e.target.value as 'color' | 'image' | 'gradient',
                      value: hero.background?.value || ''
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                >
                  <option value="color">Solid Color</option>
                  <option value="gradient">Gradient</option>
                  <option value="image">Image</option>
                </select>
              </div>

              {hero.background?.type === 'color' && (
                <div>
                  <Label htmlFor="background-color">Background Color</Label>
                  <Input
                    id="background-color"
                    type="color"
                    value={hero.background?.value || '#FFFFFF'}
                    onChange={(e) => setHero({
                      ...hero,
                      background: {
                        ...hero.background,
                        value: e.target.value,
                        type: hero.background?.type || 'color'
                      }
                    })}
                  />
                </div>
              )}

              {hero.background?.type === 'gradient' && (
                <div>
                  <Label htmlFor="background-gradient">Gradient</Label>
                  <select
                    id="background-gradient"
                    value={hero.background?.value || ''}
                    onChange={(e) => setHero({
                      ...hero,
                      background: {
                        ...hero.background,
                        value: e.target.value,
                        type: hero.background?.type || 'color'
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  >
                    {BACKGROUND_OPTIONS.gradients.map((gradient) => (
                      <option key={gradient.name} value={gradient.value}>
                        {gradient.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {hero.background?.type === 'image' && (
                <div>
                  <Label htmlFor="background-image">Background Image URL</Label>
                  <Input
                    id="background-image"
                    value={hero.background?.value || ''}
                    onChange={(e) => setHero({
                      ...hero,
                      background: {
                        ...hero.background,
                        value: e.target.value,
                        type: hero.background?.type || 'color'
                      }
                    })}
                    placeholder="Enter image URL"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="background-opacity">Opacity</Label>
                <Input
                  id="background-opacity"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={hero.background?.opacity || 1}
                  onChange={(e) => setHero({
                    ...hero,
                      background: {
                        ...hero.background,
                        opacity: parseFloat(e.target.value),
                        type: hero.background?.type || 'color',
                        value: hero.background?.value || ''
                      }
                  })}
                />
                <span className="text-sm text-gray-500">{hero.background?.opacity || 1}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buttons">
          <Card>
            <CardHeader>
              <CardTitle>Button Customization</CardTitle>
              <CardDescription>Customize the appearance and behavior of buttons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(hero.ctaButtons).map(([buttonKey, button]) => (
                <div key={buttonKey} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4 capitalize">{buttonKey} Button</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`${buttonKey}-text`}>Button Text</Label>
                      <Input
                        id={`${buttonKey}-text`}
                        value={button.text}
                        onChange={(e) => updateButton(buttonKey, 'text', e.target.value)}
                        placeholder="Enter button text"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${buttonKey}-link`}>Button Link</Label>
                      <Input
                        id={`${buttonKey}-link`}
                        value={button.link}
                        onChange={(e) => updateButton(buttonKey, 'link', e.target.value)}
                        placeholder="Enter button link"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor={`${buttonKey}-color`}>Text Color</Label>
                      <Input
                        id={`${buttonKey}-color`}
                        type="color"
                        value={button.color || '#FFFFFF'}
                        onChange={(e) => updateButton(buttonKey, 'color', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${buttonKey}-bg`}>Background Color</Label>
                      <Input
                        id={`${buttonKey}-bg`}
                        type="color"
                        value={button.backgroundColor || '#F59E0B'}
                        onChange={(e) => updateButton(buttonKey, 'backgroundColor', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${buttonKey}-hover`}>Hover Color</Label>
                      <Input
                        id={`${buttonKey}-hover`}
                        type="color"
                        value={button.hoverColor || '#D97706'}
                        onChange={(e) => updateButton(buttonKey, 'hoverColor', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor={`${buttonKey}-border`}>Border Radius</Label>
                      <Input
                        id={`${buttonKey}-border`}
                        value={button.borderRadius || '8px'}
                        onChange={(e) => updateButton(buttonKey, 'borderRadius', e.target.value)}
                        placeholder="e.g., 8px"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${buttonKey}-padding`}>Padding</Label>
                      <Input
                        id={`${buttonKey}-padding`}
                        value={button.padding || '12px 24px'}
                        onChange={(e) => updateButton(buttonKey, 'padding', e.target.value)}
                        placeholder="e.g., 12px 24px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Features Customization</CardTitle>
              <CardDescription>Customize the features section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
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
                {(hero.features || []).map((feature, index) => (
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

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`feature-icon-${feature.id}`}>Icon</Label>
                          <select
                            id={`feature-icon-${feature.id}`}
                            value={feature.icon.name}
                            onChange={(e) => updateFeature(feature.id, 'icon', {
                              ...feature.icon,
                              name: e.target.value
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                          >
                            {ICON_OPTIONS.map((option) => (
                              <option key={option.name} value={option.name}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor={`feature-icon-color-${feature.id}`}>Icon Color</Label>
                          <Input
                            id={`feature-icon-color-${feature.id}`}
                            type="color"
                            value={feature.icon.color || '#F59E0B'}
                            onChange={(e) => updateFeature(feature.id, 'icon', {
                              ...feature.icon,
                              color: e.target.value
                            })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`feature-card-bg-${feature.id}`}>Card Background</Label>
                          <Input
                            id={`feature-card-bg-${feature.id}`}
                            type="color"
                            value={feature.card?.backgroundColor || '#FFFFFF'}
                            onChange={(e) => updateFeature(feature.id, 'card', {
                              ...feature.card,
                              backgroundColor: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`feature-card-border-${feature.id}`}>Card Border Radius</Label>
                          <Input
                            id={`feature-card-border-${feature.id}`}
                            value={feature.card?.borderRadius || '12px'}
                            onChange={(e) => updateFeature(feature.id, 'card', {
                              ...feature.card,
                              borderRadius: e.target.value
                            })}
                            placeholder="e.g., 12px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
