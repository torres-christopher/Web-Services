import { describe, it, expect } from 'vitest'
import { calculateBmi } from './bmi.service.js'

describe('calculateBmi', () => {
  // Underweight in range
  it('Correctly returns value for underweight in range', () => {
    const input = {
      weight: 50,
      height: 180,
    }
    const result = calculateBmi(input)
    expect(result.bmiValue).toBeCloseTo(15.4, 1)
    expect(result.bmiClassification).toBe('underweight')
  })

  // Normal on boundary
  it('Correctly returns value for normal on boundary', () => {
    const input = {
      weight: 60,
      height: 180,
    }
    const result = calculateBmi(input)
    expect(result.bmiValue).toBeCloseTo(18.5, 1)
    expect(result.bmiClassification).toBe('normal')
  })

  // Normal in range
  it('Correctly returns value for normal in range', () => {
    const input = {
      weight: 70,
      height: 175,
    }
    const result = calculateBmi(input)
    expect(result.bmiValue).toBeCloseTo(22.9, 1)
    expect(result.bmiClassification).toBe('normal')
  })

  // Overweight on boundary
  it('Correctly returns value for overweight on boundary', () => {
    const input = {
      weight: 81,
      height: 180,
    }
    const result = calculateBmi(input)
    expect(result.bmiValue).toBeCloseTo(25, 1)
    expect(result.bmiClassification).toBe('overweight')
  })

  // Overweight in range
  it('Correctly returns value for overweight in range', () => {
    const input = {
      weight: 90,
      height: 175,
    }
    const result = calculateBmi(input)
    expect(result.bmiValue).toBeCloseTo(29.4, 1)
    expect(result.bmiClassification).toBe('overweight')
  })

  // Obese-1 on boundary
  it('Correctly returns value for obese-1 on boundary', () => {
    const input = {
      weight: 98,
      height: 180,
    }
    const result = calculateBmi(input)
    expect(result.bmiValue).toBeCloseTo(30.2, 1)
    expect(result.bmiClassification).toBe('obese-1')
  })

  // Obese-1 in range
  it('Correctly returns value for obese-1 in range', () => {
    const input = {
      weight: 100,
      height: 170,
    }
    const result = calculateBmi(input)
    expect(result.bmiValue).toBeCloseTo(34.6, 1)
    expect(result.bmiClassification).toBe('obese-1')
  })

  // Obese-2 on boundary
  it('Correctly returns value for obese-2 on boundary', () => {
    const input = {
      weight: 115,
      height: 180,
    }
    const result = calculateBmi(input)
    expect(result.bmiValue).toBeCloseTo(35.5, 1)
    expect(result.bmiClassification).toBe('obese-2')
  })

  // Obese-2 in range
  it('Correctly returns value for obese-2 in range', () => {
    const input = {
      weight: 115,
      height: 170,
    }
    const result = calculateBmi(input)
    expect(result.bmiValue).toBeCloseTo(39.8, 1)
    expect(result.bmiClassification).toBe('obese-2')
  })

  // Obese-3 on boundary
  it('Correctly returns value for obese-3 on boundary', () => {
    const input = {
      weight: 130,
      height: 180,
    }
    const result = calculateBmi(input)
    expect(result.bmiValue).toBeCloseTo(40.1, 1)
    expect(result.bmiClassification).toBe('obese-3')
  })

  // Obese-3 in range
  it('Correctly returns value for obese-3 in range', () => {
    const input = {
      weight: 120,
      height: 170,
    }
    const result = calculateBmi(input)
    expect(result.bmiValue).toBeCloseTo(41.5, 1)
    expect(result.bmiClassification).toBe('obese-3')
  })
})
