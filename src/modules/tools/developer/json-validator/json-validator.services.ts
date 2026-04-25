import type { JsonValidatorInput, JsonValidatorOutput } from './json-validator.schema.js'

export const jsonValidateFormat = function (input: JsonValidatorInput): JsonValidatorOutput {
  const valid = validateJSON(input.text)
  if (valid.valid) {
    let result: string = input.text
    switch (input.actionType) {
      case 'format':
        result = formatJSON(input.text)
        break
      case 'minify':
        result = minifyJSON(input.text)
        break
    }

    return {
      validJson: valid.valid,
      result,
    }
  } else {
    return {
      validJson: valid.valid,
    }
  }
}

interface ValidateJson {
  valid: boolean
  line?: number
  column?: number
}

// Validate
const validateJSON = function (input: string): ValidateJson {
  try {
    JSON.parse(input)
    return {
      valid: true,
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      const line = error.message.split('line ')[1].split('column')[0]
      const column = error.message.split('column ')[1].split(')')[0]
      return {
        valid: false,
        line: line ? Number(line) : 0,
        column: column ? Number(column) : 0,
      }
    }
    return {
      valid: false,
      line: 0,
      column: 0,
    }
  }
}

// Format
const formatJSON = function (input: string): string {
  return input
}

// Minify
const minifyJSON = function (input: string): string {
  return input
}
