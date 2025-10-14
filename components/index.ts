/**
 * Components Barrel Export
 * Centralized exports for all components
 */

// UI Components
export * from './ui';

// Accessibility Components
export * from './accessibility';

// Optimization Components
export * from './optimization';

// Layout Components
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as ErrorBoundary } from './ErrorBoundary';

// Auth Components - Removed for frontend-only version

// Navigation Components
export { default as MobileDrawer } from './navigation/MobileDrawer';

// 3D Components
export { default as Lotus3D } from './3d/Lotus3D';
export { default as Yantra3D } from './3d/Yantra3D';
export { default as DynamicLotus3D } from './3d/DynamicLotus3D';
export { default as DynamicYantra3D } from './3d/DynamicYantra3D';

// Ornament Components
export { default as GlyphParticles } from './ornaments/GlyphParticles';
export { default as IndianPatterns } from './ornaments/IndianPatterns';
export { default as Mandala } from './ornaments/Mandala';
export { default as PeacockFeather } from './ornaments/PeacockFeather';
export { default as Rangoli } from './ornaments/Rangoli';
export { default as SectionDivider } from './ornaments/SectionDivider';

// Package Components (only export what exists)
export { BuyModal } from './packages/BuyModal';
export { LiveSessions } from './packages/LiveSessions';
export { MyPackages } from './packages/MyPackages';
export { PackageCard } from './packages/PackageCard';
export { PackageDetail } from './packages/PackageDetail';
export { UpgradeOfferPanel } from './packages/UpgradeOfferPanel';

// Motion Components
export { default as MotionWrapper } from './motion/MotionWrapper';

// Theme Components
export { default as ThemeToggle } from './ThemeToggle';

// Other Components
export { default as ClientServiceWorker } from './ClientServiceWorker';
