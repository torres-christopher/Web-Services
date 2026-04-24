import { Router } from 'express'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import pocetZnakuRouter from './pocet-znaku/pocet-znaku.routes.js'
import { tools } from '../../../shared/data/tools.js'

const router = Router()

// Category index/text
router.get('/', (_req, res) => {
  res.render('pages/tools/text/text', {
    ...buildSeoMeta({
      title: 'Textové nástroje',
      description:
        'Bezplatné online nástroje pro práci s textem. Počítání znaků, převod písmen, čištění textu a další.',
      path: '/textove-nastoje',
    }),
    toolCategory: 'Textové nástroje',
    toolCategoryPath: '/textove-nastoje',
    tools: tools.filter((t) => t.enabled).slice(0, 6),
  })
})

// Tools
router.use('/pocet-znaku', pocetZnakuRouter)

export default router
