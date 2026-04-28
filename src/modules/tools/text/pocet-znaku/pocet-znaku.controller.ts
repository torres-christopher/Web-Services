import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { tools } from '../../../../shared/data/tools.js'
import { pocetZnakuInput } from './pocet-znaku.schema.js'
import { calculatePocetZnaku } from './pocet-znaku.service.js'
import { pocetZnakuFaq as faq } from './pocet-znaku.faq.js'

// Get tool details
const tool = tools.find((t) => t.slug === 'pocet-znaku')
if (!tool) throw new Error('Tool not found: pocet-znaku')

export const getPocetZnaku = catchAsync(async (req, res) => {
  res.render('pages/tools/text/pocet-znaku', {
    ...buildSeoMeta(tool),
    faq,
  })
})

export const postPocetZnaku = catchAsync(async (req, res) => {
  // Validate input
  const input = pocetZnakuInput.safeParse(req.body.text)
  let result = null
  let errorState: boolean = false
  let errorMessage: string | null = null
  let status: number = 200

  // On error
  if (!input.success) {
    errorState = true
    errorMessage = 'Text je příliš dlouhý. Maximální délka je 300 000 znaků.'
    status = 400
  } else {
    result = calculatePocetZnaku(input.data)
  }

  res.status(status).render('pages/tools/text/pocet-znaku', {
    ...buildSeoMeta(tool),
    faq,
    text: input.data ? input.data : req.body.text,
    result: result,
    errorState,
    errorMessage,
  })
})
