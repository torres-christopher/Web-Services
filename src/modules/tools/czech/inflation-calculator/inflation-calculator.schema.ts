import { z } from 'zod'

export const inflationRealInput = z
  .object({
    value: z.coerce.number().positive(),
    startYear: z.coerce.number().min(1997).max(2026),
    startMonth: z.union([z.literal('average'), z.coerce.number().int().min(1).max(12)]),
    endYear: z.coerce.number().min(1997).max(2026),
    endMonth: z.union([z.literal('average'), z.coerce.number().int().min(1).max(12)]),
  })
  .refine((input) => {
    if (input.startMonth != 'average' && input.endMonth != 'average') {
      const startDate = new Date(input.startYear, input.startMonth)
      const endDate = new Date(input.endYear, input.endMonth)
      return startDate < endDate
    } else {
      return input.startYear < input.endYear
    }
  })

export const inflationCustomInput = z.object({
  value: z.coerce.number().positive(),
  interestRate: z.coerce.number().nonnegative(),
  years: z.coerce.number().nonnegative(),
  type: z.enum(['forward', 'backward']),
})

export const inflationOutput = z.number().nonnegative()

export type InflationRealInput = z.infer<typeof inflationRealInput>
export type InflationCustomInput = z.infer<typeof inflationCustomInput>
export type InflationOutput = z.infer<typeof inflationOutput>
