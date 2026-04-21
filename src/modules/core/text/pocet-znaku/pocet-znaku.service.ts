import { type pocetZnakuInput, type pocetZnakuOutput } from './pocet-znaku.schema.js'

export const calculatePocetZnaku = function(input: pocetZnakuInput): pocetZnakuOutput {
    const outputObject: pocetZnakuOutput = {
        textLength: calculateTextLength(input.text),
        wordCount: calculateWordCount(input.text),
        nsCount: calculateNsCount(input.text),
    }
    return outputObject
}

// Text length
const calculateTextLength = function(input: string):number {
    return input.length
}

// Word amount
const calculateWordCount = function(input: string): number {
    return input.split(" ").length
}

// NS length
const calculateNsCount = function(input: string):number {
    const textLength: number = calculateTextLength(input)
    return textLength/1800
}