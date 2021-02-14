'use strict'

import { ServiceEnum } from '../enums/Service.enum'
import { ServiceDiscovery } from './ServiceDiscovery'

jest.useFakeTimers()

test('ServiceDiscovery.getInstance', async () => {
  const instance = ServiceDiscovery.getInstance(ServiceEnum.calc)
  expect(instance).not.toBeNull()
  expect(instance).not.toBeUndefined()
})