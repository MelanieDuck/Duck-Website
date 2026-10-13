import React, { useState } from 'react'
import type { MenuCategory } from '@/types'
import MenuCard from './MenuCard'

interface MenuSectionProps {
  categories: MenuCategory[]
  tagline?: string
}

const MenuSection: React.FC<MenuSectionProps> = ({ categories, tagline }) => {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '')
  const activeCategory = categories.find((c) => c.id === activeId)

  return (
    <section id="menus" className="py-8 md:py-10 px-5 md:px-10 bg-white">
      {/* Pill tabs — left-aligned, wrap naturally */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            className={`px-4 py-1.5 rounded-full border text-[13.5px] font-normal cursor-pointer transition-colors duration-150 whitespace-nowrap ${
              activeId === cat.id
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 2-column card grid */}
      {activeCategory && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {activeCategory.items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {tagline && (
        <p className="text-center text-sm italic text-gray-400 mt-12 max-w-xl mx-auto leading-relaxed">
          {tagline}
        </p>
      )}
    </section>
  )
}

export default MenuSection
