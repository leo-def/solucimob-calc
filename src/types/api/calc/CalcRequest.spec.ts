'use strict'

import { CalcRequest } from './CalcRequest'

jest.useFakeTimers()
test('CalcRequest.toDto', async () => {
  const mock = ({
    m2: 100, valor: 200, valorM2: 2
  })
  const obj = new CalcRequest(mock).toDTO()
  expect(obj).not.toBeNull()
  expect(obj).not.toBeUndefined()
  expect(obj.m2).toBe(mock.m2)
})