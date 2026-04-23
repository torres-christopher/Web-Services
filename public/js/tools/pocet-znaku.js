'use strict'

// Check for whitespace
function isWhitespaceString(input) {
  return !input.replace(/\s/g, '').length
}

// Calculate all of the results
function calculate(text) {
  // Check for whitespace
  const whiteSpaceCheck = isWhitespaceString(text)
  // Raw Text
  const textLengthRaw = text.length
  // Text without space
  const textLengthNoSpace = text.replace(/\s/g, '').length
  // Words
  const wordHasLetters = text.match(/[a-zA-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽáčďéěíňóřšťúůýž]+/g)
  const wordCount = whiteSpaceCheck ? 0 : wordHasLetters ? wordHasLetters.length : 0
  // Sentences
  const sentenceHasLetters = !text.match(/[a-zA-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽáčďéěíňóřšťúůýž]/)
  const sentenceHasWords = text.match(
    /[a-zA-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽáčďéěíňóřšťúůýž]{3,}[.?!]+\s+[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g,
  )
  const sentenceCount = whiteSpaceCheck
    ? 0
    : sentenceHasLetters
      ? 0
      : sentenceHasWords
        ? sentenceHasWords.length + 1
        : 0
  // NS count
  const nsCount = textLengthRaw / 1800
  // Line count
  const lineCount = whiteSpaceCheck ? 0 : text.trim().split(/\r\n|\r|\n/).length
  // Reading time
  const readingTime = whiteSpaceCheck ? 0 : Math.ceil(wordCount / 200)
  return {
    textLengthRaw,
    textLengthNoSpace,
    wordCount,
    sentenceCount,
    nsCount,
    lineCount,
    readingTime,
  }
}

// Event UI update function
function updateUI(result) {
  document.getElementById('stat-raw').textContent = result.textLengthRaw
  document.getElementById('stat-nospace').textContent = result.textLengthNoSpace
  document.getElementById('stat-words').textContent = result.wordCount
  document.getElementById('stat-sentences').textContent = result.sentenceCount
  document.getElementById('stat-ns').textContent = result.nsCount.toFixed(2)
  document.getElementById('stat-lines').textContent = result.lineCount
  document.getElementById('stat-reading').textContent = result.readingTime
}

// Event listener for the text area
const textArea = document.getElementById('text')
textArea.addEventListener('input', function () {
  const result = calculate(textArea.value)
  updateUI(result)
})
