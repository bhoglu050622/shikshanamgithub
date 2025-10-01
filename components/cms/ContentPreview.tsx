'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  ExternalLink, 
  Copy, 
  Check,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  RefreshCw
} from 'lucide-react';

interface ContentPreviewProps {
  contentId: string;
  frontendPath: string;
  title: string;
  status: 'published' | 'draft' | 'archived';
  lastModified?: Date;
}

export default function ContentPreview({ 
  contentId, 
  frontendPath, 
  title, 
  status,
  lastModified 
}: ContentPreviewProps) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const previewUrl = `${window.location.origin}${frontendPath}`;
  const previewUrlWithTimestamp = `${previewUrl}?preview=true&t=${Date.now()}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(previewUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const openPreview = () => {
    window.open(previewUrlWithTimestamp, '_blank');
  };

  const getPreviewDimensions = () => {
    switch (previewMode) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '600px' };
    }
  };

  const dimensions = getPreviewDimensions();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge 
                  className={`text-xs ${
                    status === 'published' 
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      : 'bg-gray-100 text-gray-800 border-gray-200'
                  }`}
                >
                  {status}
                </Badge>
                {lastModified && (
                  <span className="text-xs text-gray-500">
                    Updated {lastModified.toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center space-x-1"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy URL'}</span>
            </Button>
            <Button
              onClick={openPreview}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Preview
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Preview Mode Selector */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm font-medium text-gray-700">Preview Mode:</span>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={previewMode === 'desktop' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
              className="px-3"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === 'tablet' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('tablet')}
              className="px-3"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
              className="px-3"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview Frame */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{previewUrl}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLoading(!isLoading)}
              className="p-1"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          <div 
            className="bg-white"
            style={{ 
              width: dimensions.width, 
              height: dimensions.height,
              maxWidth: '100%',
              margin: '0 auto'
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600">Loading preview...</p>
                </div>
              </div>
            ) : (
              <iframe
                src={previewUrlWithTimestamp}
                width="100%"
                height="100%"
                frameBorder="0"
                className="w-full h-full"
                title={`Preview of ${title}`}
                onLoad={() => setIsLoading(false)}
              />
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(previewUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Live View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`${previewUrl}?edit=true`, '_blank')}
            >
              <Eye className="w-4 h-4 mr-1" />
              Edit Mode
            </Button>
          </div>
          <div className="text-xs text-gray-500">
            {previewMode === 'desktop' ? 'Desktop' : previewMode === 'tablet' ? 'Tablet' : 'Mobile'} Preview
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
