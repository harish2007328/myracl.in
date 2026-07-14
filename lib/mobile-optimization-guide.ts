/**
 * Mobile-First Responsive Guidelines
 * Comprehensive mobile optimization guide
 */

export const mobileOptimizationGuide = `
# Mobile Optimization Guide for myracl.

## 1. VIEWPORT & META TAGS ✅

### Viewport Meta Tag (Already Added)
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes">
\`\`\`

### Safe Area Insets
For devices with notches (iPhone X, iPhone 12, etc.):
- Use CSS viewport-fit=cover
- Apply padding to account for notches

## 2. MOBILE-FIRST BREAKPOINTS

Use these Tailwind breakpoints for responsive design:
- **sm (640px)**: Small phones to large phones (iPhone 6+ to iPhone 12)
- **md (768px)**: Tablets (iPad Mini)
- **lg (1024px)**: Large tablets (iPad, iPad Pro)
- **xl (1280px)**: Desktop computers
- **2xl (1536px)**: Large desktop monitors

### Pattern:
\`\`\`jsx
// Mobile first - base styles apply to mobile
className="text-sm px-4 py-2
           sm:text-base sm:px-6 sm:py-3
           md:text-lg md:px-8 md:py-4
           lg:text-xl lg:px-10"
\`\`\`

## 3. FONT SIZES

Recommended mobile-first font scaling:
- **Mobile**: 16px base (body text)
- **Tablet**: 16px base
- **Desktop**: 16px base

Headings should scale proportionally:
- **H1**: Mobile 28px → Tablet 36px → Desktop 48px
- **H2**: Mobile 24px → Tablet 28px → Desktop 36px
- **H3**: Mobile 20px → Tablet 24px → Desktop 28px

## 4. SPACING & PADDING

Touch-friendly spacing (minimum 44x44px for buttons):
- **Mobile**: 16px padding
- **Tablet**: 20px padding
- **Desktop**: 24px padding

Use consistent spacing scale:
- xs: 4px (spacing-1)
- sm: 8px (spacing-2)
- md: 16px (spacing-4)
- lg: 24px (spacing-6)
- xl: 32px (spacing-8)

## 5. LAYOUT GRID SYSTEM

Mobile-first grid patterns:
\`\`\`jsx
// Single column → 2 columns → 3 columns
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"

// Single column → 2 columns → 4 columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"

// Flexible rows
className="flex flex-col sm:flex-row gap-4"
\`\`\`

## 6. IMAGES & MEDIA

### Image Optimization
- Use Next.js Image component (✅ already configured)
- Provide responsive image sizes:
  \`\`\`jsx
  <Image
    src={url}
    alt="description"
    sizes="(max-width: 640px) 100vw,
           (max-width: 1024px) 50vw,
           33vw"
  />
  \`\`\`
- Compress images before upload
- Use WebP/AVIF formats (✅ next.config.ts configured)

### Video
- Use aspect-ratio for responsive videos
- Lazy load videos on mobile
- Provide fallback images

### SVGs & Icons
- Scale with font-size
- Use consistent sizing:
  - Mobile: 24px - 32px
  - Desktop: 32px - 48px

## 7. FORMS & INPUT

Mobile-friendly forms:
- Input min-height: 44px (touch target)
- Font-size: 16px (prevent auto-zoom on iOS)
- Use appropriate input types:
  - email: type="email" (shows email keyboard)
  - phone: type="tel" (shows numeric keyboard)
  - date: type="date" (shows date picker)
  - number: type="number" (shows numeric keyboard)

Example:
\`\`\`jsx
<input
  type="email"
  className="w-full px-4 py-3 rounded-lg text-base"
  placeholder="Enter email"
/>
\`\`\`

## 8. NAVIGATION

Mobile-friendly navigation:
- **Mobile**: Hamburger menu or stacked layout
- **Tablet**: Drawer or compact menu
- **Desktop**: Horizontal menu bar

### Current Implementation
Your navbar:
- ✅ Hides menu on mobile
- ✅ Floats on scroll (small header)
- ❌ Need mobile menu button

Recommended: Add hamburger menu for mobile

## 9. BUTTONS & CTAs

Touch-target requirements:
- Minimum: 44x44px (Apple), 48x48px (Google)
- Recommended: 48x56px
- Spacing between buttons: minimum 8px

Example:
\`\`\`jsx
<button className="min-h-12 min-w-12 px-6 py-3 rounded-lg
                   sm:px-8 sm:py-4">
  Click Me
</button>
\`\`\`

## 10. PERFORMANCE OPTIMIZATION

### Core Web Vitals for Mobile
1. **LCP (Largest Contentful Paint)**: < 2.5s
   - Optimize hero images
   - Preload critical resources
   - Minimize render-blocking resources

2. **FID (First Input Delay)**: < 100ms
   - Reduce JavaScript execution
   - Use code splitting
   - Minimize main thread work

3. **CLS (Cumulative Layout Shift)**: < 0.1
   - Set explicit image/video sizes
   - Avoid unsized embeds
   - Use CSS transforms for animations

### Mobile-Specific Optimizations
- [ ] Lazy load images below fold
- [ ] Defer non-critical JavaScript
- [ ] Minify CSS and JavaScript
- [ ] Enable compression (gzip)
- [ ] Use CDN for static assets
- [ ] Cache resources (service worker)

Test at: https://pagespeed.web.dev

## 11. ACCESSIBILITY

Mobile accessibility checklist:
- [ ] Text is readable (16px+)
- [ ] Colors have sufficient contrast (4.5:1)
- [ ] Links/buttons are 44x44px minimum
- [ ] Form labels are associated with inputs
- [ ] Images have alt text
- [ ] Touch targets have enough spacing
- [ ] No horizontal scroll
- [ ] Mobile keyboard works properly

## 12. TESTING CHECKLIST

### Devices to Test
- iPhone SE (375px) - small screen
- iPhone 12 (390px) - standard
- iPhone 14 Pro (393px) - standard with notch
- Pixel 6 (412px) - standard Android
- Galaxy S21 (360px) - smaller Android
- iPad Mini (768px) - tablet
- iPad Pro (1024px) - large tablet

### Testing Tools
- Chrome DevTools (F12 → Device Toolbar)
- https://responsively.app/ (free multi-device testing)
- https://pagespeed.web.dev (performance testing)
- https://wave.webaim.org (accessibility testing)
- Physical devices (iOS Safari, Chrome, Firefox)

### Key Tests
- [ ] Page loads in < 3 seconds (mobile 4G)
- [ ] All links/buttons work on touch
- [ ] Forms work on mobile keyboard
- [ ] Images display correctly
- [ ] Text is readable (no zoom needed)
- [ ] No horizontal scrolling
- [ ] Navigation is accessible
- [ ] Videos/embeds are responsive
- [ ] Chatbot is mobile-friendly
- [ ] Calendar widget is responsive

## 13. COMMON MOBILE ISSUES & FIXES

### Issue: Text too small
**Fix**: Set base font-size: 16px, scale headings responsively

### Issue: Button too small
**Fix**: Ensure buttons are 44x44px minimum, use padding

### Issue: Layout shifts
**Fix**: Set explicit sizes for images/videos, use CSS Grid

### Issue: Slow performance
**Fix**: Optimize images, lazy load, defer JavaScript

### Issue: Form inputs zoom on iOS
**Fix**: Use font-size: 16px (prevents auto-zoom)

### Issue: Horizontal scrolling
**Fix**: Check for fixed width elements, ensure images don't overflow

## 14. COMPONENT GUIDELINES

### Hero Section
- Mobile: Full width, stacked content
- Tablet: Two columns, centered
- Desktop: Hero section with overlay

### Services List
- Mobile: Single column, scrollable
- Tablet: 2 columns
- Desktop: 3-6 columns

### Project Cards
- Mobile: Full width cards, vertical layout
- Tablet: 2 columns
- Desktop: 4 columns

### Testimonials
- Mobile: Single column carousel
- Desktop: Multiple columns

### Booking Section
- Mobile: Full height calendar (scrollable)
- Tablet: Side-by-side (calendar + form)
- Desktop: Larger layout

## 15. PROGRESSIVE ENHANCEMENT

Feature detection for mobile:
- Touch events (instead of hover)
- Viewport size detection
- Device capabilities (camera, geolocation)
- Network speed detection (4G, 5G)
- Operating system detection (iOS, Android)

Example:
\`\`\`typescript
// Detect touch capability
const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
          (navigator.maxTouchPoints > 0) ||
          (navigator.msMaxTouchPoints > 0));
}
\`\`\`

## 16. MOBILE SECURITY

- [ ] Use HTTPS (✅ already configured)
- [ ] Validate form inputs on client & server
- [ ] Protect API keys (don't expose in client code)
- [ ] Use Content Security Policy (CSP)
- [ ] Sanitize user inputs
- [ ] Avoid inline scripts

## Quick Win Checklist ✨

Complete these first for immediate mobile improvement:
- [ ] Add hamburger menu for mobile
- [ ] Test on real iPhone & Android devices
- [ ] Ensure all buttons are 44x44px minimum
- [ ] Fix any text that's too small
- [ ] Remove any elements causing horizontal scroll
- [ ] Test forms on mobile keyboard
- [ ] Optimize hero image for mobile
- [ ] Test Lighthouse score (target 90+)
- [ ] Set up Core Web Vitals monitoring
- [ ] Test on slow 4G network

---

**Last Updated**: July 14, 2026
**Priority**: HIGH - Mobile is 60%+ of traffic
`;
