import { Router } from 'express'
import { buildSeoMeta } from '../../shared/utils/seo.js'
import pocetZnakuRouter from './pocet-znaku/pocet-znaku.routes.js'

const router = Router()

// Category index/text
router.get('/', (_req, res) => {
  res.render('pages/tools/text/text', {
    ...buildSeoMeta({
      title: 'Textové nástroje',
      description:
        'Bezplatné online nástroje pro práci s textem. Počítání znaków, převod písmen, čištění textu a další.',
      path: '/text',
    }),
    toolCategory: 'Text',
    toolCategoryPath: '/text',
  })
})

// Tools
router.use('/pocet-znaku', pocetZnakuRouter)

export default router
