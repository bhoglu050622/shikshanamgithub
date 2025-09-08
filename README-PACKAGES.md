# Packages System - Frontend Implementation

This document describes the comprehensive packages system implementation for the Shikshanam platform, including package listing, detail views, checkout flows, user dashboard, and live session management.

## Overview

The packages system provides a complete e-learning package experience with:
- Responsive package listing with search and filtering
- Detailed package pages with comprehensive information
- Purchase flow with promo codes and upgrade offers
- Live session management and seat claiming
- User dashboard for package management
- Certificate downloads and progress tracking

## Architecture

### Components Structure

```
components/packages/
├── PackageCard.tsx           # Package listing card component
├── PackageDetail.tsx         # Detailed package view
├── BuyModal.tsx             # Purchase modal with checkout flow
├── LiveSessions.tsx         # Live session management
├── MyPackages.tsx           # User dashboard widget
└── UpgradeOfferPanel.tsx    # Upgrade offer component
```

### Pages Structure

```
app/packages/
├── page.tsx                 # Package listing page
└── [sku]/
    └── page.tsx             # Individual package detail page

app/me/packages/
└── page.tsx                 # User packages dashboard
```

### API Routes

```
app/api/packages/
├── route.ts                 # GET /packages (list packages)
└── [sku]/
    └── route.ts             # GET /packages/:sku (package details)
```

## Features

### 1. Package Listing (`/packages`)

- **Responsive Grid Layout**: Adapts from 3 columns on desktop to 1 column on mobile
- **Search Functionality**: Real-time search across package names and descriptions
- **Pagination**: Handles large package catalogs efficiently
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Graceful error states with retry options

**Key Components:**
- `PackageCard`: Displays package info, pricing, features, and CTAs
- `PackageCardSkeleton`: Loading state component

### 2. Package Detail (`/packages/:sku`)

- **Hero Section**: Large package title, description, and pricing
- **Comprehensive Information**: Long description, included courses, features
- **Live Sessions**: Upcoming sessions with seat availability
- **FAQ Section**: Collapsible frequently asked questions
- **Testimonials**: User reviews and ratings
- **Prerequisites**: Clear requirements and links to qualifying content

**Key Components:**
- `PackageDetail`: Main detail view component
- `LiveSessions`: Session management component

### 3. Purchase Flow (`BuyModal`)

- **Order Summary**: Clear breakdown of package contents and pricing
- **Promo Code Support**: Apply discount codes with validation
- **Upgrade Offers**: Smart suggestions for package upgrades
- **Payment Options**: Immediate payment and invoice options
- **Validation Handling**: Prerequisite checks and error states
- **Optimistic UI**: Loading states and success feedback

**Key Features:**
- Real-time total calculation
- Promo code validation
- Upgrade suggestion logic
- Error handling with actionable messages

### 4. Live Session Management

- **Session Listing**: Upcoming sessions with dates and seat availability
- **Seat Claiming**: One-click seat reservation with conflict handling
- **Waitlist Support**: Automatic waitlist when seats are full
- **Prerequisites**: Quiz requirements before seat claiming
- **Session Details**: Expandable session information

**Key Components:**
- `ClaimSeatButton`: Individual seat claiming with states
- `LiveSessions`: Complete session management interface

### 5. User Dashboard (`/me/packages`)

- **Package Overview**: All purchased packages with status
- **Progress Tracking**: Visual progress bars for each package
- **Feature Access**: Quick access to live sessions, mentoring, certificates
- **Certificate Management**: Download issued certificates
- **Status Management**: Handle active, revoked, and expired packages

**Key Features:**
- Progress calculation from course completion
- Certificate download with file handling
- Mentor booking integration
- Seat management for live sessions

## Data Models

### Package Interface

```typescript
interface Package {
  sku: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  priceInr: number;
  originalPriceInr?: number;
  thumbnailUrl?: string;
  includedCourses: Course[];
  livePassCount?: number;
  mentorHours?: number;
  certificateIncluded: boolean;
  prerequisites?: string[];
  faq?: FAQItem[];
  testimonials?: Testimonial[];
}
```

### UserPackage Interface

