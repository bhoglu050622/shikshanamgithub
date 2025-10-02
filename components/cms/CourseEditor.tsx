'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Eye, 
  Code, 
  Palette,
  BookOpen,
  Users,
  Clock,
  Star,
  DollarSign,
  Globe,
  Video,
  FileText,
  CheckCircle,
  Plus,
  Trash2,
  Edit,
  ArrowRight
} from 'lucide-react';

interface CourseContent {
  title: string;
  subtitle: string;
  instructor: string;
  language: string;
  price: string;
  originalPrice?: string;
  duration: string;
  level: string;
  rating: number;
  reviewCount: number;
  type: string;
  status: 'available' | 'coming-soon' | 'archived';
  checkoutLink: string;
  contactNumber: string;
  description: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  learningObjectives: string[];
  keyHighlights: string[];
  syllabus: Array<{
    id: number;
    title: string;
    type: string;
    duration: string;
    description: string;
  }>;
  testimonials: Array<{
    name: string;
    rating: number;
    comment: string;
    verified: boolean;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  requirements: string[];
  outcomes: string[];
  instructorBio: string;
  instructorImage?: string;
  courseImage?: string;
  tags: string[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  subtitles: string[];
  certificate: boolean;
  lifetimeAccess: boolean;
  mobileFriendly: boolean;
  supportIncluded: boolean;
}

interface CourseEditorProps {
  content: CourseContent | null;
  onUpdate: (content: CourseContent) => void;
  courseId: string;
  onClose: () => void;
}

const defaultCourseContent: CourseContent = {
  title: '',
  subtitle: '',
  instructor: '',
  language: '',
  price: '',
  originalPrice: '',
  duration: '',
  level: '',
  rating: 0,
  reviewCount: 0,
  type: '',
  status: 'available',
  checkoutLink: '',
  contactNumber: '',
  description: '',
  features: [],
  learningObjectives: [],
  keyHighlights: [],
  syllabus: [],
  testimonials: [],
  faq: [],
  requirements: [],
  outcomes: [],
  instructorBio: '',
  instructorImage: '',
  courseImage: '',
  tags: [],
  category: '',
  difficulty: 'beginner',
  subtitles: [],
  certificate: false,
  lifetimeAccess: false,
  mobileFriendly: false,
  supportIncluded: false
};

export default function CourseEditor({ content, onUpdate, courseId, onClose }: CourseEditorProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [localContent, setLocalContent] = useState<CourseContent>(content || defaultCourseContent);

  useEffect(() => {
    setLocalContent(content || defaultCourseContent);
  }, [content]);

  const handleUpdate = (updates: Partial<CourseContent>) => {
    const updatedContent = { ...localContent, ...updates };
    setLocalContent(updatedContent);
    onUpdate(updatedContent);
  };

  const addFeature = () => {
    const newFeature = {
      icon: 'Gift',
      title: '',
      description: ''
    };
    handleUpdate({
      features: [...localContent.features, newFeature]
    });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const updatedFeatures = [...localContent.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    handleUpdate({ features: updatedFeatures });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = localContent.features.filter((_, i) => i !== index);
    handleUpdate({ features: updatedFeatures });
  };

  const addSyllabusItem = () => {
    const newItem = {
      id: Date.now(),
      title: '',
      type: 'video',
      duration: '',
      description: ''
    };
    handleUpdate({
      syllabus: [...localContent.syllabus, newItem]
    });
  };

  const updateSyllabusItem = (index: number, field: string, value: string | number) => {
    const updatedSyllabus = [...localContent.syllabus];
    updatedSyllabus[index] = { ...updatedSyllabus[index], [field]: value };
    handleUpdate({ syllabus: updatedSyllabus });
  };

  const removeSyllabusItem = (index: number) => {
    const updatedSyllabus = localContent.syllabus.filter((_, i) => i !== index);
    handleUpdate({ syllabus: updatedSyllabus });
  };

  const addTestimonial = () => {
    const newTestimonial = {
      name: '',
      rating: 5,
      comment: '',
      verified: false
    };
    handleUpdate({
      testimonials: [...localContent.testimonials, newTestimonial]
    });
  };

  const updateTestimonial = (index: number, field: string, value: string | number | boolean) => {
    const updatedTestimonials = [...localContent.testimonials];
    updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
    handleUpdate({ testimonials: updatedTestimonials });
  };

  const removeTestimonial = (index: number) => {
    const updatedTestimonials = localContent.testimonials.filter((_, i) => i !== index);
    handleUpdate({ testimonials: updatedTestimonials });
  };

  const addFAQ = () => {
    const newFAQ = {
      question: '',
      answer: ''
    };
    handleUpdate({
      faq: [...localContent.faq, newFAQ]
    });
  };

  const updateFAQ = (index: number, field: string, value: string) => {
    const updatedFAQ = [...localContent.faq];
    updatedFAQ[index] = { ...updatedFAQ[index], [field]: value };
    handleUpdate({ faq: updatedFAQ });
  };

  const removeFAQ = (index: number) => {
    const updatedFAQ = localContent.faq.filter((_, i) => i !== index);
    handleUpdate({ faq: updatedFAQ });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Course Editor: {courseId}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="code">Code Editor</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={localContent.title}
                    onChange={(e) => handleUpdate({ title: e.target.value })}
                    placeholder="Course title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <Input
                    value={localContent.subtitle}
                    onChange={(e) => handleUpdate({ subtitle: e.target.value })}
                    placeholder="Course subtitle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Instructor</label>
                  <Input
                    value={localContent.instructor}
                    onChange={(e) => handleUpdate({ instructor: e.target.value })}
                    placeholder="Instructor name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <Input
                    value={localContent.language}
                    onChange={(e) => handleUpdate({ language: e.target.value })}
                    placeholder="Course language"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input
                    value={localContent.price}
                    onChange={(e) => handleUpdate({ price: e.target.value })}
                    placeholder="Course price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Original Price</label>
                  <Input
                    value={localContent.originalPrice || ''}
                    onChange={(e) => handleUpdate({ originalPrice: e.target.value })}
                    placeholder="Original price (optional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <Input
                    value={localContent.duration}
                    onChange={(e) => handleUpdate({ duration: e.target.value })}
                    placeholder="Course duration"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Level</label>
                  <Input
                    value={localContent.level}
                    onChange={(e) => handleUpdate({ level: e.target.value })}
                    placeholder="Course level"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <Input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={localContent.rating}
                    onChange={(e) => handleUpdate({ rating: parseFloat(e.target.value) })}
                    placeholder="Course rating"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Review Count</label>
                  <Input
                    type="number"
                    value={localContent.reviewCount}
                    onChange={(e) => handleUpdate({ reviewCount: parseInt(e.target.value) })}
                    placeholder="Number of reviews"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <Input
                    value={localContent.type}
                    onChange={(e) => handleUpdate({ type: e.target.value })}
                    placeholder="Course type"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={localContent.status}
                    onChange={(e) => handleUpdate({ status: e.target.value as any })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="available">Available</option>
                    <option value="coming-soon">Coming Soon</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={localContent.description}
                  onChange={(e) => handleUpdate({ description: e.target.value })}
                  placeholder="Course description"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Checkout Link</label>
                <Input
                  value={localContent.checkoutLink}
                  onChange={(e) => handleUpdate({ checkoutLink: e.target.value })}
                  placeholder="Checkout URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Number</label>
                <Input
                  value={localContent.contactNumber}
                  onChange={(e) => handleUpdate({ contactNumber: e.target.value })}
                  placeholder="Contact number"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {localContent.features.map((feature, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Icon</label>
                      <Input
                        value={feature.icon}
                        onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                        placeholder="Icon name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={feature.title}
                        onChange={(e) => updateFeature(index, 'title', e.target.value)}
                        placeholder="Feature title"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={feature.description}
                      onChange={(e) => updateFeature(index, 'description', e.target.value)}
                      placeholder="Feature description"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addFeature} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {localContent.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={objective}
                      onChange={(e) => {
                        const updated = [...localContent.learningObjectives];
                        updated[index] = e.target.value;
                        handleUpdate({ learningObjectives: updated });
                      }}
                      placeholder="Learning objective"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const updated = localContent.learningObjectives.filter((_, i) => i !== index);
                        handleUpdate({ learningObjectives: updated });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => {
                    const updated = [...localContent.learningObjectives, ''];
                    handleUpdate({ learningObjectives: updated });
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Objective
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {localContent.keyHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={highlight}
                      onChange={(e) => {
                        const updated = [...localContent.keyHighlights];
                        updated[index] = e.target.value;
                        handleUpdate({ keyHighlights: updated });
                      }}
                      placeholder="Key highlight"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const updated = localContent.keyHighlights.filter((_, i) => i !== index);
                        handleUpdate({ keyHighlights: updated });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => {
                    const updated = [...localContent.keyHighlights, ''];
                    handleUpdate({ keyHighlights: updated });
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Highlight
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {localContent.features.map((feature, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Icon</label>
                      <Input
                        value={feature.icon}
                        onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                        placeholder="Icon name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={feature.title}
                        onChange={(e) => updateFeature(index, 'title', e.target.value)}
                        placeholder="Feature title"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={feature.description}
                      onChange={(e) => updateFeature(index, 'description', e.target.value)}
                      placeholder="Feature description"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addFeature} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objectives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Learning Objectives</label>
                <Textarea
                  value={localContent.learningObjectives?.join('\n') || ''}
                  onChange={(e) => handleUpdate({ 
                    learningObjectives: e.target.value.split('\n').filter(obj => obj.trim()) 
                  })}
                  placeholder="Enter learning objectives, one per line"
                  rows={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Key Highlights</label>
                <Textarea
                  value={localContent.keyHighlights?.join('\n') || ''}
                  onChange={(e) => handleUpdate({ 
                    keyHighlights: e.target.value.split('\n').filter(highlight => highlight.trim()) 
                  })}
                  placeholder="Enter key highlights, one per line"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="syllabus" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Syllabus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {localContent.syllabus.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateSyllabusItem(index, 'title', e.target.value)}
                        placeholder="Lesson title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Type</label>
                      <select
                        value={item.type}
                        onChange={(e) => updateSyllabusItem(index, 'type', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="video">Video</option>
                        <option value="live_tv">Live Session</option>
                        <option value="assignment">Assignment</option>
                        <option value="quiz">Quiz</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <Input
                        value={item.duration}
                        onChange={(e) => updateSyllabusItem(index, 'duration', e.target.value)}
                        placeholder="Duration"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSyllabusItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => updateSyllabusItem(index, 'description', e.target.value)}
                      placeholder="Lesson description"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addSyllabusItem} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Syllabus Item
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Testimonials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {localContent.testimonials.map((testimonial, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                        placeholder="Student name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={testimonial.rating}
                        onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
                        placeholder="Rating (1-5)"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={testimonial.verified}
                        onChange={(e) => updateTestimonial(index, 'verified', e.target.checked)}
                        className="rounded"
                      />
                      <label className="text-sm font-medium">Verified</label>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-2">Comment</label>
                    <Textarea
                      value={testimonial.comment}
                      onChange={(e) => updateTestimonial(index, 'comment', e.target.value)}
                      placeholder="Student testimonial"
                      rows={2}
                    />
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeTestimonial(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button onClick={addTestimonial} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {localContent.faq.map((faq, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Question</label>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                        placeholder="FAQ question"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Answer</label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                        placeholder="FAQ answer"
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFAQ(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addFAQ} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Code Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span className="text-sm font-medium">JSON Content</span>
                </div>
                <Textarea
                  value={JSON.stringify(localContent, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setLocalContent(parsed);
                      onUpdate(parsed);
                    } catch (error) {
                      // Invalid JSON, don't update
                    }
                  }}
                  placeholder="Edit JSON content directly..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
