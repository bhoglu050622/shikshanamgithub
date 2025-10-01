'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Maximize2, 
  Minimize2, 
  ExternalLink,
  Monitor,
  Smartphone,
  Tablet,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface LivePreviewProps {
  url: string;
  title?: string;
  description?: string;
  onRefresh?: () => void;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export default function LivePreview({ 
  url, 
  title = "Live Preview", 
  description = "Preview your changes in real-time",
  onRefresh,
  autoRefresh = false,
  refreshInterval = 5000
}: LivePreviewProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isAutoRefresh, setIsAutoRefresh] = useState(autoRefresh);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const deviceSizes = {
    desktop: { width: '100%', height: '600px' },
    tablet: { width: '768px', height: '1024px' },
    mobile: { width: '375px', height: '667px' }
  };

  const refreshPreview = useCallback(async () => {
    if (onRefresh) {
      onRefresh();
    }
    
    setIsLoading(true);
    setLastRefresh(new Date());
    
    // Force iframe reload
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      }, 100);
    }
    
    setTimeout(() => setIsLoading(false), 1000);
  }, [onRefresh]);

  useEffect(() => {
    if (isAutoRefresh) {
      refreshIntervalRef.current = setInterval(refreshPreview, refreshInterval);
    } else {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [isAutoRefresh, refreshInterval, refreshPreview]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openInNewTab = () => {
    window.open(url, '_blank');
  };

  const formatLastRefresh = () => {
    const now = new Date();
    const diff = now.getTime() - lastRefresh.getTime();
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) {
      return `${seconds}s ago`;
    } else {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m ago`;
    }
  };

  if (!isVisible) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <EyeOff className="w-5 h-5" />
                <span>Preview Hidden</span>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVisible(true)}
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Show Preview</span>
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={`w-full h-full flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 m-0' : ''}`}>
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="flex items-center space-x-2 text-lg font-semibold">
              <Eye className="w-5 h-5 text-green-500" />
              <span className="whitespace-nowrap">{title}</span>
              {isLoading && <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1 whitespace-nowrap truncate">{description}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Device Selector */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={device === 'desktop' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setDevice('desktop')}
                className="h-8 w-8 p-0"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={device === 'tablet' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setDevice('tablet')}
                className="h-8 w-8 p-0"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={device === 'mobile' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setDevice('mobile')}
                className="h-8 w-8 p-0"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            {/* Auto Refresh Toggle */}
            <Button
              variant={isAutoRefresh ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
            >
              {isAutoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="hidden sm:inline">Auto</span>
            </Button>

            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={refreshPreview}
              disabled={isLoading}
              className="flex items-center space-x-2 border-gray-300 hover:bg-gray-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            {/* Fullscreen Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="flex items-center space-x-2"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>

            {/* Hide Preview */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="flex items-center space-x-2"
            >
              <EyeOff className="w-4 h-4" />
            </Button>

            {/* Open in New Tab */}
            <Button
              variant="outline"
              size="sm"
              onClick={openInNewTab}
              className="flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Status Bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Last refreshed: {formatLastRefresh()}</span>
            </div>
            {isAutoRefresh && (
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                Auto-refresh: 5s
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="capitalize">Device: {device}</span>
            <span>•</span>
            <span className="truncate max-w-32">URL: {url}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <div className="relative h-full">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-saffron-500" />
                <p className="text-sm text-gray-600 font-medium">Refreshing preview...</p>
              </div>
            </div>
          )}

          {/* Enhanced Preview Container */}
          <div 
            className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden rounded-lg border border-gray-200"
            style={{
              height: isFullscreen ? 'calc(100vh - 200px)' : deviceSizes[device].height,
              width: isFullscreen ? '100%' : deviceSizes[device].width,
              margin: isFullscreen ? '0' : '0 auto'
            }}
          >
            <iframe
              ref={iframeRef}
              src={url}
              className="border-0 bg-white shadow-xl rounded-lg"
              style={{
                width: isFullscreen ? '100%' : '100%',
                height: isFullscreen ? '100%' : '100%',
                maxWidth: deviceSizes[device].width,
                maxHeight: deviceSizes[device].height
              }}
              title="Live Preview"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
