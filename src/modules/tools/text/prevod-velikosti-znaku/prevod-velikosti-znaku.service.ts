import type {
  PrevodVelikostiZnakuInput,
  PrevodVelikostiZnakuOutput,
} from './prevod-velikosti-znaku.schema.js'

// Sentence Case
export const sentenceCase = function (
  input: PrevodVelikostiZnakuInput,
): PrevodVelikostiZnakuOutput {
  return input.text
    .toLocaleLowerCase()
    .replace(/(^\s*\p{L})|([.!?]\s+\p{L})/gu, (match) => match.toLocaleUpperCase())
}

// Lower Case
export const lowerCase = function (input: PrevodVelikostiZnakuInput): PrevodVelikostiZnakuOutput {
  return input.text.toLocaleLowerCase()
}

// Upper Case
export const upperCase = function (input: PrevodVelikostiZnakuInput): PrevodVelikostiZnakuOutput {
  return input.text.toLocaleUpperCase()
}

// Capitalized Case
export const capitalizeCase = function (
  input: PrevodVelikostiZnakuInput,
): PrevodVelikostiZnakuOutput {
  return input.text
    .toLocaleLowerCase()
    .replace(/\p{L}+/gu, (word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
}

// Reverse text
export const reverseText = function (input: PrevodVelikostiZnakuInput): PrevodVelikostiZnakuOutput {
  return input.text.split('').reverse().join('')
}
