import React from 'react'

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
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white border-b border-gray-100 px-12 h-16">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 border border-crimson flex items-center justify-center text-crimson text-sm font-bold">
          {restaurantName.charAt(0)}
        </div>
        <span className="text-sm font-semibold tracking-widest uppercase text-gray-800">
          {restaurantName}
        </span>
      </div>
      <ul className="flex gap-8 list-none m-0 p-0">
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
    </nav>
  )
}

export default Navbar
