/**
 * Local Storage Management for CMS
 * Provides auto-save, offline editing, and sync capabilities
 */

export interface CMSEditorState {
  content: string;
  lastModified: number;
  isDirty: boolean;
  autoSaveEnabled: boolean;
  lastSaved?: number;
  version: number;
  file: string;
}

export interface CMSSyncState {
  isOnline: boolean;
  lastSync: number;
  pendingChanges: boolean;
  conflictDetected: boolean;
}

export interface CMSCache {
  [file: string]: CMSEditorState;
}

class CMSLocalStorage {
  private readonly STORAGE_KEY = 'cms_editor_state';
  private readonly SYNC_KEY = 'cms_sync_state';
  private readonly DRAFTS_KEY = 'cms_drafts';
  private readonly AUTO_SAVE_INTERVAL = 30000; // 30 seconds
  private autoSaveTimer: NodeJS.Timeout | null = null;
  private syncCallbacks: Array<(state: CMSSyncState) => void> = [];

  constructor() {
    this.initializeSync();
    this.setupOnlineListener();
  }

  /**
   * Get editor state for a specific file
   */
  getEditorState(file: string): CMSEditorState | null {
    try {
      const cache = this.getCache();
      return cache[file] || null;
    } catch (error) {
      console.error('Error getting editor state:', error);
      return null;
    }
  }

  /**
   * Save editor state for a specific file
   */
  saveEditorState(file: string, content: string, isDirty: boolean = true): void {
    try {
      const cache = this.getCache();
      const now = Date.now();
      
      cache[file] = {
        content,
        lastModified: now,
        isDirty,
        autoSaveEnabled: true,
        lastSaved: isDirty ? undefined : now,
        version: (cache[file]?.version || 0) + 1,
        file
      };

      this.setCache(cache);
      this.updateSyncState({ pendingChanges: isDirty });
      
      // Auto-save if enabled and content is dirty
      if (isDirty && cache[file].autoSaveEnabled) {
        this.scheduleAutoSave(file);
      }
    } catch (error) {
      console.error('Error saving editor state:', error);
    }
  }

  /**
   * Mark content as saved (not dirty)
   */
  markAsSaved(file: string): void {
    try {
      const cache = this.getCache();
      if (cache[file]) {
        cache[file].isDirty = false;
        cache[file].lastSaved = Date.now();
        this.setCache(cache);
        this.updateSyncState({ pendingChanges: false });
      }
    } catch (error) {
      console.error('Error marking as saved:', error);
    }
  }

  /**
   * Get all drafts (unsaved changes)
   */
  getDrafts(): { [file: string]: CMSEditorState } {
    try {
      const cache = this.getCache();
      const drafts: { [file: string]: CMSEditorState } = {};
      
      Object.keys(cache).forEach(file => {
        if (cache[file].isDirty) {
          drafts[file] = cache[file];
        }
      });
      
      return drafts;
    } catch (error) {
      console.error('Error getting drafts:', error);
      return {};
    }
  }

  /**
   * Clear drafts for a specific file
   */
  clearDraft(file: string): void {
    try {
      const cache = this.getCache();
      delete cache[file];
      this.setCache(cache);
      this.updateSyncState({ pendingChanges: Object.keys(this.getDrafts()).length > 0 });
    } catch (error) {
      console.error('Error clearing draft:', error);
    }
  }

