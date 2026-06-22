import React from 'react'
import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import MenuSection from '@/components/MenuSection'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'
import { useRestaurantConfig } from '@/hooks/useRestaurantConfig'

const App: React.FC = () => {
  const { config, loading, error } = useRestaurantConfig()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-400 text-sm tracking-widest uppercase">Loading…</p>
      </div>
    )
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-400 text-sm">
          Failed to load restaurant config. Check that <code>public/restaurant-config.json</code> exists.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar restaurantName={config.name} />

      <HeroSlider slides={config.heroSlides} />

      {/* Badge (e.g. Michelin 2025) — only shown if present in config */}
      {config.badge && (
        <div className="text-center py-14 bg-white border-b border-gray-100">
          <h2 className="text-[42px] font-light tracking-[-1px]">
            {config.badge.split(' ').map((word, i) => (
              i === 0
                ? <strong key={i} className="font-bold text-crimson">{word} </strong>
                : <span key={i}>{word}</span>
            ))}
          </h2>
        </div>
      )}

      {/* About */}
      <section id="about" className="py-20 px-10 text-center">
        <p className="text-[11px] tracking-[3px] text-gray-400 uppercase mb-2.5">About Us</p>
        <div className="w-7 h-px bg-gray-200 mx-auto mb-9" />
        {config.about.map((paragraph, i) => (
          <p
            key={i}
            className="max-w-[620px] mx-auto text-[15px] leading-[1.85] text-gray-500 mb-5"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <MenuSection
        categories={config.menuCategories}
        tagline={config.menuTagline}
      />

      <Gallery items={config.gallery} />

      <Footer
        hours={config.openingHours}
        address={config.contact.address}
        telephone={config.contact.telephone}
        email={config.contact.email}
      />
    </div>
  )
}

export default App
