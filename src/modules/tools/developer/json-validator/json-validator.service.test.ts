import { describe, it, expect } from 'vitest'
import { jsonValidateFormat } from './json-validator.service.js'
import type { JsonValidatorInput, JsonValidatorOutput } from './json-validator.schema.js'

describe('jsonValidateFormat', () => {
  // Correctly validates JSON when given correct one
  it('Correctly validaes JSON that has no errors', () => {
    const input: JsonValidatorInput = {
      text: `{
        "product": "Live JSON generator",
        "version": 3.1,
        "releaseDate": "2014-06-25T00:00:00.000Z",
        "demo": true,
        "person": {
          "id": 12345,
          "name": "John Doe",
          "phones": {
            "home": "800-123-4567",
            "mobile": "877-123-1234"
          },
          "email": [
            "jd@example.com",
            "jd@example.org"
          ],
          "dateOfBirth": "1980-01-02T00:00:00.000Z",
          "registered": true,
          "emergencyContacts": [
            {
              "name": "Jane Doe",
              "phone": "888-555-1212",
              "relationship": "spouse"
            },
            {
              "name": "Justin Doe",
              "phone": "877-123-1212",
              "relationship": "parent"
            }
          ]
        }
      }`,
      actionType: 'validate',
      space: 1,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
  })

  // Formatting 2 tabs
  it('Formats JSON from minified version to a 2 space', () => {
    const input: JsonValidatorInput = {
      text: `{"product":"Live JSON generator","version":3.1,"releaseDate":"2014-06-25T00:00:00.000Z","demo":true,"person":{"id":12345,"name":"John Doe","phones":{"home":"800-123-4567","mobile":"877-123-1234"}}}`,
      actionType: 'format',
      space: 2,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
    expect(result.result).toBe(`{
  "product": "Live JSON generator",
  "version": 3.1,
  "releaseDate": "2014-06-25T00:00:00.000Z",
  "demo": true,
  "person": {
    "id": 12345,
    "name": "John Doe",
    "phones": {
      "home": "800-123-4567",
      "mobile": "877-123-1234"
    }
  }
}`)
  })

  // Formatting 4 tabs
  it('Formats JSON from minified version to a 4 space', () => {
    const input: JsonValidatorInput = {
      text: `{"product":"Live JSON generator","version":3.1,"releaseDate":"2014-06-25T00:00:00.000Z","demo":true,"person":{"id":12345,"name":"John Doe","phones":{"home":"800-123-4567","mobile":"877-123-1234"}}}`,
      actionType: 'format',
      space: 4,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
    expect(result.result).toBe(`{
    "product": "Live JSON generator",
    "version": 3.1,
    "releaseDate": "2014-06-25T00:00:00.000Z",
    "demo": true,
    "person": {
        "id": 12345,
        "name": "John Doe",
        "phones": {
            "home": "800-123-4567",
            "mobile": "877-123-1234"
        }
    }
}`)
  })

  // Minifying
  it('Minifies JSON correctly', () => {
    const input: JsonValidatorInput = {
      text: `{
        "product": "Live JSON generator",
        "version": 3.1,
        "releaseDate": "2014-06-25T00:00:00.000Z",
        "demo": true,
        "person": {
          "id": 12345,
          "name": "John Doe",
          "phones": {
            "home": "800-123-4567",
            "mobile": "877-123-1234"
          }
        }
      }`,
      actionType: 'minify',
      space: 4,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
    expect(result.result).toBe(
      `{"product":"Live JSON generator","version":3.1,"releaseDate":"2014-06-25T00:00:00.000Z","demo":true,"person":{"id":12345,"name":"John Doe","phones":{"home":"800-123-4567","mobile":"877-123-1234"}}}`,
    )
  })

  // Invalid JSON
  it('Handles incorrect JSON correctly and returns proper line', () => {
    const input: JsonValidatorInput = {
      text: `{"product":"Live JSON generator","version:3.1}`,
      actionType: 'validate',
      space: 4,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(false)
    expect(result.errorMessage).toContain(`Unterminated string in JSON at position`)
    expect(result.errorPosition).toBeDefined()
    expect(result.errorPosition!.line).toBe(1) // Adding exclamation marks as undefined is checked above
    expect(result.errorPosition!.column).toBe(47)
  })

  // No JSON, just empty string
  it('Handles empty string gracefully', () => {
    const input: JsonValidatorInput = {
      text: ``,
      actionType: 'validate',
      space: 4,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(false)
    expect(result.errorMessage).toContain(`Unexpected end of JSON input`)
    expect(result.errorPosition).toBeDefined()
    expect(result.errorPosition!.line).toBe(null) // Adding exclamation marks as undefined is checked above
    expect(result.errorPosition!.column).toBe(null)
  })

  // Valid value, but not JSON - String
  it('Handles valid values but not JSON gracefully - String', () => {
    const input: JsonValidatorInput = {
      text: `"hello"`,
      actionType: 'validate',
      space: 4,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
    expect(result.result).toBe('"hello"')
  })

  // Valid value, but not JSON - Number
  it('Handles valid values but not JSON gracefully - Number', () => {
    const input: JsonValidatorInput = {
      text: `1234`,
      actionType: 'validate',
      space: 4,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
    expect(result.result).toBe('1234')
  })

  // Valid value, but not JSON - Boolean
  it('Handles valid values but not JSON gracefully - Boolean', () => {
    const input: JsonValidatorInput = {
      text: `true`,
      actionType: 'validate',
      space: 4,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
    expect(result.result).toBe('true')
  })

  // Valid value, but not JSON - Null
  it('Handles valid values but not JSON gracefully - Null', () => {
    const input: JsonValidatorInput = {
      text: `null`,
      actionType: 'validate',
      space: 4,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
    expect(result.result).toBe('null')
  })

  // Valid value, but not JSON - Array
  it('Handles valid values but not JSON gracefully - Array', () => {
    const input: JsonValidatorInput = {
      text: `[]`,
      actionType: 'validate',
      space: 4,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
    expect(result.result).toBe('[]')
  })

  // Valid value, but not JSON - Object
  it('Handles valid values but not JSON gracefully - Object', () => {
    const input: JsonValidatorInput = {
      text: `{}`,
      actionType: 'validate',
      space: 4,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
    expect(result.result).toBe('{}')
  })

  // Valid JSON with non-ASCII characters
  it('Handles non-ASCII characters correctly', () => {
    const input: JsonValidatorInput = {
      text: `{"czech":"Ján Novák","cyrillic":"Привет","arabic":"مرحبا","chinese":"日本語","emoji":"🎉"}`,
      actionType: 'validate',
      space: 2,
    }
    const result: JsonValidatorOutput = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
    expect(result.result).toContain('Ján Novák')
    expect(result.result).toContain('Привет')
    expect(result.result).toContain('مرحبا')
    expect(result.result).toContain('日本語')
    expect(result.result).toContain('🎉')
  })
})
