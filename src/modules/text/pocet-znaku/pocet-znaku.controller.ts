import { catchAsync } from '../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../shared/utils/seo.js'
import { pocetZnakuInput } from './pocet-znaku.schema.js'
import { calculatePocetZnaku } from './pocet-znaku.service.js'

export const getPocetZnaku = catchAsync(async (req, res) => {
  res.render('pages/tools/text/pocet-znaku', {
    ...buildSeoMeta({
      title: 'Počet znaků',
      description:
        'Spočítejte počet znaků, slov, vět, řádků a normostran v textu. Zdarma, bez registrace.',
      path: '/text/pocet-znaku',
      category: 'Text',
      categoryPath: '/text',
    }),
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
    errorMessage = 'Text je příliš dlouhý. Maximální délka je 100 000 znaků.'
    status = 400
  } else {
    result = calculatePocetZnaku(input.data)
  }

  res.status(status).render('pages/tools/text/pocet-znaku', {
    ...buildSeoMeta({
      title: 'Počet znaků',
      description:
        'Spočítejte počet znaků, slov, vět, řádků a normostran v textu. Zdarma, bez registrace.',
      path: '/text/pocet-znaku',
      category: 'Text',
      categoryPath: '/text',
    }),
    text: input.data ? input.data : req.body.text,
    result: result,
    errorState,
    errorMessage,
  })
})
