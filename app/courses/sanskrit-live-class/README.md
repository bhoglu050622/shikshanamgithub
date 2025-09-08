# Sanskrit Live Class Course

## Overview
This course page is designed for the Sanskrit Live Class program, featuring a modern, interactive hero section with countdown timer, video preview, and popup widget.

## Features

### Hero Section Components
- **CountdownHeader**: Real-time countdown timer showing time until special offer ends
- **HeroSection**: Main hero section with animated Sanskrit characters, video preview, and call-to-action
- **VideoModal**: YouTube video modal for course preview
- **PopupWidget**: Interactive popup for course qualification assessment

### Key Features
- ✅ Responsive design optimized for all devices
- ✅ Animated Sanskrit character cycling effect
- ✅ Interactive video preview with YouTube integration
- ✅ Real-time countdown timer (8 PM IST target)
- ✅ Particle animation background with Sanskrit characters
- ✅ Popup widget with session storage for dismissal
- ✅ Modern gradient design with orange/amber theme
- ✅ Accessibility features (ARIA labels, keyboard navigation)

## File Structure
```
sanskrit-live-class/
├── components/
│   ├── CountdownHeader.tsx    # Countdown timer component
│   ├── HeroSection.tsx        # Main hero section with animations
│   ├── PopupWidget.tsx        # Interactive popup widget
│   └── VideoModal.tsx         # YouTube video modal
├── sanskrit-live-class-landing.css  # All styles and animations
├── page.tsx                   # Main page component
└── README.md                  # This file
```

## Styling
The course uses a custom CSS file (`sanskrit-live-class-landing.css`) that includes:
- Google Fonts integration (Playfair Display, Poppins, Inter, Manrope, Roboto Mono, Tiro Devanagari Hindi)
- Custom CSS variables for consistent theming
- Keyframe animations for smooth interactions
- Responsive breakpoints for mobile optimization
- Particle animation system for background effects

## Interactive Elements
1. **Countdown Timer**: Updates every second, targets 8 PM IST
2. **Sanskrit Character Animation**: Cycles through Hindi alphabets every 300ms
3. **Video Preview**: Click to open YouTube modal with autoplay
4. **Popup Widget**: Appears after 1 second, dismissible with session storage
5. **Particle Background**: Animated Sanskrit characters floating in background

## Theme Consistency
The design maintains consistency with the homepage theme using:
- Warm off-white background (#fcf8f3)
- Orange/amber gradient accents (#F57C00, #FFB74D)
- Vedic brown text colors (#2c2620, #c55a11)
- Modern typography with serif headings

## Usage
Navigate to `/courses/sanskrit-live-class` to view the course page. The page is fully self-contained with all necessary components and styles.

## Dependencies
- React 18+ with TypeScript
- Next.js 14+ App Router
- Tailwind CSS for utility classes
- Font Awesome icons (loaded via CDN)
- Google Fonts (loaded via CDN)
