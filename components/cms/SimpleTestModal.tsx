'use client';

import React from 'react';

interface SimpleTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: string;
}

export default function SimpleTestModal({ isOpen, onClose, contentType }: SimpleTestModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-4xl w-[90vw] h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b bg-green-100">
          <h2 className="text-2xl font-bold text-slate-800">✅ Modal is Working!</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-green-600 mb-4">
              Success! Modal opened for: {contentType}
            </h3>
            <p className="text-slate-600 mb-4">
              This confirms that the modal system is working correctly.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">
                <strong>Next Steps:</strong> Replace this test modal with the full ContentEditModal component.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
