import { calculateHitPoints } from '../hit-points.ts'
import { createStatsForNumber, range } from './util.ts'
import { describe, it } from 'node:test'
import * as assert from 'node:assert'


describe('calculateHitPoints', () => {
  it('CON changes hit points linearly', () => {
    range(3, 100).forEach(n => {
      assert.equal(calculateHitPoints({ ...createStatsForNumber(3), con: n }), n - 3)
    })
  })
  it('increasing SIZ by 4 increases hitpoints by 1', () => {
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), siz: 1 }), 0)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), siz: 4 }), 0)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), siz: 5 }), 1)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), siz: 8 }), 1)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), siz: 9 }), 2)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), siz: 12 }), 2)
  })
  it('POW is nonlinear', () => {
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), pow: 1 }), 0)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), pow: 4 }), 0)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), pow: 5 }), 1)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), pow: 16 }), 1)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), pow: 17 }), 2)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), pow: 20 }), 2)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), pow: 21 }), 3)
    assert.equal(calculateHitPoints({ ...createStatsForNumber(3), pow: 24 }), 3)
  })
})
