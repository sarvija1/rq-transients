import { calculateSpiritCombatDamage } from '../spirit-combat-damage.ts'
import { createStatsForNumber, range } from './util.ts'
import { describe, expect, it } from '@jest/globals'

describe('calculateSpiritCombatDamage', () => {
  it('POW + CHA fixed damage', () => {
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 1, cha: 0 })).toEqual('no damage')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 1, cha: 1 })).toEqual('1d3')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 6, cha: 6 })).toEqual('1d3')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 7, cha: 6 })).toEqual('1d6')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 12, cha: 12 })).toEqual('1d6')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 12, cha: 13 })).toEqual('1d6+1')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 16, cha: 16 })).toEqual('1d6+1')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 17, cha: 16 })).toEqual('1d6+3')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 20, cha: 20 })).toEqual('1d6+3')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 21, cha: 20 })).toEqual('2d6+3')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 28, cha: 28 })).toEqual('2d6+3')
  })
  it('POW + CHA variable damage', () => {
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 40, cha: 40 })).toEqual('3d6+4')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 45, cha: 45 })).toEqual('4d6+5')
    expect(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 60, cha: 60 })).toEqual('6d6+7')
  })
})