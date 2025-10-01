'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Eye,
  Settings,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';

interface MobilePreviewProps {
  content: any;
  sectionName: string;
  onUpdate: (content: any) => void;
}

const DEVICE_PRESETS = [
  {
    id: 'mobile',
    name: 'Mobile',
    icon: Smartphone,
    width: 375,
    height: 667,
    description: 'iPhone 12 Pro'
  },
  {
    id: 'tablet',
    name: 'Tablet',
    icon: Tablet,
    width: 768,
    height: 1024,
    description: 'iPad'
  },
  {
    id: 'desktop',
    name: 'Desktop',
    icon: Monitor,
    width: 1200,
    height: 800,
    description: 'Desktop'
  }
];

export default function MobilePreview({ content, sectionName, onUpdate }: MobilePreviewProps) {
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDeviceFrame, setShowDeviceFrame] = useState(true);

  const currentDevice = DEVICE_PRESETS.find(d => d.id === selectedDevice) || DEVICE_PRESETS[0];

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(Math.max(25, Math.min(200, newZoom)));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(100);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const renderContent = () => {
    // This would render the actual content based on the section
    switch (sectionName) {
      case 'hero':
        return (
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">{content.headline || 'Transform Your Life'}</h1>
            <p className="text-lg mb-6">{content.subheadline || 'Discover ancient wisdom for modern living'}</p>
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold">
              {content.cta || 'Get Started'}
            </button>
          </div>
        );
      case 'about':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{content.title || 'About Us'}</h2>
            <p className="text-gray-600 mb-4">{content.description || 'We are dedicated to preserving and sharing ancient wisdom.'}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">1000+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">50+</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
            </div>
          </div>
        );
      case 'courses':
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Our Courses</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Course {i}</h3>
                  <p className="text-sm text-gray-600 mb-2">Learn ancient wisdom in modern ways</p>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-600 font-semibold">₹1,999</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm">
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{sectionName}</h2>
            <p className="text-gray-600">Content preview for {sectionName} section</p>
          </div>
        );
    }
  };

  const renderDeviceFrame = () => {
    if (!showDeviceFrame) return null;

    return (
      <div className="relative">
        {/* Device Frame */}
        <div 
          className="bg-black rounded-[2.5rem] p-2 shadow-2xl"
          style={{
            width: currentDevice.width + 20,
            height: currentDevice.height + 20
          }}
        >
          {/* Screen */}
          <div 
            className="bg-white rounded-[2rem] overflow-hidden relative"
            style={{
              width: currentDevice.width,
              height: currentDevice.height
            }}
          >
            {/* Status Bar */}
            <div className="bg-black text-white text-xs px-4 py-1 flex justify-between items-center">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-2" />
              </div>
            </div>
            
            {/* Content */}
            <div 
              className="overflow-auto"
              style={{
                height: currentDevice.height - 20,
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top left',
                width: `${100 / (zoom / 100)}%`
              }}
            >
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFullscreenContent = () => {
    return (
      <div 
        className="bg-white overflow-auto"
        style={{
          width: '100%',
          height: '100vh',
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top left'
        }}
      >
        {renderContent()}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Mobile Preview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            {/* Device Selection */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Device:</span>
              <div className="flex space-x-1">
                {DEVICE_PRESETS.map((device) => {
                  const Icon = device.icon;
                  return (
                    <Button
                      key={device.id}
                      variant={selectedDevice === device.id ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setSelectedDevice(device.id)}
                      className="flex items-center space-x-1"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{device.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Zoom:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleZoomChange(zoom - 25)}
                disabled={zoom <= 25}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm w-12 text-center">{zoom}%</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleZoomChange(zoom + 25)}
                disabled={zoom >= 200}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetZoom}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* View Options */}
            <div className="flex items-center space-x-2">
              <Button
                variant={showDeviceFrame ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setShowDeviceFrame(!showDeviceFrame)}
              >
                <Settings className="w-4 h-4 mr-1" />
                Frame
              </Button>
              <Button
                variant={isFullscreen ? 'primary' : 'outline'}
                size="sm"
                onClick={toggleFullscreen}
              >
                <Monitor className="w-4 h-4 mr-1" />
                Fullscreen
              </Button>
            </div>
          </div>

          {/* Device Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{currentDevice.description}</span>
                <span className="text-gray-500 ml-2">
                  {currentDevice.width} × {currentDevice.height}
                </span>
              </div>
              <Badge variant="secondary">
                {selectedDevice === 'mobile' ? 'Mobile First' : 
                 selectedDevice === 'tablet' ? 'Tablet Optimized' : 'Desktop View'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Area */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            {isFullscreen ? (
              <div className="w-full">
                {renderFullscreenContent()}
              </div>
            ) : (
              renderDeviceFrame()
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mobile Optimization Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mobile Optimization Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">✅ Good Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use large, tappable buttons (44px minimum)</li>
                <li>• Keep text readable (16px minimum)</li>
                <li>• Use high contrast colors</li>
                <li>• Optimize images for mobile</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">⚠️ Common Issues</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Text too small to read</li>
                <li>• Buttons too close together</li>
                <li>• Images not optimized</li>
                <li>• Poor touch targets</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
