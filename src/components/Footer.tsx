import React from 'react'
import type { OpeningHours } from '@/types'

interface FooterProps {
  restaurantName: string
  hours: OpeningHours[]
  address: string
  telephone: string
  email: string
}

const Footer: React.FC<FooterProps> = ({ restaurantName, hours, address, telephone, email }) => {
  const telHref = telephone ? 'tel:' + telephone.replace(/[^+\d]/g, '') : ''
  const mailtoHref = email ? `mailto:${email}` : ''
  const encodedAddress = encodeURIComponent(address)
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`

  return (
    <footer id="contact" className="bg-[#0d0d0d] text-[#999] pt-16 md:pt-24 pb-10 px-5 md:px-12">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid gap-10 md:gap-16 grid-cols-1 md:grid-cols-2 mb-12 max-w-[720px] mx-auto">
          {/* Brand */}
          <div>
            <div className="text-[24px] text-white mb-6 tracking-wide">{restaurantName}</div>
            <address className="not-italic text-[13px] text-[#666] leading-[2]">
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666] hover:underline"
              >
                {address.split(',').map((line, i) => (
                  <span key={i}>
                    {line.trim()}
                    {i < address.split(',').length - 1 && <br />}
                  </span>
                ))}
              </a>
            </address>
            <p className="text-[13px] text-[#666] leading-[2] mt-4">
              {telephone ? (
                <>Telephone. <a href={telHref} className="text-[#666] hover:underline">{telephone}</a></>
              ) : (
                <>Telephone. {telephone}</>
              )}
              <br />
              {email ? (
                <>Email. <a href={mailtoHref} className="text-[#666] hover:underline">{email}</a></>
              ) : (
                <>Email. {email}</>
              )}
            </p>
          </div>

          {/* Hours */}
          <div>
            <h2 className="text-[11px] tracking-[3px] uppercase text-white mb-6">Opening Times</h2>
            {hours.map((block) => (
              <div key={block.days} className="mb-3">
                <p className="text-[12px] font-semibold text-[#ccc] mb-1">{block.days}</p>
                {block.times.map((time) => (
                  <p key={time} className="text-[12px] text-[#666] leading-[1.8]">
                    {time}
                  </p>
                ))}
              </div>
            ))}
            <a
              href={mapsDirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 px-5 py-2.5 border border-[#333] bg-transparent text-[#888] text-[11px] tracking-[2px] uppercase cursor-pointer hover:border-[#666] hover:text-[#ccc] transition-all duration-200"
            >
              Get Directions
            </a>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#444] pt-6 border-t border-[#1a1a1a] tracking-wide">
          © 2026 {restaurantName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
