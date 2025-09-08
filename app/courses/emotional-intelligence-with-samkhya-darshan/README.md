# Emotional Intelligence with Samkhya Darshan Landing Page

A premium course landing page for "Emotional Intelligence with Samkhya Darshan" built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎯 Core Components
- **Countdown Header**: Fixed header with countdown timer and limited-time offer
- **Hero Section**: Main landing section with animated particles and video modal
- **Popup Widget**: Personality test promotion popup
- **Struggle Section**: Accordion-style section addressing common emotional challenges
- **Master Teachers**: Instructor showcase with video previews
- **Creator Reviews**: Student testimonials with video testimonials
- **Bonus Features**: Exclusive bonus materials with value propositions
- **Video Gallery**: Swipeable video preview gallery
- **Guna Profiler**: Interactive personality test based on Vedic wisdom
- **Shloka Section**: Sanskrit wisdom with English translation
- **FAQ Section**: Comprehensive frequently asked questions

### 🎨 Design Features
- **Indian Aesthetic**: Maintains the project's Indian design language
- **Responsive Design**: Fully responsive across all device sizes
- **Interactive Elements**: Modals, carousels, accordions, and forms
- **Smooth Animations**: CSS animations and transitions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance Optimized**: Lazy loading and efficient rendering

### 🛠 Technical Features
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first styling with custom design system
- **React Hooks**: Modern React patterns with useState and useEffect
- **Component Architecture**: Modular, reusable components
- **Custom CSS**: Additional animations and effects
- **SEO Optimized**: Proper meta tags and semantic HTML

## File Structure

```
app/courses/emotional-intelligence-with-samkhya-darshan/
├── page.tsx                    # Main landing page component
├── emotional-intelligence-landing.css # Custom styles and animations
├── README.md                   # This documentation
└── components/
    ├── CountdownHeader.tsx     # Fixed countdown timer header
    ├── HeroSection.tsx         # Main hero with particles and CTA
    ├── PopupWidget.tsx         # Personality test popup
    ├── StruggleSection.tsx     # Emotional challenges accordion
    ├── MasterTeachersSection.tsx # Instructor showcase
    ├── CreatorReviewSection.tsx # Student testimonials
    ├── BonusFeaturesSection.tsx # Bonus materials showcase
    ├── ExploreWisdomSection.tsx # Video preview gallery
    ├── GunaProfilerSection.tsx # Interactive personality test
    ├── ShlokaSection.tsx       # Sanskrit wisdom section
    └── FAQSection.tsx          # Frequently asked questions
```

## Usage

The landing page is accessible at `/courses/emotional-intelligence-with-samkhya-darshan` and includes:

1. **Automatic Popup**: Shows personality test popup after 3 seconds
2. **Interactive Elements**: All buttons, modals, and forms are functional
3. **Responsive Design**: Works on desktop, tablet, and mobile
4. **Video Integration**: YouTube video embeds with modal overlays
5. **Form Handling**: Registration and OTP verification forms
6. **Dynamic Content**: Countdown timers and interactive quizzes

## Customization

### Colors
The landing page uses the project's existing color system:
- `temple-gold`: Primary accent color
- `deep-maroon`: Secondary accent color
- `copper-orange`: Tertiary accent color
- `parchment-ivory`: Background color
- `sand-beige`: Light background variant

### Content
All content can be easily customized by editing the component files:
- Update text content in JSX
- Modify video IDs for YouTube embeds
- Change images and icons
- Update FAQ questions and answers
- Customize bonus features and pricing

### Styling
Additional styles can be added to `emotional-intelligence-landing.css` or by extending Tailwind classes in the components.

## Performance

- **Lazy Loading**: Components load as needed
- **Optimized Images**: Placeholder images with proper aspect ratios
- **Efficient Animations**: CSS animations with reduced motion support
- **Minimal Dependencies**: Uses only React and Tailwind CSS
- **Clean Code**: Well-structured, maintainable components

## Accessibility

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Meets WCAG guidelines
- **Reduced Motion**: Respects user's motion preferences
- **Focus Management**: Clear focus indicators and logical tab order

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

To modify or extend the landing page:

1. Edit component files in the `components/` directory
2. Update styles in `emotional-intelligence-landing.css`
3. Modify the main page structure in `page.tsx`
4. Test responsiveness across different screen sizes
5. Verify accessibility with screen readers

## Future Enhancements

Potential improvements could include:
- A/B testing for different layouts
- Analytics integration
- Lead capture forms
- Payment integration
- Multi-language support
- Advanced animations
- Progressive Web App features
