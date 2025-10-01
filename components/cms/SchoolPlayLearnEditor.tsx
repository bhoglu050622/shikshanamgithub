'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface SchoolPlayLearnEditorProps {
  content: {
    title: string;
    subtitle: string;
    flashcards: Array<{
      id: string;
      front: string;
      back: string;
      category: string;
    }>;
  };
  onUpdate: (playLearn: {
    title: string;
    subtitle: string;
    flashcards: Array<{
      id: string;
      front: string;
      back: string;
      category: string;
    }>;
  }) => void;
}

export default function SchoolPlayLearnEditor({ content, onUpdate }: SchoolPlayLearnEditorProps) {
  const [playLearn, setPlayLearn] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(playLearn);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setPlayLearn(content);
  };

  const addFlashcard = () => {
    const newFlashcard = {
      id: `flashcard-${Date.now()}`,
      front: '',
      back: '',
      category: ''
    };
    setPlayLearn({
      ...playLearn,
      flashcards: [...playLearn.flashcards, newFlashcard]
    });
  };

  const removeFlashcard = (id: string) => {
    setPlayLearn({
      ...playLearn,
      flashcards: playLearn.flashcards.filter(flashcard => flashcard.id !== id)
    });
  };

  const updateFlashcard = (id: string, field: string, value: string) => {
    setPlayLearn({
      ...playLearn,
      flashcards: playLearn.flashcards.map(flashcard =>
        flashcard.id === id ? { ...flashcard, [field]: value } : flashcard
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
            value={playLearn.title}
            onChange={(e) => setPlayLearn({ ...playLearn, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={playLearn.subtitle}
            onChange={(e) => setPlayLearn({ ...playLearn, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Flashcards</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFlashcard}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Flashcard
            </Button>
          </div>

          <div className="space-y-4">
            {playLearn.flashcards.map((flashcard, index) => (
              <div key={flashcard.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Flashcard {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFlashcard(flashcard.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`flashcard-front-${flashcard.id}`}>Front (Sanskrit)</Label>
                    <Input
                      id={`flashcard-front-${flashcard.id}`}
                      value={flashcard.front}
                      onChange={(e) => updateFlashcard(flashcard.id, 'front', e.target.value)}
                      placeholder="Enter Sanskrit text"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`flashcard-back-${flashcard.id}`}>Back (Translation)</Label>
                    <Textarea
                      id={`flashcard-back-${flashcard.id}`}
                      value={flashcard.back}
                      onChange={(e) => updateFlashcard(flashcard.id, 'back', e.target.value)}
                      placeholder="Enter translation or explanation"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`flashcard-category-${flashcard.id}`}>Category</Label>
                    <Input
                      id={`flashcard-category-${flashcard.id}`}
                      value={flashcard.category}
                      onChange={(e) => updateFlashcard(flashcard.id, 'category', e.target.value)}
                      placeholder="Enter category (e.g., Greetings, Philosophy)"
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
