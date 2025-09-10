# Section Editor Guide

The Section Editor provides granular, section-by-section editing capabilities for all content types in the CMS. This allows users to edit individual sections of content (like course lessons, blog sections, etc.) as well as perform bulk operations on multiple sections.

## Overview

The Section Editor system includes:
- **Individual Section Editing**: Edit each section independently
- **Bulk Operations**: Edit multiple sections at once
- **Drag & Drop Reordering**: Visual section reordering
- **Section Templates**: Pre-built section types
- **Real-time Updates**: Live updates across all connected components
- **Version Control**: Automatic revision tracking for parent content

## Architecture

```
Section Editor Service
       ↓
   Section Hooks
       ↓
   Section Components
       ↓
   Real-time Events
       ↓
   Connected Components
```

## Section Types

The system supports various section types:

### Text Sections
- **Type**: `text`
- **Content**: Markdown or rich text content
- **Use Case**: Paragraphs, articles, descriptions

### Image Sections
- **Type**: `image`
- **Content**: Image URL, alt text, caption
- **Use Case**: Visual content, illustrations

### Video Sections
- **Type**: `video`
- **Content**: Video URL, provider (YouTube, Vimeo, etc.)
- **Use Case**: Educational videos, demonstrations

### Quiz Sections
- **Type**: `quiz`
- **Content**: Questions, answers, scoring
- **Use Case**: Assessments, knowledge checks

### Code Sections
- **Type**: `code`
- **Content**: Code blocks with syntax highlighting
- **Use Case**: Code examples, tutorials

### Quote Sections
- **Type**: `quote`
- **Content**: Quote text, author, source
- **Use Case**: Inspirational quotes, testimonials

### List Sections
- **Type**: `list`
- **Content**: Ordered or unordered lists
- **Use Case**: Step-by-step instructions, feature lists

### Table Sections
- **Type**: `table`
- **Content**: Headers, rows, data
- **Use Case**: Data presentation, comparisons

## Database Schema

```sql
-- Content sections table
CREATE TABLE content_sections (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  content JSONB NOT NULL,
  "order" INTEGER NOT NULL,
  metadata JSONB,
  is_visible BOOLEAN DEFAULT true,
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by_id TEXT NOT NULL REFERENCES users(id)
);
```

## API Endpoints

### Get Sections
```http
GET /api/cms/sections?contentType=COURSE&contentId=course-id
```

### Create Section
```http
POST /api/cms/sections
Content-Type: application/json

{
  "contentType": "COURSE",
  "contentId": "course-id",
  "type": "text",
  "content": { "text": "Section content" },
  "metadata": { "title": "Section Title" },
  "isVisible": true
}
```

### Update Section
```http
PUT /api/cms/sections/section-id
Content-Type: application/json

{
  "content": { "text": "Updated content" },
  "metadata": { "title": "Updated Title" }
}
```

### Delete Section
```http
DELETE /api/cms/sections/section-id
```

### Move Section
```http
PUT /api/cms/sections/section-id/move
Content-Type: application/json

{
  "newOrder": 3
}
```

### Bulk Operations
```http
POST /api/cms/sections/bulk
Content-Type: application/json

{
  "contentType": "COURSE",
  "contentId": "course-id",
  "operations": [
    {
      "operation": "update",
      "sectionIds": ["section-1", "section-2"],
      "data": { "isVisible": false }
    },
    {
      "operation": "delete",
      "sectionIds": ["section-3"]
    }
  ]
}
```

## React Hooks

### useContentSections
Manages sections for a specific content item:

```typescript
import { useContentSections } from '@/cms/lib/core/section-hooks'

function CourseEditor({ courseId }) {
  const {
    sections,
    isLoading,
    error,
    createSection,
    updateSection,
    deleteSection,
    moveSection,
    duplicateSection,
    toggleSectionVisibility,
    bulkEditSections
  } = useContentSections(ContentType.COURSE, courseId, user)

  return (
    <div>
      {sections.map(section => (
        <SectionCard key={section.id} section={section} />
      ))}
    </div>
  )
}
```

### useSection
Manages a single section:

```typescript
import { useSection } from '@/cms/lib/core/section-hooks'

function SectionEditor({ sectionId }) {
  const {
    section,
    isLoading,
    error,
    updateSection
  } = useSection(sectionId, user)

  return (
    <div>
      {section && <SectionForm section={section} onSave={updateSection} />}
    </div>
  )
}
```

### useSectionStats
Get section statistics:

```typescript
import { useSectionStats } from '@/cms/lib/core/section-hooks'

function SectionStats({ contentType, contentId }) {
  const { stats, isLoading } = useSectionStats(contentType, contentId, user)

  return (
    <div>
      <p>Total Sections: {stats?.totalSections}</p>
      <p>Visible: {stats?.visibleSections}</p>
      <p>Hidden: {stats?.hiddenSections}</p>
    </div>
  )
}
```

### useSectionDragAndDrop
Handle drag and drop reordering:

```typescript
import { useSectionDragAndDrop } from '@/cms/lib/core/section-hooks'

function DraggableSectionList({ sections, onReorder }) {
  const {
    draggedSection,
    dragOverSection,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  } = useSectionDragAndDrop(sections, onReorder)

  return (
    <div>
      {sections.map(section => (
        <div
          key={section.id}
          draggable
          onDragStart={() => handleDragStart(section.id)}
          onDragOver={(e) => {
            e.preventDefault()
            handleDragOver(section.id)
          }}
          onDragEnd={handleDragEnd}
        >
          {section.title}
        </div>
      ))}
    </div>
  )
}
```

