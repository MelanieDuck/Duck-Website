import React from 'react'
import type { MenuItem } from '@/types'

interface MenuCardProps {
  item: MenuItem
}

const tagColors: Record<string, string> = {
  V: 'bg-green-50 text-green-700 border-green-200',
  Halal: 'bg-teal-50 text-teal-700 border-teal-200',
  Spicy: 'bg-red-50 text-red-700 border-red-200',
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  return (
    <div className="flex gap-3.5 p-4 border border-gray-100 rounded bg-white hover:shadow-md transition-shadow duration-200">
      <div className="w-[76px] h-[76px] flex-shrink-0 rounded bg-gray-50 flex items-center justify-center text-3xl">
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2 mb-1.5">
          <span className="text-sm font-semibold leading-tight">{item.name}</span>
          <span className="text-sm font-semibold text-crimson whitespace-nowrap">
            £{item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-2">{item.description}</p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] px-1.5 py-0.5 border rounded-sm tracking-wide ${tagColors[tag] ?? ''}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuCard
