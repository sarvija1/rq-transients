import { parseArgs } from '../args'
import { describe, it, expect } from '@jest/globals'

describe('Argument parsing', () => {
  describe('parseArgs', () => {
    it('parses stats without save', () => {
      const result = parseArgs(['str=15', 'pow=20'])
      expect(result.stats).toEqual({ str: 15, pow: 20 })
      expect(result.shouldSave).toBe(false)
    })

    it('tests save with stats', () => {
      const result = parseArgs(['str=15', 'save', 'pow=20'])
      expect(result.stats).toEqual({ str: 15, pow: 20 })
      expect(result.shouldSave).toBe(true)
    })

    it('detects save at beginning', () => {
      const result = parseArgs(['save', 'str=15', 'pow=20'])
      expect(result.stats).toEqual({ str: 15, pow: 20 })
      expect(result.shouldSave).toBe(true)
    })

    it('detects save at end', () => {
      const result = parseArgs(['str=15', 'pow=20', 'save'])
      expect(result.stats).toEqual({ str: 15, pow: 20 })
      expect(result.shouldSave).toBe(true)
    })

    it('handles only save without stats', () => {
      const result = parseArgs(['save'])
      expect(result.stats).toEqual({})
      expect(result.shouldSave).toBe(true)
    })

    it('handles empty arguments', () => {
      const result = parseArgs([])
      expect(result.stats).toEqual({})
      expect(result.shouldSave).toBe(false)
    })

    it('ignores invalid arguments', () => {
      const result = parseArgs(['str=15', 'invalid', 'save', 'notastat'])
      expect(result.stats).toEqual({ str: 15 })
      expect(result.shouldSave).toBe(true)
    })

    it('handles multiple save arguments', () => {
      const result = parseArgs(['save', 'str=15', 'save'])
      expect(result.stats).toEqual({ str: 15 })
      expect(result.shouldSave).toBe(true)
    })

    it('validates stat names', () => {
      expect(() => parseArgs(['invalid=15'])).toThrow()
      expect(() => parseArgs(['strength=15'])).toThrow()
    })

    it('validates stat values are positive integers', () => {
      expect(() => parseArgs(['str=0'])).toThrow()
      expect(() => parseArgs(['str=-5'])).toThrow()
      expect(() => parseArgs(['str=abc'])).toThrow()
    })

    it('parses all valid stats', () => {
      const result = parseArgs([
        'str=10', 'con=11', 'siz=12', 'dex=13', 
        'int=14', 'pow=15', 'cha=16', 'save'
      ])
      expect(result.stats).toEqual({
        str: 10, con: 11, siz: 12, dex: 13,
        int: 14, pow: 15, cha: 16
      })
      expect(result.shouldSave).toBe(true)
    })
  })
})