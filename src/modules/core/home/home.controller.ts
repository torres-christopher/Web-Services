import { catchAsync } from '../../../shared/utils/catchAsync.js'
import { AppError } from '../../../shared/types/errors.js'

export const getMain = catchAsync(async (req, res, next) => {
  res.render('pages/home', {
    title: 'Domovská stránka',
    canonicalath: '/',
  })
})
