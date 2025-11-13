'use client'

import { useState, useEffect } from 'react'
import { Project } from '@/types'
import ProjectCard from '@/components/ui/project-card'
import Pagination from '@/components/ui/pagination'

type FilterType = 'all' | 'product' | 'data' | 'ai' | 'development' | 'design'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Load projects via API
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setFilteredProjects(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading projects:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter(project =>
        project.category.includes(activeFilter)
      )
      setFilteredProjects(filtered)
    }
    setCurrentPage(1)
  }, [activeFilter, projects])

  const filters = [
    { key: 'all' as FilterType, label: 'همه', count: projects.length },
    { key: 'product' as FilterType, label: 'محصول', count: projects.filter(p => p.category.includes('product')).length },
    { key: 'data' as FilterType, label: 'داده', count: projects.filter(p => p.category.includes('data')).length },
    { key: 'ai' as FilterType, label: 'هوش مصنوعی', count: projects.filter(p => p.category.includes('ai')).length },
    { key: 'development' as FilterType, label: 'توسعه', count: projects.filter(p => p.category.includes('development')).length },
    { key: 'design' as FilterType, label: 'طراحی', count: projects.filter(p => p.category.includes('design')).length },
  ]

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
        setSelectedProject(null)
      }
    }
    if (isModalOpen) {
      window.addEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

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
            پروژه‌ها
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            نمایشگاهی از پروژه‌های موفق و تجربیات کاری
          </p>
        </section>

        {/* Filter Tabs */}
        <div className="filter-tabs flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                activeFilter === filter.key
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:border-accent/40'
              }`}
            >
              {filter.label}
              <span className="ml-2 text-sm opacity-70">
                ({filter.count})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => {
                  setSelectedProject(project)
                  setIsModalOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-text mb-2">
              پروژه‌ای یافت نشد
            </h3>
            <p className="text-text-secondary">
              در این دسته پروژه‌ای وجود ندارد.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Project Modal */}
        {isModalOpen && selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            onClick={() => {
              setIsModalOpen(false)
              setSelectedProject(null)
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div
              className="relative z-10 w-[92vw] max-w-xl rounded-md border border-accent/20 bg-secondary/80 backdrop-blur p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-text">
                  {selectedProject.name_fa}
                </h3>
                <button
                  className="text-text-secondary text-sm"
                  onClick={() => {
                    setIsModalOpen(false)
                    setSelectedProject(null)
                  }}
                  aria-label="بستن"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                {selectedProject.description_fa}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <div className="space-y-1">
                  <div className="text-text-secondary">وضعیت</div>
                  <div className="text-text">{selectedProject.status_fa}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-text-secondary">سال</div>
                  <div className="text-text">
                    {new Date(selectedProject.created_date).getFullYear()}
                  </div>
                </div>
                <div className="space-y-1 col-span-2">
                  <div className="text-text-secondary">دسته‌ها</div>
                  <div className="text-text">{selectedProject.category.join('، ')}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 border border-accent/30 rounded text-[11px] text-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {selectedProject.github_link && (
                  <a
                    href={selectedProject.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-sm hover:underline"
                  >
                    کد
                  </a>
                )}
                {selectedProject.demo_link && (
                  <a
                    href={selectedProject.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-sm hover:underline"
                  >
                    دمو
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <section className="stats-section mt-16">
          <div className="container-custom p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="stat">
                <div className="text-xl font-semibold text-text mb-1">
                  {projects.filter(p => p.status === 'done').length}
                </div>
                <div className="text-xs text-text-secondary">پروژه تکمیل شده</div>
              </div>
              <div className="stat">
                <div className="text-xl font-semibold text-text mb-1">
                  {projects.filter(p => p.status === 'active').length}
                </div>
                <div className="text-xs text-text-secondary">پروژه فعال</div>
              </div>
              <div className="stat">
                <div className="text-xl font-semibold text-text mb-1">
                  {projects.filter(p => p.status === 'planning').length}
                </div>
                <div className="text-xs text-text-secondary">در حال برنامه‌ریزی</div>
              </div>
              <div className="stat">
                <div className="text-xl font-semibold text-text mb-1">
                  {new Set(projects.flatMap(p => p.technologies)).size}
                </div>
                <div className="text-xs text-text-secondary">تکنولوژی استفاده شده</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
