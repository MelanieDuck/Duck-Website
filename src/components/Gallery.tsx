import React from 'react'
import type { GalleryItem } from '@/types'

interface GalleryProps {
  items: GalleryItem[]
}

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  return (
    <section id="gallery" className="bg-[#0d0d0d] py-12 md:py-20 px-5 md:px-12">
      <p className="text-center text-[11px] tracking-[3px] text-[#555] uppercase mb-2.5">Gallery</p>
      <div className="w-7 h-px bg-[#333] mx-auto mb-9" />

      <div
        className="grid gap-2.5 max-w-[920px] mx-auto mb-9 grid-cols-2 md:grid-cols-3"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="aspect-square rounded-sm overflow-hidden bg-[#181818] flex items-center justify-center cursor-pointer transition-all duration-250 brightness-75 hover:brightness-100 hover:scale-[1.02]"
            aria-label={item.alt}
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  const target = e.currentTarget
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `<span class="text-[42px]">${item.emoji}</span>`
                  }
                }}
              />
            ) : (
              <span className="text-[28px] md:text-[42px] text-[#2a2a2a]">{item.emoji}</span>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href="#menus"
          className="inline-block px-8 py-3.5 border border-[#444] text-[#aaa] text-[11px] tracking-[2.5px] uppercase hover:border-white hover:text-white transition-all duration-200 cursor-pointer"
        >
          View Menu
        </a>
      </div>
    </section>
  )
}

export default Gallery
