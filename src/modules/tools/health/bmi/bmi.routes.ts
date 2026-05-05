import { Router } from 'express'
import { getBmi, postBmi } from './bmi.controller.js'

const router = Router()

router.get('/', getBmi)
router.post('/', postBmi)

export default router
