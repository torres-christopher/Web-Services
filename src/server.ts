import { app } from './app.js'
import { env } from './config/env.js'

const server = app.listen(env.PORT, () => {
  console.log(`
  ┌─────────────────────────────────────────┐
  │                                         │
  │   Web Services running                  │
  │                                         │
  │   Local:  http://localhost:${env.PORT}         │
  │   Env:    ${env.NODE_ENV}                   │
  │                                         │
  └─────────────────────────────────────────┘
  `)
})

// TODO
// Unhandled promise rejection
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason)
  server.close(() => process.exit(1))
})

// TODO
// Unhandled unchanght exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error)
  server.close(() => process.exit(1))
})
