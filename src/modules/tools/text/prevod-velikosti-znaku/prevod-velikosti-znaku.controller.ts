import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { tools } from '../../../../shared/data/tools.js'
import { prevodVelikostiZnakuInput } from './prevod-velikosti-znaku.schema.js'
import {
  sentenceCase,
  lowerCase,
  upperCase,
  capitalizeCase,
  reverseText,
} from './prevod-velikosti-znaku.service.js'
import { prevodVelikostiZnakuFaq as faq } from './prevod-velikosti-znaku.faq.js'

// Get tool details
const tool = tools.find((t) => t.slug === 'prevod-velikosti-znaku')
if (!tool) throw new Error('Tool not found: prevod-velikosti-znaku')

export const getPrevodVelikostiZnaku = catchAsync(async (req, res) => {
  res.render('pages/tools/text/prevod-velikosti-znaku', {
    ...buildSeoMeta(tool),
    faq,
  })
})

export const postPrevodVelikostiZnaku = catchAsync(async (req, res) => {
  let result = null
  let errorState: boolean = false
  let errorMessage: string | null = null
  let status: number = 200

  // Validate input
  const input = prevodVelikostiZnakuInput.safeParse({
    text: req.body.text,
    conversionType: req.body.conversionType,
  })

  // On error
  if (!input.success) {
    errorState = true
    errorMessage = 'Text je příliš dlouhý. Maximální délka je 300 000 znaků.'
    status = 400
  } else {
    switch (input.data.conversionType) {
      case 'sentence-case':
        result = sentenceCase(input.data)
        break
      case 'lower-case':
        result = lowerCase(input.data)
        break
      case 'upper-case':
        result = upperCase(input.data)
        break
      case 'capitalized-case':
        result = capitalizeCase(input.data)
        break
      case 'reverse':
        result = reverseText(input.data)
        break
    }
  }

  res.status(status).render('pages/tools/text/prevod-velikosti-znaku', {
    ...buildSeoMeta(tool),
    faq,
    result: result,
    errorState,
    errorMessage,
  })
})
