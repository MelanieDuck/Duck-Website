import React, { useState } from 'react'
import type { MenuCategory } from '@/types'
import MenuCard from './MenuCard'

interface MenuSectionProps {
  categories: MenuCategory[]
  tagline: string
}

const MenuSection: React.FC<MenuSectionProps> = ({ categories, tagline }) => {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '')
  const activeCategory = categories.find((c) => c.id === activeId)

  return (
    <section id="menus" className="py-20 px-12 bg-gray-50">
      <div className="text-center mb-11">
        <h2 className="text-4xl font-light tracking-[-0.5px] mb-3">Tradition, Refined</h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
          Our menu celebrates the depth of culinary heritage, shaped with contemporary elegance.
          Every dish is lovingly prepared in-house using authentic home-made recipes.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-9">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            className={`px-[18px] py-2 border text-[11px] tracking-[1.5px] uppercase rounded-sm cursor-pointer transition-all duration-200 ${
              activeId === cat.id
                ? 'bg-crimson text-white border-crimson'
                : 'bg-white text-gray-500 border-gray-200 hover:border-crimson hover:text-crimson'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {activeCategory && (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}
        >
          {activeCategory.items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {tagline && (
        <p className="text-center text-base italic text-gray-500 mt-14 max-w-xl mx-auto leading-relaxed">
          {tagline}
        </p>
      )}
    </section>
  )
}

export default MenuSection
