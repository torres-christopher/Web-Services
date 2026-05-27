import { app } from './app.js'
import { env } from './config/env.js'

// Padding for console.log on server listen
const pad = (str: string, width: number) => str + ' '.repeat(Math.max(0, width - str.length))

// Adding timestamp to log time
const timestamp = () => new Date().toLocaleString('sv-SE')
const log = (msg: string) => console.log(`\n[${timestamp()}] ${msg}`)
const logError = (msg: string, data?: unknown) =>
  console.error(`\n[${timestamp()}] ${msg}`, data ?? '')

// Listen to server
const server = app.listen(env.PORT, () => {
  const url = env.NODE_ENV === 'production' ? env.SITE_URL : `http://localhost:${env.PORT}`
  const nodeEnv = env.NODE_ENV

  console.log(`
  ┌─────────────────────────────────────────┐
  │                                         │
  │   Tools Haven running                   │
  │                                         │
  │   Local:  ${pad(url, 30)}│
  │   Env:    ${pad(nodeEnv, 30)}│
  │   Timestamp: ${pad(timestamp(), 27)}│
  └─────────────────────────────────────────┘
  `)
})

// Graceful shutdown
// Stop accepting connections, drain in-flight requests, then exit cleanly.
// Force-exit after 10s in case a request hangs and server.close() never completes.
const shutdown = (signal: string) => {
  log(`${signal} received, shutting down...`)
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(1), 10_000).unref()
}

process.once('SIGTERM', () => shutdown('SIGTERM')) // Platform restart/stop (Railway, Render)
process.once('SIGINT', () => shutdown('SIGINT')) // Ctrl+C in local dev

// Listen failure — port already in use, insufficient permissions, etc.
server.on('error', (error) => {
  logError('Server error:', error)
  process.exit(1)
})

// Process is in an undefined state after these — exit immediately, do not attempt graceful drain.
process.on('unhandledRejection', (reason) => {
  logError('Unhandled rejection:', reason)
  process.exit(1)
})

process.on('uncaughtException', (error) => {
  logError('Uncaught exception:', error)
  process.exit(1)
})
