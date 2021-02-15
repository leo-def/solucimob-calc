'use strict'

import { CalcResponse } from './CalcResponse'

jest.useFakeTimers()

test('CalcResponse.toDto', async () => {
  const mock = ({
    m2: 100, valor: 200, valorM2: 2
  })
  const obj = new CalcResponse(mock).toDTO()
  expect(obj).not.toBeNull()
  expect(obj).not.toBeUndefined()
  expect(obj.m2).toBe(mock.m2)
  expect(obj.valor).toBe(mock.valor)
  expect(obj.valorM2).toBe(mock.valorM2)
})
