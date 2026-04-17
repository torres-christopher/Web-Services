import { app } from './app.js'
import { env } from './config/env.js'

const server = app.listen(env.PORT, () => {
  console.log(`
  ┌─────────────────────────────────────────┐
  │                                         │
  │   Web Services running                  │
  │                                         │
  │   Local:  http://localhost:${env.PORT}  │
  │   Env:    ${env.NODE_ENV}               │
  │                                         │
  └─────────────────────────────────────────┘
  `)
})

// TODO
// Unhandled promise rejection

// TODO
// Unhandled unchanght exceptions
