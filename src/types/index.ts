export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  emoji: string
  tags?: ('V' | 'Halal' | 'Spicy')[]
}

export interface MenuCategory {
  id: string
  label: string
  items: MenuItem[]
}

export interface HeroSlide {
  id: string
  imageUrl: string
  subtitle: string
}

export interface OpeningHours {
  days: string
  times: string[]
}

export interface GalleryItem {
  id: string
  emoji: string
  alt: string
}
