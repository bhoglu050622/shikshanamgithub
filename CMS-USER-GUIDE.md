# Shikshanam CMS - User Guide

## Overview

The Shikshanam Content Management System (CMS) is designed to enable non-technical team members to create, edit, preview, schedule, and publish course pages, lessons, blog posts, and marketing content through an intuitive visual interface.

## Quick Start

1. **Log in** to the CMS using your assigned credentials
2. **Choose your content type** from the guided templates
3. **Fill in the required fields** using the visual editor
4. **Preview your content** before publishing
5. **Publish or schedule** your content for release

## User Roles & Permissions

### Content Editor
- Create and edit courses, lessons, blog posts, and pages
- Upload and manage media files
- Preview content before publishing
- Submit content for review
- **Cannot publish directly** - must request approval

### Publisher
- All Content Editor permissions
- Review and approve content
- Publish content to the live site
- Schedule content for future release
- Manage publishing workflow
- Access analytics and reporting

### Instructor
- Create course curriculum and lessons
- Upload educational materials
- Create quizzes and assessments
- Preview course content
- **Limited publishing rights** - can publish their own courses

### Support/Moderator
- Manage comments and user interactions
- Handle support requests
- Moderate community content
- Access user management tools

### Admin
- Full system access
- User role management
- System configuration
- Advanced analytics
- All publishing permissions

## Content Types & Templates

### Course Template
**Purpose**: Create comprehensive educational courses with structured learning paths

**Required Fields**:
- Course Title (5-100 characters)
- Short Description (15-30 words)
- Category (Sanskrit, Yoga, Philosophy, etc.)
- Difficulty Level (Beginner, Intermediate, Advanced)
- Cover Image (1920×1080px recommended)

**Optional Fields**:
- Subtitle
- Detailed Description (rich text)
- Price (free or paid)
- Tags
- Estimated Duration
- Featured Course status

**Step-by-Step**:
1. Click "Create Content" → Select "Course"
2. Fill in the basic information
3. Choose difficulty level and pricing
4. Upload cover image
5. Add course modules and lessons
6. Save as draft and preview
7. Submit for review or publish

### Lesson Template
**Purpose**: Create individual learning units within courses

**Types**:
- **Video Lesson**: Upload MP4 files (auto-transcoded to HLS)
- **Article/Text**: Rich text content with formatting
- **Quiz/Assessment**: Interactive questions and answers
- **Resource/Download**: PDFs, worksheets, supplementary materials

**Features**:
- Drag-and-drop lesson ordering
- Preview lessons for students
- Estimated completion time
- Additional resources and downloads

### Blog Post Template
**Purpose**: Create engaging articles and updates

**Required Fields**:
- Post Title (10-100 characters)
- Excerpt (120-160 characters for SEO)
- Content (rich text with formatting)

**Optional Fields**:
- Featured Image (1200×675px recommended)
- Tags for categorization
- Series grouping
- Publish date scheduling

### Landing Page Template
**Purpose**: Create marketing pages with conversion focus

**Sections**:
- Hero section (title, subtitle, CTA button)
- Key benefits (3-5 bullet points)
- Instructor bio
- Customer testimonials
- Pricing information
- FAQ section
- Footer with contact info

### Package Template
**Purpose**: Bundle multiple courses into comprehensive packages

**Features**:
- Package pricing and tiers
- Included course selection
- Validity period settings
- Feature comparison
- Special offers and discounts

## Visual Editor Features

### Rich Text Editing
- **Formatting**: Bold, italic, underline, headings
- **Lists**: Bulleted and numbered lists
- **Alignment**: Left, center, right alignment
- **Links**: Easy link insertion and editing
- **Media**: Drag-and-drop image and video insertion

### Auto-Save
- Content automatically saves every 2 seconds
- Visual indicators show save status
- Draft recovery if browser crashes
- Version history for rollback

### Collaborative Editing
- Real-time collaboration indicators
- User cursors and activity status
- Conflict resolution for simultaneous edits
- Comment system for feedback

## Media Management

### Supported File Types
- **Images**: JPEG, PNG, GIF, WebP (max 2MB)
- **Videos**: MP4, MOV, AVI (max 4GB)
- **Documents**: PDF, DOC, DOCX (max 50MB)
- **Audio**: MP3, WAV, AAC (max 100MB)

### Auto-Processing
- **Images**: Automatic resizing and optimization
- **Videos**: HLS transcoding for web playback
- **Thumbnails**: Auto-generated preview images
- **Captions**: AI-generated video captions

### Organization
- Tag-based categorization
- Search and filter functionality
- Bulk operations (delete, move, tag)
- Usage tracking across content

## Preview & Versioning

### Preview System
- **Real-time preview**: See changes instantly
- **Device preview**: Desktop, tablet, mobile views
- **Share preview**: Generate temporary preview links
- **Expiration**: Preview links expire after 7 days

### Version Control
- **Automatic versions**: Every save creates a version
- **Version comparison**: Side-by-side change viewing
- **Rollback**: Restore to any previous version
- **Version notes**: Add descriptions for major changes

### Publishing Workflow
1. **Draft**: Initial content creation
2. **Review**: Submit for approval (if required)
3. **Approved**: Ready for publishing
4. **Scheduled**: Set for future release
5. **Published**: Live on the website

## SEO & Metadata

### Basic SEO
- **SEO Title**: Optimized for search engines (50-60 characters)
- **Meta Description**: Search result snippet (150-160 characters)
- **Keywords**: Relevant search terms
- **Canonical URL**: Preferred page URL

