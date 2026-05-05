import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { app } from '../../../../app.js'

const path = './zdravotni-nastroje/bmi-kalkulacka'

describe('/zdravotni-nastroje/bmi-kalkulacka', () => {
  it('GET returns 200', async () => {
    await request(app).get(path).expect(200)
  })

  it('POST with valid weight/height returns 200 and renders result', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({ weight: 20, height: 20 }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain('Lorem ipsum dolor') // Check that the result section appears
      })
  })
})
