import express from 'express'
import { getMain } from './home.controller.js'

const router = express.Router()

router.get('/', getMain)

export default router
