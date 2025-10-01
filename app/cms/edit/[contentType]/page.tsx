'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ContentEditPage from '@/components/cms/ContentEditPage';
import { ContentRegistry } from '@/lib/cms/content-registry';

export default function EditContentPage() {
  const params = useParams();
  const contentTypeId = params.contentType as string;
  
  // Get content type from ContentRegistry
  const contentType = ContentRegistry.getContentType(contentTypeId);
  
  if (!contentType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Type Not Found</h1>
          <p className="text-gray-600">The content type "{contentTypeId}" does not exist.</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Available content types:</p>
            <ul className="text-sm text-gray-500 mt-2">
              {ContentRegistry.getAllContentTypes().map(type => (
                <li key={type.id}>• {type.name} ({type.id})</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Convert ContentRegistry format to ContentEditPage format
  const contentTypeForEdit = {
    id: contentType.id,
    name: contentType.name,
    description: contentType.description,
    status: contentType.status,
    category: contentType.category,
    features: contentType.features,
    sections: contentType.sections,
    isLoaded: false
  };

  return <ContentEditPage contentType={contentTypeForEdit} />;
}
