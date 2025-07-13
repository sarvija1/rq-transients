import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { calculateHealingRate } from '../healing-rate.ts'
import { createStatsForNumber } from './util.ts'

describe('Healing rate', () => {
  it('CON 6 or less is 1', () => {
    assert.equal(1, calculateHealingRate({ ...createStatsForNumber(1) }))
    assert.equal(1, calculateHealingRate({ ...createStatsForNumber(6) }))
  })
  it('CON 7 - 12 is 2', () => {
    assert.equal(2, calculateHealingRate({ ...createStatsForNumber(7) }))
    assert.equal(2, calculateHealingRate({ ...createStatsForNumber(12) }))
  })
  it('CON 13 - 18 is 3', () => {
    assert.equal(3, calculateHealingRate({ ...createStatsForNumber(13) }))
    assert.equal(3, calculateHealingRate({ ...createStatsForNumber(18) }))
  })
})