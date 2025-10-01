'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface DonationFAQEditorProps {
  content: {
    title: string;
    subtitle: string;
    questions: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
  onChange: (content: any) => void;
}

export default function DonationFAQEditor({ content, onChange }: DonationFAQEditorProps) {
  // Safe content with defaults
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    questions: content?.questions || []
  };
  const updateField = (field: string, value: string) => {
    onChange({
      ...content,
      [field]: value
    });
  };

  const addQuestion = () => {
    const newQuestion = {
      id: `question-${Date.now()}`,
      question: "New Question?",
      answer: "Answer to the question"
    };
    onChange({
      ...content,
      questions: [...safeContent.questions, newQuestion]
    });
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updatedQuestions = [...safeContent.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    onChange({
      ...content,
      questions: updatedQuestions
    });
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = safeContent.questions.filter((_, i) => i !== index);
    onChange({
      ...content,
      questions: updatedQuestions
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>FAQ Section</CardTitle>
          <CardDescription>
            Edit the FAQ section for donation-related questions
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
              <CardTitle>FAQ Questions</CardTitle>
              <CardDescription>Manage frequently asked questions about donations</CardDescription>
            </div>
            <Button onClick={addQuestion} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {safeContent.questions.map((question, index) => (
            <div key={question.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Question #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeQuestion(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Question</Label>
                  <Input
                    value={question.question}
                    onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                    placeholder="How are donations used?"
                  />
                </div>
                <div>
                  <Label>Answer</Label>
                  <Textarea
                    value={question.answer}
                    onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                    placeholder="Answer to the question"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
