'use strict'

const textArea = document.getElementById('text')
const buttons = document.querySelectorAll('.conversion-buttons button')

buttons.forEach((button) => {
  button.addEventListener('click', function (event) {
    event.preventDefault()
    let result = ''
    const conversionType = button.value
    switch (conversionType) {
      case 'sentence-case':
        result = textArea.value
          .toLocaleLowerCase()
          .replace(/(^\s*\p{L})|([.!?]\s+\p{L})/gu, (match) => match.toLocaleUpperCase())
        break
      case 'lower-case':
        result = textArea.value.toLocaleLowerCase()
        break
      case 'upper-case':
        result = textArea.value.toLocaleUpperCase()
        break
      case 'capitalized-case':
        result = textArea.value
          .toLocaleLowerCase()
          .replace(/\p{L}+/gu, (word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
        break
      case 'reverse':
        result = textArea.value.split('').reverse().join('')
        break
    }
    textArea.value = result
  })
})
