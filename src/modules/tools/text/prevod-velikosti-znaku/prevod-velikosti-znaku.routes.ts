import express from 'express'
import {
  getPrevodVelikostiZnaku,
  postPrevodVelikostiZnaku,
} from './prevod-velikosti-znaku.controller.js'

const router = express.Router()

router.get('/', getPrevodVelikostiZnaku)
router.post('/', postPrevodVelikostiZnaku)

export default router
