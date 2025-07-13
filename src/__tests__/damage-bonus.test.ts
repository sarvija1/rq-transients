import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { createStatsForNumber } from './util.ts'
import { calculateDamageBonus } from '../damage-bonus.ts'

describe('Damage bonus', () => {
  it('STR+SIZ 12 or less is -1d4', () => {
    assert.equal(
      calculateDamageBonus(createStatsForNumber(1)),
      '-1d4'
    )
    assert.equal(
      calculateDamageBonus(createStatsForNumber(6)),
      '-1d4'
    )
  })
  it('STR+SIZ 13-24 is nothing', () => {
    assert.equal(
      calculateDamageBonus({ ...createStatsForNumber(1), str: 6, siz: 7 }),
      '-'
    )
    assert.equal(
      calculateDamageBonus({ ...createStatsForNumber(1), str: 12, siz: 12 }),
      '-'
    )
  })
  it('STR+SIZ 25-32 is +1d4', () => {
    assert.equal(
      calculateDamageBonus({ ...createStatsForNumber(1), str: 12, siz: 13 }),
      '+1d4'
    )
    assert.equal(
      calculateDamageBonus({ ...createStatsForNumber(1), str: 16, siz: 16 }),
      '+1d4'
    )
  })
  it('STR+SIZ 33-40 is +1d6', () => {
    assert.equal(
      calculateDamageBonus({ ...createStatsForNumber(1), str: 16, siz: 17 }),
      '+1d6'
    )
    assert.equal(
      calculateDamageBonus({ ...createStatsForNumber(1), str: 20, siz: 20 }),
      '+1d6'
    )
  })
  it('STR+SIZ 41-56 is +2d6', () => {
    assert.equal(
      calculateDamageBonus({ ...createStatsForNumber(1), str: 20, siz: 21 }),
      '+2d6'
    )
    assert.equal(
      calculateDamageBonus({ ...createStatsForNumber(1), str: 28, siz: 28 }),
      '+2d6'
    )
  })
  it('STR+SIZ 57-72 is +3d6', () => {
    assert.equal(
      calculateDamageBonus({ ...createStatsForNumber(1), str: 28, siz: 29 }),
      '+3d6'
    )
    assert.equal(
      calculateDamageBonus({ ...createStatsForNumber(1), str: 36, siz: 36 }),
      '+3d6'
    )
  })

})