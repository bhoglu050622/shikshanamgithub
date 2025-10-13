'use client';

import { useState, useEffect } from 'react';
import { Play, Trash2, Activity } from 'lucide-react';
import { TestEvent, COMMON_TEST_EVENTS } from '@/lib/marketing/tracking-config';

interface EventTesterProps {
  onSendGA4Event: (eventName: string, parameters: Record<string, any>) => Promise<boolean>;
  onSendMetaEvent: (eventName: string, parameters: Record<string, any>) => Promise<boolean>;
}

export default function EventTester({ onSendGA4Event, onSendMetaEvent }: EventTesterProps) {
  const [events, setEvents] = useState<TestEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendTestEvent = async (testEvent: typeof COMMON_TEST_EVENTS[0]) => {
    setIsLoading(true);

    const newEvent: TestEvent = {
      id: Date.now().toString(),
      platform: 'both',
      eventName: testEvent.name,
      parameters: testEvent.ga4Params,
      timestamp: Date.now(),
      status: 'pending',
    };

    setEvents(prev => [newEvent, ...prev]);

    try {
      // Send to GA4
      const ga4Success = await onSendGA4Event(testEvent.name, testEvent.ga4Params);
      
      // Send to Meta
      const metaSuccess = await onSendMetaEvent(
        testEvent.metaEvent as any,
        testEvent.metaParams
      );

      const success = ga4Success || metaSuccess;

      setEvents(prev =>
        prev.map(e =>
          e.id === newEvent.id
            ? {
                ...e,
                status: success ? 'success' : 'error',
                error: success ? undefined : 'Failed to send event',
              }
            : e
        )
      );
    } catch (error) {
      setEvents(prev =>
        prev.map(e =>
          e.id === newEvent.id
            ? {
                ...e,
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error',
              }
            : e
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearEvents = () => {
    setEvents([]);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const ms = date.getMilliseconds().toString().padStart(3, '0');
    return `${timeStr}.${ms}`;
  };

  const getStatusColor = (status: TestEvent['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700';
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Test Event Buttons */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Event Testing Playground
          </h3>
          <Activity className="w-5 h-5 text-deep-maroon" />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Send test events to both GA4 and Meta Pixel to verify your integrations are working correctly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMMON_TEST_EVENTS.map((testEvent) => (
            <button
              key={testEvent.name}
              onClick={() => sendTestEvent(testEvent)}
              disabled={isLoading}
              className="flex items-center justify-between gap-3 p-4 bg-gradient-to-r from-deep-maroon to-warm-saffron text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="text-left">
                <div className="font-semibold">{testEvent.displayName}</div>
                <div className="text-xs opacity-90">{testEvent.name}</div>
              </div>
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* Event Log */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Event Log
          </h3>
          {events.length > 0 && (
            <button
              onClick={clearEvents}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clear Log
            </button>
          )}
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No events fired yet. Click a test button above to get started.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-lg border-2 ${getStatusColor(event.status)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold">{event.eventName}</span>
                      <span className="text-xs px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded">
                        {event.platform.toUpperCase()}
                      </span>
                      <span className="text-xs opacity-75">
                        {formatTimestamp(event.timestamp)}
                      </span>
                    </div>

                    {Object.keys(event.parameters).length > 0 && (
                      <div className="text-xs mt-2 p-2 bg-white/50 dark:bg-black/20 rounded font-mono overflow-x-auto">
                        {JSON.stringify(event.parameters, null, 2)}
                      </div>
                    )}

                    {event.error && (
                      <div className="text-xs mt-2 font-medium">
                        Error: {event.error}
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <span className={`inline-block w-3 h-3 rounded-full ${
                      event.status === 'success' ? 'bg-green-500' :
                      event.status === 'error' ? 'bg-red-500' :
                      'bg-yellow-500 animate-pulse'
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Real-time Monitoring Info */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          Real-time Monitoring Tips
        </h4>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-deep-maroon mt-0.5">•</span>
            <span><strong>GA4:</strong> Open your Google Analytics 4 property and navigate to Reports → Realtime to see events as they fire.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-deep-maroon mt-0.5">•</span>
            <span><strong>Meta Pixel:</strong> Use Meta Events Manager (business.facebook.com) and check the Test Events tab to view incoming events.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-deep-maroon mt-0.5">•</span>
            <span><strong>Browser DevTools:</strong> Open Network tab and filter by "collect" (GA4) or "tr" (Meta) to see tracking requests.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-deep-maroon mt-0.5">•</span>
            <span><strong>Console:</strong> Check browser console for tracking logs and any errors.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

