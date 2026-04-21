import { z } from 'zod'

export const pocetZnakuInput = z.object({
  text: z.string()
})

export const pocetZnakuOutput = z.object({
  textLength: z.number().int().nonnegative(),
  wordCount: z.number().int().nonnegative(),
  nsCount: z.number().nonnegative(), // Normostrana
})

export type pocetZnakuInput = z.infer<typeof pocetZnakuInput>
export type pocetZnakuOutput = z.infer<typeof pocetZnakuOutput>
