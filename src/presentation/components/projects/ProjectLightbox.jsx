// src/presentation/components/projects/ProjectLightbox.jsx
import { useEffect, useCallback } from 'react'

export default function ProjectLightbox({ project, onClose }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'var(--color-modal-overlay)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-2xl max-h-[90vh] flex-col rounded-xl overflow-hidden"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-modal)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-md border transition-colors"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text-muted)',
          }}
          aria-label="닫기"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div
          className="relative aspect-video overflow-hidden flex-shrink-0"
          style={{ backgroundColor: 'var(--color-surface-offset)' }}
        >
          {project.image ? (
            <img
              src={`/images/${project.image}`}
              alt={project.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                const ph = document.createElement('div')
                ph.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;'
                ph.innerHTML = `
                  <svg width="44" height="44" fill="none" stroke="currentColor" style="opacity:0.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="type-caption type-mono" style="color:var(--color-text-muted)">${project.image}</span>
                `
                e.target.parentNode.appendChild(ph)
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-12 h-12"
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
              className="absolute top-3 left-3 rounded-md px-2.5 py-0.5 type-caption type-mono"
              style={{
                backgroundColor: 'var(--color-primary-hl)',
                color: 'var(--color-primary)',
              }}
            >
              {project.metric}
            </div>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-6">
          <p
            className="mb-1.5 type-caption type-label"
            style={{ color: 'var(--color-primary)' }}
          >
            {project.tag}
          </p>
          <h3
            className="mb-3 type-title"
            style={{ color: 'var(--color-text)' }}
          >
            {project.name}
          </h3>

          <div
            className="min-h-0 flex-1 overflow-y-auto"
            style={{ maxHeight: 'clamp(6rem, 20vh, 14rem)', scrollbarWidth: 'thin' }}
          >
            <p
              className="whitespace-pre-line type-body"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {project.desc}
            </p>
          </div>

          {(project.github || project.demo) && (
            <div className="mt-5 flex flex-wrap shrink-0 gap-4 border-t pt-5" style={{ borderColor: 'var(--color-divider)' }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 type-control transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 type-control transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {project.demo.includes('pypi') ? 'PyPI' : project.demo.includes('pub.dev') ? 'pub.dev' : 'Demo'}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="absolute bottom-3 select-none type-caption" style={{ color: 'var(--color-overlay-text)' }}>
        ESC 또는 바깥 영역 클릭으로 닫기
      </p>
    </div>
  )
}
