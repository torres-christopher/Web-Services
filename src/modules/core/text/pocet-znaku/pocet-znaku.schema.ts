import { z } from 'zod'

export const pocetZnakuInput = z.object({
  text: z.string().max(100000)
})

export const pocetZnakuOutput = z.object({
  textLengthRaw: z.number().int().nonnegative(),
  textLengthNoSpace: z.number().int().nonnegative(),
  wordCount: z.number().int().nonnegative(),
  nsCount: z.number().nonnegative(), // Normostrana
  lineCount: z.number().int().nonnegative(),
  sentenceCount: z.number().int().nonnegative(),
  readingTime: z.number().int().nonnegative(),
})

export type pocetZnakuInput = z.infer<typeof pocetZnakuInput>
export type pocetZnakuOutput = z.infer<typeof pocetZnakuOutput>
