# Quick Edit CMS System

A comprehensive Content Management System that allows instant editing of text content, colors, and button labels across all pages of your website. Changes are applied in real-time and visible immediately to all users.

## 🚀 Features

### ✨ Core Features
- **Instant Text Editing**: Edit any text content directly on the page
- **Color Management**: Change colors for buttons, backgrounds, and text
- **Button Customization**: Modify button labels and colors
- **Real-time Updates**: See changes instantly across all connected clients
- **Live Preview**: Preview changes before publishing
- **Version History**: Track all changes with revision history
- **Bulk Operations**: Update multiple items at once
- **Responsive Design**: Works on desktop, tablet, and mobile

### 🎯 Supported Edit Types
- **TEXT**: Plain text content
- **COLOR**: Text colors
- **BUTTON_LABEL**: Button text
- **BUTTON_COLOR**: Button background colors
- **BACKGROUND_COLOR**: Background colors
- **FONT_SIZE**: Font sizes
- **FONT_WEIGHT**: Font weights
- **SPACING**: Padding and margins
- **BORDER_RADIUS**: Border radius values
- **SHADOW**: Box shadows

## 📁 System Architecture

### Database Schema
The system uses the following Prisma models:

```prisma
model QuickEditItem {
  id          String   @id @default(cuid())
  key         String   @unique
  type        QuickEditType
  page        String
  component   String
  element     String
  value       String
  defaultValue String
  isActive    Boolean  @default(true)
  metadata    Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  createdById String
}

model QuickEditRevision {
  id          String   @id @default(cuid())
  itemId      String
  value       String
  changeType  String
  createdAt   DateTime @default(now())
  createdById String
}

model ThemeSetting {
  id          String   @id @default(cuid())
  name        String   @unique
  category    String
  value       String
  cssVariable String
  description String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  createdById String
}

model LivePreviewToken {
  id          String   @id @default(cuid())
  token       String   @unique
  page        String
  changes     Json
  expiresAt   DateTime
  createdAt   DateTime @default(now())
  createdById String
}
```

### API Endpoints

#### Quick Edit Items
- `GET /api/cms/quick-edit` - Get all quick edit items
- `POST /api/cms/quick-edit` - Create new quick edit item
- `PUT /api/cms/quick-edit` - Bulk update items
- `GET /api/cms/quick-edit/[id]` - Get single item
- `PUT /api/cms/quick-edit/[id]` - Update single item
- `DELETE /api/cms/quick-edit/[id]` - Delete item

#### Live Preview
- `POST /api/cms/quick-edit/live-preview` - Create preview token
- `GET /api/cms/quick-edit/live-preview/[token]` - Get preview changes
- `PUT /api/cms/quick-edit/live-preview/[token]` - Update preview changes

## 🛠️ Setup and Installation

### 1. Database Setup
First, run the Prisma migration to create the new tables:

```bash
npx prisma migrate dev --name add-quick-edit-system
npx prisma generate
```

### 2. Initialize Default Data
Run the setup script to create default quick edit items:

```typescript
import { setupQuickEditSystem } from '@/cms/scripts/setup-quick-edit'

// Run this once to initialize the system
await setupQuickEditSystem()
```

### 3. Access the Admin Interface
Navigate to `/cms/quick-edit` to access the Quick Edit admin interface.

## 🎨 Usage Guide

### For Content Editors

#### 1. Accessing the Quick Edit Interface
1. Go to `/cms/quick-edit`
2. Use the filters to find specific pages or components
3. Click the edit button on any item to modify it

#### 2. Editing Text Content
1. Find the text item you want to edit
2. Click the edit button (pencil icon)
3. Modify the text in the input field
4. Click "Save" to apply changes

#### 3. Changing Colors
1. Find the color item you want to edit
2. Click the edit button
3. Use the color picker or enter a hex value
4. Click "Save" to apply changes

#### 4. Live Preview
1. Click "Live Preview" to create a preview session
2. Make changes in the admin interface
3. See changes instantly in the preview window
4. Share the preview URL with stakeholders

### For Developers

#### 1. Integrating Quick Edit into Components

Use the `QuickEditWrapper` component to make any element editable:

```tsx
import { EditableText, EditableButton, EditableColor } from '@/components/cms/QuickEditWrapper'

// Make text editable
<EditableText
  page="homepage"
  component="Hero"
  element="title"
  defaultValue="Welcome to Shikshanam"
  className="text-4xl font-bold"
/>

// Make button editable
<EditableButton
  page="homepage"
  component="Hero"
  element="cta-primary"
  defaultValue="Get Started"
  onClick={() => console.log('Button clicked')}
/>

// Make color editable
<EditableColor
  page="homepage"
  component="Hero"
  element="title-color"
  defaultValue="#3B82F6"
  className="text-4xl font-bold"
>
  <h1>This text color is editable</h1>
</EditableColor>
```

