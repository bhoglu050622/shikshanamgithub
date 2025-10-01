'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Trash2 } from 'lucide-react'

interface DonationOptionsEditorProps {
  content: {
    title: string;
    subtitle: string;
    options: Array<{
      id: string;
      amount: string;
      label: string;
      description: string;
      popular?: boolean;
    }>;
    customAmount: {
      enabled: boolean;
      placeholder: string;
      minAmount: string;
    };
  };
  onChange: (content: any) => void;
}

export default function DonationOptionsEditor({ content, onChange }: DonationOptionsEditorProps) {
  // Safe content with defaults
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    options: content?.options || []
  };
  const updateField = (field: string, value: string) => {
    onChange({
      ...content,
      [field]: value
    });
  };

  const addOption = () => {
    const newOption = {
      id: `option-${Date.now()}`,
      amount: "₹1,000",
      label: "New Option",
      description: "Option description",
      popular: false
    };
    onChange({
      ...content,
      options: [...safeContent.options, newOption]
    });
  };

  const updateOption = (index: number, field: string, value: string | boolean) => {
    const updatedOptions = [...safeContent.options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    onChange({
      ...content,
      options: updatedOptions
    });
  };

  const removeOption = (index: number) => {
    const updatedOptions = safeContent.options.filter((_, i) => i !== index);
    onChange({
      ...content,
      options: updatedOptions
    });
  };

  const updateCustomAmount = (field: string, value: string | boolean) => {
    onChange({
      ...content,
      customAmount: {
        ...safeContent.customAmount,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Donation Options Section</CardTitle>
          <CardDescription>
            Edit the donation options and payment settings
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
              <CardTitle>Donation Amount Options</CardTitle>
              <CardDescription>Manage preset donation amounts</CardDescription>
            </div>
            <Button onClick={addOption} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Option
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {safeContent.options.map((option, index) => (
            <div key={option.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Option #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeOption(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Amount</Label>
                  <Input
                    value={option.amount}
                    onChange={(e) => updateOption(index, 'amount', e.target.value)}
                    placeholder="₹2,500"
                  />
                </div>
                <div>
                  <Label>Label</Label>
                  <Input
                    value={option.label}
                    onChange={(e) => updateOption(index, 'label', e.target.value)}
                    placeholder="Sponsor a Course"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={option.description}
                    onChange={(e) => updateOption(index, 'description', e.target.value)}
                    placeholder="Fund the creation of educational content"
                    rows={2}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`popular-${index}`}
                    checked={option.popular || false}
                    onCheckedChange={(checked) => updateOption(index, 'popular', checked)}
                  />
                  <Label htmlFor={`popular-${index}`}>Popular Option</Label>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Amount Settings</CardTitle>
          <CardDescription>Configure custom donation amount options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="custom-enabled"
              checked={safeContent.customAmount.enabled}
              onCheckedChange={(checked) => updateCustomAmount('enabled', checked)}
            />
            <Label htmlFor="custom-enabled">Enable Custom Amount</Label>
          </div>
          
          <div>
            <Label htmlFor="placeholder">Placeholder Text</Label>
            <Input
              id="placeholder"
              value={safeContent.customAmount.placeholder}
              onChange={(e) => updateCustomAmount('placeholder', e.target.value)}
              placeholder="Enter custom amount"
            />
          </div>
          
          <div>
            <Label htmlFor="minAmount">Minimum Amount</Label>
            <Input
              id="minAmount"
              value={safeContent.customAmount.minAmount}
              onChange={(e) => updateCustomAmount('minAmount', e.target.value)}
              placeholder="₹100"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
