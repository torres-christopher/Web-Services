import { describe, it, expect } from 'vitest'
import { jsonValidateFormat } from './json-validator.service.js'

describe('jsonValidateFormat', () => {
  // Lorem ipsum with three sentences
  it('Correctly validaes JSON that has no errors', () => {
    const input = {
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
    const result = jsonValidateFormat(input)
    expect(result.validJson).toBe(true)
  })
})
