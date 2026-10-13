import React from 'react'
import { useHeroSlider } from '@/hooks/useHeroSlider'
import type { HeroSlide } from '@/types'

interface HeroSliderProps {
  slides: HeroSlide[]
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const { current, goTo, prev, next, stopTimer, startTimer } = useHeroSlider(slides.length)

  return (
    <div
      className="relative h-[340px] md:h-[480px] overflow-hidden bg-black"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{
            opacity: index === current ? 1 : 0,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.55)), url(${slide.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-[42px] md:text-[64px] font-bold tracking-[-2px] leading-[0.9] lowercase mb-3">
          ssam<br />ssam
        </h1>
        <p className="text-[10px] md:text-[11px] tracking-[3px] md:tracking-[4px] uppercase mb-7 opacity-85">
          {slides[current]?.subtitle}
        </p>
        <a
          href="#reservation"
          className="px-9 py-3.5 border-[1.5px] border-white text-white text-[11px] tracking-[2.5px] uppercase hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
        >
          Book a Table
        </a>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 text-white text-4xl opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer leading-none"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 text-white text-4xl opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer leading-none"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goTo(index)}
            className={`w-2 h-2 rounded-full border-none cursor-pointer p-0 transition-all duration-200 ${
              index === current ? 'bg-white' : 'bg-white/35'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
