import React from 'react'
import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import MenuSection from '@/components/MenuSection'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'
import { heroSlides } from '@/data/heroSlides'
import { menuCategories } from '@/data/menuData'
import { galleryItems, openingHours, contactInfo } from '@/data/siteData'

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <HeroSlider slides={heroSlides} />

      {/* Michelin Banner */}
      <div className="text-center py-14 bg-white border-b border-gray-100">
        <h2 className="text-[42px] font-light tracking-[-1px]">
          <strong className="font-bold text-crimson">MICHELIN</strong> 2025
        </h2>
      </div>

      {/* About */}
      <section id="about" className="py-20 px-10 text-center">
        <p className="text-[11px] tracking-[3px] text-gray-400 uppercase mb-2.5">About Us</p>
        <div className="w-7 h-px bg-gray-200 mx-auto mb-9" />
        <p className="max-w-[620px] mx-auto text-[15px] leading-[1.85] text-gray-500 mb-5">
          Nestled in the heart of a vibrant city, our family-run Korean restaurant located in
          Wimbledon stands as a culinary oasis, with a long-standing Korean culinary background in
          London since the early 2000s.
        </p>
        <p className="max-w-[620px] mx-auto text-[15px] leading-[1.85] text-gray-500">
          With a heritage spanning generations, we have mastered the art of Korean cuisine, infusing
          it with the warmth and authenticity only a family touch can provide. Our menu is a
          carefully curated journey through the diverse flavours of Korea, featuring a symphony of
          ingredients sourced from the finest purveyors.
        </p>
      </section>

      <MenuSection categories={menuCategories} />

      <Gallery items={galleryItems} />

      <Footer
        hours={openingHours}
        address={contactInfo.address}
        telephone={contactInfo.telephone}
        email={contactInfo.email}
      />
    </div>
  )
}

export default App
