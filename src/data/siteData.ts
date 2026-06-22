import type { GalleryItem, OpeningHours } from '@/types'

export const galleryItems: GalleryItem[] = [
  { id: 'g1', emoji: '🍜', alt: 'Korean noodle dish' },
  { id: 'g2', emoji: '🥗', alt: 'Korean bibimbap bowl' },
  { id: 'g3', emoji: '🥩', alt: 'Korean BBQ meat' },
  { id: 'g4', emoji: '🥟', alt: 'Korean dumplings' },
  { id: 'g5', emoji: '🍳', alt: 'Korean fried rice' },
  { id: 'g6', emoji: '🔥', alt: 'Korean BBQ grill' },
  { id: 'g7', emoji: '🌿', alt: 'Korean vegetable dish' },
  { id: 'g8', emoji: '🍲', alt: 'Korean stew' },
  { id: 'g9', emoji: '🏮', alt: 'Ssam Ssam restaurant exterior' },
]

export const openingHours: OpeningHours[] = [
  {
    days: 'Sunday – Wednesday',
    times: ['12:00 – 15:30 (Last order: 14:30)', '17:00 – 23:00 (Last order: 22:00)'],
  },
  {
    days: 'Thursday – Friday',
    times: ['12:00 – 15:30 (Last order: 14:30)', '17:00 – 23:30 (Last order: 22:30)'],
  },
  {
    days: 'Saturday',
    times: ['12:00 – 23:30 (Last order: 22:30)'],
  },
]

export const contactInfo = {
  address: '99 St. Martin\'s Lane, London, WC2N 4AZ',
  telephone: '020 459 72123',
  email: 'hello@ssamssam.com',
}
