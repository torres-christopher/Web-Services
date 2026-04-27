import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { tools } from '../../../../shared/data/tools.js'
import { jsonValidatorInput } from './json-validator.schema.js'
import { jsonValidateFormat } from './json-validator.service.js'
import { jsonValidatorFaq as faq } from './json-validator.faq.js'

// Get tool details
const tool = tools.find((t) => t.slug === 'json-validator')
if (!tool) throw new Error('Tool not found: json-validator')

export const getJsonValidator = catchAsync(async (req, res) => {
  res.render('pages/tools/developer/json-validator', {
    ...buildSeoMeta(tool),
    faq,
  })
})

export const postJsonValidator = catchAsync(async (req, res) => {
  // Validate input
  const input = jsonValidatorInput.safeParse({
    text: req.body.text,
    actionType: req.body.actionType,
    space: req.body.space,
  })
  let result = null
  let errorMessage: string | null = null
  let status: number = 200 // On error
  if (!input.success) {
    errorMessage = 'Text je příliš dlouhý. Maximální délka je 300 000 znaků.'
    status = 400
  } else {
    result = jsonValidateFormat(input.data)
  }

  res.status(status).render('pages/tools/developer/json-validator', {
    ...buildSeoMeta(tool),
    faq,
    result: result,
    errorMessage: errorMessage ? errorMessage : result?.errorMessage,
    errorPosition: result?.errorPosition,
  })
})
