'use client';

import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { GA4Config, GA4CustomEvent, DEFAULT_GA4_CONFIG } from '@/lib/marketing/tracking-config';

interface GA4PanelProps {
  config: GA4Config;
  onChange: (config: GA4Config) => void;
  onTest: (eventName: string, parameters: Record<string, any>) => Promise<boolean>;
}

export default function GA4Panel({ config, onChange, onTest }: GA4PanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTestEvent = async () => {
    setTestResult(null);
    const success = await onTest('test_event', {
      test_parameter: 'test_value',
      timestamp: Date.now(),
    });
    
    setTestResult({
      success,
      message: success ? 'Test event sent successfully!' : 'Failed to send test event',
    });

    setTimeout(() => setTestResult(null), 5000);
  };

  const addCustomEvent = () => {
    const newEvent: GA4CustomEvent = {
      id: Date.now().toString(),
      name: '',
      description: '',
      parameters: {},
    };
    onChange({ ...config, customEvents: [...config.customEvents, newEvent] });
  };

  const updateCustomEvent = (id: string, updates: Partial<GA4CustomEvent>) => {
    const updatedEvents = config.customEvents.map(event =>
      event.id === id ? { ...event, ...updates } : event
    );
    onChange({ ...config, customEvents: updatedEvents });
  };

  const removeCustomEvent = (id: string) => {
    onChange({
      ...config,
      customEvents: config.customEvents.filter(e => e.id !== id),
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
              Measurement ID *
            </label>
            <input
              type="text"
              value={config.measurementId}
              onChange={(e) => onChange({ ...config, measurementId: e.target.value })}
              placeholder="G-XXXXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-maroon focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Format: G-XXXXXXXXXX (10 alphanumeric characters)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Stream Name (Optional)
            </label>
            <input
              type="text"
              value={config.streamName || ''}
              onChange={(e) => onChange({ ...config, streamName: e.target.value })}
              placeholder="My Web Stream"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-maroon focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="debugMode"
              checked={config.debugMode}
              onChange={(e) => onChange({ ...config, debugMode: e.target.checked })}
              className="w-4 h-4 text-deep-maroon border-gray-300 rounded focus:ring-deep-maroon"
            />
            <label htmlFor="debugMode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Enable Debug Mode
            </label>
          </div>
        </div>
      </div>

      {/* Custom Events */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Custom Events
          </h3>
          <button
            onClick={() => setShowEvents(!showEvents)}
            className="text-deep-maroon hover:text-warm-saffron transition-colors"
          >
            {showEvents ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {showEvents && (
          <div className="space-y-4">
            {config.customEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={event.name}
                      onChange={(e) => updateCustomEvent(event.id, { name: e.target.value })}
                      placeholder="Event name (e.g., button_click)"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-maroon focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    />
                    <input
                      type="text"
                      value={event.description || ''}
                      onChange={(e) => updateCustomEvent(event.id, { description: e.target.value })}
                      placeholder="Description (optional)"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-maroon focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    />
                  </div>
                  <button
                    onClick={() => removeCustomEvent(event.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addCustomEvent}
              className="flex items-center gap-2 text-deep-maroon hover:text-warm-saffron transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Custom Event
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
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Enhanced Measurement
              </h4>
              <div className="space-y-2">
                {Object.entries(config.enhancedMeasurement).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`em-${key}`}
                      checked={value}
                      onChange={(e) =>
                        onChange({
                          ...config,
                          enhancedMeasurement: {
                            ...config.enhancedMeasurement,
                            [key]: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 text-deep-maroon border-gray-300 rounded focus:ring-deep-maroon"
                    />
                    <label htmlFor={`em-${key}`} className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cross-Domain Tracking (comma-separated)
              </label>
              <input
                type="text"
                value={config.crossDomainTracking.join(', ')}
                onChange={(e) =>
                  onChange({
                    ...config,
                    crossDomainTracking: e.target.value.split(',').map(d => d.trim()).filter(d => d),
                  })
                }
                placeholder="example.com, subdomain.example.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-deep-maroon focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Test Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Test GA4 Integration
        </h3>
        
        <button
          onClick={handleTestEvent}
          disabled={!config.measurementId}
          className="flex items-center gap-2 bg-deep-maroon text-white px-6 py-2 rounded-lg hover:bg-warm-saffron transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          Send Test Event
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
          This will send a test event to verify your GA4 configuration. Check your GA4 Realtime report to see the event.
        </p>
      </div>
    </div>
  );
}

