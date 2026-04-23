import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { app } from '../../../app.js'

describe('GET Health', () => {
  it('Checks that health returns status OK and timestamp exists', async () => {
    await request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('ok')
        expect(res.body.timestamp).toBeDefined()
      })
  })
})
