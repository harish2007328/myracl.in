/**
 * Mobile Testing Checklist
 * Comprehensive mobile testing procedures
 */

export interface MobileTestCase {
  category: string
  test: string
  instructions: string
  devices: string[]
  priority: "critical" | "high" | "medium" | "low"
  completed?: boolean
}

export const mobileTestingChecklist: MobileTestCase[] = [
  // VISUAL DESIGN
  {
    category: "Visual Design",
    test: "Header is readable on small screens",
    instructions: "Test on 320px device (Galaxy S5 or smaller). Header text should not overflow.",
    devices: ["iPhone SE", "Galaxy S5"],
    priority: "critical",
  },
  {
    category: "Visual Design",
    test: "Hero section scales correctly",
    instructions: "Verify hero image and text size properly from 320px to 600px.",
    devices: ["All"],
    priority: "critical",
  },
  {
    category: "Visual Design",
    test: "No horizontal scrolling",
    instructions: "Scroll horizontally - nothing should extend beyond viewport.",
    devices: ["All"],
    priority: "critical",
  },
  {
    category: "Visual Design",
    test: "Images are sharp and centered",
    instructions: "Check images on high-DPI screens (iPhone Retina, Pixel). Should be sharp.",
    devices: ["iPhone 12+", "Pixel 6+"],
    priority: "high",
  },
  {
    category: "Visual Design",
    test: "Text hierarchy is clear",
    instructions: "Headings, subheadings, and body text should be visually distinct.",
    devices: ["All"],
    priority: "medium",
  },

  // TYPOGRAPHY
  {
    category: "Typography",
    test: "Base font size is 16px",
    instructions: "Inspect body text - should be at least 16px to prevent iOS zoom.",
    devices: ["iPhone"],
    priority: "critical",
  },
  {
    category: "Typography",
    test: "Headings are readable",
    instructions: "H1, H2, H3 should be readable without zoom. Check line-height and contrast.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Typography",
    test: "Line length is optimal",
    instructions: "Text should not exceed 80 characters per line for readability.",
    devices: ["All"],
    priority: "medium",
  },

  // BUTTONS & TOUCH TARGETS
  {
    category: "Buttons & Touch Targets",
    test: "All buttons are 44x44px minimum",
    instructions: "Using Chrome DevTools, verify all buttons meet 44x44px minimum.",
    devices: ["All"],
    priority: "critical",
  },
  {
    category: "Buttons & Touch Targets",
    test: "Button spacing is adequate",
    instructions: "Buttons should have at least 8px spacing between them.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Buttons & Touch Targets",
    test: "All links are tappable",
    instructions: "Every link should be easy to tap without accidentally hitting another.",
    devices: ["All"],
    priority: "critical",
  },
  {
    category: "Buttons & Touch Targets",
    test: "CTA buttons are prominent",
    instructions: "Call-to-action buttons should stand out and be easy to find.",
    devices: ["All"],
    priority: "high",
  },

  // FORMS & INPUT
  {
    category: "Forms & Input",
    test: "Form inputs don't trigger zoom",
    instructions: "Tap an input field - page should not zoom. Font must be 16px+.",
    devices: ["iPhone"],
    priority: "critical",
  },
  {
    category: "Forms & Input",
    test: "Form inputs are large enough",
    instructions: "Input fields should be at least 44px tall for easy tapping.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Forms & Input",
    test: "Input types trigger correct keyboards",
    instructions: "Email input shows email keyboard, tel shows numeric, etc.",
    devices: ["iOS Safari", "Android Chrome"],
    priority: "high",
  },
  {
    category: "Forms & Input",
    test: "Form labels are associated",
    instructions: "Clicking label should focus the input. Check with screen reader.",
    devices: ["All"],
    priority: "medium",
  },
  {
    category: "Forms & Input",
    test: "Error messages are clear",
    instructions: "Form validation errors should be visible and understandable.",
    devices: ["All"],
    priority: "medium",
  },

  // NAVIGATION
  {
    category: "Navigation",
    test: "Menu is accessible on mobile",
    instructions: "On phones, there should be a mobile menu (hamburger or drawer).",
    devices: ["iPhone SE", "Galaxy S5"],
    priority: "critical",
  },
  {
    category: "Navigation",
    test: "Navigation doesn't jump on scroll",
    instructions: "Nav should float or hide smoothly, not jump around.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Navigation",
    test: "Back button works correctly",
    instructions: "Browser back button should return to previous page correctly.",
    devices: ["All"],
    priority: "medium",
  },
  {
    category: "Navigation",
    test: "Deep links work",
    instructions: "Sharing a link should open the page at the correct section.",
    devices: ["All"],
    priority: "medium",
  },

  // IMAGES & MEDIA
  {
    category: "Images & Media",
    test: "Images load and display correctly",
    instructions: "All images should load and display at correct aspect ratio.",
    devices: ["All"],
    priority: "critical",
  },
  {
    category: "Images & Media",
    test: "Images don't overflow",
    instructions: "No image should extend beyond the viewport width.",
    devices: ["All"],
    priority: "critical",
  },
  {
    category: "Images & Media",
    test: "Images have alt text",
    instructions: "Using DevTools, verify all images have descriptive alt text.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Images & Media",
    test: "Videos are responsive",
    instructions: "Videos should scale with container, no scroll, maintains aspect ratio.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Images & Media",
    test: "Lazy loading works",
    instructions: "Images below fold should load as you scroll, not all at once.",
    devices: ["All"],
    priority: "medium",
  },

  // PERFORMANCE
  {
    category: "Performance",
    test: "Page loads in under 3 seconds",
    instructions: "Use Chrome DevTools → Network. Total load time < 3s on 4G.",
    devices: ["All"],
    priority: "critical",
  },
  {
    category: "Performance",
    test: "Lighthouse score is 90+",
    instructions: "Chrome DevTools → Lighthouse. Run audit on mobile profile.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Performance",
    test: "Core Web Vitals are good",
    instructions: "Use PageSpeed Insights. LCP < 2.5s, FID < 100ms, CLS < 0.1.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Performance",
    test: "No layout shifts",
    instructions: "CLS (Cumulative Layout Shift) should be < 0.1. Watch for content jumping.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Performance",
    test: "No jank on scroll",
    instructions: "Scrolling should be smooth (60fps). No stuttering or jumps.",
    devices: ["All"],
    priority: "medium",
  },

  // ACCESSIBILITY
  {
    category: "Accessibility",
    test: "Color contrast is sufficient",
    instructions: "Text should be readable. Use WAVE tool - aim for WCAG AA (4.5:1).",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Accessibility",
    test: "Touch targets are keyboard accessible",
    instructions: "Using Tab key, you should be able to navigate all interactive elements.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Accessibility",
    test: "Focus indicators are visible",
    instructions: "Buttons/links should have visible focus ring when tabbed to.",
    devices: ["All"],
    priority: "medium",
  },
  {
    category: "Accessibility",
    test: "Zoom works",
    instructions: "Pinch to zoom should work. Page should remain usable at 200% zoom.",
    devices: ["iOS Safari", "Android Chrome"],
    priority: "high",
  },
  {
    category: "Accessibility",
    test: "Screen reader compatibility",
    instructions: "Test with VoiceOver (iOS) or TalkBack (Android). All content readable.",
    devices: ["iOS Safari", "Android Chrome"],
    priority: "medium",
  },

  // ORIENTATION
  {
    category: "Orientation",
    test: "Portrait orientation works",
    instructions: "Rotate phone to portrait - layout should adapt correctly.",
    devices: ["All"],
    priority: "critical",
  },
  {
    category: "Orientation",
    test: "Landscape orientation works",
    instructions: "Rotate phone to landscape - layout should be optimized.",
    devices: ["All"],
    priority: "critical",
  },
  {
    category: "Orientation",
    test: "Orientation change doesn't break layout",
    instructions: "Flip orientation multiple times - no broken elements.",
    devices: ["All"],
    priority: "high",
  },

  // BROWSER COMPATIBILITY
  {
    category: "Browser Compatibility",
    test: "Works on iOS Safari",
    instructions: "Test on actual iPhone with Safari browser.",
    devices: ["iPhone"],
    priority: "critical",
  },
  {
    category: "Browser Compatibility",
    test: "Works on Android Chrome",
    instructions: "Test on actual Android phone with Chrome browser.",
    devices: ["Android"],
    priority: "critical",
  },
  {
    category: "Browser Compatibility",
    test: "Works on Firefox Mobile",
    instructions: "Test on Firefox browser on mobile device.",
    devices: ["iOS", "Android"],
    priority: "medium",
  },
  {
    category: "Browser Compatibility",
    test: "Works on Samsung Internet",
    instructions: "Test on Samsung devices with Samsung Internet browser.",
    devices: ["Samsung Android"],
    priority: "medium",
  },

  // INTERACTIVE ELEMENTS
  {
    category: "Interactive Elements",
    test: "Chat widget is mobile-friendly",
    instructions: "Chat should not cover important content. Should be dismissible.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Interactive Elements",
    test: "Calendar widget is mobile-friendly",
    instructions: "Calendar should be scrollable, fully functional on small screens.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Interactive Elements",
    test: "Modals don't overflow screen",
    instructions: "Any modal/dialog should fit on screen without overflow.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Interactive Elements",
    test: "Dropdowns/menus work on touch",
    instructions: "Dropdowns should be tappable, options should be easily selectable.",
    devices: ["All"],
    priority: "high",
  },

  // NETWORK & OFFLINE
  {
    category: "Network & Offline",
    test: "Page loads on slow 4G",
    instructions: "Chrome DevTools → Network → Throttle to Fast 4G. Should load in 3s.",
    devices: ["All"],
    priority: "high",
  },
  {
    category: "Network & Offline",
    test: "Page loads on slow 3G",
    instructions: "Chrome DevTools → Network → Throttle to Slow 3G. Should be functional.",
    devices: ["All"],
    priority: "medium",
  },
  {
    category: "Network & Offline",
    test: "Handles offline gracefully",
    instructions: "Offline mode should show helpful message, not blank page.",
    devices: ["All"],
    priority: "medium",
  },

  // NOTCH & SAFE AREAS
  {
    category: "Notch & Safe Areas",
    test: "Content avoids notch on iPhone",
    instructions: "On notched iPhones, content should not be hidden by notch.",
    devices: ["iPhone X+"],
    priority: "high",
  },
  {
    category: "Notch & Safe Areas",
    test: "Content avoids home indicator",
    instructions: "Bottom content should not be hidden by home indicator.",
    devices: ["iPhone X+"],
    priority: "high",
  },
];

/**
 * Get tests by priority
 */
export function getTestsByPriority(priority: "critical" | "high" | "medium" | "low") {
  return mobileTestingChecklist.filter((test) => test.priority === priority)
}

/**
 * Get tests by category
 */
export function getTestsByCategory(category: string) {
  return mobileTestingChecklist.filter((test) => test.category === category)
}

/**
 * Get completion statistics
 */
export function getCompletionStats() {
  const total = mobileTestingChecklist.length
  const completed = mobileTestingChecklist.filter((test) => test.completed).length
  return {
    total,
    completed,
    percentage: Math.round((completed / total) * 100),
  }
}

/**
 * Get critical tests (must pass)
 */
export function getCriticalTests() {
  return getTestsByPriority("critical")
}
