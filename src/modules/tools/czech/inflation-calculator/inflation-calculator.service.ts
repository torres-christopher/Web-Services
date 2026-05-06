import type {
  InflationRealInput,
  InflationCustomInput,
  InflationOutput,
} from './inflation-calculator.schema.js'
import { cpiMonthly, cpiYearly } from '../../../../shared/data/tools/czech/cpi.js'

export const calculateRealInflation = function (input: InflationRealInput): InflationOutput {
  let startValue, endValue: number
  if (input.startMonth != 'average' && input.endMonth != 'average') {
    startValue = cpiMonthly[
      `${input.startYear}-${input.startMonth < 10 ? '0' + input.startMonth : input.startMonth}`
    ] as number
    endValue = cpiMonthly[
      `${input.endYear}-${input.endMonth < 10 ? '0' + input.endMonth : input.endMonth}`
    ] as number
  } else {
    startValue =
      input.startMonth === 'average'
        ? cpiYearly[input.startYear]
        : ((startValue =
            cpiMonthly[
              `${input.startYear}-${input.startMonth < 10 ? '0' + input.startMonth : input.startMonth}`
            ]) as number)
    endValue =
      input.endMonth === 'average'
        ? cpiYearly[input.endYear]
        : (cpiMonthly[
            `${input.endYear}-${input.endMonth < 10 ? '0' + input.endMonth : input.endMonth}`
          ] as number)
  }

  return input.value * (endValue / startValue)
}

export const calculateCustomInflation = function (input: InflationCustomInput): InflationOutput {
  let result: number = input.value
  if (input.type === 'forward') {
    result = result * ((100 + input.interestRate) / 100) ** input.years
  } else {
    result = result / ((100 + input.interestRate) / 100) ** input.years
  }
  return result
}
