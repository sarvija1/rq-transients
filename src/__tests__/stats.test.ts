import { writeCurrentStats, readCurrentStats } from '../stats'
import { writeFile, unlink } from 'node:fs/promises'
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'

describe('Stats file operations', () => {
  const testFilePath = './test-stats.json'
  
  afterEach(async () => {
    try {
      await unlink(testFilePath)
    } catch {
      // No file
    }
  })

  describe('writeCurrentStats', () => {
    it('saves stats to JSON file with proper formatting', async () => {
      const stats = {
        str: 15, con: 14, siz: 12, dex: 18,
        int: 16, pow: 13, cha: 11
      }
      
      await writeCurrentStats(testFilePath, stats)
            
      const fileContent = await readCurrentStats(testFilePath)
      expect(fileContent).toEqual(stats)
    })

    it('overwrites existing file', async () => {
      const originalStats = {
        str: 10, con: 10, siz: 10, dex: 10,
        int: 10, pow: 10, cha: 10
      }
      const newStats = {
        str: 20, con: 15, siz: 12, dex: 18,
        int: 16, pow: 13, cha: 11
      }
      
      await writeCurrentStats(testFilePath, originalStats)  // original 
      await writeCurrentStats(testFilePath, newStats)       // changed
      
      const result = await readCurrentStats(testFilePath)
      expect(result).toEqual(newStats)
    })
  })

  describe('readCurrentStats', () => {
    it('reads valid stats file', async () => {
      const stats = {
        str: 15, con: 14, siz: 12, dex: 18,
        int: 16, pow: 13, cha: 11
      }
      
      await writeFile(testFilePath, JSON.stringify(stats), 'utf8')
      
      const result = await readCurrentStats(testFilePath)
      expect(result).toEqual(stats)
    })

    it('validates required stat properties', async () => {
      const invalidStats = { str: 15, con: 14 } // missing stats
      
      await writeFile(testFilePath, JSON.stringify(invalidStats), 'utf8')
      
      await expect(readCurrentStats(testFilePath)).rejects.toThrow()
    })

    it('validates stat values are positive integers', async () => {
      const invalidStats = {
        str: -5, con: 14, siz: 12, dex: 18,
        int: 16, pow: 13, cha: 11
      }
      
      await writeFile(testFilePath, JSON.stringify(invalidStats), 'utf8')
      
      await expect(readCurrentStats(testFilePath)).rejects.toThrow()
    })

    it('throws error for non-existent file', async () => {
      await expect(readCurrentStats('./non-existent.json')).rejects.toThrow()
    })
  })
})