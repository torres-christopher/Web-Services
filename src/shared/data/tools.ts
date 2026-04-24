import { type ToolsDetails } from '../types/toolDetails.js'

export const tools: ToolsDetails[] = [
  {
    title: 'Počet znaků',
    description:
      'Spočítejte počet znaků, slov, vět, řádků a normostran v textu. Zdarma, bez registrace.',
    path: '/textove-nastroje/pocet-znaku',
    slug: 'pocet-znaku',
    icon: '✏️',
    categoryName: 'Textové nástroje',
    categoryPath: '/textove-nastroje',
    enabled: true,
    featured: 1,
  },
  {
    title: 'Převod velikosti znaků',
    description:
      'Převeďte text na velká, malá, titulková nebo větná písmena. Podporuje češtinu, azbuku i arabštinu.',
    path: '/textove-nastroje/prevod-velikosti-znaku',
    slug: 'prevod-velikosti-znaku',
    icon: '🔡',
    categoryName: 'Textové nástroje',
    categoryPath: '/textove-nastroje',
    enabled: true,
    featured: 2,
  },
]
