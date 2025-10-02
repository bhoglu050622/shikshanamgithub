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
  Package,
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
  ArrowRight,
  Gift,
  Award,
  Shield,
  Zap
} from 'lucide-react';

interface PackageContent {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  duration: string;
  level: string;
  rating: number;
  reviewCount: number;
  type: string;
  status: 'available' | 'coming-soon' | 'archived';
  checkoutLink: string;
  contactNumber: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  benefits: string[];
  courses: Array<{
    id: string;
    title: string;
    description: string;
    duration: string;
    level: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    content: string;
    rating: number;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  requirements: string[];
  outcomes: string[];
  instructorBio: string;
  instructorImage?: string;
  packageImage?: string;
  tags: string[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  subtitles: string[];
  certificate: boolean;
  lifetimeAccess: boolean;
  mobileFriendly: boolean;
  supportIncluded: boolean;
  liveSessions: boolean;
  communityAccess: boolean;
  bonusMaterials: boolean;
  moneyBackGuarantee: boolean;
  earlyBirdDiscount: boolean;
  groupDiscount: boolean;
  paymentPlans: Array<{
    name: string;
    price: string;
    duration: string;
    features: string[];
  }>;
  comparison: Array<{
    feature: string;
    basic: boolean;
    premium: boolean;
    enterprise: boolean;
  }>;
}

interface PackageEditorProps {
  content: PackageContent;
  onUpdate: (content: PackageContent) => void;
  packageId: string;
}

export default function PackageEditor({ content, onUpdate, packageId }: PackageEditorProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [localContent, setLocalContent] = useState<PackageContent>(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleUpdate = (updates: Partial<PackageContent>) => {
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

  const addCourse = () => {
    const newCourse = {
      id: Date.now().toString(),
      title: '',
      description: '',
      duration: '',
      level: ''
    };
    handleUpdate({
      courses: [...localContent.courses, newCourse]
    });
  };

  const updateCourse = (index: number, field: string, value: string) => {
    const updatedCourses = [...localContent.courses];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };
    handleUpdate({ courses: updatedCourses });
  };

  const removeCourse = (index: number) => {
    const updatedCourses = localContent.courses.filter((_, i) => i !== index);
    handleUpdate({ courses: updatedCourses });
  };

  const addTestimonial = () => {
    const newTestimonial = {
      name: '',
      role: '',
      content: '',
      rating: 5
    };
    handleUpdate({
      testimonials: [...localContent.testimonials, newTestimonial]
    });
  };

  const updateTestimonial = (index: number, field: string, value: string | number) => {
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

  const addPaymentPlan = () => {
    const newPlan = {
      name: '',
      price: '',
      duration: '',
      features: []
    };
    handleUpdate({
      paymentPlans: [...localContent.paymentPlans, newPlan]
    });
  };

  const updatePaymentPlan = (index: number, field: string, value: string | string[]) => {
    const updatedPlans = [...localContent.paymentPlans];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    handleUpdate({ paymentPlans: updatedPlans });
  };

  const removePaymentPlan = (index: number) => {
    const updatedPlans = localContent.paymentPlans.filter((_, i) => i !== index);
    handleUpdate({ paymentPlans: updatedPlans });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Package Editor: {packageId}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
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
                    placeholder="Package title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <Input
                    value={localContent.subtitle}
                    onChange={(e) => handleUpdate({ subtitle: e.target.value })}
                    placeholder="Package subtitle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input
                    value={localContent.price}
                    onChange={(e) => handleUpdate({ price: e.target.value })}
                    placeholder="Package price"
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
                  <label className="block text-sm font-medium mb-2">Discount</label>
                  <Input
                    value={localContent.discount || ''}
                    onChange={(e) => handleUpdate({ discount: e.target.value })}
                    placeholder="Discount percentage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <Input
                    value={localContent.duration}
                    onChange={(e) => handleUpdate({ duration: e.target.value })}
                    placeholder="Package duration"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Level</label>
                  <Input
                    value={localContent.level}
                    onChange={(e) => handleUpdate({ level: e.target.value })}
                    placeholder="Package level"
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
                    placeholder="Package rating"
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
                    placeholder="Package type"
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
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    value={localContent.category}
                    onChange={(e) => handleUpdate({ category: e.target.value })}
                    placeholder="Package category"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <Input
                    value={localContent.language}
                    onChange={(e) => handleUpdate({ language: e.target.value })}
                    placeholder="Package language"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={localContent.description}
                  onChange={(e) => handleUpdate({ description: e.target.value })}
                  placeholder="Package description"
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

          <Card>
            <CardHeader>
              <CardTitle>Package Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localContent.certificate}
                    onChange={(e) => handleUpdate({ certificate: e.target.checked })}
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Certificate</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localContent.lifetimeAccess}
                    onChange={(e) => handleUpdate({ lifetimeAccess: e.target.checked })}
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Lifetime Access</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localContent.mobileFriendly}
                    onChange={(e) => handleUpdate({ mobileFriendly: e.target.checked })}
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Mobile Friendly</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localContent.supportIncluded}
                    onChange={(e) => handleUpdate({ supportIncluded: e.target.checked })}
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Support Included</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localContent.liveSessions}
                    onChange={(e) => handleUpdate({ liveSessions: e.target.checked })}
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Live Sessions</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localContent.communityAccess}
                    onChange={(e) => handleUpdate({ communityAccess: e.target.checked })}
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Community Access</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localContent.bonusMaterials}
                    onChange={(e) => handleUpdate({ bonusMaterials: e.target.checked })}
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Bonus Materials</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localContent.moneyBackGuarantee}
                    onChange={(e) => handleUpdate({ moneyBackGuarantee: e.target.checked })}
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Money Back Guarantee</label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Package Features</CardTitle>
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
              <CardTitle>Package Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {localContent.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => {
                        const updated = [...localContent.benefits];
                        updated[index] = e.target.value;
                        handleUpdate({ benefits: updated });
                      }}
                      placeholder="Package benefit"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const updated = localContent.benefits.filter((_, i) => i !== index);
                        handleUpdate({ benefits: updated });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => {
                    const updated = [...localContent.benefits, ''];
                    handleUpdate({ benefits: updated });
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Included Courses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {localContent.courses.map((course, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={course.title}
                        onChange={(e) => updateCourse(index, 'title', e.target.value)}
                        placeholder="Course title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <Input
                        value={course.duration}
                        onChange={(e) => updateCourse(index, 'duration', e.target.value)}
                        placeholder="Course duration"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Level</label>
                      <Input
                        value={course.level}
                        onChange={(e) => updateCourse(index, 'level', e.target.value)}
                        placeholder="Course level"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeCourse(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={course.description}
                      onChange={(e) => updateCourse(index, 'description', e.target.value)}
                      placeholder="Course description"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addCourse} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Plans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {localContent.paymentPlans.map((plan, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Plan Name</label>
                      <Input
                        value={plan.name}
                        onChange={(e) => updatePaymentPlan(index, 'name', e.target.value)}
                        placeholder="Plan name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Price</label>
                      <Input
                        value={plan.price}
                        onChange={(e) => updatePaymentPlan(index, 'price', e.target.value)}
                        placeholder="Plan price"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <Input
                        value={plan.duration}
                        onChange={(e) => updatePaymentPlan(index, 'duration', e.target.value)}
                        placeholder="Plan duration"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removePaymentPlan(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-2">Features</label>
                    <div className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => {
                              const updated = [...plan.features];
                              updated[featureIndex] = e.target.value;
                              updatePaymentPlan(index, 'features', updated);
                            }}
                            placeholder="Plan feature"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const updated = plan.features.filter((_, i) => i !== featureIndex);
                              updatePaymentPlan(index, 'features', updated);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() => {
                          const updated = [...plan.features, ''];
                          updatePaymentPlan(index, 'features', updated);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addPaymentPlan} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Plan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Testimonials</CardTitle>
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
                        placeholder="Customer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <Input
                        value={testimonial.role}
                        onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                        placeholder="Customer role"
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
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <Textarea
                      value={testimonial.content}
                      onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                      placeholder="Customer testimonial"
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
