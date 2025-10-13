// Package and related types for the packages experience

export interface Course {
  id: string;
  title: string;
  duration: string; // e.g., "2 hours", "4 weeks"
  thumbnailUrl?: string;
  link: string; // /courses/:id
}

export interface Package {
  id?: string;
  sku: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price?: number;
  priceInr: number;
  originalPriceInr?: number;
  currency?: string;
  checkoutUrl?: string;
  thumbnailUrl?: string;
  features?: string[];
  category?: string;
  level?: string;
  duration?: string;
  instructor?: string;
  hasStaticPage?: boolean;
  includedCourses: Course[];
  livePassCount?: number;
  mentorHours?: number;
  certificateIncluded: boolean;
  prerequisites?: string[];
  faq?: FAQItem[];
  testimonials?: Testimonial[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}

export interface Session {
  id: string;
  date: string; // ISO date string
  seatRemaining: number;
  maxSeats: number;
  title: string;
  description?: string;
}

export interface UserPackage {
  sku: string;
  name: string;
  accessExpiresAt?: string; // ISO date string, null for lifetime access
  status: 'active' | 'revoked' | 'expired';
  progress: number; // percentage of included courses completed
  nextLiveSession?: Session;
  availableMentorHours: number;
  certificateStatus: 'not_available' | 'pending' | 'issued';
  includedCourses: Course[];
}

export interface PurchaseRequest {
  sku: string;
  promoCode?: string;
  preferredSessionId?: string;
}

export interface PurchaseResponse {
  success: boolean;
  orderId?: string;
  entitlements?: string[];
  error?: string;
  validationErrors?: Record<string, string[]>;
}

export interface UpgradeOffer {
  packageSku: string;
  packageName: string;
  packagePriceInr: number;
  savingsPercent: number;
  currentCartValue: number;
}

export interface CartItem {
  type: 'course' | 'package';
  id: string;
  name: string;
  priceInr: number;
}

// API Response types
export interface PackagesResponse {
  packages: Package[];
  total: number;
  page: number;
  limit: number;
}

export interface PackageResponse {
  package: Package;
}

export interface UserPackagesResponse {
  packages: UserPackage[];
  total: number;
}

export interface SessionsResponse {
  sessions: Session[];
  total: number;
}

export interface UpgradeSuggestionResponse {
  offer?: UpgradeOffer;
  hasUpgrade: boolean;
}

// Component Props types
export interface PackageCardProps {
  package: Package;
  onViewDetails: (sku: string) => void;
  onBuy: (sku: string) => void;
}

export interface PackageDetailProps {
  package: Package;
  sessions?: Session[];
  onBuy: (sku: string) => void;
  onClaimSeat?: (sessionId: string) => void;
}

export interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: Package;
  upgradeOffer?: UpgradeOffer;
  onPurchase: (request: PurchaseRequest) => Promise<void>;
  onAcceptUpgrade?: (packageSku: string) => void;
}

export interface LiveSessionsProps {
  sessions: Session[];
  packageSku: string;
  onClaimSeat: (sessionId: string) => void;
  hasPrerequisites?: boolean;
  quizId?: string;
}

export interface ClaimSeatButtonProps {
  session: Session;
  packageSku: string;
  onClaim: (sessionId: string) => void;
  disabled?: boolean;
  disabledReason?: string;
}

export interface MyPackagesProps {
  packages: UserPackage[];
  onDownloadCertificate: (sku: string) => void;
  onBookMentor: (sku: string) => void;
  onManageSeat: (sku: string, sessionId: string) => void;
  onCompleteCapstone: (sku: string) => void;
}

export interface UpgradeOfferPanelProps {
  offer: UpgradeOffer;
  onAccept: () => void;
  onDismiss: () => void;
}
