'use strict'

import { ConfigResponse } from './ConfigResponse'

jest.useFakeTimers()

test('ConfigResponse.toDto', async () => {
  const mock = ({
    m2: 100, valor: 200, valorM2: 2
  })
  const obj = new ConfigResponse(mock).toDTO()
  expect(obj).not.toBeNull()
  expect(obj).not.toBeUndefined()
  expect(obj.valorM2).toBe(mock.valorM2)
})
