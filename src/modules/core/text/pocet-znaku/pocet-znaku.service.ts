import { type pocetZnakuInput, type pocetZnakuOutput } from './pocet-znaku.schema.js'

export const calculatePocetZnaku = function(input: pocetZnakuInput): pocetZnakuOutput {
    const outputObject: pocetZnakuOutput = {
        textLengthRaw: calculateTextLengthRaw(input.text),
        textLengthNoSpace: calculateTextLengthNoSpace(input.text),
        wordCount: calculateWordCount(input.text),
        nsCount: calculateNsCount(input.text),
        lineCount: calculateLineCount(input.text),
        sentenceCount: calculateSentenceCount(input.text),
        readingTime: calculateReadingTime(input.text),
    }
    return outputObject
}

// Text length raw
const calculateTextLengthRaw = function(input: string):number {
    return input.length
}

// Text length without spaces
const calculateTextLengthNoSpace = function(input: string):number {
    return input.replace(/\s/g, '').length
}

// Word amount
const calculateWordCount = function(input: string): number {
    if (isWhitespaceString(input)) return 0
    return input.trim().split(/\s+/).length
}

// Sentence count
const calculateSentenceCount = function(input: string):number {
    if (isWhitespaceString(input)) return 0
    const sentenceCount = input.match(/[\w)][.?!](\s|$)/g) 
    return !sentenceCount ? 0 : sentenceCount.length
}

// NS length with space
const calculateNsCount = function(input: string):number {
    const textLength: number = calculateTextLengthRaw(input)
    return textLength/1800
}

// Line count
const calculateLineCount = function(input: string):number {
    if (isWhitespaceString(input)) return 0
    return input.trim().split(/\r\n|\r|\n/).length
}

// Reading time rounded upwards
const calculateReadingTime = function(input: string):number {
    const wordCount = calculateWordCount(input)
    return Math.ceil(wordCount/200)
}

// Check if string is just whitespace
const isWhitespaceString = (input: string): boolean => !input.replace(/\s/g, '').length