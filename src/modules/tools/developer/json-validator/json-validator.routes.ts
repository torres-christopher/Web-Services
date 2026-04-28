import express from 'express'
import { getJsonValidator, postJsonValidator } from './json-validator.controller.js'

const router = express.Router()

router.get('/', getJsonValidator)
router.post('/', postJsonValidator)

export default router
