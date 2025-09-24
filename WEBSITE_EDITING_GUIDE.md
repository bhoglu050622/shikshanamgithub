# Complete Website Editing Guide with VS Code & GitHub Copilot

## 🚀 Quick Start Setup

### 1. **VS Code Setup**
```bash
# Install VS Code extensions (essential)
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension esbenp.prettier-vscode
```

### 2. **Clone and Setup Project**
```bash
git clone https://github.com/bhoglu050622/shikshanam_new.git
cd shikshanam_new
npm install
npm run dev
```

### 3. **Enable GitHub Copilot**
- Open VS Code
- Sign in to GitHub Copilot
- Enable Copilot in settings: `Ctrl/Cmd + Shift + P` → "GitHub Copilot: Enable"

---

## 📁 Website Structure Overview

### **Main Pages & Sections**
```
app/
├── page.tsx                    # Homepage (main landing page)
├── about/page.tsx             # About Us page
├── contact/page.tsx           # Contact page
├── courses/page.tsx           # Courses listing
├── wisdom/page.tsx            # Wisdom/Blog page
├── gurus/page.tsx             # Meet the Gurus
└── [slug]/page.tsx           # Dynamic pages

components/sections/           # All homepage sections
├── Hero.tsx                   # Main hero section
├── AlignYourself.tsx         # Personality test section
├── Schools.tsx               # Schools of philosophy
├── MeetGurus.tsx             # Gurus showcase
├── StudentStoriesSection.tsx # Student testimonials
├── TestimonialsSection.tsx   # Reviews section
├── CommunityPostsSection.tsx # Community content
├── FoundersMission.tsx       # Founder's message
├── Contribute.tsx            # Contribution section
├── Community.tsx             # Community features
├── DownloadAppNew.tsx        # App download section
└── FAQ.tsx                   # Frequently asked questions
```

### **Course Pages**
```
app/courses/
├── sanskrit-course/          # Sanskrit language course
├── yoga-darshan/            # Yoga philosophy
├── isha-upanishad/          # Isha Upanishad course
├── prashna-upanishad/       # Prashna Upanishad
├── advaita-vedanta-darshan/ # Advaita Vedanta
├── samkhya-darshan/         # Samkhya philosophy
├── nyaya-darshan/           # Nyaya logic
├── vaisheshik-darshan/      # Vaisheshika philosophy
├── kashmir-shaivism/        # Kashmir Shaivism
└── tantra-darshan/          # Tantra philosophy
```

---

## 🎯 How to Edit Any Section

### **Method 1: Using GitHub Copilot Chat (Recommended)**

1. **Open VS Code and the project**
2. **Press `Ctrl/Cmd + Shift + P`** → Type "GitHub Copilot Chat"
3. **Ask Copilot to help you edit specific sections**

#### Example Prompts for Copilot:

```
# Edit Homepage Hero Section
"Help me edit the hero section in components/sections/Hero.tsx. I want to change the main heading and add a new call-to-action button."

# Update Course Information
"Update the Sanskrit course page at app/courses/sanskrit-course/page.tsx. Change the course description and add new learning objectives."

# Modify Navigation
"Help me add a new menu item to the navigation in lib/navigation-data.ts for a new 'Meditation' section."

# Update Testimonials
"Edit the testimonials section in components/sections/TestimonialsSection.tsx to add new student reviews."

# Change Footer Links
"Update the footer links in components/Footer.tsx to include new social media links."
```

### **Method 2: Direct File Editing**

#### **Step-by-Step Process:**

1. **Find the file you want to edit**
   - Use VS Code's file explorer
   - Or press `Ctrl/Cmd + P` and type the filename

2. **Open the file and use Copilot suggestions**
   - Start typing your changes
   - Copilot will suggest completions
   - Press `Tab` to accept suggestions

3. **Use Copilot inline comments**
   ```tsx
   // TODO: Add new testimonial card with student photo and quote
   // Copilot will suggest the code structure
   ```

---

## 📝 Common Editing Tasks

### **1. Editing Homepage Sections**

#### **Hero Section** (`components/sections/Hero.tsx`)
```tsx
// To change the main heading:
<h1 className="text-4xl font-bold">
  {/* Edit this text */}
  Discover Ancient Wisdom for Modern Life
</h1>

// To add new buttons:
<Button variant="primary" size="lg">
  {/* Add your button text */}
  Start Learning Today
</Button>
```

#### **Schools Section** (`components/sections/Schools.tsx`)
```tsx
// To add a new school of philosophy:
{
  name: "New Philosophy School",
  description: "Description of the new school",
  href: "/schools/new-school",
  icon: BookOpen
}
```

### **2. Adding New Course Pages**

#### **Create New Course** (`app/courses/new-course/page.tsx`)
```tsx
// Use this template and let Copilot help you customize:
export default function NewCoursePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>New Course Title</h1>
      <p>Course description...</p>
      {/* Let Copilot suggest the rest */}
    </div>
  )
}
```

### **3. Updating Navigation**

