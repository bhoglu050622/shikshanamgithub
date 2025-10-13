# Sanskrit Course Images

This directory contains all the images used in the Sanskrit course landing page.

## Current Images (Placeholder SVGs)

The following placeholder SVG images are currently being used. They should be replaced with the actual images from the URLs below:

### 1. Course Thumbnail
- **Current:** `course-thumbnail.svg` (placeholder)
- **Original URL:** `https://shikshanam.in/wp-content/uploads/2024/12/shikshanam-course-thumbnail-7.png`
- **Usage:** Hero section thumbnail
- **Replace with:** High-quality PNG/JPG of the course thumbnail

### 2. Acharya Photo
- **Current:** `acharya-photo.svg` (placeholder)
- **Original URL:** `https://shikshanam.in/wp-content/uploads/2024/03/image-5.png`
- **Usage:** Instructor profile photo (circular)
- **Replace with:** High-quality portrait photo (recommended: 400x400px or higher, square aspect ratio)

### 3. Package Image
- **Current:** `package-image.svg` (placeholder)
- **Original URL:** `https://shikshanam.in/wp-content/uploads/2024/12/Sanskrit-package.png`
- **Usage:** Package card display
- **Replace with:** High-quality PNG/JPG of the package

### 4. Video Testimonial Thumbnails
- **Current:** `testimonial-1.svg`, `testimonial-2.svg`, `testimonial-3.svg` (placeholders)
- **Original URLs:**
  - `https://img.youtube.com/vi/KY6jVDHuMiM/maxresdefault.jpg`
  - `https://img.youtube.com/vi/1wRsegfOJoQ/maxresdefault.jpg`
  - `https://img.youtube.com/vi/5IOb3Iy5rnY/maxresdefault.jpg`
- **Usage:** Video testimonial thumbnails
- **Replace with:** YouTube thumbnail images (320x180px recommended)

## How to Replace Images

1. Download the original images from the URLs above
2. Optimize them for web use (compress if needed)
3. Replace the corresponding SVG files with the same filenames
4. Update the file extensions in the code if necessary

## Image Optimization Tips

- **Course Thumbnail:** 800x600px or higher, WebP format preferred
- **Acharya Photo:** 400x400px minimum, PNG format for transparency
- **Package Image:** 600x400px, PNG or JPG format
- **Testimonial Thumbnails:** 320x180px, JPG format

## Next.js Image Optimization

All images are served through Next.js Image component which provides:
- Automatic optimization
- Lazy loading
- Responsive sizing
- WebP conversion when supported

## File Structure

```
/public/images/sanskrit-course/
├── README.md (this file)
├── course-thumbnail.svg → Replace with actual course thumbnail
├── acharya-photo.svg → Replace with actual instructor photo
├── package-image.svg → Replace with actual package image
├── testimonial-1.svg → Replace with YouTube thumbnail 1
├── testimonial-2.svg → Replace with YouTube thumbnail 2
└── testimonial-3.svg → Replace with YouTube thumbnail 3
```

## Notes

- All placeholder SVGs use the Sanskrit course color palette (#FFF9F2, #0F4C5C, #B8860B)
- Images are referenced in `/app/courses/sanskrit-course/page.tsx`
- No changes needed to the code when replacing images with same filenames
