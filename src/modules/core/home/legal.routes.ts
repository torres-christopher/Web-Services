import express from 'express'
import { getContact, getPrivacy, getTerms } from './legal.controller.js'

const router = express.Router()

router.get('/kontakt', getContact)
router.get('/ochrana-osobnich-udaju', getPrivacy)
router.get('/podminky-pouziti', getTerms)

export default router
