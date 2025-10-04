/**
 * React Hook for CMS Editor with Local Storage
 * Provides auto-save, offline editing, and sync capabilities
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useCMSLocalStorage, CMSEditorState, CMSSyncState } from './local-storage';

export interface UseCMSEditorOptions {
  file: string;
  autoSave?: boolean;
  autoSaveInterval?: number;
  onSave?: (content: string) => Promise<boolean>;
  onSync?: (state: CMSSyncState) => void;
  onConflict?: (file: string) => void;
}

export interface UseCMSEditorReturn {
  content: string;
  setContent: (content: string) => void;
  isDirty: boolean;
  isSaving: boolean;
  isOnline: boolean;
  lastSaved: number | null;
  pendingChanges: boolean;
  conflictDetected: boolean;
  save: () => Promise<boolean>;
  forceSync: () => Promise<boolean>;
  resolveConflict: (strategy: 'local' | 'server' | 'merge') => Promise<void>;
  clearDraft: () => void;
  exportDrafts: () => string;
  importDrafts: (backup: string) => boolean;
}

export function useCMSEditor({
  file,
  autoSave = true,
  autoSaveInterval = 30000,
  onSave,
  onSync,
  onConflict
}: UseCMSEditorOptions): UseCMSEditorReturn {
  const cmsStorage = useCMSLocalStorage();
  
  // State
  const [content, setContentState] = useState<string>('');
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [syncState, setSyncState] = useState<CMSSyncState>(cmsStorage.getSyncState());
  
  // Refs
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastContentRef = useRef<string>('');
  const saveRef = useRef<() => Promise<boolean>>();
  
  // Initialize content from local storage or server
  useEffect(() => {
    const initializeContent = async () => {
      try {
        // Check local storage first
        const localState = cmsStorage.getEditorState(file);
        
        if (localState && localState.content) {
          setContentState(localState.content);
          setIsDirty(localState.isDirty);
          lastContentRef.current = localState.content;
        } else {
          // Fetch from server
          const response = await fetch(`/api/cms/editor?file=${file}`);
          if (response.ok) {
            const data = await response.json();
            const serverContent = JSON.stringify(data.content, null, 2);
            setContentState(serverContent);
            lastContentRef.current = serverContent;
            
            // Save to local storage
            cmsStorage.saveEditorState(file, serverContent, false);
          }
        }
      } catch (error) {
        console.error('Error initializing content:', error);
      }
    };

    initializeContent();
  }, [file, cmsStorage]);

  // Set up sync state listener
  useEffect(() => {
    const unsubscribe = cmsStorage.onSyncStateChange((newSyncState) => {
      setSyncState(newSyncState);
      onSync?.(newSyncState);
      
      if (newSyncState.conflictDetected) {
        onConflict?.(file);
      }
    });

    return unsubscribe;
  }, [file, onSync, onConflict, cmsStorage]);

  // Auto-save effect
  useEffect(() => {
    if (autoSave && isDirty && saveRef.current) {
      const timeout = setTimeout(() => {
        saveRef.current?.();
      }, autoSaveInterval);
      
      return () => clearTimeout(timeout);
    }
  }, [content, isDirty, autoSave, autoSaveInterval]);

  // Content change handler
  const setContent = useCallback((newContent: string) => {
    setContentState(newContent);
    setIsDirty(newContent !== lastContentRef.current);
    
    // Save to local storage immediately
    cmsStorage.saveEditorState(file, newContent, newContent !== lastContentRef.current);
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set new timeout for auto-save
    if (autoSave && newContent !== lastContentRef.current) {
      saveTimeoutRef.current = setTimeout(() => {
        saveRef.current?.();
      }, autoSaveInterval);
    }
  }, [file, autoSave, autoSaveInterval, cmsStorage]);

  // Save function
  const save = useCallback(async (): Promise<boolean> => {
    if (!isDirty || isSaving) {
      return true;
    }

    setIsSaving(true);
    
    try {
      let success = false;
      
      if (onSave) {
        // Use custom save function
        success = await onSave(content);
      } else {
        // Use default GitHub API
        const response = await fetch('/api/cms/github', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'save',
            file: file,
            content: content
          })
        });
        
        success = response.ok;
      }
      
      if (success) {
        setIsDirty(false);
        lastContentRef.current = content;
        cmsStorage.markAsSaved(file);
      }
      
      return success;
    } catch (error) {
      console.error('Error saving content:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [content, isDirty, isSaving, file, onSave, cmsStorage]);

  // Assign save function to ref
  saveRef.current = save;

  // Force sync function
  const forceSync = useCallback(async (): Promise<boolean> => {
    return await cmsStorage.forceSync(file);
  }, [file, cmsStorage]);

  // Resolve conflict function
  const resolveConflict = useCallback(async (strategy: 'local' | 'server' | 'merge'): Promise<void> => {
    await cmsStorage.resolveConflict(file, strategy);
  }, [file, cmsStorage]);

  // Clear draft function
  const clearDraft = useCallback(() => {
    cmsStorage.clearDraft(file);
    setIsDirty(false);
  }, [file, cmsStorage]);

  // Export drafts function
  const exportDrafts = useCallback(() => {
    return cmsStorage.exportDrafts();
  }, [cmsStorage]);

  // Import drafts function
  const importDrafts = useCallback((backup: string) => {
    return cmsStorage.importDrafts(backup);
  }, [cmsStorage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    content,
    setContent,
    isDirty,
    isSaving,
    isOnline: syncState.isOnline,
    lastSaved: syncState.lastSync,
    pendingChanges: syncState.pendingChanges,
    conflictDetected: syncState.conflictDetected,
    save,
    forceSync,
    resolveConflict,
    clearDraft,
    exportDrafts,
    importDrafts
  };
}
