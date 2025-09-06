# School of Self-Help - Production-Ready React Implementation

A comprehensive, accessible, and production-ready implementation of the "School of Self-Help" homepage based on the provided wireframe. This implementation includes modular components, advanced animations, accessibility features, and comprehensive testing.

## 🚀 Features

### Core Components
- **SelfHelpHero**: Animated skyline with Acharya character
- **SkillTracks**: Artha & Kama tracks with dashed connectors
- **CourseJourneyCarousel**: Horizontal animated storytelling with sequential unlocking
- **MeetGurus**: Guru profiles with credibility indicators
- **FeaturedCoursesSlider**: Course cards with pricing and navigation
- **ActivityShowcase**: Video collage/testimonials with lightbox
- **FoundersMission**: Photo collage with mission statement
- **CommunityCTA**: Community engagement with newsletter signup
- **EnhancedFooter**: Sanskrit quote strip with comprehensive links

### Technical Features
- **TypeScript**: Full type safety and IntelliSense support
- **Framer Motion**: Advanced animations with reduced motion support
- **Tailwind CSS**: Utility-first styling with design tokens
- **Accessibility**: WCAG 2.1 AA compliant with ARIA attributes
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Performance**: Lazy loading, code splitting, and optimization
- **Analytics**: Comprehensive event tracking hooks

## 📁 Project Structure

```
components/sections/
├── SelfHelpHero.tsx              # Hero section with animated skyline
├── SkillTracks.tsx               # Artha & Kama skill tracks
├── CourseJourneyCarousel.tsx     # 5-step journey carousel
├── MeetGurus.tsx                 # Guru profiles and modals
├── FeaturedCoursesSlider.tsx     # Course showcase with navigation
├── ActivityShowcase.tsx          # Testimonials with video lightbox
├── FoundersMission.tsx           # Mission statement and founders
├── CommunityCTA.tsx              # Community engagement
├── EnhancedFooter.tsx            # Footer with Sanskrit quotes
└── SchoolOfSelfHelpPage.tsx      # Main page component

lib/
├── accessibility.ts              # Accessibility utilities
├── theme.tsx                     # Theme provider and colors
└── utils.ts                      # General utilities

__tests__/
├── components/                   # Unit tests
├── e2e/                         # End-to-end tests
└── stories/                     # Storybook stories
```

## 🎨 Design System

### Color Palette
- **Saffron**: `#FF8A00` - Primary brand color
- **Deep Teal**: `#0C3B3C` - Secondary brand color
- **Lotus Pink**: `#E45C9A` - Accent color
- **Peacock Green**: `#0A7B6C` - Success/positive actions
- **Indigo**: `#1A237E` - Text and headings
- **Soft Gold**: `#E3C26B` - Highlights and special elements

### Typography
- **Display**: Suranna, Marcellus, Georgia (serif)
- **Body**: Inter, Manrope (sans-serif)
- **Devanagari**: Noto Sans Devanagari (Sanskrit text)

### Motion Specifications
- **Panel Entrance**: 500ms cubic-bezier(.22,.9,.3,1)
- **Connector Draw**: 700ms
- **Text Stagger**: 120ms
- **Reduced Motion**: Respects `prefers-reduced-motion`

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- TypeScript knowledge

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd shikshanam-self-help

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run Storybook
npm run storybook
```

### Environment Variables
```env
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_API_URL=your_api_url
```

## 🎯 Component Usage

### SelfHelpHero
```tsx
import SelfHelpHero from '@/components/sections/SelfHelpHero'

<SelfHelpHero 
  onExploreTracks={() => console.log('Explore tracks clicked')}
  onTakeTest={() => console.log('Take test clicked')}
/>
```

### SkillTracks
```tsx
import SkillTracks from '@/components/sections/SkillTracks'

<SkillTracks 
  onCourseClick={(course) => console.log('Course clicked:', course.title)}
  onTrackSelect={(track) => console.log('Track selected:', track.title)}
/>
```

### CourseJourneyCarousel
```tsx
import CourseJourneyCarousel from '@/components/sections/CourseJourneyCarousel'

<CourseJourneyCarousel 
  onStepChange={(step) => console.log('Step changed:', step)}
  onComplete={() => console.log('Journey completed')}
  initialUnlockedSteps={1}
