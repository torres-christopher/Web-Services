import { z } from 'zod'

export const prevodVelikostiZnakuInput = z.object({
  input: z.string().max(100000).default(''),
  conversionType: z.enum([
    'default',
    'sentence-case',
    'lower-case',
    'upper-case',
    'capitalized-case',
    'reverse',
  ]),
})
export const prevodVelikostiZnakuOuput = z.string().max(100000).default('')

export type prevodVelikostiZnakuInput = z.infer<typeof prevodVelikostiZnakuInput>
export type prevodVelikostiZnakuOuput = z.infer<typeof prevodVelikostiZnakuOuput>
