'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface ContactFormEditorProps {
  content: {
    title: string;
    fields: {
      firstName: { label: string; placeholder: string };
      lastName: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      subject: { label: string; placeholder: string; options: Array<{ value: string; label: string }> };
      message: { label: string; placeholder: string };
    };
    submitButton: { text: string };
  };
  onUpdate: (form: {
    title: string;
    fields: {
      firstName: { label: string; placeholder: string };
      lastName: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      subject: { label: string; placeholder: string; options: Array<{ value: string; label: string }> };
      message: { label: string; placeholder: string };
    };
    submitButton: { text: string };
  }) => void;
}

export default function ContactFormEditor({ content, onUpdate }: ContactFormEditorProps) {
  const [form, setForm] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(form);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setForm(content);
  };

  const addSubjectOption = () => {
    const newOption = {
      value: '',
      label: ''
    };
    setForm({
      ...form,
      fields: {
        ...form.fields,
        subject: {
          ...form.fields.subject,
          options: [...form.fields.subject.options, newOption]
        }
      }
    });
  };

  const removeSubjectOption = (index: number) => {
    setForm({
      ...form,
      fields: {
        ...form.fields,
        subject: {
          ...form.fields.subject,
          options: form.fields.subject.options.filter((_, i) => i !== index)
        }
      }
    });
  };

  const updateSubjectOption = (index: number, field: string, value: string) => {
    setForm({
      ...form,
      fields: {
        ...form.fields,
        subject: {
          ...form.fields.subject,
          options: form.fields.subject.options.map((option, i) =>
            i === index ? { ...option, [field]: value } : option
          )
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Form Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter form title"
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Form Fields</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName-label">First Name Label</Label>
                <Input
                  id="firstName-label"
                  value={form.fields.firstName.label}
                  onChange={(e) => setForm({
                    ...form,
                    fields: {
                      ...form.fields,
                      firstName: { ...form.fields.firstName, label: e.target.value }
                    }
                  })}
                  placeholder="Enter label"
                />
              </div>
              <div>
                <Label htmlFor="firstName-placeholder">First Name Placeholder</Label>
                <Input
                  id="firstName-placeholder"
                  value={form.fields.firstName.placeholder}
                  onChange={(e) => setForm({
                    ...form,
                    fields: {
                      ...form.fields,
                      firstName: { ...form.fields.firstName, placeholder: e.target.value }
                    }
                  })}
                  placeholder="Enter placeholder"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastName-label">Last Name Label</Label>
                <Input
                  id="lastName-label"
                  value={form.fields.lastName.label}
                  onChange={(e) => setForm({
                    ...form,
                    fields: {
                      ...form.fields,
                      lastName: { ...form.fields.lastName, label: e.target.value }
                    }
                  })}
                  placeholder="Enter label"
                />
              </div>
              <div>
                <Label htmlFor="lastName-placeholder">Last Name Placeholder</Label>
                <Input
                  id="lastName-placeholder"
                  value={form.fields.lastName.placeholder}
                  onChange={(e) => setForm({
                    ...form,
                    fields: {
                      ...form.fields,
                      lastName: { ...form.fields.lastName, placeholder: e.target.value }
                    }
                  })}
                  placeholder="Enter placeholder"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email-label">Email Label</Label>
                <Input
                  id="email-label"
                  value={form.fields.email.label}
                  onChange={(e) => setForm({
                    ...form,
                    fields: {
                      ...form.fields,
                      email: { ...form.fields.email, label: e.target.value }
                    }
                  })}
                  placeholder="Enter label"
                />
              </div>
              <div>
                <Label htmlFor="email-placeholder">Email Placeholder</Label>
                <Input
                  id="email-placeholder"
                  value={form.fields.email.placeholder}
                  onChange={(e) => setForm({
                    ...form,
                    fields: {
                      ...form.fields,
                      email: { ...form.fields.email, placeholder: e.target.value }
                    }
                  })}
                  placeholder="Enter placeholder"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Subject Options</h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSubjectOption}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>

              <div className="space-y-3">
                {form.fields.subject.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Input
                        value={option.value}
                        onChange={(e) => updateSubjectOption(index, 'value', e.target.value)}
                        placeholder="Option value"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        value={option.label}
                        onChange={(e) => updateSubjectOption(index, 'label', e.target.value)}
                        placeholder="Option label"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSubjectOption(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="message-label">Message Label</Label>
                <Input
                  id="message-label"
                  value={form.fields.message.label}
                  onChange={(e) => setForm({
                    ...form,
                    fields: {
                      ...form.fields,
                      message: { ...form.fields.message, label: e.target.value }
                    }
                  })}
                  placeholder="Enter label"
                />
              </div>
              <div>
                <Label htmlFor="message-placeholder">Message Placeholder</Label>
                <Input
                  id="message-placeholder"
                  value={form.fields.message.placeholder}
                  onChange={(e) => setForm({
                    ...form,
                    fields: {
                      ...form.fields,
                      message: { ...form.fields.message, placeholder: e.target.value }
                    }
                  })}
                  placeholder="Enter placeholder"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Submit Button</h3>
          <div>
            <Label htmlFor="submit-text">Button Text</Label>
            <Input
              id="submit-text"
              value={form.submitButton.text}
              onChange={(e) => setForm({
                ...form,
                submitButton: { ...form.submitButton, text: e.target.value }
              })}
              placeholder="Enter button text"
            />
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
