import express from 'express'
import { getPocetZnaku, postPocetZnaku } from './pocet-znaku.controller.js'

const router = express.Router()

router.get('/', getPocetZnaku)
router.post('/', postPocetZnaku)

export default router
