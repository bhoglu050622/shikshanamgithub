/**
 * Auto-Save functionality for CMS content
 * Prevents content loss and provides seamless editing experience
 */

import { useState, useEffect, useCallback, useRef } from 'react';

interface AutoSaveOptions {
  delay?: number; // Delay in milliseconds before auto-save
  maxRetries?: number; // Maximum retry attempts
  onSave?: (content: any) => Promise<boolean>; // Save function
  onError?: (error: Error) => void; // Error handler
  onSuccess?: (content: any) => void; // Success handler
  enabled?: boolean; // Enable/disable auto-save
}

interface AutoSaveState {
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
  saveError: string | null;
  retryCount: number;
}

export function useAutoSave<T>(
  content: T,
  options: AutoSaveOptions = {}
) {
  const {
    delay = 2000, // 2 seconds default delay
    maxRetries = 3,
    onSave,
    onError,
    onSuccess,
    enabled = true
  } = options;

  const [state, setState] = useState<AutoSaveState>({
    isSaving: false,
    lastSaved: null,
    hasUnsavedChanges: false,
    saveError: null,
    retryCount: 0
  });

  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousContentRef = useRef<T>(content);
  const isInitialMount = useRef(true);

  // Check if content has changed
  const hasContentChanged = useCallback((current: T, previous: T): boolean => {
    return JSON.stringify(current) !== JSON.stringify(previous);
  }, []);

  // Auto-save function
  const performAutoSave = useCallback(async (contentToSave: T) => {
    if (!onSave || !enabled) return;

    setState(prev => ({ ...prev, isSaving: true, saveError: null }));

    try {
      const success = await onSave(contentToSave);
      
      if (success) {
        setState(prev => ({
          ...prev,
          isSaving: false,
          lastSaved: new Date(),
          hasUnsavedChanges: false,
          saveError: null,
          retryCount: 0
        }));
        
        onSuccess?.(contentToSave);
      } else {
        throw new Error('Save operation failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      setState(prev => ({
        ...prev,
        isSaving: false,
        saveError: errorMessage,
        retryCount: prev.retryCount + 1
      }));

      onError?.(error as Error);

      // Retry logic
      if (state.retryCount < maxRetries) {
        setTimeout(() => {
          performAutoSave(contentToSave);
        }, 1000 * (state.retryCount + 1)); // Exponential backoff
      }
    }
  }, [onSave, enabled, onSuccess, onError, state.retryCount, maxRetries]);

  // Debounced auto-save
  const debouncedAutoSave = useCallback((contentToSave: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      performAutoSave(contentToSave);
    }, delay);
  }, [delay, performAutoSave]);

  // Manual save function
  const saveNow = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    await performAutoSave(content);
  }, [content, performAutoSave]);

  // Reset auto-save state
  const resetAutoSave = useCallback(() => {
    setState({
      isSaving: false,
      lastSaved: null,
      hasUnsavedChanges: false,
      saveError: null,
      retryCount: 0
    });
  }, []);

  // Effect to handle content changes
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousContentRef.current = content;
      return;
    }

    // Check if content has changed
    if (hasContentChanged(content, previousContentRef.current)) {
      setState(prev => ({ ...prev, hasUnsavedChanges: true }));
      
      // Trigger auto-save
      debouncedAutoSave(content);
    }

    previousContentRef.current = content;
  }, [content, hasContentChanged, debouncedAutoSave]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    ...state,
    saveNow,
    resetAutoSave
  };
}

// Auto-save indicator component - exported from separate file
export { default as AutoSaveIndicator } from '@/components/cms/AutoSaveIndicator';

// Auto-save hook for form fields
export function useAutoSaveField<T>(
  initialValue: T,
  saveFunction: (value: T) => Promise<boolean>,
  options: Omit<AutoSaveOptions, 'onSave'> = {}
) {
  const [value, setValue] = useState<T>(initialValue);
  
  const autoSaveState = useAutoSave(value, {
    ...options,
    onSave: saveFunction
  });

  return {
    value,
    setValue,
    ...autoSaveState
  };
}

// Auto-save for JSON content
export function useAutoSaveJSON(
  content: any,
  saveEndpoint: string,
  options: Omit<AutoSaveOptions, 'onSave'> = {}
) {
  const saveFunction = useCallback(async (contentToSave: any) => {
    try {
      const response = await fetch(saveEndpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentToSave),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Auto-save failed:', error);
      return false;
    }
  }, [saveEndpoint]);

  return useAutoSave(content, {
    ...options,
    onSave: saveFunction
  });
}
