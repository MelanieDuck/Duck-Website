import type { MenuCategory } from '@/types'

export const menuCategories: MenuCategory[] = [
  {
    id: 'starters',
    label: 'Starter',
    items: [
      {
        id: 'mandu',
        name: 'Mandu (4 pcs)',
        description: 'Pan-fried Korean dumplings filled with pork, tofu and vegetables',
        price: 8.5,
        emoji: '🥟',
      },
      {
        id: 'pajeon-v',
        name: 'Pajeon',
        description: 'Crispy Korean spring onion pancake served with dipping sauce',
        price: 11.0,
        emoji: '🥞',
        tags: ['V'],
      },
      {
        id: 'haemul-pajeon',
        name: 'Haemul Pajeon',
        description: 'Seafood pancake with squid, prawn and spring onion in a crispy batter',
        price: 13.5,
        emoji: '🌊',
      },
      {
        id: 'tteokbokki',
        name: 'Tteokbokki',
        description: 'Spicy rice cakes in gochujang sauce with fish cake and boiled egg',
        price: 10.0,
        emoji: '🍢',
        tags: ['V', 'Spicy'],
      },
      {
        id: 'wagyu-tartare',
        name: 'Wagyu Tartare',
        description: 'Premium wagyu beef tartare with Korean pear, sesame oil and egg yolk',
        price: 18.0,
        emoji: '🥩',
      },
      {
        id: 'japchae',
        name: 'Japchae',
        description: 'Glass noodles stir-fried with vegetables, mushrooms and beef in a light sesame sauce',
        price: 9.5,
        emoji: '🍜',
      },
    ],
  },
  {
    id: 'sides',
    label: 'Side',
    items: [
      {
        id: 'kimchi',
        name: 'Kimchi',
        description: 'House-made fermented napa cabbage kimchi',
        price: 4.0,
        emoji: '🥬',
      },
      {
        id: 'spinach-namul',
        name: 'Spinach Namul',
        description: 'Blanched spinach seasoned with sesame oil, garlic and soy',
        price: 4.0,
        emoji: '🌿',
        tags: ['V'],
      },
      {
        id: 'beansprout-namul',
        name: 'Bean Sprout Namul',
        description: 'Crunchy bean sprouts with sesame oil and spring onion',
        price: 4.0,
        emoji: '🌱',
        tags: ['V'],
      },
      {
        id: 'gyeran-jjim',
        name: 'Gyeran Jjim',
        description: 'Steamed egg soufflé, silky and lightly seasoned',
        price: 5.0,
        emoji: '🥚',
        tags: ['V'],
      },
    ],
  },
  {
    id: 'special',
    label: "Chef's Special",
    items: [
      {
        id: 'wagyu-bulgogi',
        name: 'Wagyu Bulgogi',
        description: 'Premium wagyu marinated in house bulgogi sauce, cooked tableside on a stone plate',
        price: 32.0,
        emoji: '⭐',
      },
      {
        id: 'galbi-jjim',
        name: 'Galbi Jjim',
        description: 'Slow-braised beef short ribs in a rich Korean sauce with daikon and chestnuts',
        price: 28.0,
        emoji: '🍖',
      },
      {
        id: 'ganjang-gejang',
        name: 'Ganjang Gejang',
        description: "Raw crab marinated in soy sauce — the 'rice thief' of Korean cuisine",
        price: 24.0,
        emoji: '🦀',
      },
    ],
  },
  {
    id: 'rice',
    label: 'Rice',
    items: [
      {
        id: 'dolsot-bibimbap',
        name: 'Dolsot Bibimbap',
        description: 'Stone pot rice with assorted vegetables, gochujang sauce and a fried egg',
        price: 16.5,
        emoji: '🍚',
        tags: ['V'],
      },
      {
        id: 'wagyu-bibimbap',
        name: 'Wagyu Bibimbap',
        description: 'Stone pot rice with wagyu beef, seasonal vegetables and house gochujang',
        price: 24.0,
        emoji: '🥩',
      },
      {
        id: 'kimchi-bokkeumbap',
        name: 'Kimchi Bokkeumbap',
        description: 'Kimchi fried rice with pork, spring onion and a fried egg on top',
        price: 14.0,
        emoji: '🍳',
      },
    ],
  },
  {
    id: 'noodles',
    label: 'Noodles',
    items: [
      {
        id: 'mul-naengmyeon',
        name: 'Mul Naengmyeon',
        description:
          'Cold buckwheat noodles in refreshing semi-frozen house-made beef broth, topped with brisket, Korean pear, cucumber and a boiled egg',
        price: 15.5,
        emoji: '🍜',
      },
      {
        id: 'bibim-naengmyeon',
        name: 'Bibim Naengmyeon',
        description:
          'Spicy cold buckwheat noodles mixed with spicy-sweet sauce, topped with beef brisket, Korean pear, cucumber and a boiled egg',
        price: 15.5,
        emoji: '🌶️',
        tags: ['Spicy'],
      },
      {
        id: 'wagyu-bibim-naengmyeon',
        name: 'Wagyu Bibim Naengmyeon',
        description:
          'Spicy cold buckwheat noodles with Wagyu beef tartare, Korean pear, cucumber and a boiled egg',
        price: 21.0,
        emoji: '⭐',
        tags: ['Halal', 'Spicy'],
      },
      {
        id: 'deulkkae-makguksu',
        name: 'Deulkkae Makguksu',
        description:
          'Perilla oil buckwheat noodles tossed in aromatic roasted perilla oil with seaweed and rich egg yolk',
        price: 15.5,
        emoji: '🌿',
        tags: ['V'],
      },
      {
        id: 'chuncheon-makguksu',
        name: 'Chuncheon Makguksu',
        description:
          'Chuncheon-style buckwheat noodles coated in a light, spicy-sweet sauce with crisp red cabbage and fresh vegetables',
        price: 15.5,
        emoji: '🥬',
        tags: ['V'],
      },
      {
        id: 'on-myeon',
        name: 'On Myeon',
        description:
          'Soft white noodles in savoury beef broth topped with slices of beef brisket and vegetables',
        price: 14.5,
        emoji: '🍲',
      },
    ],
  },
  {
    id: 'soups',
    label: 'Soups',
    items: [
      {
        id: 'doenjang-jjigae',
        name: 'Doenjang Jjigae',
        description:
          'Traditional Korean fermented soybean paste stew with tofu, courgette and mushrooms',
        price: 13.5,
        emoji: '🍲',
        tags: ['V'],
      },
      {
        id: 'kimchi-jjigae',
        name: 'Kimchi Jjigae',
        description: 'Robust kimchi stew with pork belly, tofu and spring onion',
        price: 14.5,
        emoji: '🌶️',
        tags: ['Spicy'],
      },
      {
        id: 'sundubu-jjigae',
        name: 'Sundubu Jjigae',
        description: 'Silken tofu stew with seafood in a spicy broth, served with an egg',
        price: 14.5,
        emoji: '🥢',
        tags: ['Spicy'],
      },
      {
        id: 'gomtang',
        name: 'Gomtang',
        description:
          'Slow-simmered ox bone broth, milky white, with rice, spring onion and seasoning',
        price: 15.0,
        emoji: '🦴',
      },
    ],
  },
  {
    id: 'bbq',
    label: 'BBQ',
    items: [
      {
        id: 'samgyeopsal',
        name: 'Samgyeopsal',
        description: 'Grilled pork belly served with fresh lettuce, garlic, and house sauces',
        price: 22.0,
        emoji: '🔥',
      },
      {
        id: 'chadolbaegi',
        name: 'Chadolbaegi',
        description: 'Thinly sliced beef brisket grilled at the table, served with dipping sauce',
        price: 26.0,
        emoji: '🥩',
      },
      {
        id: 'dak-galbi',
        name: 'Dak Galbi',
        description:
          'Spicy stir-fried chicken with rice cakes, cabbage, spring onion and gochujang sauce',
        price: 20.0,
        emoji: '🐔',
        tags: ['Spicy'],
      },
    ],
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    items: [
      {
        id: 'seoul-sour',
        name: 'Seoul Sour',
        description: 'Soju, yuzu juice, egg white and honey syrup',
        price: 12.0,
        emoji: '🍋',
      },
      {
        id: 'blossom-spritz',
        name: 'Blossom Spritz',
        description: 'Korean plum wine, elderflower, prosecco and fresh mint',
        price: 11.0,
        emoji: '🌸',
      },
      {
        id: 'boksonju-fizz',
        name: 'Boksonju Fizz',
        description: 'Peach soju, lychee, sparkling water and a mint sprig',
        price: 12.0,
        emoji: '🍑',
      },
    ],
  },
  {
    id: 'soju',
    label: 'Soju',
    items: [
      {
        id: 'original-soju',
        name: 'Original Soju',
        description: 'Classic Korean soju, clean and smooth',
        price: 8.0,
        emoji: '🍶',
      },
      {
        id: 'chum-churum',
        name: 'Chum Churum',
        description: 'Premium soft soju with a subtly sweet finish',
        price: 8.5,
        emoji: '🍶',
      },
      {
        id: 'green-grape-soju',
        name: 'Green Grape Soju',
        description: 'Fruity soju infused with green grape, refreshing and light',
        price: 9.0,
        emoji: '🍇',
      },
    ],
  },
  {
    id: 'wine',
    label: 'Wine',
    items: [
      {
        id: 'makgeolli',
        name: 'Makgeolli – Rice Wine',
        description: 'Traditional Korean rice wine, lightly sparkling and pleasantly tangy',
        price: 7.0,
        emoji: '🍶',
      },
      {
        id: 'champagne',
        name: 'Champagne',
        description: 'Chilled glass of champagne for a celebratory toast',
        price: 14.0,
        emoji: '🥂',
      },
      {
        id: 'red-wine-glass',
        name: 'Red Wine – Glass',
        description: 'Smooth and fruity house red wine by the glass',
        price: 8.0,
        emoji: '🍷',
      },
      {
        id: 'red-wine-bottle',
        name: 'Red Wine – Bottle',
        description: 'Full bottle of house red wine',
        price: 30.0,
        emoji: '🍷',
      },
      {
        id: 'sparkling-wine',
        name: 'Sparkling Wine',
        description: 'Chilled glass of sparkling wine, crisp and elegant',
        price: 9.0,
        emoji: '🥂',
      },
    ],
  },
]
