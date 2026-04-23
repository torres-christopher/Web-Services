import { Router } from 'express'
import healthRouter from './health/health.routes.js'
import mainRouter from './home/home.routes.js'
import legalRouter from './legal/legal.routes.js'

const router = Router()

router.use('/', mainRouter, legalRouter, healthRouter)

export default router