  /**
   * Clear all drafts
   */
  clearAllDrafts(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      this.updateSyncState({ pendingChanges: false });
    } catch (error) {
      console.error('Error clearing all drafts:', error);
    }
  }

  /**
   * Enable/disable auto-save for a file
   */
  setAutoSave(file: string, enabled: boolean): void {
    try {
      const cache = this.getCache();
      if (cache[file]) {
        cache[file].autoSaveEnabled = enabled;
        this.setCache(cache);
        
        if (enabled && cache[file].isDirty) {
          this.scheduleAutoSave(file);
        } else {
          this.cancelAutoSave();
        }
      }
    } catch (error) {
      console.error('Error setting auto-save:', error);
    }
  }

  /**
   * Get sync state
   */
  getSyncState(): CMSSyncState {
    try {
      if (typeof window === 'undefined') {
        return {
          isOnline: true,
          lastSync: 0,
          pendingChanges: false,
          conflictDetected: false
        };
      }
      
      const state = localStorage.getItem(this.SYNC_KEY);
      return state ? JSON.parse(state) : {
        isOnline: navigator.onLine,
        lastSync: 0,
        pendingChanges: false,
        conflictDetected: false
      };
    } catch (error) {
      console.error('Error getting sync state:', error);
      return {
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
        lastSync: 0,
        pendingChanges: false,
        conflictDetected: false
      };
    }
  }

  /**
   * Subscribe to sync state changes
   */
  onSyncStateChange(callback: (state: CMSSyncState) => void): () => void {
    this.syncCallbacks.push(callback);
    return () => {
      const index = this.syncCallbacks.indexOf(callback);
      if (index > -1) {
        this.syncCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Force sync with backend
   */
  async forceSync(file: string): Promise<boolean> {
    try {
      const cache = this.getCache();
      const editorState = cache[file];
      
      if (!editorState || !editorState.isDirty) {
        return true;
      }

      // Attempt to save to backend
      const response = await fetch('/api/cms/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          file: file,
          content: editorState.content
        })
      });

      if (response.ok) {
        this.markAsSaved(file);
        this.updateSyncState({ 
          lastSync: Date.now(),
          pendingChanges: Object.keys(this.getDrafts()).length > 0
        });
        return true;
      } else {
        console.error('Sync failed:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Error during sync:', error);
      return false;
    }
  }

  /**
   * Check for conflicts with server content
   */
  async checkForConflicts(file: string): Promise<boolean> {
    try {
      const cache = this.getCache();
      const editorState = cache[file];
      
      if (!editorState || !editorState.isDirty) {
        return false;
      }

      // Fetch current server content
      const response = await fetch(`/api/cms/editor?file=${file}`);
      if (!response.ok) {
        return false;
      }

      const serverData = await response.json();
      const serverContent = JSON.stringify(serverData.content);
      
      // Compare with local content
      if (serverContent !== editorState.content) {
        this.updateSyncState({ conflictDetected: true });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error checking for conflicts:', error);
      return false;
    }
  }

  /**
   * Resolve conflicts by merging or overwriting
   */
  async resolveConflict(file: string, strategy: 'local' | 'server' | 'merge'): Promise<void> {
    try {
      const cache = this.getCache();
      const editorState = cache[file];
      
      if (!editorState) {
        return;
      }

      if (strategy === 'local') {
        // Keep local changes, sync to server
        await this.forceSync(file);
      } else if (strategy === 'server') {
        // Discard local changes, reload from server
        const response = await fetch(`/api/cms/editor?file=${file}`);
        if (response.ok) {
          const serverData = await response.json();
          this.saveEditorState(file, JSON.stringify(serverData.content, null, 2), false);
        }
      } else if (strategy === 'merge') {
        // Attempt to merge (basic implementation)
        const response = await fetch(`/api/cms/editor?file=${file}`);
        if (response.ok) {
          const serverData = await response.json();
          const serverContent = JSON.stringify(serverData.content, null, 2);
          // Simple merge: append local changes as comments
          const mergedContent = `${serverContent}\n\n/* Local changes preserved:\n${editorState.content}\n*/`;
          this.saveEditorState(file, mergedContent, true);
        }
      }

      this.updateSyncState({ conflictDetected: false });
    } catch (error) {
      console.error('Error resolving conflict:', error);
    }
  }

  /**
   * Export all drafts for backup
   */
  exportDrafts(): string {
    try {
      const drafts = this.getDrafts();
      return JSON.stringify(drafts, null, 2);
    } catch (error) {
      console.error('Error exporting drafts:', error);
      return '{}';
    }
  }

  /**
   * Import drafts from backup
   */
  importDrafts(backup: string): boolean {
    try {
      const drafts = JSON.parse(backup);
      const cache = this.getCache();
      
      Object.keys(drafts).forEach(file => {
        cache[file] = drafts[file];
      });
      
      this.setCache(cache);
      this.updateSyncState({ pendingChanges: Object.keys(this.getDrafts()).length > 0 });
      return true;
    } catch (error) {
      console.error('Error importing drafts:', error);
      return false;
    }
  }

  // Private methods

  private getCache(): CMSCache {
    try {
      if (typeof window === 'undefined') {
        return {};
      }
      
      const cache = localStorage.getItem(this.STORAGE_KEY);
      return cache ? JSON.parse(cache) : {};
    } catch (error) {
      console.error('Error getting cache:', error);
      return {};
    }
  }

  private setCache(cache: CMSCache): void {
    try {
      if (typeof window === 'undefined') {
        return;
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  }

  private updateSyncState(updates: Partial<CMSSyncState>): void {
    try {
      if (typeof window === 'undefined') {
        return;
      }
      
      const currentState = this.getSyncState();
      const newState = { ...currentState, ...updates };
      localStorage.setItem(this.SYNC_KEY, JSON.stringify(newState));
      
      // Notify subscribers
      this.syncCallbacks.forEach(callback => callback(newState));
    } catch (error) {
      console.error('Error updating sync state:', error);
    }
  }

  private scheduleAutoSave(file: string): void {
    this.cancelAutoSave();
    this.autoSaveTimer = setTimeout(() => {
      this.forceSync(file);
    }, this.AUTO_SAVE_INTERVAL);
  }

  private cancelAutoSave(): void {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  private initializeSync(): void {
    this.updateSyncState({
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
      lastSync: 0,
      pendingChanges: Object.keys(this.getDrafts()).length > 0,
      conflictDetected: false
    });
  }

  private setupOnlineListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.updateSyncState({ isOnline: true });
        // Attempt to sync pending changes
        this.syncPendingChanges();
      });

      window.addEventListener('offline', () => {
        this.updateSyncState({ isOnline: false });
      });
    }
  }

  private async syncPendingChanges(): Promise<void> {
    const drafts = this.getDrafts();
    const files = Object.keys(drafts);
    
    for (const file of files) {
      try {
        await this.forceSync(file);
      } catch (error) {
        console.error(`Failed to sync ${file}:`, error);
      }
    }
  }
}

