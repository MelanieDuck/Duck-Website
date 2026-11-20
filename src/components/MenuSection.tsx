import React, { useState } from 'react'
import type { MenuCategory } from '@/types'
import MenuCard from './MenuCard'
import SectionLabel from './SectionLabel'

interface MenuSectionProps {
  categories: MenuCategory[]
  tagline?: string
}

const MenuSection: React.FC<MenuSectionProps> = ({ categories, tagline }) => {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '')

  return (
    <section id="menus" className="py-16 md:py-24 px-5 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-[1080px] mx-auto">
        <h2 className="sr-only">Menu</h2>
        <SectionLabel text="Our Menu" />

        {/* Pill tabs — centered, wrap naturally */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveId(cat.id)}
              className={`px-5 py-2 rounded-full border text-[13px] font-medium cursor-pointer transition-colors duration-150 whitespace-nowrap ${
                activeId === cat.id
                  ? 'bg-crimson text-white border-crimson'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* All categories rendered; inactive hidden via wrapper */}
        {categories.map((cat) => (
          <div key={cat.id} className={cat.id === activeId ? '' : 'hidden'}>
            <h3 className="sr-only">{cat.label}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {cat.items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}

        {tagline && (
          <p className="text-center text-[13px] italic text-gray-400 mt-12 max-w-xl mx-auto leading-relaxed">
            {tagline}
          </p>
        )}
      </div>
    </section>
  )
}

export default MenuSection