#### 2. Using the useQuickEdit Hook

For more control, use the hook directly:

```tsx
import { useQuickEdit } from '@/cms/lib/hooks/useQuickEdit'

function MyComponent() {
  const { value, setValue, isEditing, startEdit, saveEdit } = useQuickEdit({
    page: 'homepage',
    component: 'Hero',
    element: 'title',
    type: 'TEXT',
    defaultValue: 'Welcome to Shikshanam'
  })

  return (
    <div>
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={saveEdit}
        />
      ) : (
        <h1 onClick={startEdit}>{value}</h1>
      )}
    </div>
  )
}
```

#### 3. Real-time Updates

Use the real-time hooks to get live updates:

```tsx
import { useRealtimeQuickEdit } from '@/cms/lib/core/realtime-quick-edit'

function MyComponent() {
  const { updates, isConnected, lastUpdate } = useRealtimeQuickEdit('homepage', 'Hero')

  return (
    <div>
      <div>Connected: {isConnected ? 'Yes' : 'No'}</div>
      <div>Last Update: {lastUpdate?.toLocaleString()}</div>
      <div>Updates: {updates.length}</div>
    </div>
  )
}
```

## 🔧 Configuration

### Environment Variables
Add these to your `.env` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/shikshanam"

# CMS Settings
CMS_REALTIME_ENABLED=true
CMS_LIVE_PREVIEW_EXPIRY=24 # hours
CMS_AUTO_SAVE_DELAY=500 # milliseconds
```

### Customization Options

#### 1. Edit Button Position
```tsx
<QuickEditWrapper
  editButtonPosition="top-left" // or "top-right", "bottom-left", "bottom-right"
  // ... other props
/>
```

#### 2. Auto-save Settings
```tsx
<QuickEditWrapper
  autoSave={true}
  debounceMs={1000} // Wait 1 second before auto-saving
  // ... other props
/>
```

#### 3. Validation Rules
Add validation in the metadata:

```tsx
const item = {
  key: 'homepage.Hero.title',
  type: 'TEXT',
  metadata: {
    maxLength: 50,
    minLength: 5,
    pattern: '^[A-Za-z\\s]+$',
    required: true
  }
}
```

## 📊 Monitoring and Analytics

### Audit Logs
All changes are automatically logged with:
- User who made the change
- Timestamp
- Previous and new values
- IP address and user agent

### Performance Metrics
- Response times for API calls
- Real-time connection status
- Cache hit rates
- Error rates

## 🔒 Security

### Authentication
- All API endpoints require authentication
- Role-based access control (Admin, Editor, Viewer)
- JWT tokens for session management

### Authorization
- Users can only edit items they have permission for
- Admin users can manage all items
- Editors can edit content but not system settings

### Data Validation
- Input sanitization for all text fields
- Color value validation
- XSS protection
- CSRF protection

## 🚀 Deployment

### Production Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy the application
5. Initialize default data

### Performance Optimization
- Enable Redis caching for frequently accessed items
- Use CDN for static assets
- Implement database connection pooling
- Enable compression for API responses

## 🐛 Troubleshooting

### Common Issues

#### 1. Changes Not Appearing
- Check if the item is active (`isActive: true`)
- Verify the key matches exactly
- Clear browser cache
- Check console for errors

#### 2. Real-time Updates Not Working
- Verify WebSocket connection
- Check network connectivity
- Ensure real-time service is running
- Check browser console for errors

#### 3. Permission Errors
- Verify user authentication
- Check user role permissions
- Ensure proper API headers
- Check server logs

### Debug Mode
Enable debug mode by setting:
```env
CMS_DEBUG=true
```

This will provide detailed logging and error messages.

## 📈 Future Enhancements

### Planned Features
- [ ] Drag-and-drop page builder
- [ ] Advanced color palette management
- [ ] Image editing capabilities
- [ ] Multi-language support
- [ ] A/B testing integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app for content editing
- [ ] Collaborative editing
- [ ] Content scheduling
- [ ] Advanced workflow management

### API Improvements
- [ ] GraphQL API
- [ ] Webhook support
- [ ] Advanced filtering and search
- [ ] Bulk import/export
- [ ] API rate limiting
- [ ] Advanced caching strategies

## 🤝 Contributing

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up the database
4. Run the development server: `npm run dev`
5. Access the CMS at `/cms/quick-edit`

### Code Style
- Use TypeScript for all new code
- Follow the existing component patterns
- Add proper error handling
- Include unit tests for new features
- Update documentation for API changes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team
- Join our community Discord

---

**Happy Editing! 🎉**

The Quick Edit CMS system is designed to make content management effortless and enjoyable. With real-time updates and an intuitive interface, you can focus on creating great content while the system handles the technical details.
