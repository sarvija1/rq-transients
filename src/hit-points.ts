import type { Stats } from './stats.ts'

const powModForHitPoints = (pow: number): number => {
  if (pow < 1) throw new Error("pow cannot be less than 1")
  else if (pow >= 1 && pow <= 4) return -1
  else if (pow >= 5 && pow <= 16) return 0
  else return Math.floor((pow - 13) / 4)
}

export const calculateTotalHitPoints = (stats: Stats): number => {
  const conMod = stats.con
  const sizMod = Math.floor((stats.siz - 1) / 4) - 2
  const powMod = powModForHitPoints(stats.pow)

  return conMod + sizMod + powMod
}

export type HitLocationLiteral = 'legs' | 'abdomen' | 'chest' | 'arms' | 'head'

const locationsFromBaseValue = (base: number): Record<HitLocationLiteral, number> => ({
  legs: base + 1,
  abdomen: base + 1,
  chest: base + 2,
  arms: base,
  head: base + 1
})

export const calculateLocationHitPoints = (totalHitPoints: number): Record<HitLocationLiteral, number> => {
  const baseValue = totalHitPoints <= 6 ? 1 : Math.floor((totalHitPoints - 1) / 3)
  return locationsFromBaseValue(baseValue)
}