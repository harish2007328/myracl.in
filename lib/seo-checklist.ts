/**
 * SEO Checklist & Implementation Guide
 * Use this to track your SEO progress
 */

export interface SEOChecklistItem {
  category: string
  task: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  notes?: string
}

export const seoChecklist: SEOChecklistItem[] = [
  // Technical SEO
  {
    category: 'Technical SEO',
    task: 'Setup robots.txt with AI crawler rules',
    completed: true,
    priority: 'high',
    notes: 'GPTBot, Claude, and other AI crawlers configured',
  },
  {
    category: 'Technical SEO',
    task: 'Create dynamic sitemap.xml',
    completed: true,
    priority: 'high',
    notes: 'app/sitemap.ts created',
  },
  {
    category: 'Technical SEO',
    task: 'Configure next.config.ts for SEO',
    completed: true,
    priority: 'high',
    notes: 'Image optimization, compression, headers',
  },
  {
    category: 'Technical SEO',
    task: 'Add canonical tags to all pages',
    completed: true,
    priority: 'high',
    notes: 'Already in layout.tsx metadata',
  },
  {
    category: 'Technical SEO',
    task: 'Enable HTTPS/SSL',
    completed: true,
    priority: 'high',
  },
  {
    category: 'Technical SEO',
    task: 'Fix broken links',
    completed: false,
    priority: 'medium',
  },
  {
    category: 'Technical SEO',
    task: 'Optimize Core Web Vitals (LCP, FID, CLS)',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Technical SEO',
    task: 'Add security.txt file',
    completed: false,
    priority: 'low',
  },

  // On-Page SEO
  {
    category: 'On-Page SEO',
    task: 'Optimize page titles (50-60 chars)',
    completed: true,
    priority: 'high',
    notes: 'Home page done, need to do other pages',
  },
  {
    category: 'On-Page SEO',
    task: 'Optimize meta descriptions (150-160 chars)',
    completed: true,
    priority: 'high',
  },
  {
    category: 'On-Page SEO',
    task: 'Add alt text to all images',
    completed: false,
    priority: 'high',
  },
  {
    category: 'On-Page SEO',
    task: 'Use proper heading hierarchy (H1-H3)',
    completed: false,
    priority: 'high',
  },
  {
    category: 'On-Page SEO',
    task: 'Add internal links (3-5 per page)',
    completed: false,
    priority: 'medium',
  },
  {
    category: 'On-Page SEO',
    task: 'Optimize for target keywords',
    completed: false,
    priority: 'high',
  },
  {
    category: 'On-Page SEO',
    task: 'Improve content length (300+ words)',
    completed: false,
    priority: 'medium',
  },

  // Structured Data
  {
    category: 'Structured Data',
    task: 'Add MarketingAgency schema',
    completed: true,
    priority: 'high',
    notes: 'In layout.tsx',
  },
  {
    category: 'Structured Data',
    task: 'Add Organization schema to all pages',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Structured Data',
    task: 'Add LocalBusiness schema (Tirunelveli)',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Structured Data',
    task: 'Add Service schema to service pages',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Structured Data',
    task: 'Add FAQ schema',
    completed: false,
    priority: 'medium',
  },
  {
    category: 'Structured Data',
    task: 'Add Breadcrumb schema',
    completed: false,
    priority: 'medium',
  },

  // Off-Page SEO
  {
    category: 'Off-Page SEO',
    task: 'Submit to Google Search Console',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Off-Page SEO',
    task: 'Submit to Bing Webmaster Tools',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Off-Page SEO',
    task: 'Setup Google My Business',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Off-Page SEO',
    task: 'Build local citations (Tirunelveli directories)',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Off-Page SEO',
    task: 'Get backlinks from relevant websites',
    completed: false,
    priority: 'medium',
  },
  {
    category: 'Off-Page SEO',
    task: 'Encourage customer reviews on Google',
    completed: false,
    priority: 'medium',
  },

  // Analytics & Monitoring
  {
    category: 'Analytics & Monitoring',
    task: 'Setup Google Analytics 4 (GA4)',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Analytics & Monitoring',
    task: 'Setup conversion tracking',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Analytics & Monitoring',
    task: 'Monitor Core Web Vitals',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Analytics & Monitoring',
    task: 'Setup SEO dashboards',
    completed: false,
    priority: 'medium',
  },

  // Content Strategy
  {
    category: 'Content',
    task: 'Research target keywords',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Content',
    task: 'Create keyword mapping for pages',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Content',
    task: 'Write high-quality blog posts',
    completed: false,
    priority: 'medium',
  },
  {
    category: 'Content',
    task: 'Create location-specific content (Tirunelveli)',
    completed: false,
    priority: 'high',
  },

  // Mobile & Performance
  {
    category: 'Performance',
    task: 'Mobile-friendly test (Google)',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Performance',
    task: 'Lighthouse audit (90+ score)',
    completed: false,
    priority: 'high',
  },
  {
    category: 'Performance',
    task: 'Image optimization & compression',
    completed: true,
    priority: 'high',
    notes: 'Next.js Image component configured',
  },
  {
    category: 'Performance',
    task: 'Lazy load images & components',
    completed: false,
    priority: 'medium',
  },
]

/**
 * Get completion percentage by category
 */
export function getCompletionStats() {
  const stats: Record<string, { completed: number; total: number; percentage: number }> = {}

  seoChecklist.forEach((item) => {
    if (!stats[item.category]) {
      stats[item.category] = { completed: 0, total: 0, percentage: 0 }
    }

    stats[item.category].total++
    if (item.completed) {
      stats[item.category].completed++
    }
  })

  // Calculate percentages
  Object.keys(stats).forEach((category) => {
    const { completed, total } = stats[category]
    stats[category].percentage = Math.round((completed / total) * 100)
  })

  return stats
}

/**
 * Get high-priority incomplete tasks
 */
export function getHighPriorityTasks() {
  return seoChecklist.filter((item) => item.priority === 'high' && !item.completed)
}
