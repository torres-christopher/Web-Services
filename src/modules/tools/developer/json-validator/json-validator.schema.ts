import { z } from 'zod'

export const jsonValidatorInput = z.object({
  text: z.string().max(100000).default(''),
  actionType: z.enum(['validate', 'format', 'minify']),
  space: z.union([z.literal('\t'), z.coerce.number().gte(1).lte(10)]),
})

export const jsonValidatorOutput = z.object({
  validJson: z.boolean(),
  errorMessage: z.string().optional(),
  errorPosition: z
    .object({
      line: z.number().nullable(),
      column: z.number().nullable(),
    })
    .optional(),
  result: z.string().optional(),
})

export type JsonValidatorInput = z.infer<typeof jsonValidatorInput>
export type JsonValidatorOutput = z.infer<typeof jsonValidatorOutput>
