import React from 'react'

interface SectionLabelProps {
  text: string
  variant?: 'light' | 'dark'
}

const SectionLabel: React.FC<SectionLabelProps> = ({ text, variant = 'light' }) => {
  const labelColor = variant === 'dark' ? 'text-[#666]' : 'text-gray-400'
  const lineColor = variant === 'dark' ? 'bg-[#3a3a3a]' : 'bg-gray-200'

  return (
    <div className="text-center mb-12">
      <p className={`text-[11px] tracking-[3px] ${labelColor} uppercase mb-3`}>{text}</p>
      <div className={`w-8 h-px ${lineColor} mx-auto`} />
    </div>
  )
}

export default SectionLabel
