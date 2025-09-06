# Unsure Path Journey Component

A polished, production-ready React component for the School of Darshana homepage that guides users through the six Darshanas with an interactive storytelling experience.

## Features

### ✅ Completed Milestones

- **M1 - Static UI**: Responsive layout with Tailwind CSS, step nodes, timeline, and comic panels
- **M2 - Animations**: Framer Motion animations for panel entrance, timeline movement, and button unlock
- **M3 - Auto-play & Controls**: Auto-play mode with speed controls, touch swipe gestures, and keyboard navigation
- **M4 - Accessibility**: ARIA attributes, keyboard navigation, live region updates, and reduced motion support
- **M5 - Integration**: Performance optimizations, lazy loading, and configurable props

### 🎯 Key Features

- **Sequential Unlocking**: Modules unlock progressively as users advance
- **Auto-play Mode**: Guided tour with play/pause controls and speed adjustment
- **Touch Gestures**: Swipe navigation for mobile devices
- **Keyboard Navigation**: Arrow keys and spacebar support
- **Accessibility**: WCAG AA compliant with screen reader support
- **Responsive Design**: Desktop two-column layout, mobile stacked layout
- **Performance**: Lazy loading, intersection observer, and memoization
- **Reduced Motion**: Respects user's motion preferences

## Installation

The component is already integrated into the project. No additional installation required.

## Usage

### Basic Usage

```tsx
import UnsurePathJourney from '@/components/sections/DarshanaCircularVisualization'

export default function MyPage() {
  const handleSelectDarshana = (darshanaId: string) => {
    // Handle darshana selection
    console.log('Selected:', darshanaId)
  }

  const handleQuizOpen = () => {
    // Open quiz modal
    setShowQuiz(true)
  }

  return (
    <UnsurePathJourney
      onSelectDarshana={handleSelectDarshana}
      onQuizOpen={handleQuizOpen}
    />
  )
}
```

### Advanced Usage

```tsx
<UnsurePathJourney
  initialStep={0}
  onSelectDarshana={(id) => router.push(`/schools/darshana/${id}`)}
  autoPlay={false}
  comicAssets={{
    basics: '/assets/comics/basics.jpg',
    nyaya: '/assets/comics/nyaya.jpg',
    vaisheshika: '/assets/comics/vaisheshika.jpg',
    samkhya: '/assets/comics/samkhya.jpg',
    yoga: '/assets/comics/yoga.jpg',
    mimamsa: '/assets/comics/mimamsa.jpg',
    vedanta: '/assets/comics/vedanta.jpg'
  }}
  readMoreLinks={{
    basics: '/schools/darshana/basics',
    nyaya: '/schools/darshana/nyaya',
    // ... other links
  }}
  onQuizOpen={() => setShowQuiz(true)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialStep` | `number` | `0` | Starting step index |
| `onSelectDarshana` | `(id: string) => void` | - | Callback when darshana is selected |
| `autoPlay` | `boolean` | `false` | Enable auto-play mode on mount |
| `comicAssets` | `Record<string, string>` | `{}` | Map of comic image URLs |
| `readMoreLinks` | `Record<string, string>` | `{}` | Map of read more links |
| `onQuizOpen` | `() => void` | - | Callback when quiz CTA is clicked |

## Data Structure

The component uses a predefined set of steps with the following structure:

```typescript
interface Step {
  id: string
  title: string
  description: string
  comic: string
  isUnlocked: boolean
  icon: any
}
```

## Customization

### Content Management

Edit the step data in the component file or create a JSON configuration:

```json
{
  "steps": [
    {
      "id": "basics",
      "title": "Darshana Basics",
      "description": "Your custom description...",
      "comic": "/assets/comics/basics.jpg",
      "icon": "BookOpen",
      "isUnlocked": true
    }
  ]
}
```

### Styling

The component uses Tailwind CSS classes and follows the existing design system:

