# Shikshanam CMS - Content Management System

A serverless, self-hosted CMS designed for non-technical users to easily edit homepage content while maintaining the original frontend design.

## Features

- **User-Friendly Interface**: Simple, intuitive editor for non-technical users
- **Serverless Architecture**: Deploy on Vercel with no database required
- **Real-time Preview**: See changes immediately
- **Section-based Editing**: Edit different sections of the homepage independently
- **Content Validation**: Built-in validation to prevent errors
- **Reset Functionality**: Restore to default content anytime

## Architecture

### CMS Components
- **Content Manager**: Handles content storage and retrieval using JSON files
- **API Endpoints**: RESTful API for content management
- **Admin Interface**: React-based editor with tabbed sections
- **CMS Hooks**: React hooks for content management
- **Middleware**: Syncs CMS changes to frontend components

### File Structure
```
lib/cms/
├── types.ts              # TypeScript interfaces
├── content-manager.ts    # Content management logic
└── hooks.ts             # React hooks for CMS

app/api/cms/
├── content/route.ts      # Full content CRUD
├── section/route.ts     # Section-specific updates
└── reset/route.ts       # Reset to default

app/cms/
└── page.tsx             # CMS admin interface

components/cms/
├── HeroEditor.tsx
├── AlignYourselfEditor.tsx
├── SchoolsEditor.tsx
└── ... (other editors)

components/sections/
├── CMSHero.tsx          # CMS-enabled components
├── CMSAlignYourself.tsx
└── ... (other CMS components)
```

## Usage

### For Content Editors (Non-Technical Users)

1. **Access the CMS**: Navigate to `/cms` in your browser
2. **Edit Content**: Use the tabbed interface to edit different sections
3. **Preview Changes**: Click "Preview Site" to see changes
4. **Save Changes**: Click "Save All" to persist changes
5. **Reset if Needed**: Use "Reset" to restore default content

### For Developers

#### Adding New Sections

1. **Create Editor Component**:
```tsx
// components/cms/NewSectionEditor.tsx
export default function NewSectionEditor({ content, onChange }) {
  // Editor implementation
}
```

2. **Add to CMS Page**:
```tsx
// app/cms/page.tsx
<TabsContent value="new-section">
  <NewSectionEditor 
    content={content.newSection} 
    onChange={(newSection) => setContent({ ...content, newSection })}
  />
</TabsContent>
```

3. **Create CMS Component**:
```tsx
// components/sections/CMSNewSection.tsx
export default function CMSNewSection() {
  const { content } = useCMSContent()
  // Component implementation using content.newSection
}
```

#### Extending Content Types

1. **Update Types**:
```tsx
// lib/cms/types.ts
export interface HomepageContent {
  // ... existing fields
  newSection: {
    title: string;
    content: string;
  };
}
```

2. **Update Content Manager**:
```tsx
// lib/cms/content-manager.ts
const defaultContent: HomepageContent = {
  // ... existing content
  newSection: {
    title: "Default Title",
    content: "Default Content"
  }
};
```

## API Endpoints

### GET /api/cms/content
Retrieve all homepage content

**Response**:
```json
{
  "success": true,
  "data": { /* HomepageContent */ }
}
```

### PUT /api/cms/content
Update all homepage content

**Request Body**: `HomepageContent`
**Response**:
```json
{
  "success": true,
  "message": "Content updated successfully"
}
```

### PUT /api/cms/section
Update a specific section

**Request Body**:
```json
{
  "section": "hero",
  "data": { /* section data */ }
}
```

### POST /api/cms/reset
Reset content to default

**Response**:
```json
{
  "success": true,
  "message": "Content reset to default successfully"
}
```

## Deployment

### Vercel Deployment

1. **Install Dependencies**:
```bash
npm install
```

2. **Build the Project**:
```bash
npm run build
```

3. **Deploy to Vercel**:
```bash
vercel --prod
```

### Environment Variables

No environment variables required - the CMS uses file-based storage.

## Content Storage

The CMS uses JSON file storage (`data/homepage-content.json`) which is:
- **Serverless-friendly**: No database required
- **Version controlled**: Changes tracked in Git
- **Backup-friendly**: Easy to backup and restore
- **Development-friendly**: Easy to modify during development

## Security Considerations

- **No Authentication**: Currently no authentication (add as needed)
- **Input Validation**: Basic validation on API endpoints
- **File Permissions**: Ensure proper file permissions for content files

## Customization

### Styling
The CMS uses Tailwind CSS and can be customized by modifying the component styles.

### Validation
Add custom validation by extending the content manager:

```tsx
// lib/cms/content-manager.ts
private validateContent(content: HomepageContent): boolean {
  // Add custom validation logic
  return true;
}
```

### Authentication
Add authentication by wrapping the CMS page:

```tsx
// app/cms/page.tsx
export default function CMSAdmin() {
  // Add authentication check
  if (!isAuthenticated) {
    return <LoginForm />
  }
  
  // ... rest of component
}
```

## Troubleshooting

### Common Issues

1. **Content Not Loading**: Check if `data/homepage-content.json` exists
2. **Save Failures**: Ensure write permissions for the data directory
3. **Build Errors**: Check TypeScript types match the content structure

### Debug Mode

Enable debug logging:

```tsx
// lib/cms/content-manager.ts
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('Content loaded:', content);
}
```

## Contributing

1. Follow the existing code structure
2. Add proper TypeScript types
3. Include error handling
4. Test with different content scenarios
5. Update documentation as needed

## License

This CMS is part of the Shikshanam project and follows the same license terms.
