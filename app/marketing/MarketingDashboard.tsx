'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Zap } from 'lucide-react';
import AuthGate from '@/components/marketing/AuthGate';
import GA4Panel from '@/components/marketing/GA4Panel';
import MetaPixelPanel from '@/components/marketing/MetaPixelPanel';
import EventTester from '@/components/marketing/EventTester';
import DeploymentPanel from '@/components/marketing/DeploymentPanel';
import { PlatformStatusCard } from '@/components/marketing/StatusIndicator';
import { 
  MarketingConfig, 
  GA4Config, 
  MetaPixelConfig,
  DEFAULT_GA4_CONFIG, 
  DEFAULT_META_PIXEL_CONFIG,
  TrackingStatus,
  MetaStandardEventName
} from '@/lib/marketing/tracking-config';

export default function MarketingDashboard() {
  // Prevent SSR - this page requires browser APIs
  const [isMounted, setIsMounted] = useState(false);
  
  const [config, setConfig] = useState<MarketingConfig>({
    ga4: DEFAULT_GA4_CONFIG,
    metaPixel: DEFAULT_META_PIXEL_CONFIG,
    lastUpdated: Date.now(),
  });
  
  // Dynamically import managers to avoid SSR issues
  const [ga4Manager, setGA4Manager] = useState<any>(null);
  const [metaManager, setMetaManager] = useState<any>(null);
  
  const [ga4Status, setGA4Status] = useState<TrackingStatus>({
    platform: 'ga4',
    connected: false,
    scriptLoaded: false,
    mode: 'test',
  });

  const [metaStatus, setMetaStatus] = useState<TrackingStatus>({
    platform: 'meta',
    connected: false,
    scriptLoaded: false,
    mode: 'test',
  });

  const [activeTab, setActiveTab] = useState<'ga4' | 'meta' | 'test' | 'deploy'>('ga4');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved configuration on mount
  useEffect(() => {
    loadConfiguration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update tracking status
  useEffect(() => {
    const checkStatus = () => {
      setGA4Status(prev => ({
        platform: 'ga4',
        connected: !!config.ga4?.measurementId,
        scriptLoaded: ga4Manager.isLoaded(),
        lastEvent: prev.lastEvent,
        mode: 'test',
      }));

      setMetaStatus(prev => ({
        platform: 'meta',
        connected: !!config.metaPixel?.pixelId,
        scriptLoaded: metaManager.isLoaded(),
        lastEvent: prev.lastEvent,
        mode: 'test',
      }));
    };

    const interval = setInterval(checkStatus, 2000);
    checkStatus();

    return () => clearInterval(interval);
  }, [config, ga4Manager, metaManager]);
  
  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Load managers dynamically
  useEffect(() => {
    if (!isMounted) return;
    
    import('@/lib/marketing/ga4-manager').then(({ GA4Manager }) => {
      setGA4Manager(new GA4Manager());
    });
    import('@/lib/marketing/meta-pixel-manager').then(({ MetaPixelManager }) => {
      setMetaManager(new MetaPixelManager());
    });
  }, [isMounted]);

  const loadConfiguration = async () => {
    try {
      const response = await fetch('/api/marketing-config');
      const data = await response.json();
      
      if (data.success && data.config) {
        setConfig(data.config);
        
        // Initialize managers with loaded config if available
        if (data.config.ga4?.measurementId) {
          await ga4Manager.initialize(data.config.ga4);
        }
        
        if (data.config.metaPixel?.pixelId) {
          await metaManager.initialize(data.config.metaPixel);
        }
      }
    } catch (error) {
      console.error('Failed to load configuration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGA4Change = async (newGA4Config: GA4Config) => {
    setConfig(prev => ({
      ...prev,
      ga4: newGA4Config,
      lastUpdated: Date.now(),
    }));

    // Re-initialize GA4 with new config
    if (newGA4Config.measurementId) {
      await ga4Manager.initialize(newGA4Config);
    }
  };

  const handleMetaChange = async (newMetaConfig: MetaPixelConfig) => {
    setConfig(prev => ({
      ...prev,
      metaPixel: newMetaConfig,
      lastUpdated: Date.now(),
    }));

    // Re-initialize Meta Pixel with new config
    if (newMetaConfig.pixelId) {
      await metaManager.initialize(newMetaConfig);
    }
  };

  const handleGA4Test = async (eventName: string, parameters: Record<string, any>): Promise<boolean> => {
    try {
      const success = await ga4Manager.sendTestEvent(eventName, parameters);
      if (success) {
        setGA4Status(prev => ({ ...prev, lastEvent: Date.now() }));
      }
      return success;
    } catch (error) {
      console.error('GA4 test failed:', error);
      return false;
    }
  };

  const handleMetaTest = async (eventName: MetaStandardEventName, parameters: Record<string, any>): Promise<boolean> => {
    try {
      const success = await metaManager.sendTestEvent(eventName, parameters);
      if (success) {
        setMetaStatus(prev => ({ ...prev, lastEvent: Date.now() }));
      }
      return success;
    } catch (error) {
      console.error('Meta test failed:', error);
      return false;
    }
  };

  const handleDeploy = async (deployConfig: MarketingConfig): Promise<boolean> => {
    try {
      const response = await fetch('/api/marketing-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deployConfig),
      });

      const data = await response.json();
      
      if (data.success) {
        setConfig(data.config);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Deployment failed:', error);
      return false;
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `marketing-config-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (importedConfig: MarketingConfig) => {
    setConfig(importedConfig);
  };
  
  // Don't render anything until mounted (prevents SSR issues)
  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isLoading || !ga4Manager || !metaManager) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-maroon mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading marketing dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGate>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-deep-maroon to-warm-saffron rounded-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Marketing Integration Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Configure and manage Google Analytics 4 and Meta Pixel tracking
              </p>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PlatformStatusCard 
              platform="Google Analytics 4" 
              status={ga4Status} 
              lastEventTime={ga4Status.lastEvent}
            />
            <PlatformStatusCard 
              platform="Meta Pixel" 
              status={metaStatus} 
              lastEventTime={metaStatus.lastEvent}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('ga4')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'ga4'
                  ? 'bg-gradient-to-r from-deep-maroon to-warm-saffron text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-deep-maroon'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Google Analytics 4
            </button>
            
            <button
              onClick={() => setActiveTab('meta')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'meta'
                  ? 'bg-gradient-to-r from-deep-maroon to-warm-saffron text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-deep-maroon'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Meta Pixel
            </button>
            
            <button
              onClick={() => setActiveTab('test')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'test'
                  ? 'bg-gradient-to-r from-deep-maroon to-warm-saffron text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-deep-maroon'
              }`}
            >
              <Zap className="w-4 h-4" />
              Test Events
            </button>
            
            <button
              onClick={() => setActiveTab('deploy')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'deploy'
                  ? 'bg-gradient-to-r from-deep-maroon to-warm-saffron text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-deep-maroon'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Deploy
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-10">
          {activeTab === 'ga4' && config.ga4 && (
            <GA4Panel
              config={config.ga4}
              onChange={handleGA4Change}
              onTest={handleGA4Test}
            />
          )}

          {activeTab === 'meta' && config.metaPixel && (
            <MetaPixelPanel
              config={config.metaPixel}
              onChange={handleMetaChange}
              onTest={handleMetaTest}
            />
          )}

          {activeTab === 'test' && (
            <EventTester
              onSendGA4Event={handleGA4Test}
              onSendMetaEvent={(eventName, params) => handleMetaTest(eventName as any, params)}
            />
          )}

          {activeTab === 'deploy' && (
            <DeploymentPanel
              config={config}
              onDeploy={handleDeploy}
              onExport={handleExport}
              onImport={handleImport}
            />
          )}
        </div>
      </div>
    </AuthGate>
  );
}

