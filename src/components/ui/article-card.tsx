import { Article } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'product-management': 'مدیریت محصول',
      'data-analysis': 'تحلیل داده',
      'design': 'طراحی',
    }
    return labels[category] || category
  }

  return (
    <Link 
      href={`/blog/${article.slug}`}
      className={`group block h-full ${featured ? 'md:col-span-2' : ''}`}
    >
      <article className="article-card-modern relative h-full flex flex-col bg-bg-card border border-border rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(6,214,160,0.15)] hover:border-accent">
        {/* Top Gradient Border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Image Container */}
        {article.featured_image ? (
          <div className="article-image-wrapper relative w-full overflow-hidden bg-gradient-to-br from-bg-secondary to-bg-card">
            <div className="relative w-full h-48 md:h-64 lg:h-72">
              <Image
                src={article.featured_image}
                alt={article.title_fa}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              
              {/* Category Badge */}
              {article.category && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full text-xs font-bold text-accent">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    {getCategoryLabel(article.category)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative w-full h-48 md:h-64 lg:h-72 bg-gradient-to-br from-bg-secondary via-bg-card to-bg-secondary flex items-center justify-center">
            <div className="text-6xl opacity-20">📝</div>
            {article.category && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full text-xs font-bold text-accent">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {getCategoryLabel(article.category)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="article-content flex-1 flex flex-col p-6 md:p-7">
          {/* Meta Info */}
          <div className="article-meta flex flex-wrap items-center gap-3 mb-4 text-xs text-text-muted">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(article.published_date)}</span>
            </div>
            <div className="w-1 h-1 bg-text-muted rounded-full" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.reading_time || 5} دقیقه</span>
            </div>
            <div className="w-1 h-1 bg-text-muted rounded-full" />
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span className="truncate max-w-[100px]">{article.author}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="article-title text-xl md:text-2xl font-extrabold text-text mb-3 leading-tight line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {article.title_fa}
          </h3>

          {/* Excerpt */}
          <p className="article-excerpt text-text-secondary text-sm md:text-base leading-relaxed mb-4 flex-1 line-clamp-3">
            {article.excerpt_fa}
          </p>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags flex flex-wrap gap-2 mb-4">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="article-tag px-2.5 py-1 bg-bg-secondary border border-border rounded-lg text-xs text-text-secondary hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all duration-200"
                >
                  #{tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="px-2.5 py-1 text-xs text-text-muted">
                  +{article.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer with Read More */}
          <div className="article-footer flex items-center justify-between pt-4 border-t border-border mt-auto">
            <div className="read-more flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all duration-300">
              <span>ادامه مطلب</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
            </div>
            {featured && (
              <span className="featured-badge px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold">
                ⭐ ویژه
              </span>
            )}
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 blur-xl" />
        </div>
      </article>
    </Link>
  )
}
