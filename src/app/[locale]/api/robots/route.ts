import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Block admin and API routes
Disallow: /admin
Disallow: /api/

# Allow important pages
Allow: /about
Allow: /projects
Allow: /blog
Allow: /contact

# Sitemap
Sitemap: https://m2gh.ir/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
