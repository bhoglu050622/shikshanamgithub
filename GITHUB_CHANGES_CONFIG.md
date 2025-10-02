# GitHub Changes Tracking Configuration

## Environment Variables

Add these environment variables to your production deployment (Vercel):

```bash
# GitHub Repository Configuration
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repository-name
GITHUB_BRANCH=main
GITHUB_TOKEN=your-github-personal-access-token

# Changes Folder Configuration
GITHUB_CHANGES_FOLDER=changes
```

## GitHub Token Setup

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with these permissions:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
3. Copy the token and add it to your Vercel environment variables

## Features

### Automatic Change Tracking
- Every CMS edit creates a timestamped file in the `changes/` folder
- Files are named: `YYYY-MM-DDTHH-mm-ss_contentType_contentId_action.json`
- Each file contains:
  - What changed (field-by-field comparison)
  - Who made the change
  - When the change was made
  - Metadata (user agent, session info)

### File Structure
```
changes/
├── 2024-01-15T10-30-00-000Z_course_samkhya-darshan_update.json
├── 2024-01-15T10-31-00-000Z_package_sanskrit-basics_create.json
└── 2024-01-15T10-32-00-000Z_course_yoga-darshan_delete.json
```

### Change Record Format
```json
{
  "id": "unique-change-id",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "contentType": "course",
  "contentId": "samkhya-darshan",
  "action": "update",
  "changes": [
    {
      "field": "title",
      "oldValue": "Old Title",
      "newValue": "New Title"
    }
  ],
  "editor": {
    "name": "CMS Editor",
    "email": "editor@shikshanam.in",
    "userId": "cms-editor"
  },
  "metadata": {
    "userAgent": "Mozilla/5.0...",
    "sessionId": "session-123",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## Production Deployment

1. Set up environment variables in Vercel
2. Deploy to production
3. GitHub changes will be automatically tracked
4. Check the `changes/` folder in your GitHub repository

## Development Mode

- GitHub tracking is disabled in development by default
- Set `NODE_ENV=production` to enable in development
- Use `GITHUB_TRACKING_ENABLED=false` to disable even in production

## API Endpoints

- `POST /api/cms/github-changes` - Save a change record
- `GET /api/cms/github-changes` - Get recent changes
- `GET /api/cms/github-changes?contentType=course&contentId=samkhya-darshan` - Get changes for specific content

## Security

- GitHub token should have minimal required permissions
- Changes are only tracked in production
- No sensitive data is stored in change records
- All changes are publicly visible in the repository
