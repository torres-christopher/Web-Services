import express from 'express'
import path from 'path'
import { env } from './config/env.js'
import { localsMiddleware } from './middleware/locals.js'

// Run app
const app = express()

// Body parsing
app.use(express.json({}))
app.use(express.urlencoded({ extended: true }))

// Locals must be before routers
app.use(localsMiddleware)

// Health
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

export { app }