```typescript
interface UserPackage {
  sku: string;
  name: string;
  accessExpiresAt?: string;
  status: 'active' | 'revoked' | 'expired';
  progress: number;
  nextLiveSession?: Session;
  availableMentorHours: number;
  certificateStatus: 'not_available' | 'pending' | 'issued';
  includedCourses: Course[];
}
```

## API Integration

### Custom Hooks

- **`usePackages`**: Fetch and manage packages list
- **`usePackage`**: Fetch individual package details
- **`useUserPackages`**: Fetch user's purchased packages
- **`useLiveSessions`**: Manage live session data
- **`usePurchase`**: Handle purchase operations
- **`useUpgradeSuggestion`**: Get upgrade recommendations

### API Endpoints

- `GET /api/packages` - List packages with pagination and search
- `GET /api/packages/:sku` - Get package details
- `POST /api/packages/:sku/purchase` - Purchase package
- `POST /api/packages/:sku/claim-live` - Claim live session seat
- `GET /api/user/:id/packages` - Get user's packages
- `GET /api/user/:id/packages/:sku/certificate` - Download certificate

## Accessibility Features

- **ARIA Labels**: All interactive elements have descriptive labels
- **Focus Management**: Proper focus handling in modals and forms
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Semantic HTML and ARIA attributes
- **Color Contrast**: WCAG compliant color schemes

## Mobile Optimization

- **Responsive Design**: Mobile-first approach with breakpoints
- **Touch-Friendly**: Large tap targets and gesture support
- **Full-Screen Modals**: Buy modal becomes full-screen on mobile
- **Optimized Images**: Responsive images with proper sizing
- **Performance**: Lazy loading and optimized bundle sizes

## Testing

### Unit Tests

- Component rendering and props handling
- User interaction testing
- Error state handling
- Accessibility compliance

### Integration Tests

- API integration testing
- Purchase flow testing
- Live session claiming
- Error handling scenarios

### Visual Tests

- Component snapshot testing
- Responsive design testing
- Cross-browser compatibility

## Development Setup

### Dummy Data

Comprehensive dummy data is provided in `lib/fixtures/packages-data.ts` with:
- 13 realistic package SKUs
- Complete package information
- Sample sessions and user data
- Testimonials and FAQ data

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Dependencies

Key dependencies used:
- `@radix-ui/react-*` - UI primitives
- `lucide-react` - Icons
- `clsx` & `tailwind-merge` - Styling utilities
- `next/image` - Optimized images

## Performance Optimizations

- **Lazy Loading**: Images and components loaded on demand
- **Code Splitting**: Route-based code splitting
- **Caching**: API response caching with React Query
- **Bundle Optimization**: Tree shaking and minimal bundle sizes
- **Image Optimization**: Next.js Image component with proper sizing

## Error Handling

- **Network Errors**: Retry mechanisms with exponential backoff
- **Validation Errors**: Clear error messages with actionable steps
- **404 Handling**: Graceful package not found states
- **Payment Errors**: Comprehensive error handling for purchase flows
- **Session Conflicts**: Proper handling of seat claiming conflicts

## Security Considerations

- **Input Validation**: All user inputs are validated
- **XSS Prevention**: Proper sanitization of user content
- **CSRF Protection**: Token-based request validation
- **Rate Limiting**: API rate limiting for purchase endpoints
- **Secure Downloads**: Certificate downloads with proper headers

## Future Enhancements

- **Wishlist Functionality**: Save packages for later
- **Package Comparisons**: Side-by-side package comparison
- **Bulk Purchases**: Multiple package purchase flow
- **Gift Packages**: Gift purchase and redemption
- **Package Reviews**: User review and rating system
- **Advanced Analytics**: Package performance tracking
- **A/B Testing**: Package presentation optimization

## Maintenance

### Regular Updates

- Keep dependencies updated
- Monitor performance metrics
- Update dummy data for testing
- Review and update accessibility compliance

### Monitoring

- Track user interactions and conversion rates
- Monitor API performance and error rates
- Analyze user feedback and support tickets
- Performance monitoring and optimization

This packages system provides a comprehensive, accessible, and performant solution for managing e-learning packages with all the features requested in the specification.
