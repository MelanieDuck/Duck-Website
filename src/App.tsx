import React from 'react'
import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import MenuSection from '@/components/MenuSection'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'
import SectionLabel from '@/components/SectionLabel'
import { useRestaurantConfig } from '@/hooks/useRestaurantConfig'
import Reviews from '@/components/Reviews'

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
    <div className="min-h-screen bg-white">
      <Navbar restaurantName={config.name} />

      <HeroSlider slides={config.heroSlides} restaurantName={config.name} />

      {/* Badge (e.g. Michelin 2025) — only shown if present in config */}
      {config.badge && (
        <div className="text-center py-12 md:py-16 bg-white border-b border-gray-100">
          <h2 className="text-[28px] md:text-[42px] font-light tracking-[-1px]">
            {config.badge.split(' ').map((word, i) => (
              i === 0
                ? <strong key={i} className="font-bold text-crimson">{word} </strong>
                : <span key={i}>{word}</span>
            ))}
          </h2>
        </div>
      )}

      {/* About */}
      <section id="about" className="py-16 md:py-24 px-5 md:px-12 text-center">
        <div className="max-w-[1080px] mx-auto">
          <SectionLabel text="About Us" />
          {config.about.map((paragraph, i) => (
            <p
              key={i}
              className="max-w-[620px] mx-auto text-[15px] leading-[1.85] text-gray-500 mb-5 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <Reviews reviews={config.reviews || []} />

      <MenuSection
        categories={config.menuCategories}
        tagline={config.menuTagline}
      />

      <Gallery items={config.gallery} />

      <Footer
        restaurantName={config.name}
        hours={config.openingHours}
        address={config.contact.address}
        telephone={config.contact.telephone}
        email={config.contact.email}
      />
    </div>
  )
}

export default App
