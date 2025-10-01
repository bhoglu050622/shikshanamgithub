'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Type, 
  Layout, 
  Sparkles, 
  Check, 
  Copy,
  Download,
  Upload,
  Save,
  RotateCcw
} from 'lucide-react';

interface DesignTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    heading: string;
    body: string;
    button: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: string;
  shadows: string;
}

const DESIGN_THEMES: DesignTheme[] = [
  {
    id: 'modern',
    name: 'Modern Minimal',
    description: 'Clean, contemporary design with subtle shadows',
    colors: {
      primary: '#3B82F6',
      secondary: '#64748B',
      accent: '#F59E0B',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    typography: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      button: 'Inter, sans-serif'
    },
    spacing: {
      small: '0.5rem',
      medium: '1rem',
      large: '2rem'
    },
    borderRadius: '0.5rem',
    shadows: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  {
    id: 'classic',
    name: 'Classic Traditional',
    description: 'Timeless design with warm colors and serif fonts',
    colors: {
      primary: '#8B4513',
      secondary: '#A0522D',
      accent: '#DAA520',
      background: '#FDF5E6',
      text: '#2F1B14'
    },
    typography: {
      heading: 'Playfair Display, serif',
      body: 'Source Serif Pro, serif',
      button: 'Source Serif Pro, serif'
    },
    spacing: {
      small: '0.75rem',
      medium: '1.5rem',
      large: '3rem'
    },
    borderRadius: '0.25rem',
    shadows: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  {
    id: 'vibrant',
    name: 'Vibrant Energy',
    description: 'Bold colors and dynamic design for high energy',
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFE66D',
      background: '#FFFFFF',
      text: '#2C3E50'
    },
    typography: {
      heading: 'Poppins, sans-serif',
      body: 'Open Sans, sans-serif',
      button: 'Poppins, sans-serif'
    },
    spacing: {
      small: '0.5rem',
      medium: '1rem',
      large: '2rem'
    },
    borderRadius: '1rem',
    shadows: '0 8px 25px rgba(0, 0, 0, 0.15)'
  },
  {
    id: 'elegant',
    name: 'Elegant Luxury',
    description: 'Sophisticated design with premium feel',
    colors: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
      accent: '#E67E22',
      background: '#F8F9FA',
      text: '#2C3E50'
    },
    typography: {
      heading: 'Montserrat, sans-serif',
      body: 'Lato, sans-serif',
      button: 'Montserrat, sans-serif'
    },
    spacing: {
      small: '0.75rem',
      medium: '1.5rem',
      large: '3rem'
    },
    borderRadius: '0.375rem',
    shadows: '0 10px 30px rgba(0, 0, 0, 0.1)'
  },
  {
    id: 'nature',
    name: 'Natural Organic',
    description: 'Earth tones and organic shapes for natural feel',
    colors: {
      primary: '#27AE60',
      secondary: '#8E44AD',
      accent: '#F39C12',
      background: '#FEFEFE',
      text: '#2C3E50'
    },
    typography: {
      heading: 'Nunito, sans-serif',
      body: 'Nunito Sans, sans-serif',
      button: 'Nunito, sans-serif'
    },
    spacing: {
      small: '0.5rem',
      medium: '1rem',
      large: '2rem'
    },
    borderRadius: '1.5rem',
    shadows: '0 4px 20px rgba(0, 0, 0, 0.08)'
  },
  {
    id: 'monochrome',
    name: 'Monochrome Minimal',
    description: 'Black and white with subtle grays for maximum focus',
    colors: {
      primary: '#000000',
      secondary: '#6B7280',
      accent: '#EF4444',
      background: '#FFFFFF',
      text: '#111827'
    },
    typography: {
      heading: 'Helvetica, sans-serif',
      body: 'Helvetica, sans-serif',
      button: 'Helvetica, sans-serif'
    },
    spacing: {
      small: '0.5rem',
      medium: '1rem',
      large: '2rem'
    },
    borderRadius: '0.25rem',
    shadows: '0 2px 8px rgba(0, 0, 0, 0.1)'
  }
];

