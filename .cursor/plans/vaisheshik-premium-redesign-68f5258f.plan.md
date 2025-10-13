<!-- 68f5258f-825e-4f69-a758-4dc127195882 63a3574a-58b3-4fb7-80fe-f9b3e87c56c0 -->
# Premium Vaisheshik Darshan Landing Page Redesign

## Content & Data Updates

Update `courseData.ts` with verified content:

- Title: "Philosophy of Maharshi Kanada's Vaisheshik Sutras"  
- Hindi subtitle: "अनंत ब्रह्मांड की सूक्ष्मता में प्रवेश !"
- Price: ₹999 (from verified source)
- Level: Beginner, Language: हिन्दी, Duration: 30 Sessions
- Features: 30 Sessions, Free Future Updates, Quizzes & Notes, 1 Yr Access, Community Forum, Certification
- Instructor: विशाल चौरसिया (IIT Patna Graduate)
- Checkout link: `https://courses.shikshanam.in/single-checkout/643aa48ee4b0bc2eac815e74?pid=p3`
- Support: support@shikshanam.in, +91-9910032165
- Syllabus: Extract exact chapter titles and durations from source (Demo chapter + Chapters 1-11)

## Design System & Styling

Create `vaisheshik-darshan-premium.css` with:

- Color tokens: `--bg: #FFF9F2` (warm cream), `--primary: #0D3B4A` (deep indigo), `--accent: #D97B2A` (saffron), `--muted: #6C6C6C`
- Typography: Playfair Display/Merriweather for headlines, Inter + Noto Sans Devanagari for body/Hindi
- Spacing: 8px base scale, soft shadows, 2xl rounded corners
- Mobile-first responsive utilities
- Sticky purchase card styles (desktop right column / mobile bottom sheet)

## Motion Configuration

Create `motion.config.ts`:

- Slow, contemplative timing (~0.8s duration for calm, purposeful reveals)
- Custom variants: hero entrance, feature chips stagger, testimonial carousel, modal transitions
- Intersection Observer triggers for scroll-based animations
- `prefers-reduced-motion` fallbacks for accessibility

## Premium Components (in `components/premium/`)

### 1. HeroVaisheshik.tsx

Grid layout with content left, demo thumbnail right. Animated Devanagari glyphs background (with SVG fallback). Displays:

- H1: "Philosophy of Maharshi Kanada's Vaisheshik Sutras"  
- Hindi subtitle: "अनंत ब्रह्मांड की सूक्ष्मता में प्रवेश !"
- Badge strip: Beginner | हिन्दी | 30 Sessions
- Price ₹999 with dual CTAs: "Enroll now — ₹999" + "Watch Demo"
- Stats row: Students, Rating, Satisfaction (use placeholder or real numbers if available)

### 2. FeatureChips.tsx

Horizontal scrollable list with SVG icons for 6 key features:

- 30 Sessions, Free Future Updates, Quizzes & Notes, 1 Yr Access, Community Forum, Certification
- Staggered Framer Motion reveal on scroll
- Consistent 28px icon set (line icons with filled active state)

### 3. DemoModal.tsx

Accessible Radix Dialog lightbox for demo video:

- Featured demo: "Why Nyaya and Vaisheshik are studied together?" (free demo from syllabus)
- Video player with placeholder/embed URL (to be replaced by content owner)
- Captions support and transcript link
- Play button overlay, modal close with Escape key

### 4. SyllabusExplorer.tsx

Interactive chapter viewer:

- Desktop: Card grid (2 columns) with hover states
- Mobile: Radix Accordion for compact view
- Display exact chapter titles and durations from verified source (Demo + Chapters 1-11)
- Each card shows: chapter number, title, duration, brief description, "Preview" link
- Downloadable notes icon/link per chapter (placeholder for now)

### 5. InstructorCard.tsx

Profile section for विशाल चौरसिया:

- Circular portrait (placeholder: `https://placehold.co/600x600/0D3B4A/FFFFFF?text=Vishal+Chaurasia`)
- Name, title: "IIT Patna Graduate, Founder of Shikshanam"
- Bio paragraph from verified source
- Specialization badges
- Social links: YouTube, LinkedIn (placeholder icons)
- Featured-in logos section (if available)

### 6. PurchaseCard.tsx

Sticky conversion card with two variants:

- Desktop: Fixed right column, follows scroll
- Mobile: Bottom sheet, slides up from bottom
- Content: Price ₹999, features checklist, certificate preview thumbnail
- "Enroll Now" CTA →