import React, { useState } from 'react'
import type { OpeningHours } from '@/types'

interface FooterProps {
  restaurantName: string
  hours: OpeningHours[]
  address: string
  telephone: string
  email: string
}

const Footer: React.FC<FooterProps> = ({ restaurantName, hours, address, telephone, email }) => {
  const [fullName, setFullName] = useState('')
  const [emailInput, setEmailInput] = useState('')

  const handleSubscribe = () => {
    alert(`Thanks ${fullName}! We'll keep you updated at ${emailInput}.`)
    setFullName('')
    setEmailInput('')
  }

  return (
    <footer id="contact" className="bg-[#0d0d0d] text-[#999] pt-16 md:pt-24 pb-10 px-5 md:px-12">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid gap-10 md:gap-16 grid-cols-1 md:grid-cols-3 mb-12">
          {/* Brand */}
          <div>
            <div className="text-[24px] text-white mb-6 tracking-wide">{restaurantName}</div>
            <p className="text-[13px] text-[#666] leading-[2]">
              {address.split(',').map((line, i) => (
                <span key={i}>
                  {line.trim()}
                  {i < address.split(',').length - 1 && <br />}
                </span>
              ))}
            </p>
            <p className="text-[13px] text-[#666] leading-[2] mt-4">
              Telephone. {telephone}
              <br />
              Email. {email}
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-[11px] tracking-[3px] uppercase text-white mb-6">Opening Times</h3>
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
            <button className="mt-5 px-5 py-2.5 border border-[#333] bg-transparent text-[#888] text-[11px] tracking-[2px] uppercase cursor-pointer hover:border-[#666] hover:text-[#ccc] transition-all duration-200">
              Get Directions
            </button>
          </div>

          {/* Newsletter */}
          <div id="reservation">
            <h3 className="text-[11px] tracking-[3px] uppercase text-white mb-6">
              Join the Community
            </h3>
            <div className="mb-3">
              <label className="block text-[11px] text-[#555] tracking-wide uppercase mb-1.5">
                Full Name <span className="text-crimson">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3 py-2.5 bg-[#161616] border border-[#222] text-[#ccc] text-[13px] rounded-sm outline-none focus:border-[#444] placeholder-[#444] transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[11px] text-[#555] tracking-wide uppercase mb-1.5">
                Email <span className="text-crimson">*</span>
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2.5 bg-[#161616] border border-[#222] text-[#ccc] text-[13px] rounded-sm outline-none focus:border-[#444] placeholder-[#444] transition-colors"
              />
            </div>
            <button
              onClick={handleSubscribe}
              className="w-full py-3 bg-white text-black text-[11px] tracking-[2.5px] uppercase border-none cursor-pointer hover:bg-gray-200 transition-colors duration-200"
            >
              Keep Me Updated
            </button>
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
