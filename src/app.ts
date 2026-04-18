// Tools
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { env } from './config/env.js'
// Middleware
import { localsMiddleware } from './middleware/locals.js'
import { notFoundHandler } from './middleware/not-found.js'
import { errorHandler } from './middleware/error-handler.js'
// Routes
import mainRouter from './modules/core/home/home.routes.js'

// Initialise dirname and filename (NodeNext does not allow)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Run app
const app = express()

// Initialise Pug templates
app.set('view engine', 'pug')
app.set('views', join(__dirname, '../views'))

// Static files
app.use(express.static(join(__dirname, '../public')))

// Body parsing
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Locals must be before routers
app.use(localsMiddleware)

// Main
app.use('/', mainRouter)

// Health
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

// 404
app.use(notFoundHandler)

// Error handler -- Needs to be last
app.use(errorHandler)

export { app }
