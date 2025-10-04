/**
 * CMS Sync Status Component
 * Shows the current sync state, offline status, and pending changes
 */

import React from 'react';
import { useCMSLocalStorage } from '@/lib/cms/local-storage';
import { 
  Wifi, 
  WifiOff, 
  Save, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Download,
  Upload
} from 'lucide-react';

interface SyncStatusProps {
  file: string;
  className?: string;
}

export default function SyncStatus({ file, className = '' }: SyncStatusProps) {
  const cmsStorage = useCMSLocalStorage();
  const [syncState, setSyncState] = React.useState(cmsStorage.getSyncState());
  const [editorState, setEditorState] = React.useState(cmsStorage.getEditorState(file));

  React.useEffect(() => {
    const unsubscribe = cmsStorage.onSyncStateChange((newSyncState) => {
      setSyncState(newSyncState);
    });

    // Update editor state periodically
    const interval = setInterval(() => {
      const currentState = cmsStorage.getEditorState(file);
      setEditorState(currentState);
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [file, cmsStorage]);

  const getStatusIcon = () => {
    if (!syncState.isOnline) {
      return <WifiOff className="w-4 h-4 text-red-500" />;
    }
    
    if (syncState.conflictDetected) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
    
    if (syncState.pendingChanges) {
      return <Clock className="w-4 h-4 text-orange-500" />;
    }
    
    if (editorState?.isDirty) {
      return <Save className="w-4 h-4 text-blue-500" />;
    }
    
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  const getStatusText = () => {
    if (!syncState.isOnline) {
      return 'Offline - Changes saved locally';
    }
    
    if (syncState.conflictDetected) {
      return 'Conflict detected - Manual resolution required';
    }
    
    if (syncState.pendingChanges) {
      return 'Pending sync - Changes will be saved when online';
    }
    
    if (editorState?.isDirty) {
      return 'Unsaved changes - Auto-save enabled';
    }
    
    return 'All changes saved';
  };

  const getLastSavedText = () => {
    if (editorState?.lastSaved) {
      const lastSaved = new Date(editorState.lastSaved);
      const now = new Date();
      const diff = now.getTime() - lastSaved.getTime();
      
      if (diff < 60000) { // Less than 1 minute
        return 'Saved just now';
      } else if (diff < 3600000) { // Less than 1 hour
        const minutes = Math.floor(diff / 60000);
        return `Saved ${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      } else {
        return `Saved at ${lastSaved.toLocaleTimeString()}`;
      }
    }
    
    return 'Not saved yet';
  };

  const handleForceSync = async () => {
    try {
      await cmsStorage.forceSync(file);
    } catch (error) {
      console.error('Force sync failed:', error);
    }
  };

  const handleResolveConflict = async (strategy: 'local' | 'server' | 'merge') => {
    try {
      await cmsStorage.resolveConflict(file, strategy);
    } catch (error) {
      console.error('Conflict resolution failed:', error);
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Status Icon */}
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <span className="text-sm font-medium text-gray-700">
          {getStatusText()}
        </span>
      </div>

      {/* Last Saved Time */}
      {editorState?.lastSaved && (
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{getLastSavedText()}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {/* Force Sync Button */}
        {syncState.pendingChanges && syncState.isOnline && (
          <button
            onClick={handleForceSync}
            className="flex items-center space-x-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            <Upload className="w-3 h-3" />
            <span>Sync Now</span>
          </button>
        )}

        {/* Conflict Resolution */}
        {syncState.conflictDetected && (
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleResolveConflict('local')}
              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
            >
              Keep Local
            </button>
            <button
              onClick={() => handleResolveConflict('server')}
              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Use Server
            </button>
            <button
              onClick={() => handleResolveConflict('merge')}
              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
            >
              Merge
            </button>
          </div>
        )}

        {/* Offline Indicator */}
        {!syncState.isOnline && (
          <div className="flex items-center space-x-1 text-xs text-red-600">
            <WifiOff className="w-3 h-3" />
            <span>Offline</span>
          </div>
        )}
      </div>

      {/* Drafts Count */}
      {syncState.pendingChanges && (
        <div className="flex items-center space-x-1 text-xs text-orange-600">
          <Download className="w-3 h-3" />
          <span>Drafts pending</span>
        </div>
      )}
    </div>
  );
}
