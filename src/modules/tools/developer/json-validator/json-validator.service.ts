import type { JsonValidatorInput, JsonValidatorOutput } from './json-validator.schema.js'

export const jsonValidateFormat = function (input: JsonValidatorInput): JsonValidatorOutput {
  // Always check JSON validity
  const valid = validateJSON(input.text)

  // Format only if JSON valid
  if (valid.valid) {
    // Default in case of cust validation
    let result: string = input.text
    switch (input.actionType) {
      case 'format':
        result = formatJSON(valid.jsonObject!, input.space)
        break
      case 'minify':
        result = minifyJSON(valid.jsonObject!)
        break
    }

    return {
      validJson: valid.valid,
      result,
    }
  } else {
    return {
      validJson: valid.valid,
      errorMessage: valid.errorMessage,
      errorPosition: {
        line: valid.line ? valid.line : 0,
        column: valid.column ? valid.column : 0,
      },
    }
  }
}

// JSON value specified, because JSON.parse() returns any
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }
interface ValidateJson {
  valid: boolean
  jsonObject?: JsonValue
  errorMessage?: string
  line?: number
  column?: number
}

// Validate
const validateJSON = function (input: string): ValidateJson {
  try {
    return {
      valid: true, // Always return true cause false would go to catch(error)
      jsonObject: JSON.parse(input), // Parser will throw syntax error if wrong JSON
    }
  } catch (error) {
    // Check for SyntaxError otherwise error is of type unknown
    if (error instanceof SyntaxError) {
      const line = error.message.split('line ')[1].split('column')[0]
      const column = error.message.split('column ')[1].split(')')[0]
      return {
        valid: false,
        errorMessage: error.message,
        line: line ? Number(line) : 0,
        column: column ? Number(column) : 0,
      }
    }
    // Edge case for non-Syntax errors
    return {
      valid: false,
      errorMessage: 'An error of unknown instance has occurred.',
      line: 0,
      column: 0,
    }
  }
}

// Format JSON
const formatJSON = function (input: JsonValue, space: number): string {
  return JSON.stringify(input, null, space)
}

// Minify JSON
const minifyJSON = function (input: JsonValue): string {
  return JSON.stringify(input)
}
