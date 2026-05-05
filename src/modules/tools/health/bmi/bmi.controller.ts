import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { tools } from '../../../../shared/data/tools.js'
import { bmiInput } from './bmi.schema.js'
import { calculateBmi } from './bmi.service.js'
import { bmiFaq as faq } from './bmi.faq.js'

// Get tool details
const tool = tools.find((t) => t.slug === 'bmi-kalkulacka')
if (!tool) throw new Error('Tool not found: BMI kalkulačka')

export const getBmi = catchAsync(async (req, res) => {
  res.render('pages/tools/health/bmi', {
    ...buildSeoMeta(tool),
    faq,
  })
})

export const postBmi = catchAsync(async (req, res) => {
  let result = null
  let errorMessage: string | null = null
  let status: number = 200

  // Validate input
  const input = bmiInput.safeParse({
    height: req.body.height,
    weight: req.body.weight,
  })

  if (!input.success) {
    errorMessage = 'Zadejte svou váhu.'
    status = 400
  } else {
    result = calculateBmi(input.data)
  }

  res.status(status).render('pages/tools/health/bmi', {
    ...buildSeoMeta(tool),
    faq,
    height: input.data?.height,
    weight: input.data?.weight,
    result,
    errorMessage,
  })
})
