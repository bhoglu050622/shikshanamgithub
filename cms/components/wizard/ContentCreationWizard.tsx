'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  BookOpen,
  FileText,
  HelpCircle,
  Edit3,
  Globe,
  Package,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Target,
  Users,
  Clock,
  Star,
  Zap
} from 'lucide-react'
import { ContentTemplate, contentTemplates } from '@/cms/lib/templates/content-templates'
import { ContentType } from '@/cms/lib/generated/prisma'

interface ContentCreationWizardProps {
  onComplete: (template: ContentTemplate, initialData: Record<string, any>) => void
  onCancel: () => void
}

interface WizardStep {
  id: string
  title: string
  description: string
  component: React.ComponentType<WizardStepProps>
}

interface WizardStepProps {
  onNext: (data: any) => void
  onBack: () => void
  data: Record<string, any>
  isFirst: boolean
  isLast: boolean
}

// Step 1: Choose Content Type
function ContentTypeSelection({ onNext, data, isFirst, isLast }: WizardStepProps) {
  const [selectedType, setSelectedType] = useState<string>('')

  const templateIcons = {
    [ContentType.COURSE]: BookOpen,
    [ContentType.LESSON]: FileText,
    [ContentType.BLOG_POST]: Edit3,
    [ContentType.PAGE]: Globe,
    [ContentType.PACKAGE]: Package
  }

  const templateColors = {
    [ContentType.COURSE]: 'bg-blue-500',
    [ContentType.LESSON]: 'bg-green-500',
    [ContentType.BLOG_POST]: 'bg-orange-500',
    [ContentType.PAGE]: 'bg-indigo-500',
    [ContentType.PACKAGE]: 'bg-teal-500'
  }

  const handleNext = () => {
    if (selectedType) {
      onNext({ contentType: selectedType })
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What would you like to create?</h2>
        <p className="text-gray-600">Choose the type of content that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentTemplates.map((template) => {
          const Icon = templateIcons[template.type as keyof typeof templateIcons] || FileText
          const isSelected = selectedType === template.type
          
          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedType(template.type)}
            >
              <CardHeader className="text-center">
                <div className={`w-12 h-12 mx-auto rounded-lg ${template.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center mb-4">{template.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Target className="w-3 h-3" />
                    <span>Purpose: {getPurposeDescription(template.type)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>Audience: {getAudienceDescription(template.type)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Time: {getTimeEstimate(template.type)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" disabled={isFirst} onClick={() => {}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} disabled={!selectedType}>
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

// Step 2: Basic Information
function BasicInformation({ onNext, onBack, data, isFirst, isLast }: WizardStepProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    ...data
  })

  const template = contentTemplates.find(t => t.type === data.contentType)
  
  const handleNext = () => {
    onNext(formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">Let's start with the essential details</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={`Enter your ${template?.name.toLowerCase()} title`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500">
              Make it clear and descriptive. This will be the main heading.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of what this content is about"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500">
              {data.contentType === ContentType.COURSE ? '15-30 words recommended' : 'Brief summary for previews'}
            </p>
          </div>

          {data.contentType === ContentType.COURSE && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select a category</option>
                <option value="sanskrit">Sanskrit</option>
                <option value="yoga">Yoga</option>
                <option value="philosophy">Philosophy</option>
                <option value="meditation">Meditation</option>
                <option value="ayurveda">Ayurveda</option>
                <option value="vedic-sciences">Vedic Sciences</option>
              </select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Pro Tip:</strong> {getContentTypeTip(data.contentType)}
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!formData.title || !formData.description || (data.contentType === ContentType.COURSE && !formData.category)}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

// Step 3: Content Setup
function ContentSetup({ onNext, onBack, data, isFirst, isLast }: WizardStepProps) {
  const [formData, setFormData] = useState({
    level: 'beginner',
    price: '',
    isFree: true,
    ...data
  })

  const template = contentTemplates.find(t => t.type === data.contentType)
  
  const handleNext = () => {
    onNext(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Setup</h2>
        <p className="text-gray-600">Configure the key settings for your content</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          {data.contentType === ContentType.COURSE && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Difficulty Level <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'beginner', label: 'Beginner', icon: '🌱', description: 'No prior experience needed' },
                    { value: 'intermediate', label: 'Intermediate', icon: '🌿', description: 'Some knowledge required' },
                    { value: 'advanced', label: 'Advanced', icon: '🌳', description: 'Expert level content' }
                  ].map((level) => (
                    <div
                      key={level.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.level === level.value
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange('level', level.value)}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{level.icon}</div>
                        <div className="font-medium">{level.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{level.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Pricing</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="free"
                      name="pricing"
                      checked={formData.isFree}
                      onChange={() => handleInputChange('isFree', true)}
                      className="text-orange-600"
                    />
                    <label htmlFor="free" className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Free Course
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="paid"
                      name="pricing"
                      checked={!formData.isFree}
                      onChange={() => handleInputChange('isFree', false)}
                      className="text-orange-600"
                    />
                    <label htmlFor="paid" className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      Paid Course
                    </label>
                  </div>
                </div>
                
                {!formData.isFree && (
                  <div className="mt-3">
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Price in USD</p>
                  </div>
                )}
              </div>
            </>
          )}

          {data.contentType === ContentType.BLOG_POST && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Publishing</label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="publish-now"
                    name="publishing"
                    value="now"
                    className="text-orange-600"
                  />
                  <label htmlFor="publish-now">Publish immediately</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="publish-later"
                    name="publishing"
                    value="later"
                    className="text-orange-600"
                  />
                  <label htmlFor="publish-later">Schedule for later</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="publish-draft"
                    name="publishing"
                    value="draft"
                    className="text-orange-600"
                  />
                  <label htmlFor="publish-draft">Save as draft</label>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext}>
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

// Step 4: Review and Create
function ReviewAndCreate({ onNext, onBack, data, isFirst, isLast }: WizardStepProps) {
  const template = contentTemplates.find(t => t.type === data.contentType)
  
  const handleCreate = () => {
    if (template) {
      onNext(data)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Create</h2>
        <p className="text-gray-600">Review your settings and create your content</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Content Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Type</label>
              <p className="text-lg font-semibold">{template?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Title</label>
              <p className="text-lg font-semibold">{data.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Description</label>
              <p className="text-sm">{data.description}</p>
            </div>
            {data.category && (
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <Badge variant="secondary">{data.category}</Badge>
              </div>
            )}
            {data.level && (
              <div>
                <label className="text-sm font-medium text-gray-500">Level</label>
                <Badge variant="outline" className="capitalize">{data.level}</Badge>
              </div>
            )}
            {data.isFree !== undefined && (
              <div>
                <label className="text-sm font-medium text-gray-500">Pricing</label>
                <p className="text-sm font-semibold">
                  {data.isFree ? 'Free' : `$${data.price || '0.00'}`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Next Steps:</strong> After creating your {template?.name.toLowerCase()}, you'll be taken to the editor where you can add detailed content, upload media, and configure additional settings.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="w-4 h-4 mr-2" />
          Create {template?.name}
        </Button>
      </div>
    </div>
  )
}

// Helper functions
function getPurposeDescription(type: string): string {
  const purposes = {
    [ContentType.COURSE]: 'Educational content with structured learning',
    [ContentType.LESSON]: 'Individual learning units or assessments',
    [ContentType.BLOG_POST]: 'Informational articles and updates',
    [ContentType.PAGE]: 'Marketing and landing pages',
    [ContentType.PACKAGE]: 'Bundled course offerings'
  }
  return purposes[type as keyof typeof purposes] || 'Content creation'
}

function getAudienceDescription(type: string): string {
  const audiences = {
    [ContentType.COURSE]: 'Students and learners',
    [ContentType.LESSON]: 'Course participants',
    [ContentType.BLOG_POST]: 'General audience',
    [ContentType.PAGE]: 'Potential customers',
    [ContentType.PACKAGE]: 'Premium subscribers'
  }
  return audiences[type as keyof typeof audiences] || 'Content consumers'
}

function getTimeEstimate(type: string): string {
  const estimates = {
    [ContentType.COURSE]: '2-4 hours',
    [ContentType.LESSON]: '15-30 minutes',
    [ContentType.BLOG_POST]: '30-60 minutes',
    [ContentType.PAGE]: '1-2 hours',
    [ContentType.PACKAGE]: '1 hour'
  }
  return estimates[type as keyof typeof estimates] || 'Varies'
}

function getContentTypeTip(type: string): string {
  const tips = {
    [ContentType.COURSE]: 'Start with a clear learning objective and break content into digestible modules.',
    [ContentType.LESSON]: 'Keep lessons focused on a single topic and include interactive elements.',
    [ContentType.BLOG_POST]: 'Use a compelling headline and include relevant images to increase engagement.',
    [ContentType.PAGE]: 'Focus on clear value proposition and strong call-to-action buttons.',
    [ContentType.PACKAGE]: 'Highlight the value and savings compared to individual course purchases.'
  }
  return tips[type as keyof typeof tips] || 'Make sure your content is clear and engaging.'
}

export function ContentCreationWizard({ onComplete, onCancel }: ContentCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [wizardData, setWizardData] = useState<Record<string, any>>({})

  const steps: WizardStep[] = [
    {
      id: 'content-type',
      title: 'Choose Content Type',
      description: 'Select what you want to create',
      component: ContentTypeSelection
    },
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Enter essential details',
      component: BasicInformation
    },
    {
      id: 'content-setup',
      title: 'Content Setup',
      description: 'Configure settings',
      component: ContentSetup
    },
    {
      id: 'review-create',
      title: 'Review & Create',
      description: 'Review and create your content',
      component: ReviewAndCreate
    }
  ]

  const handleStepNext = (stepData: any) => {
    const newData = { ...wizardData, ...stepData }
    setWizardData(newData)

    if (currentStep === steps.length - 1) {
      // Last step - complete the wizard
      const template = contentTemplates.find(t => t.type === newData.contentType)
      if (template) {
        onComplete(template, newData)
      }
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleStepBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  const currentStepComponent = steps[currentStep]?.component
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Content</h1>
          <p className="text-gray-600">Follow our guided wizard to create amazing content</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{steps[currentStep]?.title}</CardTitle>
            <p className="text-gray-600">{steps[currentStep]?.description}</p>
          </CardHeader>
          <CardContent>
            {currentStepComponent && React.createElement(currentStepComponent, {
              onNext: handleStepNext,
              onBack: handleStepBack,
              data: wizardData,
              isFirst: currentStep === 0,
              isLast: currentStep === steps.length - 1
            })}
          </CardContent>
        </Card>

        {/* Cancel Button */}
        <div className="text-center mt-6">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
