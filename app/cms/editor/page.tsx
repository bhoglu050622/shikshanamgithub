import { Suspense } from 'react';
import Editor from './Editor';

export default function CMSEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Editor />
    </Suspense>
  );
}