/**
 * Mobile Optimization Configuration
 * Breakpoints, viewport settings, and responsive utilities
 */

export const mobileBreakpoints = {
  xs: 320,      // Extra small phones
  sm: 375,      // Small phones (iPhone SE)
  base: 390,    // Standard mobile
  md: 640,      // iPad mini
  lg: 768,      // iPad / Tablet
  xl: 1024,     // iPad Pro
  "2xl": 1280,  // Desktop
  "3xl": 1536,  // Large desktop
}

export const mobileViewports = {
  iphone12: {
    width: 390,
    height: 844,
    name: "iPhone 12 Pro",
  },
  iphone14: {
    width: 390,
    height: 932,
    name: "iPhone 14 Pro",
  },
  iphoneSE: {
    width: 375,
    height: 667,
    name: "iPhone SE",
  },
  pixel6: {
    width: 412,
    height: 915,
    name: "Pixel 6",
  },
  galaxyS21: {
    width: 360,
    height: 800,
    name: "Galaxy S21",
  },
  ipadMini: {
    width: 768,
    height: 1024,
    name: "iPad Mini",
  },
  ipadPro12: {
    width: 1024,
    height: 1366,
    name: "iPad Pro 12.9",
  },
}

/**
 * Mobile-first utility classes
 * Use these in your Tailwind classes
 */
export const mobileUtilities = {
  // Touch targets (48x48px minimum)
  touchTarget: "min-h-12 min-w-12",

  // Safe area insets (for notch/dynamic island)
  safeAreaTop: "pt-safe",
  safeAreaBottom: "pb-safe",
  safeAreaLeft: "pl-safe",
  safeAreaRight: "pr-safe",

  // Mobile-friendly spacing
  containerMobile: "px-4 sm:px-6",
  containerTablet: "px-6 md:px-8",
  containerDesktop: "px-8 lg:px-12",

  // Text responsive sizing
  headingMobile: "text-2xl sm:text-3xl md:text-4xl",
  textMobile: "text-base sm:text-lg md:text-xl",

  // Flexible layouts
  gridMobile: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  flexMobile: "flex flex-col sm:flex-row",
}

/**
 * Mobile performance targets
 */
export const mobilePerformanceTargets = {
  lighthouse: {
    performance: 90,
    accessibility: 90,
    bestPractices: 90,
    seo: 100,
  },
  coreWebVitals: {
    lcp: 2.5,           // Largest Contentful Paint (seconds)
    fid: 100,           // First Input Delay (milliseconds)
    cls: 0.1,           // Cumulative Layout Shift
  },
  pageSize: {
    mobile: 100,        // KB
    tablet: 150,        // KB
    desktop: 200,       // KB
  },
  loadTime: {
    mobile: 3000,       // milliseconds (3G)
    tablet: 2000,       // milliseconds (4G)
    desktop: 1000,      // milliseconds (Fast)
  },
}

/**
 * Touch-friendly spacing guide
 * For buttons, links, and interactive elements
 */
export const touchSpacing = {
  small: "32px",      // Minimum for small targets
  medium: "44px",     // Recommended minimum
  large: "48px",      // Spacious, recommended
  extraLarge: "56px", // Very spacious
}

/**
 * Mobile font sizes (mobile-first)
 */
export const mobileFontSizes = {
  xs: {
    mobile: "12px",
    tablet: "12px",
    desktop: "12px",
  },
  sm: {
    mobile: "14px",
    tablet: "14px",
    desktop: "14px",
  },
  base: {
    mobile: "16px",
    tablet: "16px",
    desktop: "16px",
  },
  lg: {
    mobile: "18px",
    tablet: "18px",
    desktop: "20px",
  },
  xl: {
    mobile: "20px",
    tablet: "24px",
    desktop: "28px",
  },
  "2xl": {
    mobile: "24px",
    tablet: "28px",
    desktop: "32px",
  },
  "3xl": {
    mobile: "28px",
    tablet: "32px",
    desktop: "36px",
  },
  "4xl": {
    mobile: "32px",
    tablet: "36px",
    desktop: "40px",
  },
  "5xl": {
    mobile: "36px",
    tablet: "40px",
    desktop: "48px",
  },
}

/**
 * Get responsive value based on device type
 */
export function getResponsiveValue<T>(values: {
  mobile: T
  tablet: T
  desktop: T
}, deviceType: "mobile" | "tablet" | "desktop"): T {
  return values[deviceType]
}
