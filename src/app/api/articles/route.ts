import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Article } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')

    const articlesFilePath = path.join(process.cwd(), 'src/data/articles.json')

    let articles: Article[] = []
    try {
      const articlesData = fs.readFileSync(articlesFilePath, 'utf8')
      articles = JSON.parse(articlesData)
    } catch (error) {
      articles = []
    }

    // Filter articles based on query parameters
    let filteredArticles = articles.filter(article => article.status === 'published')

    if (category && category !== 'all') {
      filteredArticles = filteredArticles.filter(article =>
        article.category === category
      )
    }

    // Sort by published date (newest first)
    filteredArticles.sort((a, b) =>
      new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
    )

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit)
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredArticles = filteredArticles.slice(0, limitNum)
      }
    }

    return NextResponse.json(filteredArticles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
