'use strict'

// Hide no-JS variants first
const textAreas = document.querySelectorAll('textarea.json-panel__editor')
textAreas.forEach((textArea) => {
  textArea.hidden = true
})

// Run editor on input
var editorInput = ace.edit('ace-input')
editorInput.setTheme('ace/theme/textmate')
editorInput.session.setMode('ace/mode/json')

// Set initial JSON data
const input = document.getElementById('text').value
editorInput.setValue(input, 1)

// Run editor on output
var editorOutput = ace.edit('ace-output')
editorOutput.setTheme('ace/theme/textmate')
editorOutput.session.setMode('ace/mode/json')
editorOutput.setReadOnly(true)
const output = document.getElementById('output-text').value
editorOutput.setValue(output, 1)

// Add editor data to form
document.getElementById('json-form').onsubmit = function () {
  getVal()
}

// Get data from editor
function getVal() {
  var code = editorInput.getSession().getValue()
  document.getElementById('text').value = code
}
