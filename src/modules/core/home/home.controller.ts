import { catchAsync } from '../../../shared/utils/catchAsync.js'
import { AppError } from '../../../shared/types/errors.js'
import { buildSeoMeta } from '../../../shared/utils/seo.js'

export const getMain = catchAsync(async (req, res, next) => {
  res.render('pages/home', {
    ...buildSeoMeta({
      title: 'Domovská stránka',
      description: 'Webové nástroje v češtině pro všechny',
      path: '/',
    }),
  })
})