### Social Media
- **Open Graph**: Facebook sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Social Images**: Custom images for social sharing
- **Social Preview**: See how content appears when shared

### Advanced SEO
- **Structured Data**: FAQ, Course, Product schemas
- **Robots**: Search engine crawling instructions
- **Sitemap**: Priority and change frequency
- **Analytics**: SEO score and recommendations

## Publishing & Scheduling

### Immediate Publishing
- **Publish Now**: Make content live immediately
- **Notifications**: Email subscribers about new content
- **Social Sharing**: Auto-post to social media
- **SEO Optimization**: Automatic meta tag generation

### Scheduled Publishing
- **Date & Time**: Set specific publish date
- **Time Zones**: Automatic timezone handling
- **Recurring**: Set up recurring content releases
- **Bulk Scheduling**: Schedule multiple items at once

### Publishing Options
- **Visibility**: Public, private, or draft
- **Access Control**: Restrict to specific user groups
- **Geographic**: Limit by location
- **Device**: Mobile-only or desktop-only

## Analytics & Reporting

### Content Performance
- **Views**: Total and unique page views
- **Engagement**: Time spent, bounce rate, completion rate
- **Conversions**: Sign-ups, purchases, downloads
- **Social**: Shares, likes, comments

### User Analytics
- **Demographics**: Age, location, interests
- **Behavior**: Navigation patterns, content preferences
- **Retention**: Return visits, course completion
- **Feedback**: Ratings, reviews, comments

### Revenue Tracking
- **Sales**: Course and package sales
- **Revenue**: Total and per-content earnings
- **Conversion**: Visitor to customer conversion
- **Trends**: Monthly and yearly performance

## Email Templates

### Template Types
- **Welcome**: New user onboarding
- **Course**: Course-related notifications
- **Marketing**: Promotional campaigns
- **Transactional**: Purchase confirmations
- **Notifications**: System alerts

### Variable System
- **User Variables**: {{user_name}}, {{user_email}}
- **Course Variables**: {{course_title}}, {{course_instructor}}
- **System Variables**: {{site_name}}, {{current_date}}
- **Custom Variables**: {{promo_code}}, {{discount_amount}}

### Template Editor
- **Visual Editor**: WYSIWYG email design
- **HTML/Text**: Dual format support
- **Preview**: See how emails look
- **Test Send**: Send test emails before campaigns

## Troubleshooting

### Common Issues

**Video Upload Stuck Processing**
- Refresh the upload page
- Use "Retry Transcode" button
- Check file format (MP4 recommended)
- Ensure file size under 4GB

**Image Not Displaying**
- Re-upload the image
- Check file size (max 2MB)
- Verify image format (JPEG/PNG)
- Clear browser cache (Ctrl/Cmd+Shift+R)

**Publishing Blocked**
- Check required fields are filled
- Verify cover image is uploaded
- Ensure content meets quality standards
- Check user permissions

**Preview Not Working**
- Generate new preview link
- Check if preview has expired (7 days)
- Verify content is saved
- Try different browser

### Getting Help

**Error Messages**
- Note the error ID from the UI
- Contact support with error details
- Include steps to reproduce the issue
- Provide browser and device information

**Feature Requests**
- Use the feedback form in the CMS
- Describe the desired functionality
- Explain the use case
- Suggest implementation approach

## Best Practices

### Content Creation
1. **Plan First**: Outline content before writing
2. **Use Templates**: Follow provided templates for consistency
3. **Quality Images**: Use high-resolution, relevant images
4. **SEO Optimization**: Fill in all SEO fields
5. **Preview Always**: Check content before publishing

### Media Management
1. **Optimize Files**: Compress images and videos
2. **Descriptive Names**: Use clear, searchable filenames
3. **Alt Text**: Add descriptions for accessibility
4. **Organize**: Use tags and folders for organization
5. **Regular Cleanup**: Remove unused media files

### Publishing Workflow
1. **Review Process**: Use the approval workflow
2. **Schedule Content**: Plan content calendar in advance
3. **Test Everything**: Preview on different devices
4. **Monitor Performance**: Check analytics regularly
5. **Update Content**: Keep information current

### SEO Optimization
1. **Keyword Research**: Use relevant search terms
2. **Unique Content**: Avoid duplicate content
3. **Internal Linking**: Link to related content
4. **Meta Descriptions**: Write compelling descriptions
5. **Image Optimization**: Use descriptive alt text

## Training Checklist

For new users, complete this training checklist:

- [ ] Log in and set up profile
- [ ] Create a draft course using the Course template
- [ ] Upload a video and observe processing behavior
- [ ] Create a lesson article with images and links
- [ ] Create and preview a quiz
- [ ] Preview content and schedule a publish
- [ ] Rollback to a previous version
- [ ] Edit an email template and send a test
- [ ] Manually enroll a user and issue a certificate
- [ ] Review analytics dashboard

**Estimated Training Time**: 1.5-2 hours

## Support & Resources

- **Documentation**: This user guide and inline help
- **Video Tutorials**: Step-by-step video guides
- **Community Forum**: User discussions and tips
- **Support Team**: Direct assistance for issues
- **Feature Updates**: Regular system improvements

---

*This CMS is designed to be intuitive and user-friendly. If you encounter any issues or have suggestions for improvement, please don't hesitate to contact the support team.*
