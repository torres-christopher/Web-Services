import { type pocetZnakuInput, type pocetZnakuOutput } from './pocet-znaku.schema.js'

export const calculatePocetZnaku = function (input: pocetZnakuInput): pocetZnakuOutput {
  const outputObject: pocetZnakuOutput = {
    textLengthRaw: calculateTextLengthRaw(input.text),
    textLengthNoSpace: calculateTextLengthNoSpace(input.text),
    wordCount: calculateWordCount(input.text),
    sentenceCount: calculateSentenceCount(input.text),
    nsCount: calculateNsCount(input.text),
    lineCount: calculateLineCount(input.text),
    readingTime: calculateReadingTime(input.text),
  }
  return outputObject
}

// Text length raw
const calculateTextLengthRaw = function (input: string): number {
  return input.length
}

// Text length without spaces
const calculateTextLengthNoSpace = function (input: string): number {
  return input.replace(/\s/g, '').length
}

// Word amount
const calculateWordCount = function (input: string): number {
  if (isWhitespaceString(input)) return 0
  const words = input.match(/[a-zA-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽáčďéěíňóřšťúůýž]+/g)
  return words ? words.length : 0
}

// Sentence count
const calculateSentenceCount = function (input: string): number {
  if (isWhitespaceString(input)) return 0

  // Strip text that has no real words at all
  if (!input.match(/[a-zA-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽáčďéěíňóřšťúůýž]/)) return 0

  // Count boundaries — word of 4+ chars, then punctuation, then capital
  const boundaries = input.match(
    /[a-zA-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽáčďéěíňóřšťúůýž]{3,}[.?!]+\s+[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g,
  )
  const boundaryCount = boundaries ? boundaries.length : 0

  return boundaryCount + 1
}

// NS length with space
const calculateNsCount = function (input: string): number {
  const textLength: number = calculateTextLengthRaw(input)
  return textLength / 1800
}

// Line count
const calculateLineCount = function (input: string): number {
  if (isWhitespaceString(input)) return 0
  return input.trim().split(/\r\n|\r|\n/).length
}

// Reading time rounded upwards
const calculateReadingTime = function (input: string): number {
  if (isWhitespaceString(input)) return 0
  const wordCount = calculateWordCount(input)
  return Math.ceil(wordCount / 200)
}

// Check if string is just whitespace
const isWhitespaceString = (input: string): boolean => !input.replace(/\s/g, '').length
