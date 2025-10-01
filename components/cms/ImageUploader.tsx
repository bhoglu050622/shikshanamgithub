'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Image as ImageIcon, 
  Link, 
  Copy, 
  ExternalLink,
  Trash2,
  Edit,
  Check,
  X,
  AlertCircle,
  Info
} from 'lucide-react';

interface ImageData {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  source: 'upload' | 'url';
  file?: File;
}

interface ImageUploaderProps {
  images: ImageData[];
  onImagesChange: (images: ImageData[]) => void;
  maxImages?: number;
}

export default function ImageUploader({ 
  images, 
  onImagesChange, 
  maxImages = 10 
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<Partial<ImageData>>({
    url: '',
    alt: '',
    caption: '',
    source: 'url'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (images.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImageData: ImageData = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            url: e.target?.result as string,
            alt: file.name,
            source: 'upload',
            file: file
          };
          onImagesChange([...images, newImageData]);
        };
        reader.readAsDataURL(file);
      } else {
        alert(`${file.name} is not an image file.`);
      }
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const addImageFromUrl = () => {
    if (!newImage.url) {
      alert('Please enter an image URL');
      return;
    }

    if (images.length >= maxImages) {
      alert(`You can only have up to ${maxImages} images.`);
      return;
    }

    const imageData: ImageData = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      url: newImage.url,
      alt: newImage.alt || '',
      caption: newImage.caption || '',
      source: 'url'
    };

    onImagesChange([...images, imageData]);
    setNewImage({ url: '', alt: '', caption: '', source: 'url' });
  };

  const updateImage = (id: string, updates: Partial<ImageData>) => {
    const updatedImages = images.map(img => 
      img.id === id ? { ...img, ...updates } : img
    );
    onImagesChange(updatedImages);
    setEditingImage(null);
  };

  const removeImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    onImagesChange(updatedImages);
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Image URL copied to clipboard!');
  };

  const openImageInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="w-5 h-5" />
            <span>Add Images</span>
            <Badge variant="secondary">{images.length}/{maxImages}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Drag and Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">
              {dragActive ? 'Drop images here' : 'Drag and drop images here'}
            </p>
            <p className="text-gray-600 mb-4">
              or click to browse files
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={images.length >= maxImages}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* URL Input */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Or add from URL</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={newImage.url}
                  onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="imageAlt">Alt Text (Description)</Label>
                <Input
                  id="imageAlt"
                  value={newImage.alt}
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                  placeholder="Describe the image for accessibility"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="imageCaption">Caption (Optional)</Label>
                <Input
                  id="imageCaption"
                  value={newImage.caption}
                  onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                  placeholder="Image caption"
                />
              </div>
            </div>
            <Button 
              onClick={addImageFromUrl} 
              className="mt-4"
              disabled={!newImage.url || images.length >= maxImages}
            >
              <Link className="w-4 h-4 mr-2" />
              Add from URL
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Tips for better images:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use high-quality images (at least 800px wide)</li>
                  <li>Add descriptive alt text for accessibility</li>
                  <li>Keep file sizes under 5MB for faster loading</li>
                  <li>Use JPG for photos, PNG for graphics with transparency</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Gallery */}
      {images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Images ({images.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openImageInNewTab(image.url)}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => copyImageUrl(image.url)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(image.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    {editingImage === image.id ? (
                      <div className="space-y-2">
                        <Input
                          value={image.alt}
                          onChange={(e) => updateImage(image.id, { alt: e.target.value })}
                          placeholder="Alt text"
                        />
                        <Input
                          value={image.caption || ''}
                          onChange={(e) => updateImage(image.id, { caption: e.target.value })}
                          placeholder="Caption"
                        />
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            onClick={() => setEditingImage(null)}
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingImage(null)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium text-sm mb-1">{image.alt || 'No description'}</p>
                        {image.caption && (
                          <p className="text-xs text-gray-600 mb-2">{image.caption}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {image.source === 'upload' ? 'Uploaded' : 'URL'}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingImage(image.id)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
            <p className="text-gray-600 mb-4">
              Add images to make your content more engaging
            </p>
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Add Your First Image
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
