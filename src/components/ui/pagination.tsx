'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  showFirstLast?: boolean
  maxVisiblePages?: number
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showFirstLast = true,
  maxVisiblePages = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      // Calculate start and end of visible range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)
      
      // Adjust if we're near the start
      if (currentPage <= 3) {
        start = 2
        end = Math.min(4, totalPages - 1)
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3)
        end = totalPages - 1
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('ellipsis-start')
      }
      
      // Add visible pages in range
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('ellipsis-end')
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const visiblePages = getVisiblePages()

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handleFirst = () => {
    onPageChange(1)
  }

  const handleLast = () => {
    onPageChange(totalPages)
  }

  return (
    <nav
      className={cn(
        'pagination-container flex items-center justify-center gap-2 flex-wrap',
        className
      )}
      aria-label="صفحه‌بندی مقالات"
    >
      {/* First Page Button */}
      {showFirstLast && currentPage > 2 && (
        <button
          onClick={handleFirst}
          disabled={currentPage === 1}
          className="pagination-btn pagination-btn-nav"
          aria-label="صفحه اول"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      )}

      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-btn pagination-btn-nav"
        aria-label="صفحه قبلی"
      >
        <ChevronRight className="w-4 h-4" />
        <span className="hidden sm:inline">قبلی</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-text-secondary select-none"
              >
                ...
              </span>
            )
          }

          const pageNumber = page as number
          const isActive = pageNumber === currentPage

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={cn(
                'pagination-btn pagination-btn-number',
                isActive && 'pagination-btn-active'
              )}
              aria-label={`صفحه ${pageNumber}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-btn pagination-btn-nav"
        aria-label="صفحه بعدی"
      >
        <span className="hidden sm:inline">بعدی</span>
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Last Page Button */}
      {showFirstLast && currentPage < totalPages - 1 && (
        <button
          onClick={handleLast}
          disabled={currentPage === totalPages}
          className="pagination-btn pagination-btn-nav"
          aria-label="صفحه آخر"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
      )}

      {/* Page Info */}
      <div className="hidden md:flex items-center gap-2 mr-4 text-sm text-text-secondary">
        <span>
          صفحه {currentPage} از {totalPages}
        </span>
      </div>
    </nav>
  )
}

