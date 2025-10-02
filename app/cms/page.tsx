'use client'

import CMSLayout from '@/components/cms/CMSLayout'
import { useRouter } from 'next/navigation'

export default function CMSAdmin() {
  const router = useRouter()

  const handleEditContent = (contentId: string) => {
    router.push(`/cms/edit/${contentId}`)
  }

  const handlePreviewContent = (contentId: string) => {
    window.open(`/${contentId}`, '_blank')
  }

  const handleDuplicateContent = (contentId: string) => {
    // Implement duplication logic
    console.log('Duplicating content:', contentId)
  }

  const handleDeleteContent = (contentId: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      console.log('Deleting content:', contentId)
    }
  }

  return (
    <CMSLayout
      onEditContent={handleEditContent}
      onPreviewContent={handlePreviewContent}
      onDuplicateContent={handleDuplicateContent}
      onDeleteContent={handleDeleteContent}
    />
  )
}