# Shikshanam - Ancient Indian Knowledge Platform

A modern, responsive website for Shikshanam, an EdTech platform dedicated to preserving and sharing ancient Indian knowledge including Sanskrit, Darshanas, and Self-help wisdom.

## 🎯 Features

### Design & Aesthetics
- **Modern + Spiritual + Minimal aesthetic** with whites, turquoise, saffron, and soft gradients
- **Rounded-2xl corners** and subtle shadows for a premium feel
- **Clean typography** using Inter and Playfair Display font combination
- **Grid-based layouts** for perfect balance and harmony
- **Smooth hover effects** and animated section reveals

### Responsive Design
- **Mobile-first approach** with responsive breakpoints
- **Fully responsive** across mobile, tablet, and desktop
- **Touch-friendly** buttons and interactions for mobile devices
- **Optimized layouts** for all screen sizes

### Sections Included
1. **Header/Navbar** - Sticky navigation with logo and menu
2. **Hero** - Welcome section with animated CTA buttons
3. **Align Yourself** - Learning options (Live Classes | Self-Paced Courses)
4. **Schools** - Three main categories (Sanskrit | Darshan | Self-help)
5. **Meet Gurus** - Teacher profiles with hover reveal
6. **Why Shikshanam** - Recognition and testimonials
7. **Numbers** - Animated counters and statistics
8. **Founder's Mission** - Mission statement and achievements
9. **Contribute** - Ways to contribute (Knowledge | Funding)
10. **Download App** - Mobile app showcase with store buttons
11. **Community** - Social media and community features
12. **Footer** - Comprehensive links and information

### Animations & Interactions
- **Framer Motion** powered animations
- **Fade + slide-in** effects on scroll
- **Hover scaling** on buttons and cards
- **Counter animations** for statistics
- **Smooth transitions** throughout the interface

### SEO Optimization
- **Semantic HTML** structure with proper heading hierarchy
- **Meta tags** and Open Graph data
- **Alt text** for all images and icons
- **Fast-loading** optimized components

## 🚀 Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Responsive design** with mobile-first approach

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shikshanam
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
shikshanam/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer component
│   └── sections/            # All section components
│       ├── Hero.tsx
│       ├── AlignYourself.tsx
│       ├── Schools.tsx
│       ├── MeetGurus.tsx
│       ├── WhyShikshanam.tsx
│       ├── Numbers.tsx
│       ├── FoundersMission.tsx
│       ├── Contribute.tsx
│       ├── DownloadApp.tsx
│       └── Community.tsx
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Customization

### Colors
The design uses a custom color palette defined in `tailwind.config.js`:
- **Saffron**: `#f27515` (primary brand color)
- **Turquoise**: `#14b8a6` (secondary brand color)
- **Wisdom**: Various shades of neutral colors

### Typography
- **Inter**: Used for body text and UI elements
- **Playfair Display**: Used for headings and serif text

### Animations
Custom animations are defined in `tailwind.config.js` and can be modified to adjust timing and effects.

## 📱 Mobile Optimization

- **Hamburger menu** for mobile navigation
- **Touch-friendly** button sizes and spacing
- **Optimized layouts** for small screens
- **Swipe-enabled** carousels where applicable

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Remove all build artifacts and dependencies
- `npm run reinstall` - Clean install of dependencies
- `npm run dev:clean` - Clean development server start
- `npm run build:clean` - Clean production build and start

### Build Issues Fixed
The project has been configured to prevent Next.js chunk map mismatch errors:
- **Deterministic webpack IDs** ensure consistent chunk generation
- **Disabled persistent cache** prevents stale runtime maps
- **Clean build scripts** remove all artifacts before building
- **Pinned React versions** (18.3.1) for consistency
- **Single package manager** (npm only) to avoid conflicts

Use `npm run build:clean` for production builds to ensure a clean state.

### Code Style
- **TypeScript** for all components
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Semantic HTML** structure
- **Accessibility** best practices

## 📄 License

This project is created for Shikshanam. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support or questions about this project, please contact the Shikshanam team.

---

**Built with ❤️ for preserving ancient Indian wisdom**
