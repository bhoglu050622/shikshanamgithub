import { useCallback } from 'react';
import { ChangeRecord } from '@/lib/github/changes-tracker';

export interface UseGitHubChangesOptions {
  contentType: ChangeRecord['contentType'];
  contentId: string;
  editor: ChangeRecord['editor'];
  enabled?: boolean;
}

export interface UseGitHubChangesReturn {
  trackChange: (action: ChangeRecord['action'], changes: ChangeRecord['changes'], metadata?: ChangeRecord['metadata']) => Promise<{ success: boolean; error?: string }>;
  trackCreate: (changes: ChangeRecord['changes'], metadata?: ChangeRecord['metadata']) => Promise<{ success: boolean; error?: string }>;
  trackUpdate: (changes: ChangeRecord['changes'], metadata?: ChangeRecord['metadata']) => Promise<{ success: boolean; error?: string }>;
  trackDelete: (changes: ChangeRecord['changes'], metadata?: ChangeRecord['metadata']) => Promise<{ success: boolean; error?: string }>;
}

/**
 * Hook for tracking CMS changes to GitHub
 */
export function useGitHubChanges({
  contentType,
  contentId,
  editor,
  enabled = true
}: UseGitHubChangesOptions): UseGitHubChangesReturn {
  
  const trackChange = useCallback(async (
    action: ChangeRecord['action'],
    changes: ChangeRecord['changes'],
    metadata: ChangeRecord['metadata'] = {}
  ): Promise<{ success: boolean; error?: string }> => {
    if (!enabled) {
      return { success: true };
    }

    try {
      const response = await fetch('/api/cms/github-changes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType,
          contentId,
          action,
          changes,
          editor,
          metadata: {
            ...metadata,
            timestamp: new Date().toISOString(),
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
            sessionId: typeof window !== 'undefined' ? sessionStorage.getItem('sessionId') : undefined
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log(`Change tracked to GitHub: ${action} ${contentType} ${contentId}`);
        return { success: true };
      } else {
        console.error('Failed to track change to GitHub:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error tracking change to GitHub:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }, [contentType, contentId, editor, enabled]);

  const trackCreate = useCallback(async (
    changes: ChangeRecord['changes'],
    metadata?: ChangeRecord['metadata']
  ) => {
    return trackChange('create', changes, metadata);
  }, [trackChange]);

  const trackUpdate = useCallback(async (
    changes: ChangeRecord['changes'],
    metadata?: ChangeRecord['metadata']
  ) => {
    return trackChange('update', changes, metadata);
  }, [trackChange]);

  const trackDelete = useCallback(async (
    changes: ChangeRecord['changes'],
    metadata?: ChangeRecord['metadata']
  ) => {
    return trackChange('delete', changes, metadata);
  }, [trackChange]);

  return {
    trackChange,
    trackCreate,
    trackUpdate,
    trackDelete
  };
}

/**
 * Utility function to create change records for form data
 */
export function createFormChanges(
  oldData: Record<string, any>,
  newData: Record<string, any>,
  fieldsToTrack: string[] = []
): ChangeRecord['changes'] {
  const changes: ChangeRecord['changes'] = [];
  
  const fieldsToCheck = fieldsToTrack.length > 0 ? fieldsToTrack : Object.keys(newData);
  
  for (const field of fieldsToCheck) {
    const oldValue = oldData[field];
    const newValue = newData[field];
    
    if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      changes.push({
        field,
        oldValue,
        newValue
      });
    }
  }
  
  return changes;
}

/**
 * Utility function to get editor information from context
 */
export function getEditorInfo(): ChangeRecord['editor'] {
  // In a real application, this would come from authentication context
  // For now, return default values
  return {
    name: 'CMS Editor',
    email: 'editor@shikshanam.in',
    userId: 'cms-editor'
  };
}
