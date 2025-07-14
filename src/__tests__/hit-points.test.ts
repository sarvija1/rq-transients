import { calculateLocationHitPoints, calculateTotalHitPoints } from '../hit-points'
import { createStatsForNumber, range } from './util'
import { describe, it, expect } from '@jest/globals'

describe('Hit points', () => {
  it('CON changes total hit points linearly', () => {
    range(3, 100).forEach(n => {
      expect(calculateTotalHitPoints({ ...createStatsForNumber(3), con: n })).toEqual(n - 3)
    })
  })
  it('increasing SIZ by 4 increases total hit points by 1', () => {
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 1 })).toEqual(0)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 4 })).toEqual(0)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 5 })).toEqual(1)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 8 })).toEqual(1)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 9 })).toEqual(2)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), siz: 12 })).toEqual(2)
  })
  it('POW increases total hit points nonlinearly', () => {
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 1 })).toEqual(0)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 4 })).toEqual(0)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 5 })).toEqual(1)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 16 })).toEqual(1)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 17 })).toEqual(2)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 20 })).toEqual(2)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 21 })).toEqual(3)
    expect(calculateTotalHitPoints({ ...createStatsForNumber(3), pow: 24 })).toEqual(3)
  })
  // base location hit point means the hit points in arms, which is the location with the lowest hit points
  it('total hit points 1 - 6 have 1 base location hit point', () => {
    expect(calculateLocationHitPoints(1)).toEqual({
      legs: 2,
      abdomen: 2,
      chest: 3,
      arms: 1,
      head: 2
    })
    expect(calculateLocationHitPoints(6)).toEqual(
      {
        legs: 2,
        abdomen: 2,
        chest: 3,
        arms: 1,
        head: 2
      })
  })
  it('total hit points 7 - 9 have 2 base location hit points', () => {
    expect(calculateLocationHitPoints(7)).toEqual(
      {
        legs: 3,
        abdomen: 3,
        chest: 4,
        arms: 2,
        head: 3
      })
    expect(calculateLocationHitPoints(9)).toEqual(
      {
        legs: 3,
        abdomen: 3,
        chest: 4,
        arms: 2,
        head: 3
      })
  })
  it('total hit points 10 - 12 have 3 base location hit points', () => {
    expect(calculateLocationHitPoints(10)).toEqual(
      {
        legs: 4,
        abdomen: 4,
        chest: 5,
        arms: 3,
        head: 4
      })
    expect(calculateLocationHitPoints(12)).toEqual(
      {
        legs: 4,
        abdomen: 4,
        chest: 5,
        arms: 3,
        head: 4
      })
  })
})
