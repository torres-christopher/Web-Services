import { z } from 'zod'

export const bmiInput = z.object({
  height: z.coerce.number().min(1).max(300),
  weight: z.coerce.number().min(1).max(1000),
})

export const bmiOuput = z.object({
  bmiValue: z.number(),
  bmiClassification: z.enum(['underweight', 'normal', 'overweight', 'obese']),
  errorMessage: z.string().optional(),
})

export type BmiInput = z.infer<typeof bmiInput>
export type BmiOuput = z.infer<typeof bmiOuput>
