'use client';

import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { TrackingStatus } from '@/lib/marketing/tracking-config';

interface StatusIndicatorProps {
  status: TrackingStatus;
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const getStatusIcon = () => {
    if (!status.connected) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
    if (!status.scriptLoaded) {
      return <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />;
    }
    if (status.mode === 'test') {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
    return <CheckCircle className="w-5 h-5 text-green-500" />;
  };

  const getStatusText = () => {
    if (!status.connected) {
      return 'Not Connected';
    }
    if (!status.scriptLoaded) {
      return 'Loading...';
    }
    if (status.mode === 'test') {
      return 'Test Mode';
    }
    return 'Active';
  };

  const getStatusColor = () => {
    if (!status.connected) {
      return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400';
    }
    if (!status.scriptLoaded) {
      return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400';
    }
    if (status.mode === 'test') {
      return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400';
    }
    return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400';
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${getStatusColor()}`}>
      {getStatusIcon()}
      <span>{getStatusText()}</span>
      {status.error && (
        <span className="ml-1 text-xs opacity-75">({status.error})</span>
      )}
    </div>
  );
}

interface PlatformStatusCardProps {
  platform: 'Google Analytics 4' | 'Meta Pixel';
  status: TrackingStatus;
  lastEventTime?: number;
}

export function PlatformStatusCard({ platform, status, lastEventTime }: PlatformStatusCardProps) {
  const formatLastEvent = (timestamp?: number) => {
    if (!timestamp) return 'No events yet';
    
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    return `${Math.floor(diff / 86400000)} days ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">{platform}</h4>
        <StatusIndicator status={status} />
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Script Loaded:</span>
          <span className={status.scriptLoaded ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
            {status.scriptLoaded ? 'Yes' : 'No'}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Last Event:</span>
          <span>{formatLastEvent(status.lastEvent)}</span>
        </div>
        
        {status.mode && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Mode:</span>
            <span className="capitalize font-medium">{status.mode}</span>
          </div>
        )}
      </div>
    </div>
  );
}

