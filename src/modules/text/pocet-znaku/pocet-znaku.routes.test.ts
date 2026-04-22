import express from 'express'
import { getPocetZnaku, postPocetZnaku } from './pocet-znaku.controller.js'

const router = express.Router()

router.get('/pocet-znaku', getPocetZnaku)
router.post('/pocet-znaku', postPocetZnaku)

export default router
