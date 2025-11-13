import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <article
      className="p-4 border border-accent/20 rounded-md cursor-pointer transition-colors duration-200 hover:bg-secondary/50"
      onClick={onClick}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-text">
            {project.name_fa}
          </h3>
          <span className="text-xs text-text-secondary">
            {new Date(project.created_date).getFullYear()}
          </span>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">
          {project.description_fa}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 border border-accent/30 rounded text-[11px] text-text"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 border border-accent/30 rounded text-[11px] text-text">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="text-xs text-text-secondary">
          {project.status_fa}
        </div>

        <div className="flex gap-4">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-accent text-sm hover:underline"
            >
              کد
            </a>
          )}
          {project.demo_link && (
            <a
              href={project.demo_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-accent text-sm hover:underline"
            >
              دمو
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
