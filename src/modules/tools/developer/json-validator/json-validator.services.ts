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
      errorPosition: {
        line: valid.line,
        column: valid.line,
      },
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
    // Parser will throw syntax error if wrong JSON
    JSON.parse(input)
    return {
      valid: true, // Always return true cause false would go to catch(error)
    }
  } catch (error) {
    // Check for SyntaxError otherwise error is of type unknown
    if (error instanceof SyntaxError) {
      const line = error.message.split('line ')[1].split('column')[0]
      const column = error.message.split('column ')[1].split(')')[0]
      return {
        valid: false,
        line: line ? Number(line) : 0,
        column: column ? Number(column) : 0,
      }
    }
    // Edge case for non-Syntax errors
    return {
      valid: false,
      line: 0,
      column: 0,
    }
  }
}

// Format JSON
const formatJSON = function (input: string): string {
  return input
}

// Minify JSON
const minifyJSON = function (input: string): string {
  return input
}
