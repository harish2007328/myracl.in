import { NextResponse } from 'next/server'

/**
 * Dynamic robots.txt endpoint
 * GET /api/robots
 *
 * This generates robots.txt dynamically from configuration
 * Useful for A/B testing different crawling strategies
 */

export async function GET() {
  const robotsTxt = `# SEO & Indexing Rules
User-agent: *
Allow: /
Disallow: /api/
Disallow: /*.json$
Disallow: /admin/
Allow: /public/

# Allow specific AI crawlers
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: Yandexbot
Allow: /

# ChatGPT & AI crawlers
User-agent: GPTBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: APIBot
Allow: /

# Restrict bad bots
User-agent: MJ12bot
Allow: /

User-agent: AhrefsBot
Allow: /

# Sitemap location
Sitemap: https://myracl.in/sitemap.xml

# Request rate
Request-rate: 1/1s
Visit-time: 0000-0600
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=604800, s-maxage=604800',
    },
  })
}
