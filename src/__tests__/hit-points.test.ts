import { calculateLocationHitPoints, calculateTotalHitPoints } from '../hit-points.ts'
import { createStatsForNumber, range } from './util.ts'
import { describe, it } from 'node:test'
import * as assert from 'node:assert'


describe('Hit points', () => {
  it('CON changes total hit points linearly', () => {
    range(3, 100).forEach(n => {
      assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), con: n }), n - 3)
    })
  })
  it('increasing SIZ by 4 increases total hit points by 1', () => {
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 1 }), 0)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 4 }), 0)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 5 }), 1)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 8 }), 1)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 9 }), 2)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 12 }), 2)
  })
  it('POW increases total hit points nonlinearly', () => {
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 1 }), 0)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 4 }), 0)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 5 }), 1)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 16 }), 1)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 17 }), 2)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 20 }), 2)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 21 }), 3)
    assert.equal(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 24 }), 3)
  })

  // base location hit point means the hit points in arms, which is the location with the lowest hit points
  it('total hit points 1 - 6 have 1 base location hit point', () => {
    assert.deepEqual(calculateLocationHitPoints(1),
      {
        legs: 2,
        abdomen: 2,
        chest: 3,
        arms: 1,
        head: 2
      })
    assert.deepEqual(calculateLocationHitPoints(6),
      {
        legs: 2,
        abdomen: 2,
        chest: 3,
        arms: 1,
        head: 2
      })
  })
  it('total hit points 7 - 9 have 2 base location hit points', () => {
    assert.deepEqual(calculateLocationHitPoints(7),
      {
        legs: 3,
        abdomen: 3,
        chest: 4,
        arms: 2,
        head: 3
      })
    assert.deepEqual(calculateLocationHitPoints(9),
      {
        legs: 3,
        abdomen: 3,
        chest: 4,
        arms: 2,
        head: 3
      })
  })
  it('total hit points 10 - 12 have 3 base location hit points', () => {
    assert.deepEqual(calculateLocationHitPoints(10),
      {
        legs: 4,
        abdomen: 4,
        chest: 5,
        arms: 3,
        head: 4
      })
    assert.deepEqual(calculateLocationHitPoints(12),
      {
        legs: 4,
        abdomen: 4,
        chest: 5,
        arms: 3,
        head: 4
      })
  })
})
