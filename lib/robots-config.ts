/**
 * robots.txt configuration generator
 * For different AI crawlers and search engines
 */

export const robotsConfig = {
  // Standard crawlers (allow)
  standardBots: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'Yandexbot'],

  // AI Model crawlers (currently allowed)
  aiBots: ['GPTBot', 'CCBot', 'anthropic-ai', 'Claude-Web', 'APIBot'],

  // Disallowed paths (API, admin, etc)
  disallowed: ['/api/', '/*.json$', '/admin/', '/.well-known/'],

  // Allowed paths
  allowed: ['/public/'],

  // Request rates (conservative)
  crawlDelay: {
    default: 1,
    googleBot: 0,
    bingBot: 1,
  },
}

/**
 * Generate robots.txt content programmatically
 */
export function generateRobotsTxt(config = robotsConfig): string {
  let content = '# SEO & Indexing Rules\n'
  content += 'User-agent: *\n'
  content += 'Allow: /\n'
  content += `Disallow: ${config.disallowed.join('\n')}\n`
  content += config.allowed.map((path) => `Allow: ${path}\n`).join('')
  content += '\n'

  // Search engine specific rules
  content += '# Search Engines\n'
  content += 'User-agent: Googlebot\n'
  content += 'Allow: /\n'
  content += `Crawl-delay: ${config.crawlDelay.googleBot}\n\n`

  content += 'User-agent: Bingbot\n'
  content += 'Allow: /\n'
  content += `Crawl-delay: ${config.crawlDelay.bingBot}\n\n`

  // Other search engines
  content += 'User-agent: Slurp\nAllow: /\n\n'
  content += 'User-agent: DuckDuckBot\nAllow: /\n\n'
  content += 'User-agent: Baiduspider\nAllow: /\n\n'
  content += 'User-agent: Yandexbot\nAllow: /\n\n'

  // AI crawlers
  content += '# AI Model Crawlers\n'
  config.aiBots.forEach((bot) => {
    content += `User-agent: ${bot}\n`
    content += 'Allow: /\n\n'
  })

  // Sitemaps
  content += '# Sitemap\n'
  content += 'Sitemap: https://myracl.in/sitemap.xml\n'

  return content
}

/**
 * To BLOCK a specific AI crawler, update robots.txt:
 * @example
 * User-agent: GPTBot
 * Disallow: /
 *
 * User-agent: anthropic-ai
 * Disallow: /
 */

export function blockAiBot(botName: string, currentRobotsTxt: string): string {
  return currentRobotsTxt.replace(
    `User-agent: ${botName}\nAllow: /`,
    `User-agent: ${botName}\nDisallow: /`
  )
}
