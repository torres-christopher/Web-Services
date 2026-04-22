import { catchAsync } from '../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../shared/utils/seo.js'
import { pocetZnakuInput } from './pocet-znaku.schema.js'
import { AppError, HttpStatus } from '../../../shared/types/errors.js'

export const getPocetZnaku = catchAsync(async (req, res) => {
  res.render('pages/tools/text/pocet-znaku', {
    //TODO: Get better text
    ...buildSeoMeta({
      title: 'Počet znaků - Počítadlo znaků',
      description: 'Počet znaků - Počítadlo znaků',
      path: '/text/pocet-znaku',
    }),
  })
})

export const postPocetZnaku = catchAsync(async (req, res, next) => {
  // Validate input
  const input = pocetZnakuInput.safeParse(req.body.text)
  if (!input.success) {
    return next(new AppError('Vyskytla se chyba', HttpStatus.BAD_REQUEST))
  } else {
    console.log(input.data)
  }
  res.render('pages/tools/text/pocet-znaku', {
    //TODO: Get better text
    ...buildSeoMeta({
      title: 'Počet znaků - Počítadlo znaků',
      description: 'Počet znaků - Počítadlo znaků',
      path: '/text/pocet-znaku',
    }),
  })
})
