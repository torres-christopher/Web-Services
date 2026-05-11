import type {
  InflationRealInput,
  InflationCustomInput,
  InflationOutput,
} from './inflation-calculator.schema.js'

import { cpiMonthly, cpiYearly } from '../../../../shared/data/tools/czech/cpi.js'

// -------- Helper Functions --------------- //
// Helper function for monthly key
const monthlyKey = (year: number, month: number): string => {
  return `${year}-${String(month).padStart(2, '0')}`
}

// Helper function get CPI value
const getCpiValue = (year: number, month: number | 'average'): number => {
  if (month === 'average') {
    const value = cpiYearly[year]
    if (value === undefined) {
      throw new Error(`Missing yearly CPI data for year: ${year}`)
    }
    return value
  }

  const key = monthlyKey(year, month)
  const value = cpiMonthly[key]

  if (value === undefined) {
    throw new Error(`Missing monthly CPI data for: ${key}`)
  }

  return value
}

// -------- Service Functions --------------- //
// Real inflation calculation
export const calculateInflationAdjustedValue = function (
  input: InflationRealInput,
): InflationOutput {
  const startValue = getCpiValue(input.startYear, input.startMonth)

  const endValue = getCpiValue(input.endYear, input.endMonth)

  return input.value * (endValue / startValue)
}

// Custom inflation calculation
export const calculateCustomInflation = function (input: InflationCustomInput): InflationOutput {
  const factor = (100 + input.inflationRate) / 100

  if (input.type === 'forward') {
    return input.value * factor ** input.years
  }

  return input.value / factor ** input.years
}
