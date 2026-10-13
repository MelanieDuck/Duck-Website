import React, { useCallback, useEffect } from 'react'
import type { GalleryItem } from '@/types'

interface LightboxProps {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

const Lightbox: React.FC<LightboxProps> = ({ items, index, onClose, onNavigate }) => {
  const next = useCallback(() => {
    onNavigate((index + 1) % items.length)
  }, [index, items.length, onNavigate])

  const prev = useCallback(() => {
    onNavigate((index - 1 + items.length) % items.length)
  }, [index, items.length, onNavigate])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, next, prev])

  const current = items[index]

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white text-3xl w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full border-none cursor-pointer transition-colors duration-200"
        aria-label="Close"
      >
        ×
      </button>

      {/* Previous arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 text-white text-4xl w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full border-none cursor-pointer transition-colors duration-200 leading-none"
        aria-label="Previous image"
      >
        ‹
      </button>

      {/* Image */}
      <div
        className="flex flex-col items-center justify-center max-w-[92vw] max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center max-w-[92vw] max-h-[82vh]">
          {current.imageUrl ? (
            <img
              src={current.imageUrl}
              alt={current.alt}
              className="max-w-full max-h-[82vh] object-contain rounded"
            />
          ) : (
            <span className="text-[80px] md:text-[120px]">{current.emoji}</span>
          )}
        </div>
        {current.alt && (
          <p className="text-white/70 text-sm mt-4 text-center px-4">{current.alt}</p>
        )}
        <p className="text-white/40 text-xs mt-2">
          {index + 1} / {items.length}
        </p>
      </div>

      {/* Next arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 text-white text-4xl w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full border-none cursor-pointer transition-colors duration-200 leading-none"
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  )
}

export default Lightbox
