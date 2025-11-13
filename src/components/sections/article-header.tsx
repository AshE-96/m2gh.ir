'use client'

interface ArticleHeaderProps {
  title: string
  excerpt: string
  category: string
  author: string
  publishedDate: string
  readingTime: number
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    'product-management': 'مدیریت محصول',
    'data-analysis': 'تحلیل داده',
    'design': 'طراحی',
  }
  return labels[category] || category
}

export default function ArticleHeader({
  title,
  excerpt,
  category,
  author,
  publishedDate,
  readingTime
}: ArticleHeaderProps) {
  return (
    <header className="article-header relative min-h-screen flex items-center justify-center overflow-hidden bg-bg">
      <div className="header-content relative z-10 max-w-[780px] mx-auto px-8 text-center">
        {/* Badge */}
        <span className="article-badge inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8">
          <span className="w-1.5 h-1.5 bg-bg rounded-full" />
          {getCategoryLabel(category)}
        </span>

        {/* Title */}
        <h1 className="article-title text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.1] mb-8 text-text">
          {title}
        </h1>

        {/* Excerpt */}
        <p className="article-excerpt text-xl text-text-secondary mb-6">
          {excerpt}
        </p>

        {/* Meta Items - Separate, not in a box */}
        <div className="article-meta-items flex flex-wrap justify-center items-center gap-6 mb-12">
          <div className="meta-item flex items-center gap-2">
            <svg className="meta-icon-small w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span className="meta-label-small text-xs text-text-muted uppercase tracking-wider">نویسنده</span>
            <span className="meta-value-small text-sm font-semibold text-text">{author}</span>
          </div>

          <div className="meta-item flex items-center gap-2">
            <svg className="meta-icon-small w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            <span className="meta-label-small text-xs text-text-muted uppercase tracking-wider">تاریخ انتشار</span>
            <span className="meta-value-small text-sm font-semibold text-text">{publishedDate}</span>
          </div>

          <div className="meta-item flex items-center gap-2">
            <svg className="meta-icon-small w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span className="meta-label-small text-xs text-text-muted uppercase tracking-wider">زمان مطالعه</span>
            <span className="meta-value-small text-sm font-semibold text-text">{readingTime} دقیقه</span>
          </div>
        </div>

      </div>
    </header>
  )
}