// Export singleton instance
export const cmsLocalStorage = new CMSLocalStorage();

// Export utility functions
export const useCMSLocalStorage = () => {
  return {
    getEditorState: cmsLocalStorage.getEditorState.bind(cmsLocalStorage),
    saveEditorState: cmsLocalStorage.saveEditorState.bind(cmsLocalStorage),
    markAsSaved: cmsLocalStorage.markAsSaved.bind(cmsLocalStorage),
    getDrafts: cmsLocalStorage.getDrafts.bind(cmsLocalStorage),
    clearDraft: cmsLocalStorage.clearDraft.bind(cmsLocalStorage),
    clearAllDrafts: cmsLocalStorage.clearAllDrafts.bind(cmsLocalStorage),
    setAutoSave: cmsLocalStorage.setAutoSave.bind(cmsLocalStorage),
    getSyncState: cmsLocalStorage.getSyncState.bind(cmsLocalStorage),
    onSyncStateChange: cmsLocalStorage.onSyncStateChange.bind(cmsLocalStorage),
    forceSync: cmsLocalStorage.forceSync.bind(cmsLocalStorage),
    checkForConflicts: cmsLocalStorage.checkForConflicts.bind(cmsLocalStorage),
    resolveConflict: cmsLocalStorage.resolveConflict.bind(cmsLocalStorage),
    exportDrafts: cmsLocalStorage.exportDrafts.bind(cmsLocalStorage),
    importDrafts: cmsLocalStorage.importDrafts.bind(cmsLocalStorage)
  };
};
