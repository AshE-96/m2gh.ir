'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types'

interface RelatedArticlesProps {
  articles: Article[]
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    'product-management': 'مدیریت محصول',
    'data-analysis': 'تحلیل داده',
    'design': 'طراحی',
  }
  return labels[category] || category
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <section className="related-section">
      <div className="related-bg"></div>
      <div className="related-container">
        <div className="related-header">
          <h2 className="related-title">مقالات مرتبط</h2>
          <p className="related-subtitle">
            {articles.length > 0 
              ? `${articles.length} مقاله مرتبط که ممکن است برایتان جالب باشد`
              : 'مطالب بیشتری که ممکن است برایتان جالب باشد'
            }
          </p>
        </div>

        <div className="related-grid">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="related-card"
            >
              {article.featured_image ? (
                <Image
                  src={article.featured_image}
                  alt={article.title_fa}
                  width={400}
                  height={200}
                  className="related-image"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="related-image" />
              )}

              <div className="related-content">
                <div className="related-category">
                  <span className="category-dot"></span>
                  <span>{getCategoryLabel(article.category)}</span>
                </div>

                <h3 className="related-card-title">{article.title_fa}</h3>

                <p className="related-excerpt">{article.excerpt_fa}</p>

                <div className="related-footer">
                  <div className="related-author">
                    <div className="author-avatar"></div>
                    <span className="author-name">{article.author}</span>
                  </div>
                  <div className="read-time">
                    <svg className="read-time-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <span>{article.reading_time || 5} دقیقه</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

