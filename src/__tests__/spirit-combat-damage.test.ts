import { calculateSpiritCombatDamage } from '../spirit-combat-damage.ts'
import { createStatsForNumber, range } from './util.ts'
import { describe, it } from 'node:test'
import * as assert from 'node:assert'

describe('calculateSpiritCombatDamage', () => {
  it('POW + CHA fixed damage', () => {
    assert.equal(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 1, cha: 0 }), 'no damage')
    assert.equal(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 7, cha: 7 }), '1d6')
    assert.equal(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 14, cha: 14 }), '1d6+1')
    assert.equal(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 17, cha: 16 }), '1d6+3')
    assert.equal(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 21, cha: 20 }), '2d6+3')
  })
  it('POW + CHA variable damage', () => {
    assert.equal(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 40, cha: 40 }), '3d6+4')
    assert.equal(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 45, cha: 45 }), '4d6+5')
    assert.equal(calculateSpiritCombatDamage({ ...createStatsForNumber(3), pow: 60, cha: 60 }), '6d6+7')
  })
})