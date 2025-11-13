import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleHeader from '@/components/sections/article-header'
import TableOfContents from '@/components/sections/table-of-contents'
import ArticleContent from '@/components/sections/article-content'
import RelatedArticles from '@/components/sections/related-articles'
import CommentsSection from '@/components/sections/comments-section'
import JsonLd from '@/components/ui/json-ld'
import { Article, Comment } from '@/types'

import fs from 'fs'
import path from 'path'

// Enable static generation for better performance
export const dynamic = 'force-dynamic' // Changed to dynamic for real-time comments
export const revalidate = 60 // Revalidate every minute for comments

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'articles.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const articles: Article[] = JSON.parse(fileContents)
    return articles.find((article) => article.slug === slug) || null
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

async function getRelatedArticles(
  category: string,
  currentSlug: string
): Promise<Article[]> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'articles.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const articles: Article[] = JSON.parse(fileContents)
    return articles
      .filter((article) => article.category === category && article.slug !== currentSlug)
      .slice(0, 3)
  } catch (error) {
    console.error('Error fetching related articles:', error)
    return []
  }
}

async function getComments(articleId: string): Promise<Comment[]> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'comments.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const commentsData = JSON.parse(fileContents)
    
    // Map the JSON structure to Comment type
    const comments: Comment[] = commentsData
      .filter((item: any) => 
        (item.article_id === articleId || item.article_id === 'default') && 
        (item.status === 'approved' || item.approved === true)
      )
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        message: item.comment || item.message,
        date: item.date,
        approved: item.status === 'approved' || item.approved === true,
        article_id: item.article_id
      }))
    
    return comments
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'مقاله یافت نشد',
      description: 'مقاله مورد نظر یافت نشد'
    }
  }

  return {
    title: article.seo_title || article.title_fa,
    description: article.seo_description || article.excerpt_fa,
    keywords: article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title_fa,
      description: article.excerpt_fa,
      url: `https://m2gh.ir/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.published_date,
      authors: [article.author],
      images: article.featured_image
        ? [
            {
              url: article.featured_image,
              width: 1200,
              height: 630,
              alt: article.title_fa
            }
          ]
        : []
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title_fa,
      description: article.excerpt_fa,
      images: article.featured_image ? [article.featured_image] : []
    },
    alternates: {
      canonical: `https://m2gh.ir/blog/${article.slug}`
    }
  }
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article.category, article.slug)
  const comments = await getComments(article.id)

  // Extract TOC items from content
  const tocItems = [
    { id: 'section-1', title: 'مقدمه', level: 2 },
    { id: 'section-2', title: 'اهمیت تحلیل رفتار', level: 2 },
    { id: 'section-3', title: 'روش‌های تحلیل', level: 2 },
    { id: 'section-4', title: 'ابزارهای کاربردی', level: 2 },
    { id: 'section-5', title: 'پیاده‌سازی عملی', level: 2 },
    { id: 'section-6', title: 'نتیجه‌گیری', level: 2 }
  ]

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title_fa,
    description: article.excerpt_fa,
    author: {
      '@type': 'Person',
      name: article.author
    },
    datePublished: article.published_date,
    dateModified: article.updated_date || article.published_date,
    image: article.featured_image,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://m2gh.ir/blog/${article.slug}`
    }
  }

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <ArticleHeader
        title={article.title_fa}
        excerpt={article.excerpt_fa}
        category={article.category}
        author={article.author}
        publishedDate={formatDate(article.published_date)}
        readingTime={article.reading_time || 8}
      />

      <main className="article-layout max-w-[1400px] mx-auto py-8 md:py-16 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_780px_300px] gap-6 md:gap-12 relative z-10 bg-bg">
        <div className="hidden lg:block"></div>
        <article className="article-content w-full max-w-full overflow-x-hidden">
          {/* Article Content */}
          <ArticleContent />
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={tocItems} />
          </div>
        </aside>
      </main>

      <RelatedArticles articles={relatedArticles} />

      <CommentsSection articleId={article.id} initialComments={comments} />

      <JsonLd data={articleSchema} />
    </>
  )
}

