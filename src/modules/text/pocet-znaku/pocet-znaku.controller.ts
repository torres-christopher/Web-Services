import { catchAsync } from '../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../shared/utils/seo.js'

export const getPocetZnaku = catchAsync(async (req, res) => {
  res.render('pages/home', {
    ...buildSeoMeta({
      //TODO: Get better text
      title: 'Počet znaků - Počítadlo znaků',
      description: 'Počet znaků - Počítadlo znaků',
      path: '/',
    }),
  })
})

export const postPocetZnaku = catchAsync(async (req, res) => {
  console.log(req.body)
  res.render('pages/home', {
    ...buildSeoMeta({
      //TODO: Get better text
      title: 'Počet znaků - Počítadlo znaků',
      description: 'Počet znaků - Počítadlo znaků',
      path: '/',
    }),
  })
})
