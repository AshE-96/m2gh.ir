'use client'

import { useState, useEffect, useMemo } from 'react'
import { Article } from '@/types'
import ArticleCard from '@/components/ui/article-card'
import Pagination from '@/components/ui/pagination'

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6

  useEffect(() => {
    // Load articles from JSON file
    fetch('/data/articles.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data)
          setFilteredArticles(data)
        } else {
          console.error('Invalid data format:', data)
          setArticles([])
          setFilteredArticles([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading articles:', err)
        setArticles([])
        setFilteredArticles([])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredArticles(articles)
    } else {
      const filtered = articles.filter(article =>
        article.category === selectedCategory
      )
      setFilteredArticles(filtered)
    }
    setCurrentPage(1) // Reset to first page when category changes
  }, [selectedCategory, articles])

  const categories = [
    { key: 'all', label: 'همه مقالات', count: articles.length },
    { key: 'product-management', label: 'مدیریت محصول', count: articles.filter(a => a.category === 'product-management').length },
    { key: 'data-analysis', label: 'تحلیل داده', count: articles.filter(a => a.category === 'data-analysis').length },
    { key: 'design', label: 'طراحی', count: articles.filter(a => a.category === 'design').length },
  ]

  const featuredArticles = useMemo(() => {
    if (selectedCategory === 'all') {
      return articles.filter(article => article.featured_image).slice(0, 2)
    }
    return []
  }, [articles, selectedCategory])

  // Pagination logic
  // Adjust articles count if featured articles are shown on first page
  const articlesForPagination = useMemo(() => {
    if (currentPage === 1 && selectedCategory === 'all' && featuredArticles.length > 0) {
      // Exclude featured articles from pagination count
      const articlesWithoutFeatured = filteredArticles.filter(
        article => !featuredArticles.some(fa => fa.id === article.id)
      )
      return articlesWithoutFeatured
    }
    return filteredArticles
  }, [filteredArticles, featuredArticles, currentPage, selectedCategory])

  const totalPages = Math.ceil(articlesForPagination.length / articlesPerPage)
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage
    const endIndex = startIndex + articlesPerPage
    return articlesForPagination.slice(startIndex, endIndex)
  }, [articlesForPagination, currentPage])

  const regularArticles = useMemo(() => {
    // If we're showing featured articles on first page, exclude them from regular articles
    if (currentPage === 1 && featuredArticles.length > 0 && selectedCategory === 'all') {
      return paginatedArticles.filter(article => !featuredArticles.some(fa => fa.id === article.id))
    }
    return paginatedArticles
  }, [paginatedArticles, featuredArticles, currentPage, selectedCategory])
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-accent text-xl">در حال بارگذاری...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="hero-section text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            بلاگ
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            افکار و بینش‌ها در زمینه فناوری، محصول و داده
          </p>
        </section>

        {/* Stats Section - Moved to top center */}
        <section className="stats-section mb-12">
          <div className="container-custom p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="stat">
                <div className="text-3xl font-bold text-accent mb-2">
                  {articles.length}
                </div>
                <div className="text-text-secondary">مقاله منتشر شده</div>
              </div>
              <div className="stat">
                <div className="text-3xl font-bold text-accent mb-2">
                  {articles.length > 0
                    ? new Set(articles.flatMap(a => a.tags || [])).size
                    : 0}
                </div>
                <div className="text-text-secondary">برچسب منحصر به فرد</div>
              </div>
              <div className="stat">
                <div className="text-3xl font-bold text-accent mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-text-secondary">دسته‌بندی</div>
              </div>
              <div className="stat">
                <div className="text-3xl font-bold text-accent mb-2">
                  {articles.length > 0
                    ? Math.round(articles.reduce((acc, a) => acc + (a.reading_time || 5), 0) / articles.length)
                    : 0}
                </div>
                <div className="text-text-secondary">میانگین زمان مطالعه</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <div className="filter-tabs flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`button relative overflow-hidden ${
                selectedCategory === category.key
                  ? 'bg-accent text-bg border-accent'
                  : ''
              }`}
            >
              {category.label}
              {category.count > 0 && (
                <span className="mr-2 text-sm opacity-70">
                  ({category.count})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && selectedCategory === 'all' && (
          <section className="featured-articles mb-16">
            <h2 className="text-2xl font-bold text-text mb-8 text-center">
              مقالات ویژه
            </h2>
            <div className="articles-grid grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  featured={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Regular Articles */}
        <section className="regular-articles">
          <div className="articles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
              />
            ))}
          </div>

          {regularArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-text mb-2">
                مقاله‌ای یافت نشد
              </h3>
              <p className="text-text-secondary">
                در این دسته مقاله‌ای وجود ندارد.
              </p>
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="pagination-section mt-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showFirstLast={true}
              maxVisiblePages={5}
            />
          </section>
        )}
      </div>
    </div>
  )
}
