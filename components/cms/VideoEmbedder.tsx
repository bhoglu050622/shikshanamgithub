'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Play, 
  Link, 
  Copy, 
  ExternalLink,
  Trash2,
  Edit,
  Check,
  X,
  AlertCircle,
  Info,
  Youtube,
  Globe
} from 'lucide-react';

interface VideoData {
  id: string;
  url: string;
  title: string;
  description?: string;
  thumbnail?: string;
  embedCode?: string;
  platform: 'youtube' | 'vimeo' | 'other' | 'embed';
  duration?: string;
}

interface VideoEmbedderProps {
  videos: VideoData[];
  onVideosChange: (videos: VideoData[]) => void;
  maxVideos?: number;
}

export default function VideoEmbedder({ 
  videos, 
  onVideosChange, 
  maxVideos = 5 
}: VideoEmbedderProps) {
  const [newVideo, setNewVideo] = useState<Partial<VideoData>>({
    url: '',
    title: '',
    description: '',
    platform: 'youtube'
  });
  const [editingVideo, setEditingVideo] = useState<string | null>(null);

  const detectPlatform = (url: string): VideoData['platform'] => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('vimeo.com')) return 'vimeo';
    if (url.includes('<iframe') || url.includes('<video')) return 'embed';
    return 'other';
  };

  const extractVideoId = (url: string, platform: VideoData['platform']): string => {
    if (platform === 'youtube') {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      return match ? match[1] : '';
    }
    if (platform === 'vimeo') {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : '';
    }
    return '';
  };

  const generateEmbedCode = (video: VideoData): string => {
    const { platform, url } = video;
    
    if (platform === 'youtube') {
      const videoId = extractVideoId(url, 'youtube');
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
    
    if (platform === 'vimeo') {
      const videoId = extractVideoId(url, 'vimeo');
      return `<iframe width="560" height="315" src="https://player.vimeo.com/video/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
    
    if (platform === 'embed') {
      return url; // Already an embed code
    }
    
    return `<video width="560" height="315" controls><source src="${url}" type="video/mp4">Your browser does not support the video tag.</video>`;
  };

  const addVideo = () => {
    if (!newVideo.url) {
      alert('Please enter a video URL or embed code');
      return;
    }

    if (videos.length >= maxVideos) {
      alert(`You can only have up to ${maxVideos} videos.`);
      return;
    }

    const platform = detectPlatform(newVideo.url);
    const embedCode = generateEmbedCode({ ...newVideo, platform } as VideoData);

    const videoData: VideoData = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      url: newVideo.url,
      title: newVideo.title || 'Untitled Video',
      description: newVideo.description || '',
      platform,
      embedCode
    };

    onVideosChange([...videos, videoData]);
    setNewVideo({ url: '', title: '', description: '', platform: 'youtube' });
  };

  const updateVideo = (id: string, updates: Partial<VideoData>) => {
    const updatedVideos = videos.map(video => 
      video.id === id ? { ...video, ...updates } : video
    );
    onVideosChange(updatedVideos);
    setEditingVideo(null);
  };

  const removeVideo = (id: string) => {
    const updatedVideos = videos.filter(video => video.id !== id);
    onVideosChange(updatedVideos);
  };

  const copyEmbedCode = (embedCode: string) => {
    navigator.clipboard.writeText(embedCode);
    alert('Embed code copied to clipboard!');
  };

  const openVideoInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  const getPlatformIcon = (platform: VideoData['platform']) => {
    switch (platform) {
      case 'youtube': return <Youtube className="w-4 h-4 text-red-600" />;
      case 'vimeo': return <Play className="w-4 h-4 text-blue-600" />;
      case 'embed': return <Globe className="w-4 h-4 text-gray-600" />;
      default: return <Video className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPlatformName = (platform: VideoData['platform']) => {
    switch (platform) {
      case 'youtube': return 'YouTube';
      case 'vimeo': return 'Vimeo';
      case 'embed': return 'Embed Code';
      default: return 'Other';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Video Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="w-5 h-5" />
            <span>Add Videos</span>
            <Badge variant="secondary">{videos.length}/{maxVideos}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="videoUrl">Video URL or Embed Code</Label>
              <Textarea
                id="videoUrl"
                value={newVideo.url}
                onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                placeholder="https://youtube.com/watch?v=... or <iframe>...</iframe>"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="videoTitle">Video Title</Label>
                <Input
                  id="videoTitle"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  placeholder="Enter video title"
                />
              </div>
              <div>
                <Label htmlFor="videoPlatform">Platform</Label>
                <select
                  id="videoPlatform"
                  value={newVideo.platform}
                  onChange={(e) => setNewVideo({ ...newVideo, platform: e.target.value as VideoData['platform'] })}
                  className="w-full p-2 border rounded"
                >
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                  <option value="embed">Embed Code</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="videoDescription">Description (Optional)</Label>
              <Textarea
                id="videoDescription"
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                placeholder="Describe the video content"
                rows={2}
              />
            </div>

            <Button 
              onClick={addVideo} 
              disabled={!newVideo.url || videos.length >= maxVideos}
              className="w-full"
            >
              <Video className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Supported video sources:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>YouTube:</strong> https://youtube.com/watch?v=VIDEO_ID</li>
                  <li><strong>Vimeo:</strong> https://vimeo.com/VIDEO_ID</li>
                  <li><strong>Embed Code:</strong> Paste complete iframe code</li>
                  <li><strong>Direct Video:</strong> Direct links to .mp4, .webm files</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Gallery */}
      {videos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Videos ({videos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Video Thumbnail/Preview */}
                      <div className="w-32 h-20 bg-gray-100 rounded flex items-center justify-center">
                        {video.platform === 'youtube' ? (
                          <Image
                            src={`https://img.youtube.com/vi/${extractVideoId(video.url, 'youtube')}/mqdefault.jpg`}
                            alt={video.title}
                            width={128}
                            height={80}
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : video.platform === 'vimeo' ? (
                          <div className="text-center">
                            <Play className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                            <span className="text-xs text-gray-600">Vimeo</span>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Video className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                            <span className="text-xs text-gray-600">Video</span>
                          </div>
                        )}
                      </div>

                      {/* Video Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{video.title}</h3>
                            {video.description && (
                              <p className="text-gray-600 text-sm mt-1">{video.description}</p>
                            )}
                            <div className="flex items-center space-x-2 mt-2">
                              {getPlatformIcon(video.platform)}
                              <span className="text-sm text-gray-600">{getPlatformName(video.platform)}</span>
                              <Badge variant="outline" className="text-xs">
                                {video.platform}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              onClick={() => openVideoInNewTab(video.url)}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => copyEmbedCode(video.embedCode || '')}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setEditingVideo(video.id)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => removeVideo(video.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Edit Form */}
                        {editingVideo === video.id && (
                          <div className="mt-4 p-3 bg-gray-50 rounded border">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label>Title</Label>
                                <Input
                                  value={video.title}
                                  onChange={(e) => updateVideo(video.id, { title: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Description</Label>
                                <Input
                                  value={video.description || ''}
                                  onChange={(e) => updateVideo(video.id, { description: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="flex space-x-2 mt-3">
                              <Button
                                onClick={() => setEditingVideo(null)}
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setEditingVideo(null)}
                              >
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Embed Code Preview */}
                        <div className="mt-3 p-2 bg-gray-100 rounded text-xs font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Embed Code:</span>
                            <Button
                              variant="ghost"
                              onClick={() => copyEmbedCode(video.embedCode || '')}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                          <code className="block mt-1 text-xs break-all">
                            {video.embedCode?.substring(0, 100)}...
                          </code>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {videos.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
            <p className="text-gray-600 mb-4">
              Add videos to make your content more engaging
            </p>
            <Button onClick={() => document.getElementById('videoUrl')?.focus()}>
              <Video className="w-4 h-4 mr-2" />
              Add Your First Video
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
