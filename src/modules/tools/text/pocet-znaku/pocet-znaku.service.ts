import type { PocetZnakuInput, PocetZnakuOutput } from './pocet-znaku.schema.js'

export const calculatePocetZnaku = function (input: PocetZnakuInput): PocetZnakuOutput {
  return {
    textLengthRaw: calculateTextLengthRaw(input),
    textLengthNoSpace: calculateTextLengthNoSpace(input),
    wordCount: calculateWordCount(input),
    sentenceCount: calculateSentenceCount(input),
    nsCount: calculateNsCount(input),
    lineCount: calculateLineCount(input),
    readingTime: calculateReadingTime(input),
  }
}

// Text length raw
const calculateTextLengthRaw = function (input: PocetZnakuInput): number {
  return input.length
}

// Text length without spaces
const calculateTextLengthNoSpace = function (input: PocetZnakuInput): number {
  return input.replace(/\s/g, '').length
}

// Word amount
const calculateWordCount = function (input: PocetZnakuInput): number {
  if (isWhitespaceString(input)) return 0
  const words = input.match(/\p{L}+/gu)
  return words ? words.length : 0
}

// Sentence count
const calculateSentenceCount = function (input: PocetZnakuInput): number {
  if (isWhitespaceString(input)) return 0

  // Strip text that has no real words at all
  if (!input.match(/\p{L}/u)) return 0

  // Count boundaries — word of 4+ chars, then punctuation, then capital
  const boundaries = input.match(/\p{L}{3,}[.?!]+\s+\p{Lu}/gu)
  const boundaryCount = boundaries ? boundaries.length : 0

  return boundaryCount + 1
}

// NS length with space
const calculateNsCount = function (input: PocetZnakuInput): number {
  const textLength: number = calculateTextLengthRaw(input)
  return textLength / 1800
}

// Line count
const calculateLineCount = function (input: PocetZnakuInput): number {
  if (isWhitespaceString(input)) return 0
  return input.trim().split(/\r\n|\r|\n/).length
}

// Reading time rounded upwards
const calculateReadingTime = function (input: PocetZnakuInput): number {
  if (isWhitespaceString(input)) return 0
  const wordCount = calculateWordCount(input)
  return Math.ceil(wordCount / 200)
}

// Check if string is just whitespace
const isWhitespaceString = (input: PocetZnakuInput): boolean => !input.replace(/\s/g, '').length
