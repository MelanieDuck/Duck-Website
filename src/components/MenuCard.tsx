import React from 'react'
import type { MenuItem } from '@/types'

interface MenuCardProps {
  item: MenuItem
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  // Split "Bold Subtitle – detail text" into two parts
  const sep = ' – '
  const sepIdx = item.description.indexOf(sep)
  const hasSubtitle = sepIdx !== -1
  const boldPart = hasSubtitle ? item.description.slice(0, sepIdx) : null
  const restPart = hasSubtitle ? item.description.slice(sepIdx + sep.length) : item.description

  return (
    <div className="flex border border-gray-200 rounded-2xl bg-white overflow-hidden min-h-[110px] md:min-h-[130px] hover:shadow-sm transition-shadow duration-200">
      {/* Flush image / emoji panel */}
      <div className="w-[80px] md:w-[110px] flex-shrink-0 bg-gray-100 flex items-center justify-center text-3xl md:text-4xl self-stretch">
        {item.emoji}
      </div>

      {/* Content panel */}
      <div className="flex-1 min-w-0 px-3 md:px-5 pt-4 pb-5">
        {/* Row 1: name + price */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <span
            className="text-[15px] font-semibold leading-snug"
            style={{ color: '#2c1a0e' }}
          >
            {item.name}
          </span>
          <span className="flex-shrink-0 text-[14.5px] font-semibold text-gray-700 bg-gray-100 rounded-md px-2.5 py-0.5 whitespace-nowrap leading-6">
            £{item.price.toFixed(2)}
          </span>
        </div>

        {/* Row 2: tags (V / Halal / Spicy) */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-2.5">
            {item.tags.map((tag) => {
              if (tag === 'V' || tag === 'Halal') {
                return (
                  <span
                    key={tag}
                    className="inline-flex items-center justify-center text-[11px] font-bold text-green-700 bg-green-50 border border-green-300 rounded px-1.5 py-0.5 leading-none"
                  >
                    {tag}
                  </span>
                )
              }
              if (tag === 'Spicy') {
                return (
                  <span key={tag} className="text-[15px] leading-none">
                    🌶
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Row 3: description */}
        <p className="text-[13.5px] leading-[1.65] text-gray-600">
          {boldPart && (
            <strong className="font-semibold text-gray-900">{boldPart}</strong>
          )}
          {boldPart && (
            <span className="font-normal text-gray-600"> – </span>
          )}
          <span className="text-[#5b7fa6]">{restPart}</span>
        </p>
      </div>
    </div>
  )
}

export default MenuCard
