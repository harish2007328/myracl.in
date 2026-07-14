/**
 * Mobile Component Guidelines
 * Best practices for building mobile-friendly React components
 */

export const mobileComponentGuidelines = `
# Mobile Component Guidelines

## Responsive Component Patterns

### 1. Hero Section (Mobile-First)

\`\`\`jsx
export function HeroSection() {
  return (
    <section className="
      // Mobile: Full viewport, centered
      w-full h-screen flex flex-col items-center justify-center
      px-4 py-8 gap-6
      
      // Tablet: Add side margins
      sm:px-6
      md:px-12 md:gap-8
      
      // Desktop: Wider spacing
      lg:px-16 lg:gap-12
    ">
      <h1 className="
        text-4xl font-bold
        sm:text-5xl
        md:text-6xl
        lg:text-7xl
        text-center
      ">
        Heading
      </h1>
      
      <p className="
        text-lg max-w-xs
        sm:max-w-sm
        md:max-w-md
        lg:max-w-xl
        text-center
      ">
        Description
      </p>
    </section>
  )
}
\`\`\`

### 2. Card Grid (Mobile-First)

\`\`\`jsx
export function CardGrid() {
  return (
    <div className="
      // Mobile: 1 column
      grid grid-cols-1 gap-4 px-4 py-8
      
      // Tablet: 2 columns
      sm:grid-cols-2 sm:gap-6 sm:px-6
      
      // Desktop: 3 columns
      md:grid-cols-3 md:gap-8 md:px-8
      
      lg:grid-cols-4 lg:px-12
    ">
      {items.map(item => (
        <div key={item.id} className="
          // Touch-friendly card
          rounded-lg p-4 cursor-pointer
          min-h-32
          sm:p-6
          md:p-8
          hover:shadow-lg transition-shadow
        ">
          {/* Card content */}
        </div>
      ))}
    </div>
  )
}
\`\`\`

### 3. Navigation (Mobile Menu)

\`\`\`jsx
import { useState } from 'react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="relative">
      {/* Desktop Menu */}
      <ul className="
        hidden
        md:flex
        gap-6
        items-center
      ">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          md:hidden
          p-3 rounded-lg
          min-h-12 min-w-12
        "
      >
        Menu
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="
          absolute top-full left-0 right-0
          bg-white shadow-lg rounded-lg
          p-4 space-y-2
          md:hidden
        ">
          <a href="#home" className="block p-3">Home</a>
          <a href="#about" className="block p-3">About</a>
          <a href="#services" className="block p-3">Services</a>
        </div>
      )}
    </nav>
  )
}
\`\`\`

### 4. Button (Touch-Friendly)

\`\`\`jsx
export function Button({ children, ...props }) {
  return (
    <button
      className="
        // Minimum touch target: 44x44px
        min-h-11 min-w-11 px-6 py-3
        
        // Mobile padding
        text-base
        sm:px-8 sm:py-4 sm:text-lg
        
        // Desktop
        md:px-10 md:py-5
        
        // Style
        bg-blue-600 text-white
        rounded-lg font-semibold
        transition-all duration-200
        hover:bg-blue-700 active:scale-95
        
        // Prevent text selection
        select-none
        
        // Accessibility
        focus:outline-none focus:ring-2 focus:ring-offset-2
      "
      {...props}
    >
      {children}
    </button>
  )
}
\`\`\`

### 5. Input/Form (Mobile-Optimized)

\`\`\`jsx
export function Input({ label, ...props }) {
  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium">
        {label}
      </label>
      <input
        className="
          // Touch-friendly height
          w-full h-12 px-4 py-3
          
          // Font size: 16px prevents iOS zoom
          text-base
          
          // Rounded corners for mobile
          rounded-lg
          
          // Border
          border-2 border-gray-300
          
          // Focus state
          focus:border-blue-600 focus:outline-none
          focus:ring-2 focus:ring-blue-100
          
          // Responsive spacing
          sm:h-11
          md:h-12
        "
        {...props}
      />
    </div>
  )
}
\`\`\`

### 6. Image Gallery (Mobile-Optimized)

\`\`\`jsx
import Image from 'next/image'

export function ImageGallery({ images }) {
  return (
    <div className="
      // Horizontal scroll on mobile
      overflow-x-auto snap-x snap-mandatory
      sm:overflow-visible sm:grid sm:grid-cols-2 md:grid-cols-3
      gap-4 px-4 py-6
    ">
      {images.map(img => (
        <div
          key={img.id}
          className="
            // Mobile: full viewport width
            w-[calc(100vw-2rem)] flex-shrink-0
            
            // Tablet+: normal grid
            sm:w-auto
            
            // Aspect ratio
            aspect-video rounded-lg overflow-hidden
            
            // Snap point
            snap-center
          "
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="
              (max-width: 640px) calc(100vw - 2rem),
              (max-width: 1024px) calc(50vw - 1rem),
              calc(33vw - 1rem)
            "
          />
        </div>
      ))}
    </div>
  )
}
\`\`\`

### 7. Modal/Dialog (Mobile-Full-Screen)

\`\`\`jsx
export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/50
    ">
      <div className="
        // Mobile: Full screen with padding
        w-full h-full max-h-screen
        
        // Desktop: Centered modal
        sm:max-w-lg sm:max-h-[90vh] sm:rounded-lg
        
        bg-white
        overflow-y-auto
        flex flex-col
      ">
        {/* Header */}
        <div className="
          flex justify-between items-center
          border-b p-4
          sm:p-6
          sticky top-0
        ">
          <h2 className="text-xl font-bold">Title</h2>
          <button
            onClick={onClose}
            className="min-h-10 min-w-10 p-2"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6">
          {children}
        </div>

        {/* Footer */}
        <div className="
          border-t p-4 gap-2
          flex flex-col-reverse
          sm:flex-row
        ">
          <button onClick={onClose}>Cancel</button>
          <button className="primary">Confirm</button>
        </div>
      </div>
    </div>
  )
}
\`\`\`

## Common Mobile Issues & Solutions

### Issue 1: Text Too Small on Mobile
\`\`\`jsx
// ❌ Wrong: Fixed size
<h1 className="text-2xl">Heading</h1>

// ✅ Correct: Responsive
<h1 className="text-2xl sm:text-3xl md:text-4xl">Heading</h1>
\`\`\`

### Issue 2: Button Not Tappable
\`\`\`jsx
// ❌ Wrong: Too small
<button className="px-2 py-1">Click</button>

// ✅ Correct: 44x44px minimum
<button className="min-h-11 min-w-11 px-4 py-3">Click</button>
\`\`\`

### Issue 3: Layout Shift
\`\`\`jsx
// ❌ Wrong: No explicit size
<Image src={url} alt="img" />

// ✅ Correct: Explicit dimensions
<Image
  src={url}
  alt="img"
  width={400}
  height={300}
  className="w-full h-auto"
/>
\`\`\`

### Issue 4: Form Input Zoom (iOS)
\`\`\`jsx
// ❌ Wrong: 14px font triggers zoom
<input className="text-sm" />

// ✅ Correct: 16px font prevents zoom
<input className="text-base" />
\`\`\`

### Issue 5: Content Overflow
\`\`\`jsx
// ❌ Wrong: Fixed width may overflow
<div className="w-96">Content</div>

// ✅ Correct: Responsive with max-width
<div className="w-full max-w-96">Content</div>
\`\`\`

## Testing Components

### Device Simulator (Chrome DevTools)
1. Open DevTools (F12)
2. Click device toolbar icon
3. Select device from dropdown
4. Test interactions

### Real Devices Needed
- iPhone (test Safari)
- Android phone (test Chrome)
- Tablet (iPad or Android tablet)

### Checklist for Each Component
- [ ] Text is readable
- [ ] Buttons are tappable (44x44px)
- [ ] No horizontal scroll
- [ ] Images display correctly
- [ ] Forms work with mobile keyboard
- [ ] Touch targets have enough spacing
- [ ] Layout looks good in portrait & landscape
- [ ] Performance is acceptable (<3s load)

---
`;

export default mobileComponentGuidelines;
