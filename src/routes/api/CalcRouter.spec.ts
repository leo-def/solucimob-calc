'use strict'

import req from 'supertest'
import { loadApp } from '../../config/AppLoader'
import { CalcResponse } from '../../types/api/calc/CalcResponse'

jest.useFakeTimers()

test('[GET] /', async () => {
  const app = await loadApp()
  const m2 = 400
  const res = await (req(app)
    .post('/calc/')
    .type('form')
    .send({ m2 })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
  )
  const obj: CalcResponse = new CalcResponse(res.text)
  expect(obj).not.toBeNull()
  expect(obj).not.toBeUndefined()
  await expect(obj.valor).toBe(obj.valorM2 * m2)
})
