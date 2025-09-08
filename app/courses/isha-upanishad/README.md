# Isha Upanishad Course Landing Page

## Overview
A comprehensive landing page for the Isha Upanishad online course, featuring a meditation-themed design with pink and black color scheme. The page is designed to maintain consistency with the existing course pages while incorporating the specific content and branding from the reference website.

## Design Theme
- **Color Scheme**: Pink (#ec4899) and Black (#000000) with gray accents
- **Typography**: Playfair Display for headings, Tiro Devanagari Hindi for Sanskrit text
- **Theme**: Meditation and spiritual wisdom with floating particles and energy waves
- **Animations**: Smooth fade-ins, floating particles, meditation pulse effects

## Components

### 1. HeroSection
- Central meditation symbol with revolving elements
- Floating particles animation
- Energy wave backgrounds
- Key questions in Hindi and English
- Primary CTA buttons

### 2. CountdownHeader
- Fixed header with countdown timer
- Limited time offer messaging
- Pink background with black text

### 3. CourseInfoSection
- Pricing display (₹999 with strikethrough M.R.P.)
- 9 feature cards with icons
- Student statistics
- Secondary CTA

### 4. TeacherSection
- Vishal Chaurasia profile
- IIT Patna background
- Social media statistics
- Mission statement
- Featured credentials

### 5. SyllabusSection
- 18 chapters covering all Isha Upanishad shlokas
- Expandable chapter details
- Duration and free demo indicators
- Interactive accordion interface

### 6. BenefitsSection
- Course outcomes in Hindi and English
- Why study Upanishads section
- Three-column benefit grid
- Call to action

### 7. ShlokaSection
- Central Isha Upanishad verse
- Sanskrit text with translation
- Explanation of the verse
- Spiritual journey CTA

### 8. FAQSection
- 8 common questions from reference site
- Expandable answers
- Contact information
- Final enrollment CTA

## Features
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: Focus states, reduced motion support
- **Performance**: Optimized animations and loading states
- **SEO**: Semantic HTML structure
- **Interactive Elements**: Hover effects, smooth scrolling

## Content Sources
- Course information from https://shikshanam.in/isha-upanishad-course/
- All 18 chapter titles and durations
- Teacher information and credentials
- FAQ content and contact details
- Pricing and feature information

## Technical Implementation
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom CSS animations
- **Components**: Modular React components
- **State Management**: Local state with useState hooks
- **Animations**: CSS keyframes and transitions

## File Structure
```
app/courses/isha-upanishad/
├── page.tsx                    # Main page component
├── isha-upanishad-landing.css # Custom styles and animations
├── README.md                   # Documentation
└── components/
    ├── HeroSection.tsx
    ├── CountdownHeader.tsx
    ├── CourseInfoSection.tsx
    ├── TeacherSection.tsx
    ├── SyllabusSection.tsx
    ├── BenefitsSection.tsx
    ├── ShlokaSection.tsx
    └── FAQSection.tsx
```

## Usage
The page is accessible at `/courses/isha-upanishad` and includes all necessary CTAs linking to the original course enrollment page. The design maintains consistency with the existing course pages while incorporating the specific meditation theme and pink/black color scheme requested.
