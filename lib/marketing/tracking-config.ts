/**
 * Marketing Tracking Configuration
 * Type definitions and validation schemas for GA4 and Meta Pixel
 */

// ============================================================================
// GA4 CONFIGURATION TYPES
// ============================================================================

export interface GA4Config {
  measurementId: string;
  streamName?: string;
  debugMode: boolean;
  customEvents: GA4CustomEvent[];
  userProperties: Record<string, string>;
  enhancedMeasurement: GA4EnhancedMeasurement;
  crossDomainTracking: string[];
  customDimensions: GA4CustomDimension[];
  customMetrics: GA4CustomMetric[];
}

export interface GA4CustomEvent {
  id: string;
  name: string;
  description?: string;
  parameters: Record<string, any>;
  triggerCondition?: string;
}

export interface GA4EnhancedMeasurement {
  scrolls: boolean;
  outboundClicks: boolean;
  siteSearch: boolean;
  videoEngagement: boolean;
  fileDownloads: boolean;
}

export interface GA4CustomDimension {
  name: string;
  scope: 'event' | 'user';
  value: string;
}

export interface GA4CustomMetric {
  name: string;
  scope: 'event';
  value: number;
}

// ============================================================================
// META PIXEL CONFIGURATION TYPES
// ============================================================================

export interface MetaPixelConfig {
  pixelId: string;
  accessToken?: string;
  testEventCode?: string;
  standardEvents: MetaStandardEvent[];
  customConversions: MetaCustomConversion[];
  advancedMatching: MetaAdvancedMatching;
  customData: Record<string, any>;
  firstPartyCookies: boolean;
}

export interface MetaStandardEvent {
  id: string;
  name: MetaStandardEventName;
  enabled: boolean;
  parameters: Record<string, any>;
}

export type MetaStandardEventName =
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'Schedule'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe';

export interface MetaCustomConversion {
  id: string;
  name: string;
  description?: string;
  rules: MetaConversionRule[];
}

export interface MetaConversionRule {
  type: 'url' | 'event';
  operator: 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'regex';
  value: string;
}

export interface MetaAdvancedMatching {
  enabled: boolean;
  em?: string; // email (hashed)
  ph?: string; // phone (hashed)
  fn?: string; // first name (hashed)
  ln?: string; // last name (hashed)
  ct?: string; // city (hashed)
  st?: string; // state (hashed)
  zp?: string; // zip (hashed)
  country?: string; // country (hashed)
}

// ============================================================================
// MARKETING CONFIGURATION
// ============================================================================

export interface MarketingConfig {
  ga4: GA4Config | null;
  metaPixel: MetaPixelConfig | null;
  lastUpdated: number;
  deployedAt?: number;
}

// ============================================================================
// TEST EVENT TYPES
// ============================================================================

export interface TestEvent {
  id: string;
  platform: 'ga4' | 'meta' | 'both';
  eventName: string;
  parameters: Record<string, any>;
  timestamp: number;
  status: 'pending' | 'success' | 'error';
  response?: any;
  error?: string;
}

// ============================================================================
// STATUS TYPES
// ============================================================================

export interface TrackingStatus {
  platform: 'ga4' | 'meta';
  connected: boolean;
  scriptLoaded: boolean;
  lastEvent?: number;
  error?: string;
  mode: 'test' | 'production';
}

// ============================================================================
// DEFAULT CONFIGURATIONS
// ============================================================================

export const DEFAULT_GA4_CONFIG: GA4Config = {
  measurementId: '',
  streamName: '',
  debugMode: false,
  customEvents: [],
  userProperties: {},
  enhancedMeasurement: {
    scrolls: true,
    outboundClicks: true,
    siteSearch: true,
    videoEngagement: true,
    fileDownloads: true,
  },
  crossDomainTracking: [],
  customDimensions: [],
  customMetrics: [],
};

export const DEFAULT_META_PIXEL_CONFIG: MetaPixelConfig = {
  pixelId: '',
  accessToken: '',
  testEventCode: '',
  standardEvents: [
    { id: '1', name: 'PageView', enabled: true, parameters: {} },
    { id: '2', name: 'ViewContent', enabled: false, parameters: {} },
    { id: '3', name: 'AddToCart', enabled: false, parameters: {} },
    { id: '4', name: 'InitiateCheckout', enabled: false, parameters: {} },
    { id: '5', name: 'Purchase', enabled: false, parameters: {} },
    { id: '6', name: 'Lead', enabled: false, parameters: {} },
    { id: '7', name: 'CompleteRegistration', enabled: false, parameters: {} },
  ],
  customConversions: [],
  advancedMatching: {
    enabled: false,
  },
  customData: {},
  firstPartyCookies: true,
};

export const DEFAULT_MARKETING_CONFIG: MarketingConfig = {
  ga4: null,
  metaPixel: null,
  lastUpdated: Date.now(),
};

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

export function validateGA4MeasurementId(id: string): boolean {
  return /^G-[A-Z0-9]{10}$/.test(id);
}

export function validateMetaPixelId(id: string): boolean {
  return /^\d{15,16}$/.test(id);
}

export function validateGA4Config(config: Partial<GA4Config>): string[] {
  const errors: string[] = [];

  if (config.measurementId && !validateGA4MeasurementId(config.measurementId)) {
    errors.push('Invalid GA4 Measurement ID format. Should be G-XXXXXXXXXX');
  }

  return errors;
}

export function validateMetaPixelConfig(config: Partial<MetaPixelConfig>): string[] {
  const errors: string[] = [];

  if (config.pixelId && !validateMetaPixelId(config.pixelId)) {
    errors.push('Invalid Meta Pixel ID format. Should be 15-16 digits');
  }

  return errors;
}

// ============================================================================
// COMMON TEST EVENTS
// ============================================================================

export const COMMON_TEST_EVENTS = [
  {
    name: 'page_view',
    displayName: 'Page View',
    ga4Params: { page_title: 'Marketing Dashboard', page_location: window.location.href },
    metaParams: {},
    metaEvent: 'PageView',
  },
  {
    name: 'button_click',
    displayName: 'Button Click',
    ga4Params: { button_text: 'Test Button', button_location: 'marketing_dashboard' },
    metaParams: { button_text: 'Test Button' },
    metaEvent: 'track',
  },
  {
    name: 'form_submit',
    displayName: 'Form Submit',
    ga4Params: { form_id: 'test_form', form_name: 'Test Form' },
    metaParams: { form_name: 'Test Form' },
    metaEvent: 'Lead',
  },
  {
    name: 'purchase',
    displayName: 'Purchase Event',
    ga4Params: { 
      currency: 'USD', 
      value: 99.99, 
      get transaction_id() { return 'TEST_' + Date.now() },
      items: [{ item_id: 'TEST_ITEM', item_name: 'Test Course', price: 99.99, quantity: 1 }]
    },
    metaParams: { 
      currency: 'USD', 
      value: 99.99,
      content_name: 'Test Course',
      content_type: 'product'
    },
    metaEvent: 'Purchase',
  },
];

