'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateTOC = () => {
      const sections = document.querySelectorAll('section[id^="section"]')
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Update progress
      const scrollPercentage = Math.round(
        (scrollPosition / (documentHeight - windowHeight)) * 100
      )
      setScrollProgress(scrollPercentage)

      // Update active section
      let currentSection = ''
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
        if (scrollPosition >= sectionTop) {
          currentSection = section.getAttribute('id') || ''
        }
      })
      setActiveSection(currentSection)

      // Show/hide TOC
      setIsVisible(scrollPosition > windowHeight)
    }

    window.addEventListener('scroll', updateTOC)
    updateTOC()

    return () => window.removeEventListener('scroll', updateTOC)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const targetSection = document.getElementById(id)
    if (targetSection) {
      const mobileTOC = document.querySelector('.toc-mobile')
      const isMobileTOCVisible =
        mobileTOC && window.getComputedStyle(mobileTOC).display !== 'none'
      const offset = isMobileTOCVisible
        ? (mobileTOC as HTMLElement).offsetHeight + 16
        : 80
      window.scrollTo({
        top: targetSection.offsetTop - offset,
        behavior: 'smooth'
      })
    }
  }

  const circumference = 2 * Math.PI * 18
  const offset = circumference - (scrollProgress / 100) * circumference

  return (
    <>
      {/* Sidebar TOC (Desktop) */}
      <div className="toc-sidebar">
        <div className="toc-container">
          <div className="toc-header">
            <h3 className="toc-title">فهرست مطالب</h3>
            <div className="toc-progress">
              <svg className="progress-circle" width="40" height="40">
                <circle
                  className="progress-bg"
                  cx="20"
                  cy="20"
                  r="18"
                />
                <circle
                  className="progress-fill"
                  id="progressCircle"
                  cx="20"
                  cy="20"
                  r="18"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <span className="progress-text" id="progressText">
                {scrollProgress}%
              </span>
            </div>
          </div>
          <ul className="toc-list">
            {items.map((item, index) => (
              <li key={item.id} className="toc-item">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`toc-link ${activeSection === item.id ? 'active' : ''}`}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  <span className="toc-number">{index + 1}</span>
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile TOC (Sticky) */}
      <nav
        className="toc-mobile"
        aria-label="فهرست مطالب"
      >
        <ul className="toc-list toc-list-mobile">
          <li className="toc-item" aria-hidden="true">
            <div className="toc-progress" style={{ marginInlineEnd: 8 }}>
              <svg className="progress-circle" width="32" height="32">
                <circle className="progress-bg" cx="16" cy="16" r="14" />
                <circle
                  className="progress-fill"
                  cx="16"
                  cy="16"
                  r="14"
                  strokeDasharray={2 * Math.PI * 14}
                  strokeDashoffset={(2 * Math.PI * 14) - (scrollProgress / 100) * (2 * Math.PI * 14)}
                />
              </svg>
            </div>
          </li>
          {items.map((item) => (
            <li key={item.id} className="toc-item">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`toc-link ${activeSection === item.id ? 'active' : ''}`}
                aria-current={activeSection === item.id ? 'true' : undefined}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

