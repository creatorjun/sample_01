import { useId } from 'react'
import ProjectImage from './ProjectImage'

export default function ProjectCard({ project, onCardClick }) {
  const titleId = useId()
  const actionId = useId()

  return (
    <article
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-lg border transition-all duration-200 hover:shadow-md focus-within:shadow-md"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div
        className="relative aspect-video overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-offset)' }}
      >
        <ProjectImage
          project={project}
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-within:scale-105"
        />
        {project.metric && (
          <div
            className="absolute left-2.5 top-2.5 max-w-[calc(100%-1.25rem)] rounded-md px-2 py-0.5 type-caption type-mono"
            style={{
              backgroundColor: 'var(--color-primary-hl)',
              color: 'var(--color-primary)',
            }}
          >
            {project.metric}
          </div>
        )}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{ backgroundColor: 'var(--color-card-overlay)' }}
          aria-hidden="true"
        >
          <div
            className="rounded-full p-2"
            style={{ backgroundColor: 'var(--color-glass)', backdropFilter: 'blur(4px)' }}
          >
            <svg className="h-4 w-4 text-on-overlay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="min-w-0 px-4 py-3">
        <p className="mb-1 type-caption type-label" style={{ color: 'var(--color-primary)' }}>
          {project.tag}
        </p>
        <h3 id={titleId} className="type-title" style={{ color: 'var(--color-text)' }}>
          {project.name}
        </h3>
        {project.imageCaption && (
          <p className="mt-2 type-caption" style={{ color: 'var(--color-text-muted)' }}>
            {project.imageCaption}
          </p>
        )}
      </div>

      <button
        type="button"
        className="absolute inset-0 z-10 cursor-pointer rounded-lg focus-visible:outline-offset-[-3px]"
        aria-labelledby={`${titleId} ${actionId}`}
        aria-haspopup="dialog"
        onClick={() => onCardClick(project)}
      >
        <span id={actionId} className="sr-only">프로젝트 자세히 보기</span>
      </button>
    </article>
  )
}