/>
```

## ♿ Accessibility Features

### ARIA Attributes
- Comprehensive ARIA labels and descriptions
- Proper heading hierarchy (h1-h6)
- Form field associations
- Modal and dialog accessibility
- Live regions for dynamic content

### Keyboard Navigation
- Full keyboard accessibility
- Focus management and trapping
- Arrow key navigation for carousels
- Escape key handling for modals
- Tab order optimization

### Screen Reader Support
- Semantic HTML structure
- Screen reader announcements
- Alternative text for images
- Descriptive link text
- Form validation messages

### Reduced Motion
- Respects `prefers-reduced-motion`
- Alternative static states
- Configurable animation durations
- Motion-free fallbacks

## 📊 Analytics Integration

### Event Tracking
```tsx
// Step change tracking
const handleStepChange = (step: number) => {
  analytics.track('journey_step_changed', {
    step,
    timestamp: Date.now(),
    user_id: getCurrentUserId()
  })
}

// Course click tracking
const handleCourseClick = (course: Course) => {
  analytics.track('course_clicked', {
    course_id: course.id,
    course_title: course.title,
    course_category: course.category
  })
}

// Journey completion tracking
const handleJourneyComplete = () => {
  analytics.track('journey_completed', {
    completion_time: Date.now(),
    steps_completed: 5
  })
}
```

### Available Events
- `explore_tracks_clicked`
- `personality_test_started`
- `course_clicked`
- `course_enrolled`
- `journey_step_changed`
- `journey_completed`
- `guru_profile_viewed`
- `testimonial_played`
- `newsletter_subscribed`
- `community_joined`

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### E2E Tests
```bash
# Run Cypress tests
npm run cypress:open
npm run cypress:run
```

### Storybook
```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## 🚀 Performance Optimization

### Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting
- Lazy loading for images and videos

### Image Optimization
- Next.js Image component
- WebP format support
- Responsive images
- Lazy loading

### Bundle Optimization
- Tree shaking
- Dead code elimination
- Minification
- Compression

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 360px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: 1280px+

### Mobile-First Approach
- Touch-friendly interactions
- Optimized for mobile performance
- Progressive enhancement
- Gesture support

## 🌐 Internationalization

### Sanskrit Text Support
- Devanagari font loading
- Proper text rendering
- RTL support preparation
- Unicode normalization

### Future i18n Support
- Translation key structure
- Locale-based routing
- Date and number formatting
- Cultural adaptations

## 🔧 Customization

### Theme Customization
```tsx
// Customize colors in tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-primary': '#your-color',
        'custom-secondary': '#your-color',
      }
    }
  }
}
```

### Animation Customization
```tsx
// Custom motion variants
const customVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}
```

## 📈 SEO Optimization

### Meta Tags
- Dynamic title generation
- Open Graph tags
- Twitter Card support
- Structured data (JSON-LD)

### Performance
- Core Web Vitals optimization
- Lighthouse score optimization
- Image optimization
- Font loading optimization

## 🛡 Security

### Best Practices
- XSS prevention
- CSRF protection
- Content Security Policy
- Secure headers

### Data Protection
- GDPR compliance
- Privacy policy integration
- Cookie consent
- Data minimization

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Setup
```bash
# Production environment variables
NEXT_PUBLIC_ANALYTICS_ID=your_production_analytics_id
NEXT_PUBLIC_API_URL=your_production_api_url
NODE_ENV=production
```

## 📚 API Integration

### Course Data
```typescript
interface Course {
  id: string
  title: string
  description: string
  price: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  instructor: string
  features: string[]
  rating: number
  studentsCount: number
}
```

### User Progress
```typescript
interface UserProgress {
  userId: string
  currentStep: number
  unlockedSteps: number[]
  completedCourses: string[]
  lastActivity: Date
}
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Update documentation
6. Submit a pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Component API Reference](./docs/components.md)
- [Accessibility Guide](./docs/accessibility.md)
- [Performance Guide](./docs/performance.md)

### Community
- [GitHub Issues](https://github.com/your-repo/issues)
- [Discord Community](https://discord.gg/your-community)
- [Email Support](mailto:support@shikshanam.com)

## 🎉 Acknowledgments

- Design inspiration from ancient Indian wisdom traditions
- Accessibility guidance from WCAG 2.1 guidelines
- Performance optimization techniques from Web Vitals
- Community feedback and contributions

---

**Built with ❤️ for the Shikshanam community**