#### **Add New Menu Item** (`lib/navigation-data.ts`)
```tsx
// Add to topLevelNavItems array:
{
  name: 'New Section',
  href: '/new-section',
  icon: BookOpen,
  hasDropdown: false
}
```

### **4. Modifying Course Content**

#### **Update Course Information**
```tsx
// In any course page, update these sections:
const courseInfo = {
  title: "Updated Course Title",
  description: "New course description...",
  duration: "8 weeks",
  level: "Beginner",
  // Let Copilot suggest more fields
}
```

---

## 🤖 GitHub Copilot Best Practices

### **1. Effective Prompts**
```
✅ Good: "Add a new testimonial card component with student photo, name, and quote"
❌ Bad: "Fix this"

✅ Good: "Update the hero section to include a video background and new CTA button"
❌ Bad: "Change hero"
```

### **2. Use Context**
- Keep related files open in VS Code
- Copilot understands the context better with multiple files open
- Reference existing patterns in your prompts

### **3. Iterative Development**
```
1. Ask Copilot to create the basic structure
2. Ask for styling improvements
3. Ask for responsive design
4. Ask for accessibility features
```

### **4. Code Review with Copilot**
```
"Review this component for accessibility issues and suggest improvements"
"Check this code for TypeScript errors and fix them"
"Optimize this component for performance"
```

---

## 🎨 Styling Guidelines

### **Theme Consistency** [[memory:8239266]]
All new pages should maintain the same theme as the homepage:

#### **Color Palette**
```css
/* Primary Colors */
--golden-olive: #B8860B
--deep-maroon: #8B0000
--copper-orange: #CD853F

/* Use these classes */
bg-gradient-to-r from-golden-olive via-deep-maroon to-copper-orange
text-golden-olive
border-deep-maroon
```

#### **Typography**
```tsx
// Headings
<h1 className="font-display text-4xl font-bold">
<h2 className="font-display text-3xl font-semibold">

// Body text
<p className="text-high-contrast leading-relaxed">
```

#### **Components**
```tsx
// Use existing UI components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Button variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
```

---

## 🔧 Development Workflow

### **1. Before Making Changes**
```bash
# Pull latest changes
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-change-description
```

### **2. Making Changes with Copilot**
1. Open the file you want to edit
2. Use Copilot Chat to plan your changes
3. Implement changes with Copilot suggestions
4. Test your changes locally: `npm run dev`

### **3. Testing Your Changes**
```bash
# Run development server
npm run dev

# Check for TypeScript errors
npm run type-check

# Run linting
npm run lint
```

### **4. Committing Changes**
```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "Add: New testimonial section with student photos

- Created new testimonial card component
- Added responsive design for mobile
- Included accessibility features"

# Push to remote
git push origin feature/your-change-description
```

---

## 📋 Quick Reference Commands

### **VS Code Shortcuts**
```
Ctrl/Cmd + P          # Quick file open
Ctrl/Cmd + Shift + P  # Command palette
Ctrl/Cmd + /          # Toggle comment
Ctrl/Cmd + D          # Select next occurrence
F12                   # Go to definition
Shift + F12           # Find all references
```

### **Git Commands**
```bash
git status            # Check current status
git diff              # See changes
git log --oneline     # See commit history
git checkout -b       # Create new branch
git add .             # Stage all changes
git commit -m         # Commit with message
git push origin       # Push to remote
```

### **NPM Commands**
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run lint          # Run linting
npm run type-check    # Check TypeScript
```

---

## 🆘 Troubleshooting

### **Common Issues**

#### **Copilot Not Working**
1. Check if you're signed in to GitHub
2. Verify Copilot extension is enabled
3. Restart VS Code

#### **TypeScript Errors**
```bash
# Clear TypeScript cache
rm -rf .next
npm run type-check
```

#### **Styling Issues**
- Check if Tailwind classes are correct
- Verify theme colors are being used
- Use browser dev tools to debug

#### **Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

---

## 📞 Getting Help

### **When to Ask for Help**
- Complex component logic
- Integration with external APIs
- Performance optimization
- Accessibility compliance
- Cross-browser compatibility

### **How to Ask for Help**
1. Describe what you're trying to achieve
2. Show the current code
3. Explain what's not working
4. Include error messages if any

### **Useful Resources**
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

---

## 🎯 Example: Complete Editing Workflow

### **Scenario: Adding a New Testimonial**

1. **Plan with Copilot Chat:**
   ```
   "I want to add a new testimonial to the testimonials section. 
   The testimonial should include a student photo, name, course taken, 
   and their quote. Make it responsive and accessible."
   ```

2. **Open the file:** `components/sections/TestimonialsSection.tsx`

3. **Use Copilot suggestions** to add the new testimonial

4. **Test locally:** `npm run dev`

5. **Commit changes:**
   ```bash
   git add .
   git commit -m "Add: New student testimonial with photo and course details"
   git push origin feature/add-new-testimonial
   ```

6. **Notify team lead** for review

---

This guide covers everything your colleagues need to edit any section of the website using VS Code and GitHub Copilot effectively!
