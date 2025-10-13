'use client';

import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { MetaPixelConfig, MetaStandardEventName, MetaCustomConversion, DEFAULT_META_PIXEL_CONFIG } from '@/lib/marketing/tracking-config';

interface MetaPixelPanelProps {
  config: MetaPixelConfig;
  onChange: (config: MetaPixelConfig) => void;
  onTest: (eventName: MetaStandardEventName, parameters: Record<string, any>) => Promise<boolean>;
}

export default function MetaPixelPanel({ config, onChange, onTest }: MetaPixelPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showConversions, setShowConversions] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTestEvent = async () => {
    setTestResult(null);
    const success = await onTest('PageView', {});
    
    setTestResult({
      success,
      message: success ? 'Test event sent successfully!' : 'Failed to send test event',
    });

    setTimeout(() => setTestResult(null), 5000);
  };

  const toggleStandardEvent = (eventId: string) => {
    const updatedEvents = config.standardEvents.map(event =>
      event.id === eventId ? { ...event, enabled: !event.enabled } : event
    );
    onChange({ ...config, standardEvents: updatedEvents });
  };

  const addCustomConversion = () => {
    const newConversion: MetaCustomConversion = {
      id: Date.now().toString(),
      name: '',
      description: '',
      rules: [],
    };
    onChange({ ...config, customConversions: [...config.customConversions, newConversion] });
  };

  const updateCustomConversion = (id: string, updates: Partial<MetaCustomConversion>) => {
    const updatedConversions = config.customConversions.map(conversion =>
      conversion.id === id ? { ...conversion, ...updates } : conversion
    );
    onChange({ ...config, customConversions: updatedConversions });
  };

  const removeCustomConversion = (id: string) => {
    onChange({
      ...config,
      customConversions: config.customConversions.filter(c => c.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Basic Configuration
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pixel ID *
            </label>
            <input
              type="text"
              value={config.pixelId}
              onChange={(e) => onChange({ ...config, pixelId: e.target.value })}
              placeholder="1234567890123456"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-maroon focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Format: 15-16 digit number
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Access Token (Optional)
            </label>
            <input
              type="text"
              value={config.accessToken || ''}
              onChange={(e) => onChange({ ...config, accessToken: e.target.value })}
              placeholder="For Conversion API integration"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-maroon focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Test Event Code (Optional)
            </label>
            <input
              type="text"
              value={config.testEventCode || ''}
              onChange={(e) => onChange({ ...config, testEventCode: e.target.value })}
              placeholder="TEST12345"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-maroon focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Get this from Meta Events Manager for testing
            </p>
          </div>
        </div>
      </div>

      {/* Standard Events */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Standard Events
        </h3>
        
        <div className="space-y-2">
          {config.standardEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`event-${event.id}`}
                  checked={event.enabled}
                  onChange={() => toggleStandardEvent(event.id)}
                  className="w-4 h-4 text-deep-maroon border-gray-300 rounded focus:ring-deep-maroon"
                />
                <label htmlFor={`event-${event.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {event.name}
                </label>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                event.enabled
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {event.enabled ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Conversions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Custom Conversions
          </h3>
          <button
            onClick={() => setShowConversions(!showConversions)}
            className="text-deep-maroon hover:text-warm-saffron transition-colors"
          >
            {showConversions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {showConversions && (
          <div className="space-y-4">
            {config.customConversions.map((conversion) => (
              <div key={conversion.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={conversion.name}
                      onChange={(e) => updateCustomConversion(conversion.id, { name: e.target.value })}
                      placeholder="Conversion name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-maroon focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    />
                    <input
                      type="text"
                      value={conversion.description || ''}
                      onChange={(e) => updateCustomConversion(conversion.id, { description: e.target.value })}
                      placeholder="Description (optional)"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-maroon focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    />
                  </div>
                  <button
                    onClick={() => removeCustomConversion(conversion.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addCustomConversion}
              className="flex items-center gap-2 text-deep-maroon hover:text-warm-saffron transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Custom Conversion
            </button>
          </div>
        )}
      </div>

      {/* Advanced Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Advanced Settings
          </h3>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-deep-maroon hover:text-warm-saffron transition-colors"
          >
            {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {showAdvanced && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="advancedMatching"
                checked={config.advancedMatching.enabled}
                onChange={(e) =>
                  onChange({
                    ...config,
                    advancedMatching: {
                      ...config.advancedMatching,
                      enabled: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-deep-maroon border-gray-300 rounded focus:ring-deep-maroon"
              />
              <label htmlFor="advancedMatching" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Advanced Matching
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="firstPartyCookies"
                checked={config.firstPartyCookies}
                onChange={(e) => onChange({ ...config, firstPartyCookies: e.target.checked })}
                className="w-4 h-4 text-deep-maroon border-gray-300 rounded focus:ring-deep-maroon"
              />
              <label htmlFor="firstPartyCookies" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable First-Party Cookies
              </label>
            </div>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-700 dark:text-blue-400">
                <strong>Note:</strong> Advanced matching automatically hashes user data (email, phone) before sending to Meta.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Test Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Test Meta Pixel Integration
        </h3>
        
        <button
          onClick={handleTestEvent}
          disabled={!config.pixelId}
          className="flex items-center gap-2 bg-deep-maroon text-white px-6 py-2 rounded-lg hover:bg-warm-saffron transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          Send Test PageView Event
        </button>

        {testResult && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            testResult.success
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}>
            {testResult.message}
          </div>
        )}

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          This will send a test PageView event to verify your Meta Pixel configuration. Check your Meta Events Manager to see the event.
        </p>
      </div>
    </div>
  );
}