interface OneClickDesignSystemProps {
  content: any;
  onUpdate: (content: any) => void;
  sectionName: string;
}

export default function OneClickDesignSystem({ content, onUpdate, sectionName }: OneClickDesignSystemProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [customTheme, setCustomTheme] = useState<Partial<DesignTheme>>({});
  const [isCustomizing, setIsCustomizing] = useState(false);

  const applyTheme = useCallback((theme: DesignTheme) => {
    const updatedContent = {
      ...content,
      design: {
        theme: theme.id,
        colors: theme.colors,
        typography: theme.typography,
        spacing: theme.spacing,
        borderRadius: theme.borderRadius,
        shadows: theme.shadows,
        appliedAt: new Date().toISOString()
      }
    };
    
    onUpdate(updatedContent);
    setSelectedTheme(theme.id);
  }, [content, onUpdate]);

  const applyCustomTheme = useCallback(() => {
    if (!customTheme.colors || !customTheme.typography) return;
    
    const updatedContent = {
      ...content,
      design: {
        theme: 'custom',
        colors: customTheme.colors,
        typography: customTheme.typography,
        spacing: customTheme.spacing || DESIGN_THEMES[0].spacing,
        borderRadius: customTheme.borderRadius || DESIGN_THEMES[0].borderRadius,
        shadows: customTheme.shadows || DESIGN_THEMES[0].shadows,
        appliedAt: new Date().toISOString()
      }
    };
    
    onUpdate(updatedContent);
    setIsCustomizing(false);
  }, [content, onUpdate, customTheme]);

  const resetDesign = useCallback(() => {
    const updatedContent = { ...content };
    delete updatedContent.design;
    onUpdate(updatedContent);
    setSelectedTheme(null);
  }, [content, onUpdate]);

  const exportTheme = useCallback(() => {
    if (!content.design) return;
    
    const themeData = {
      name: 'Custom Theme',
      ...content.design,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [content.design]);

  const renderThemePreview = (theme: DesignTheme) => {
    return (
      <div 
        className="p-4 rounded-lg border-2 border-gray-200"
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          fontFamily: theme.typography.body,
          borderRadius: theme.borderRadius,
          boxShadow: theme.shadows
        }}
      >
        <h3 
          className="text-lg font-bold mb-2"
          style={{
            color: theme.colors.primary,
            fontFamily: theme.typography.heading
          }}
        >
          Sample Heading
        </h3>
        <p 
          className="mb-3"
          style={{ color: theme.colors.text }}
        >
          This is how your content will look with this theme.
        </p>
        <button
          className="px-4 py-2 rounded text-sm font-medium"
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            fontFamily: theme.typography.button,
            borderRadius: theme.borderRadius
          }}
        >
          Sample Button
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Palette className="w-5 h-5 text-purple-500" />
            <span>One-Click Design System</span>
          </h3>
          <p className="text-sm text-gray-600">Apply beautiful themes instantly</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCustomizing(!isCustomizing)}
          >
            <Palette className="w-4 h-4 mr-1" />
            Customize
          </Button>
          {content.design && (
            <Button
              variant="outline"
              size="sm"
              onClick={exportTheme}
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Current Theme */}
      {content.design && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Current Theme</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium capitalize">{content.design.theme} Theme</h4>
                <p className="text-sm text-gray-600">Applied {new Date(content.design.appliedAt).toLocaleString()}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetDesign}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Theme Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DESIGN_THEMES.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTheme === theme.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => applyTheme(theme)}
          >
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>{theme.name}</span>
                {selectedTheme === theme.id && (
                  <Badge variant="default" className="bg-green-500">
                    <Check className="w-3 h-3 mr-1" />
                    Applied
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-gray-600">{theme.description}</p>
            </CardHeader>
            <CardContent>
              {renderThemePreview(theme)}
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colors.primary }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colors.secondary }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colors.accent }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  {theme.typography.heading.split(',')[0]}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Theme Builder */}
      {isCustomizing && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Custom Theme Builder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Primary Color</label>
                <input
                  type="color"
                  value={customTheme.colors?.primary || '#3B82F6'}
                  onChange={(e) => setCustomTheme(prev => ({
                    ...prev,
                    colors: { 
                      primary: e.target.value,
                      secondary: prev.colors?.secondary || '#64748B',
                      accent: prev.colors?.accent || '#F59E0B',
                      background: prev.colors?.background || '#FFFFFF',
                      text: prev.colors?.text || '#1F2937'
                    }
                  }))}
                  className="w-full h-10 rounded border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Secondary Color</label>
                <input
                  type="color"
                  value={customTheme.colors?.secondary || '#64748B'}
                  onChange={(e) => setCustomTheme(prev => ({
                    ...prev,
                    colors: { 
                      primary: prev.colors?.primary || '#3B82F6',
                      secondary: e.target.value,
                      accent: prev.colors?.accent || '#F59E0B',
                      background: prev.colors?.background || '#FFFFFF',
                      text: prev.colors?.text || '#1F2937'
                    }
                  }))}
                  className="w-full h-10 rounded border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Accent Color</label>
                <input
                  type="color"
                  value={customTheme.colors?.accent || '#F59E0B'}
                  onChange={(e) => setCustomTheme(prev => ({
                    ...prev,
                    colors: { 
                      primary: prev.colors?.primary || '#3B82F6',
                      secondary: prev.colors?.secondary || '#64748B',
                      accent: e.target.value,
                      background: prev.colors?.background || '#FFFFFF',
                      text: prev.colors?.text || '#1F2937'
                    }
                  }))}
                  className="w-full h-10 rounded border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Background Color</label>
                <input
                  type="color"
                  value={customTheme.colors?.background || '#FFFFFF'}
                  onChange={(e) => setCustomTheme(prev => ({
                    ...prev,
                    colors: { 
                      primary: prev.colors?.primary || '#3B82F6',
                      secondary: prev.colors?.secondary || '#64748B',
                      accent: prev.colors?.accent || '#F59E0B',
                      background: e.target.value,
                      text: prev.colors?.text || '#1F2937'
                    }
                  }))}
                  className="w-full h-10 rounded border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Heading Font</label>
                <select
                  value={customTheme.typography?.heading || 'Inter, sans-serif'}
                  onChange={(e) => setCustomTheme(prev => ({
                    ...prev,
                    typography: { 
                      heading: e.target.value,
                      body: prev.typography?.body || 'Inter, sans-serif',
                      button: prev.typography?.button || 'Inter, sans-serif'
                    }
                  }))}
                  className="w-full p-2 border rounded"
                >
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="Playfair Display, serif">Playfair Display</option>
                  <option value="Poppins, sans-serif">Poppins</option>
                  <option value="Montserrat, sans-serif">Montserrat</option>
                  <option value="Nunito, sans-serif">Nunito</option>
                  <option value="Helvetica, sans-serif">Helvetica</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Body Font</label>
                <select
                  value={customTheme.typography?.body || 'Inter, sans-serif'}
                  onChange={(e) => setCustomTheme(prev => ({
                    ...prev,
                    typography: { 
                      heading: prev.typography?.heading || 'Inter, sans-serif',
                      body: e.target.value,
                      button: prev.typography?.button || 'Inter, sans-serif'
                    }
                  }))}
                  className="w-full p-2 border rounded"
                >
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="Source Serif Pro, serif">Source Serif Pro</option>
                  <option value="Open Sans, sans-serif">Open Sans</option>
                  <option value="Lato, sans-serif">Lato</option>
                  <option value="Nunito Sans, sans-serif">Nunito Sans</option>
                  <option value="Helvetica, sans-serif">Helvetica</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={applyCustomTheme}
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Apply Custom Theme
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCustomizing(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Design Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Design Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">🎨 Color Harmony</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use 60-30-10 rule for color distribution</li>
                <li>• Ensure sufficient contrast for readability</li>
                <li>• Test colors on different devices</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">📝 Typography</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Limit to 2-3 font families maximum</li>
                <li>• Use font sizes that scale well</li>
                <li>• Ensure good line spacing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