### useSectionTemplates
Get section templates:

```typescript
import { useSectionTemplates } from '@/cms/lib/core/section-hooks'

function SectionCreator() {
  const { templates, getTemplate, getAvailableTypes } = useSectionTemplates()

  const createSection = (type) => {
    const template = getTemplate(type)
    // Use template to create new section
  }

  return (
    <div>
      {getAvailableTypes().map(type => (
        <button key={type} onClick={() => createSection(type)}>
          Create {type} Section
        </button>
      ))}
    </div>
  )
}
```

## Components

### SectionEditor
Main section editing component:

```typescript
import { SectionEditor } from '@/components/cms/SectionEditor'

function CoursePage({ courseId }) {
  return (
    <SectionEditor
      contentType={ContentType.COURSE}
      contentId={courseId}
    />
  )
}
```

### CourseSectionEditor
Course-specific section editor with tabs:

```typescript
import { CourseSectionEditor } from '@/components/cms/CourseSectionEditor'

function CourseEditPage({ courseId }) {
  return (
    <CourseSectionEditor courseId={courseId} />
  )
}
```

## Usage Examples

### Creating a New Section

```typescript
const createTextSection = async () => {
  const newSection = {
    type: 'text',
    content: { text: 'This is a new text section' },
    metadata: { title: 'Introduction' },
    isVisible: true
  }
  
  await createSection(newSection)
}
```

### Updating Section Content

```typescript
const updateSectionContent = async (sectionId, newContent) => {
  await updateSection(sectionId, {
    content: { text: newContent }
  })
}
```

### Reordering Sections

```typescript
const moveSectionToTop = async (sectionId) => {
  await moveSection(sectionId, 1)
}
```

### Bulk Operations

```typescript
const hideAllSections = async () => {
  const sectionIds = sections.map(s => s.id)
  await bulkEditSections([{
    operation: 'toggle_visibility',
    sectionIds
  }])
}
```

### Duplicating Sections

```typescript
const duplicateSection = async (sectionId) => {
  await duplicateSection(sectionId)
}
```

## Real-time Updates

Sections automatically update in real-time across all connected components:

```typescript
import { useSectionRealtime } from '@/cms/lib/core/section-hooks'

function SectionList({ contentType, contentId }) {
  const { isUpdating } = useSectionRealtime(contentType, contentId, user)
  
  return (
    <div>
      {isUpdating && <div>Updating sections...</div>}
      {/* Section list */}
    </div>
  )
}
```

## Caching

Sections are automatically cached and invalidated:

```typescript
// Cache is automatically managed
// Manual cache operations (if needed):

import { CacheManager } from '@/cms/lib/core/cache'

// Invalidate section cache
CacheManager.invalidateCourse(user, `sections:${contentType}:${contentId}`)
```

## Validation

Section data is automatically validated:

```typescript
// Validation is automatic in the service layer
// Manual validation (if needed):

import { validateSectionData } from '@/cms/lib/core/validation'

try {
  validateSectionData(sectionData)
  // Proceed with creation/update
} catch (error) {
  // Handle validation errors
}
```

## Error Handling

Comprehensive error handling for all operations:

```typescript
try {
  await createSection(sectionData)
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation errors
  } else if (error instanceof NotFoundError) {
    // Handle not found errors
  } else if (error instanceof CMSError) {
    // Handle other CMS errors
  }
}
```

## Best Practices

1. **Use Section Templates**: Leverage pre-built templates for consistency
2. **Handle Loading States**: Always show loading indicators
3. **Implement Error Boundaries**: Catch and handle errors gracefully
4. **Use Real-time Updates**: Enable live updates for better UX
5. **Optimize Performance**: Use bulk operations for multiple changes
6. **Validate Input**: Let the system handle validation
7. **Cache Appropriately**: Trust the automatic caching system
8. **Follow Permissions**: Respect user roles and permissions
9. **Log Operations**: All operations are automatically logged
10. **Test Thoroughly**: Test all CRUD operations and real-time updates

## Integration with Existing Content

The section editor integrates seamlessly with existing content:

### Courses
- Sections can be added to course descriptions
- Each lesson can have its own sections
- Course overview sections for introductions

### Blog Posts
- Article sections for different topics
- Image sections for visual content
- Quote sections for highlights

### Packages
- Feature sections for package descriptions
- Pricing sections for comparisons
- FAQ sections for common questions

### Pages
- Landing page sections
- About page sections
- Contact page sections

## Migration Guide

To add section editing to existing content:

1. **Update Content Models**: Add section relationships
2. **Create Section Data**: Convert existing content to sections
3. **Update Components**: Use section editor components
4. **Test Functionality**: Verify all operations work
5. **Train Users**: Educate users on new features

## Troubleshooting

### Sections not updating
- Check real-time connection status
- Verify cache invalidation
- Check for JavaScript errors

### Drag and drop not working
- Ensure proper event handlers
- Check browser compatibility
- Verify touch device support

### Bulk operations failing
- Check user permissions
- Verify section IDs
- Check operation limits

### Performance issues
- Use bulk operations for multiple changes
- Implement virtual scrolling for large lists
- Optimize section rendering

The Section Editor provides a powerful, flexible system for granular content editing with real-time updates, comprehensive validation, and excellent user experience.
