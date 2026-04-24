import { type ToolsDetails } from '../../src/shared/types/toolDetails.js'

export const tools: ToolsDetails[] = [
  {
    title: 'Počet znaků',
    description:
      'Spočítejte počet znaků, slov, vět, řádků a normostran v textu. Zdarma, bez registrace.',
    path: '/text/pocet-znaku',
    slug: 'pocet-znaku',
    icon: '✏️',
    categoryName: 'Textové nástoje',
    categoryPath: '/textove-nastroje',
    enabled: true,
  },
]
