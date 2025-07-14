import { describe, it, expect } from '@jest/globals'
import { calculateHealingRate } from '../healing-rate'
import { createStatsForNumber } from './util'

describe('Healing rate', () => {
  it('CON 6 or less is 1', () => {
    expect(calculateHealingRate({ ...createStatsForNumber(1) })).toEqual(1)
    expect(calculateHealingRate({ ...createStatsForNumber(6) })).toEqual(1)
  })
  it('CON 7 - 12 is 2', () => {
    expect(calculateHealingRate({ ...createStatsForNumber(7) })).toEqual(2)
    expect(calculateHealingRate({ ...createStatsForNumber(12) })).toEqual(2)
  })
  it('CON 13 - 18 is 3', () => {
    expect(calculateHealingRate({ ...createStatsForNumber(13) })).toEqual(3)
    expect(calculateHealingRate({ ...createStatsForNumber(18) })).toEqual(3)
  })
})
