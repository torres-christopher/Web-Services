import type {
  prevodVelikostiZnakuInput,
  prevodVelikostiZnakuOutput,
} from './prevod-velikosti-znaku.schema.js'

// Sentence Case
export const sentenceCase = function (
  input: prevodVelikostiZnakuInput,
): prevodVelikostiZnakuOutput {
  return input.text
    .toLocaleLowerCase()
    .replace(/(^\s*\w)|([.!?]\s+\w)/g, (match) => match.toLocaleUpperCase())
}

// Lower Case
export const lowerCase = function (input: prevodVelikostiZnakuInput): prevodVelikostiZnakuOutput {
  return input.text.toLocaleLowerCase()
}

// Upper Case
export const upperCase = function (input: prevodVelikostiZnakuInput): prevodVelikostiZnakuOutput {
  return input.text.toLocaleUpperCase()
}

// Capitalized Case
export const capitalizeCase = function (
  input: prevodVelikostiZnakuInput,
): prevodVelikostiZnakuOutput {
  return input.text
    .toLocaleLowerCase()
    .replace(/\p{L}+/gu, (word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
}

// Reverse text
export const reverseText = function (input: prevodVelikostiZnakuInput): prevodVelikostiZnakuOutput {
  return input.text.split('').reverse().join('')
}
