import { describe, it, expect } from '@jest/globals'
import { createStatsForNumber } from './util'
import { calculateDamageBonus } from '../damage-bonus'

describe('Damage bonus', () => {
  it('STR+SIZ 12 or less is -1d4', () => {
    expect(calculateDamageBonus(createStatsForNumber(1))).toEqual('-1d4')
    expect(calculateDamageBonus(createStatsForNumber(6))).toEqual('-1d4')
  })
  it('STR+SIZ 13-24 is nothing', () => {
    expect(calculateDamageBonus({ ...createStatsForNumber(1), str: 6, siz: 7 })).toEqual('-')
    expect(calculateDamageBonus({ ...createStatsForNumber(1), str: 12, siz: 12 })).toEqual('-')
  })
  it('STR+SIZ 25-32 is +1d4', () => {
    expect(calculateDamageBonus({ ...createStatsForNumber(1), str: 12, siz: 13 })).toEqual('+1d4')
    expect(calculateDamageBonus({ ...createStatsForNumber(1), str: 16, siz: 16 })).toEqual('+1d4')
  })
  it('STR+SIZ 33-40 is +1d6', () => {
    expect(calculateDamageBonus({ ...createStatsForNumber(1), str: 16, siz: 17 })).toEqual('+1d6')
    expect(calculateDamageBonus({ ...createStatsForNumber(1), str: 20, siz: 20 })).toEqual('+1d6')
  })
  it('STR+SIZ 41-56 is +2d6', () => {
    expect(calculateDamageBonus({ ...createStatsForNumber(1), str: 20, siz: 21 })).toEqual('+2d6')
    expect(calculateDamageBonus({ ...createStatsForNumber(1), str: 28, siz: 28 })).toEqual('+2d6')
  })
  it('STR+SIZ 57-72 is +3d6', () => {
    expect(calculateDamageBonus({ ...createStatsForNumber(1), str: 28, siz: 29 })).toEqual('+3d6')
    expect(calculateDamageBonus({ ...createStatsForNumber(1), str: 36, siz: 36 })).toEqual('+3d6')
  })
})
