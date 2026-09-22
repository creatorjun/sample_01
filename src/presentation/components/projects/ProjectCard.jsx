// src/presentation/components/projects/ProjectCard.jsx
export default function ProjectCard({ project, onCardClick }) {
  return (
    <div
      className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border transition-all duration-200 hover:shadow-md"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
      onClick={() => onCardClick(project)}
    >
      <div
        className="relative aspect-video overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-offset)' }}
      >
        {project.image ? (
          <img
            src={`/images/${project.image}`}
            alt={project.name}
            className="h-full w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            onError={(e) => {
              e.target.style.display = 'none'
              const ph = document.createElement('div')
              ph.className = 'absolute inset-0 flex flex-col items-center justify-center gap-2'
              ph.innerHTML = `
                <svg width="36" height="36" fill="none" stroke="currentColor" style="opacity:0.2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="type-caption type-mono" style="color:var(--color-text-muted)">${project.image}</span>
              `
              e.target.parentNode.appendChild(ph)
            }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <svg
              className="w-9 h-9"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: 'var(--color-text-faint)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {project.metric && (
          <div
            className="absolute top-2.5 left-2.5 rounded-md px-2 py-0.5 type-caption type-mono"
            style={{
              backgroundColor: 'var(--color-primary-hl)',
              color: 'var(--color-primary)',
            }}
          >
            {project.metric}
          </div>
        )}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ backgroundColor: 'var(--color-card-overlay)' }}
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

      <div className="px-4 py-3">
        <p
          className="mb-1 type-caption type-label"
          style={{ color: 'var(--color-primary)' }}
        >
          {project.tag}
        </p>
        <h3
          className="type-title"
          style={{ color: 'var(--color-text)' }}
        >
          {project.name}
        </h3>
      </div>
    </div>
  )
}
