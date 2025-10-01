'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface SchoolResourcesEditorProps {
  content: {
    title: string;
    subtitle: string;
    categories: Array<{
      id: string;
      title: string;
      description: string;
      resources: Array<{
        id: string;
        title: string;
        description: string;
        type: string;
        link: string;
      }>;
    }>;
  };
  onUpdate: (resources: {
    title: string;
    subtitle: string;
    categories: Array<{
      id: string;
      title: string;
      description: string;
      resources: Array<{
        id: string;
        title: string;
        description: string;
        type: string;
        link: string;
      }>;
    }>;
  }) => void;
}

export default function SchoolResourcesEditor({ content, onUpdate }: SchoolResourcesEditorProps) {
  const [resources, setResources] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onUpdate(resources);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setResources(content);
  };

  const addCategory = () => {
    const newCategory = {
      id: `category-${Date.now()}`,
      title: '',
      description: '',
      resources: []
    };
    setResources({
      ...resources,
      categories: [...resources.categories, newCategory]
    });
  };

  const removeCategory = (id: string) => {
    setResources({
      ...resources,
      categories: resources.categories.filter(category => category.id !== id)
    });
  };

  const updateCategory = (id: string, field: string, value: string) => {
    setResources({
      ...resources,
      categories: resources.categories.map(category =>
        category.id === id ? { ...category, [field]: value } : category
      )
    });
  };

  const addResource = (categoryId: string) => {
    const newResource = {
      id: `resource-${Date.now()}`,
      title: '',
      description: '',
      type: '',
      link: ''
    };
    setResources({
      ...resources,
      categories: resources.categories.map(category =>
        category.id === categoryId 
          ? { ...category, resources: [...category.resources, newResource] }
          : category
      )
    });
  };

  const removeResource = (categoryId: string, resourceId: string) => {
    setResources({
      ...resources,
      categories: resources.categories.map(category =>
        category.id === categoryId 
          ? { ...category, resources: category.resources.filter(r => r.id !== resourceId) }
          : category
      )
    });
  };

  const updateResource = (categoryId: string, resourceId: string, field: string, value: string) => {
    setResources({
      ...resources,
      categories: resources.categories.map(category =>
        category.id === categoryId 
          ? { 
              ...category, 
              resources: category.resources.map(r => 
                r.id === resourceId ? { ...r, [field]: value } : r
              )
            }
          : category
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
            value={resources.title}
            onChange={(e) => setResources({ ...resources, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={resources.subtitle}
            onChange={(e) => setResources({ ...resources, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Resource Categories</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCategory}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="space-y-6">
            {resources.categories.map((category, index) => (
              <div key={category.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Category {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeCategory(category.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`category-title-${category.id}`}>Title</Label>
                    <Input
                      id={`category-title-${category.id}`}
                      value={category.title}
                      onChange={(e) => updateCategory(category.id, 'title', e.target.value)}
                      placeholder="Enter category title"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`category-description-${category.id}`}>Description</Label>
                    <Textarea
                      id={`category-description-${category.id}`}
                      value={category.description}
                      onChange={(e) => updateCategory(category.id, 'description', e.target.value)}
                      placeholder="Enter category description"
                      rows={2}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Resources</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addResource(category.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Resource
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {category.resources.map((resource) => (
                        <div key={resource.id} className="border rounded p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium">Resource</h5>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeResource(category.id, resource.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`resource-title-${resource.id}`}>Title</Label>
                                <Input
                                  id={`resource-title-${resource.id}`}
                                  value={resource.title}
                                  onChange={(e) => updateResource(category.id, resource.id, 'title', e.target.value)}
                                  placeholder="Enter resource title"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`resource-type-${resource.id}`}>Type</Label>
                                <Input
                                  id={`resource-type-${resource.id}`}
                                  value={resource.type}
                                  onChange={(e) => updateResource(category.id, resource.id, 'type', e.target.value)}
                                  placeholder="e.g., PDF, Audio, Book"
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor={`resource-description-${resource.id}`}>Description</Label>
                              <Textarea
                                id={`resource-description-${resource.id}`}
                                value={resource.description}
                                onChange={(e) => updateResource(category.id, resource.id, 'description', e.target.value)}
                                placeholder="Enter resource description"
                                rows={2}
                              />
                            </div>

                            <div>
                              <Label htmlFor={`resource-link-${resource.id}`}>Link</Label>
                              <Input
                                id={`resource-link-${resource.id}`}
                                value={resource.link}
                                onChange={(e) => updateResource(category.id, resource.id, 'link', e.target.value)}
                                placeholder="Enter resource link"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
