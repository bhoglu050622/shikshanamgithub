'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw } from 'lucide-react';

interface ContactQuickHelpEditorProps {
  content: {
    title: string;
    description: string;
    link: {
      text: string;
      url: string;
    };
  };
  onUpdate: (quickHelp: {
    title: string;
    description: string;
    link: {
      text: string;
      url: string;
    };
  }) => void;
}

export default function ContactQuickHelpEditor({ content, onUpdate }: ContactQuickHelpEditorProps) {
  const [quickHelp, setQuickHelp] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(quickHelp);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setQuickHelp(content);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={quickHelp.title}
            onChange={(e) => setQuickHelp({ ...quickHelp, title: e.target.value })}
            placeholder="Enter title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={quickHelp.description}
            onChange={(e) => setQuickHelp({ ...quickHelp, description: e.target.value })}
            placeholder="Enter description"
            rows={3}
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Link</h3>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="link-text">Link Text</Label>
              <Input
                id="link-text"
                value={quickHelp.link.text}
                onChange={(e) => setQuickHelp({
                  ...quickHelp,
                  link: { ...quickHelp.link, text: e.target.value }
                })}
                placeholder="Enter link text"
              />
            </div>

            <div>
              <Label htmlFor="link-url">Link URL</Label>
              <Input
                id="link-url"
                value={quickHelp.link.url}
                onChange={(e) => setQuickHelp({
                  ...quickHelp,
                  link: { ...quickHelp.link, url: e.target.value }
                })}
                placeholder="Enter link URL"
              />
            </div>
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
