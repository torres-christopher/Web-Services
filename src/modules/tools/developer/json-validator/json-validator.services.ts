import type { JsonValidatorInput, JsonValidatorOutput } from './json-validator.schema.js'

// Validate
export const validateJSON = function (input: JsonValidatorInput): JsonValidatorOutput {
  const test = input.Text
  return {
    validJson: false,
  }
}

// Format

// Minify