- **Colors**: Uses the project's saffron, teal, and wisdom color palette
- **Typography**: Follows the established font hierarchy
- **Spacing**: Uses consistent spacing scale
- **Animations**: Respects reduced motion preferences

### Animation Timing

Customize animation durations in the component:

```typescript
const animationDurations = {
  panelEntrance: 450,    // ms
  arrowMovement: 600,    // ms
  buttonUnlock: 420,     // ms
  lockOpen: 360          // ms
}
```

## Accessibility

### ARIA Support

- `role="region"` on main container
- `role="navigation"` on step list
- `role="progressbar"` on timeline
- `aria-live="polite"` for progress updates
- `aria-label` attributes on all interactive elements

### Keyboard Navigation

- **Arrow Left/Right**: Navigate between steps
- **Spacebar**: Play/pause auto-play
- **Tab**: Navigate through controls
- **Enter/Space**: Activate buttons

### Screen Reader Support

- Live region updates for step changes
- Descriptive labels for all elements
- Text-only fallback for no-JS users

## Performance

### Optimizations

- **Lazy Loading**: Images load only when in viewport
- **Intersection Observer**: Efficient viewport detection
- **Memoization**: Prevents unnecessary re-renders
- **Code Splitting**: Framer Motion loaded only when needed

### Bundle Size

- **Framer Motion**: ~45KB gzipped
- **Component**: ~15KB gzipped
- **Total**: ~60KB gzipped

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Features**: CSS Grid, Intersection Observer, ES2020

## Testing

### Demo Page

Visit `/test-unsure-path` to see the component in action with all features demonstrated.

### Manual Testing

1. **Navigation**: Test all navigation methods (click, keyboard, swipe)
2. **Auto-play**: Verify speed controls and pause/resume
3. **Accessibility**: Test with screen reader and keyboard only
4. **Responsive**: Test on various screen sizes
5. **Performance**: Check image loading and animation smoothness

## Integration Examples

### With Next.js Router

```tsx
import { useRouter } from 'next/router'

const router = useRouter()

<UnsurePathJourney
  onSelectDarshana={(id) => router.push(`/schools/darshana/${id}`)}
  onQuizOpen={() => router.push('/quiz')}
/>
```

### With State Management

```tsx
import { useAppDispatch } from '@/store/hooks'
import { setSelectedDarshana } from '@/store/slices/darshana'

const dispatch = useAppDispatch()

<UnsurePathJourney
  onSelectDarshana={(id) => dispatch(setSelectedDarshana(id))}
  onQuizOpen={() => dispatch(openQuiz())}
/>
```

### With Analytics

```tsx
import { trackEvent } from '@/lib/analytics'

<UnsurePathJourney
  onSelectDarshana={(id) => {
    trackEvent('darshana_selected', { darshana: id })
    router.push(`/schools/darshana/${id}`)
  }}
  onQuizOpen={() => {
    trackEvent('quiz_opened', { source: 'unsure_path' })
    setShowQuiz(true)
  }}
/>
```

## Troubleshooting

### Common Issues

1. **Images not loading**: Check comic asset paths and CORS settings
2. **Animations not working**: Verify Framer Motion is properly installed
3. **Touch gestures not working**: Ensure touch events are not prevented by parent elements
4. **Accessibility issues**: Check ARIA attributes and keyboard navigation

### Debug Mode

Add debug logging to the component:

```tsx
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('Current step:', currentStep)
  console.log('Unlocked steps:', unlockedSteps)
}
```

## Contributing

When modifying the component:

1. **Maintain Accessibility**: Test with screen readers and keyboard navigation
2. **Preserve Performance**: Use memoization and lazy loading
3. **Follow Design System**: Use established colors, typography, and spacing
4. **Test Responsively**: Verify on mobile, tablet, and desktop
5. **Update Documentation**: Keep this README current

## License

This component is part of the Shikshanam project and follows the same license terms.
