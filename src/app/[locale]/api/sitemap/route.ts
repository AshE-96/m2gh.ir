import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Project, Article } from '@/types'

export async function GET() {
  try {
    const baseUrl = 'https://m2gh.ir'

    // Static pages
    const staticPages = [
      '',
      '/about',
      '/projects',
      '/blog',
      '/contact'
    ]

    // Load dynamic pages
    let projects: Project[] = []
    let articles: Article[] = []

    try {
      const projectsData = fs.readFileSync(path.join(process.cwd(), 'src/data/projects.json'), 'utf8')
      projects = JSON.parse(projectsData)
    } catch (error) {
      console.error('Error loading projects for sitemap:', error)
    }

    try {
      const articlesData = fs.readFileSync(path.join(process.cwd(), 'src/data/articles.json'), 'utf8')
      articles = JSON.parse(articlesData).filter((article: Article) => article.status === 'published')
    } catch (error) {
      console.error('Error loading articles for sitemap:', error)
    }

    // Create sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}

  ${projects.map(project => `
  <url>
    <loc>${baseUrl}/projects#${project.id}</loc>
    <lastmod>${project.created_date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}

  ${articles.map(article => `
  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${article.updated_date || article.published_date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
