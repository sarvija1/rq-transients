import { describe, expect, it } from '@jest/globals'
import { calculateMaximumEnc } from '../maximum-enc.ts'
import { createStatsForNumber } from './util.ts'

describe('Maximum ENC', () => {
  // The manual doesn't specify whether to round up or down so we'll favor the player
  it('rounds up the average', () => {
    expect(calculateMaximumEnc({ ...createStatsForNumber(1), str: 17, con: 16 })).toEqual(17)
  })
  it('has the maximum value of STR', () => {
    expect(calculateMaximumEnc({ ...createStatsForNumber(1), str: 12, con: 16 })).toEqual(12)
  })
})