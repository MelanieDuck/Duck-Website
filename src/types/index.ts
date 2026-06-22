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
  imageUrl: string
  alt: string
  emoji: string
}

export interface ContactInfo {
  address: string
  telephone: string
  email: string
}

export interface RestaurantConfig {
  name: string
  tagline: string
  about: string[]
  badge?: string
  contact: ContactInfo
  openingHours: OpeningHours[]
  heroSlides: HeroSlide[]
  gallery: GalleryItem[]
  menuTagline: string
  menuCategories: MenuCategory[]
}
