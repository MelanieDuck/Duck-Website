import React, { useState } from 'react'

interface NavbarProps {
  restaurantName: string
}

const navLinks = [
  { label: 'RESERVATION', href: '#reservation' },
  { label: 'MENUS', href: '#menus' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'CONTACT US', href: '#contact' },
]

const Navbar: React.FC<NavbarProps> = ({ restaurantName }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white border-b border-gray-100 px-4 md:px-12 h-16">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 border border-crimson flex items-center justify-center text-crimson text-sm font-bold">
          {restaurantName.charAt(0)}
        </div>
        <span className="text-sm font-semibold tracking-widest uppercase text-gray-800">
          {restaurantName}
        </span>
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none m-0 p-0">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[11px] tracking-[2.5px] text-gray-500 hover:text-crimson no-underline transition-colors duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span
          className={`block w-5 h-0.5 bg-gray-800 transition-transform duration-200 ${
            menuOpen ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-gray-800 transition-opacity duration-200 ${
            menuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-gray-800 transition-transform duration-200 ${
            menuOpen ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 md:hidden">
          <ul className="flex flex-col list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3.5 text-[11px] tracking-[2.5px] text-gray-600 hover:text-crimson no-underline transition-colors duration-200 border-b border-gray-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
