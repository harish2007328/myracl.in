import type { Metadata } from 'next'

export interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogImageAlt?: string
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
}

/**
 * Generate metadata for pages with comprehensive SEO
 */
export function generateSEOMetadata(props: SEOProps): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogImage = 'https://myracl.in/google-profile.svg',
    ogImageAlt = 'myracl. Digital Marketing Agency',
    canonical,
    noindex = false,
    nofollow = false,
  } = props

  const robots = []
  if (noindex) robots.push('noindex')
  if (nofollow) robots.push('nofollow')
  if (!noindex) robots.push('index')
  if (!nofollow) robots.push('follow')

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

/**
 * Generate structured data (Schema.org JSON-LD)
 */
export function generateSchemaMarkup(type: string, data: Record<string, any>) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://myracl.in/#organization',
    name: 'myracl.',
    url: 'https://myracl.in',
    logo: {
      '@type': 'ImageObject',
      url: 'https://myracl.in/google-profile.svg',
      width: 512,
      height: 512,
    },
    description:
      "myracl. is Tirunelveli's No.1 digital marketing agency and best local SEO company. We provide brand strategy, performance ads, and web making.",
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tirunelveli',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@myracl.in',
    },
    sameAs: [
      'https://www.facebook.com/myracl',
      'https://www.instagram.com/myracl',
      'https://www.twitter.com/myracl',
      'https://www.linkedin.com/company/myracl',
    ],
  }
}

/**
 * Generate LocalBusiness schema for Tirunelveli
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://myracl.in/#localbusiness',
    name: 'myracl.',
    image: 'https://myracl.in/google-profile.svg',
    description:
      'Digital marketing agency in Tirunelveli specializing in SEO, social media marketing, web development, and performance ads.',
    url: 'https://myracl.in',
    telephone: '+91-XXXXXXXXXX', // Add your phone
    email: 'contact@myracl.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[Your Street Address]', // Update this
      addressLocality: 'Tirunelveli',
      addressRegion: 'Tamil Nadu',
      postalCode: '627007', // Update this
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: 'Tirunelveli',
    },
    priceRange: '$$$',
  }
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(
  serviceName: string,
  description: string,
  provider = 'myracl.'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://myracl.in',
    },
    areaServed: {
      '@type': 'City',
      name: 'Tirunelveli',
    },
  }
}
