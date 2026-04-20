import express from 'express'
import { getMain, getFAQ } from './home.controller.js'

const router = express.Router()

router.get('/', getMain)
router.get('/faq', getFAQ)

export default router
