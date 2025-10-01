'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface DarshanaCommunityEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    platforms: Array<{
      id: string;
      name: string;
      members: string;
      description: string;
    }>;
  };
  onUpdate: (community: {
    title: string;
    subtitle: string;
    description: string;
    platforms: Array<{
      id: string;
      name: string;
      members: string;
      description: string;
    }>;
  }) => void;
}

export default function DarshanaCommunityEditor({ content, onUpdate }: DarshanaCommunityEditorProps) {
  const [community, setCommunity] = useState(content || {
    title: '',
    subtitle: '',
    description: '',
    platforms: []
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(community);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setCommunity(content);
  };

  const addPlatform = () => {
    const newPlatform = {
      id: `platform-${Date.now()}`,
      name: '',
      members: '',
      description: ''
    };
    setCommunity({
      ...community,
      platforms: [...community.platforms, newPlatform]
    });
  };

  const removePlatform = (id: string) => {
    setCommunity({
      ...community,
      platforms: community.platforms.filter(platform => platform.id !== id)
    });
  };

  const updatePlatform = (id: string, field: string, value: string) => {
    setCommunity({
      ...community,
      platforms: (community.platforms || []).map(platform =>
        platform.id === id ? { ...platform, [field]: value } : platform
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
            value={community.title}
            onChange={(e) => setCommunity({ ...community, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={community.subtitle}
            onChange={(e) => setCommunity({ ...community, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>

        <div>
          <Label htmlFor="description">Section Description</Label>
          <Textarea
            id="description"
            value={community.description}
            onChange={(e) => setCommunity({ ...community, description: e.target.value })}
            placeholder="Enter section description"
            rows={3}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Community Platforms</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPlatform}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Platform
            </Button>
          </div>

          <div className="space-y-4">
            {(community.platforms || []).map((platform, index) => (
              <div key={platform.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Platform {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePlatform(platform.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`platform-name-${platform.id}`}>Name</Label>
                      <Input
                        id={`platform-name-${platform.id}`}
                        value={platform.name}
                        onChange={(e) => updatePlatform(platform.id, 'name', e.target.value)}
                        placeholder="Enter platform name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`platform-members-${platform.id}`}>Members</Label>
                      <Input
                        id={`platform-members-${platform.id}`}
                        value={platform.members}
                        onChange={(e) => updatePlatform(platform.id, 'members', e.target.value)}
                        placeholder="e.g., 2,500+"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`platform-description-${platform.id}`}>Description</Label>
                    <Textarea
                      id={`platform-description-${platform.id}`}
                      value={platform.description}
                      onChange={(e) => updatePlatform(platform.id, 'description', e.target.value)}
                      placeholder="Enter platform description"
                      rows={2}
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
