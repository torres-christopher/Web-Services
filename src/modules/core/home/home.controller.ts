import { catchAsync } from '../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'

export const getMain = catchAsync(async (req, res) => {
  res.render('pages/core/home', {
    ...buildSeoMeta({
      title: 'Bezplatné české online nástroje',
      description:
        'Více než 60 bezplatných nástrojů pro práci s textem, převody jednotek a dalšími daty. Zdarma, bez registrace.',
      path: '/',
    }),
  })
})

export const getFAQ = catchAsync(async (req, res) => {
  res.render('pages/core/info/faq', {
    ...buildSeoMeta({
      title: 'Často kladené otázky', //TODO: Get better text
      description: 'Nejčastěji kladené otázky',
      path: '/faq',
    }),
  })
})
