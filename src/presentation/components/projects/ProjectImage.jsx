import { useState } from 'react'

export default function ProjectImage({ project, className = '' }) {
  const [failedImage, setFailedImage] = useState(null)
  const imageAvailable = project.image && failedImage !== project.image

  if (!imageAvailable) {
    return (
      <span
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="type-caption">
          {project.image ? '이미지를 불러올 수 없습니다.' : '준비된 이미지가 없습니다.'}
        </span>
      </span>
    )
  }

  return (
    <img
      src={`/images/${project.image}`}
      alt={project.imageAlt || project.name}
      loading="lazy"
      decoding="async"
      className={`h-full w-full ${className}`}
      onError={() => setFailedImage(project.image)}
    />
  )
}
