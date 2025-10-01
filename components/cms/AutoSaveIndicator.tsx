'use client';

import React from 'react';

interface AutoSaveState {
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
  saveError: string | null;
  retryCount: number;
}

export default function AutoSaveIndicator({ 
  isSaving, 
  lastSaved, 
  hasUnsavedChanges, 
  saveError 
}: AutoSaveState) {
  const getStatusColor = () => {
    if (saveError) return 'text-red-600';
    if (isSaving) return 'text-blue-600';
    if (hasUnsavedChanges) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusText = () => {
    if (saveError) return 'Save failed';
    if (isSaving) return 'Saving...';
    if (hasUnsavedChanges) return 'Unsaved changes';
    if (lastSaved) return `Saved ${lastSaved.toLocaleTimeString()}`;
    return 'No changes';
  };

  const getStatusIcon = () => {
    if (saveError) return '⚠️';
    if (isSaving) return '⏳';
    if (hasUnsavedChanges) return '●';
    return '✓';
  };

  return (
    <div className={`flex items-center space-x-2 text-sm ${getStatusColor()}`}>
      <span>{getStatusIcon()}</span>
      <span>{getStatusText()}</span>
      {saveError && (
        <span className="text-xs opacity-75">
          ({saveError})
        </span>
      )}
    </div>
  );
}
