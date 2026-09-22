import { useEffect, useId, useRef } from 'react'
import ProjectImage from './ProjectImage'

export default function ProjectLightbox({ project, onClose }) {
  const dialogRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true })
      }
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        const outside = event.clientX < bounds.left || event.clientX > bounds.right
          || event.clientY < bounds.top || event.clientY > bounds.bottom
        if (outside) onClose()
      }}
    >
      <div className="project-dialog-panel">
        <header
          className="sticky top-0 z-20 flex min-w-0 items-start justify-between gap-4 border-b px-5 py-4 sm:px-6"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div className="min-w-0">
            <p className="mb-1.5 type-caption type-label" style={{ color: 'var(--color-primary)' }}>
              {project.tag}
            </p>
            <h2 id={titleId} className="type-title" style={{ color: 'var(--color-text)' }}>
              {project.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition-colors"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text-muted)',
            }}
            aria-label="프로젝트 상세 닫기"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <figure>
          <div
            className="relative aspect-video overflow-hidden"
            style={{ backgroundColor: 'var(--color-surface-offset)' }}
          >
            <ProjectImage project={project} className="object-contain" />
            {project.metric && (
              <div
                className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-md px-2.5 py-0.5 type-caption type-mono"
                style={{ backgroundColor: 'var(--color-primary-hl)', color: 'var(--color-primary)' }}
              >
                {project.metric}
              </div>
            )}
          </div>
          {project.imageCaption && (
            <figcaption className="px-5 pt-3 type-caption sm:px-6" style={{ color: 'var(--color-text-muted)' }}>
              {project.imageCaption}
            </figcaption>
          )}
        </figure>

        <div className="min-w-0 p-5 sm:p-6">
          <p id={descriptionId} className="whitespace-pre-line type-body" style={{ color: 'var(--color-text-muted)' }}>
            {project.desc}
          </p>
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
          <p className="mt-5 type-caption" style={{ color: 'var(--color-text-muted)' }}>
            ESC 또는 바깥 영역 클릭으로 닫기
          </p>
        </div>
      </div>
    </dialog>
  )
}
