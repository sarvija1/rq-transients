import { describe, expect, it } from '@jest/globals'
import { calculateDexStrikeRank, calculateSizStrikeRank } from '../strike-rank.ts'

describe('Strike rank', () => {
  it('DEX strike rank', () => {
    expect(calculateDexStrikeRank(1)).toEqual(5)
    expect(calculateDexStrikeRank(5)).toEqual(5)
    expect(calculateDexStrikeRank(6)).toEqual(4)
    expect(calculateDexStrikeRank(8)).toEqual(4)
    expect(calculateDexStrikeRank(9)).toEqual(3)
    expect(calculateDexStrikeRank(12)).toEqual(3)
    expect(calculateDexStrikeRank(13)).toEqual(2)
    expect(calculateDexStrikeRank(15)).toEqual(2)
    expect(calculateDexStrikeRank(16)).toEqual(1)
    expect(calculateDexStrikeRank(18)).toEqual(1)
    expect(calculateDexStrikeRank(19)).toEqual(0)
    expect(calculateDexStrikeRank(100)).toEqual(0)
  })
  it('SIZ strike rank', () => {
    expect(calculateSizStrikeRank(1)).toEqual(3)
    expect(calculateSizStrikeRank(6)).toEqual(3)
    expect(calculateSizStrikeRank(7)).toEqual(2)
    expect(calculateSizStrikeRank(14)).toEqual(2)
    expect(calculateSizStrikeRank(15)).toEqual(1)
    expect(calculateSizStrikeRank(21)).toEqual(1)
    expect(calculateSizStrikeRank(22)).toEqual(0)
    expect(calculateSizStrikeRank(100)).toEqual(0)
  })
})