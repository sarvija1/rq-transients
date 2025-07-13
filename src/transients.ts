import type { Stats } from './stats.ts'
import { calculateLocationHitPoints, calculateTotalHitPoints } from './hit-points.ts'
import { calculateHealingRate } from './healing-rate.ts'

const labels: Record<string, string> = {
  magicPoints: "Magic points",
  hitPoints: "Hit points, total",
  legs: "Hit points, legs",
  abdomen: "Hit points, abdomen",
  chest: "Hit points: chest",
  arms: "Hit points, arms",
  head: "Hit points, head"
}

export const labelTransient = (key: string): string => {
  const maybeLabel = labels[key]
  return maybeLabel !== undefined ? maybeLabel : key
}

export const calculateTransients = (stats: Stats): Record<string, number> => ({
  magicPoints: stats.pow,
  hitPoints: calculateTotalHitPoints(stats),
  ...calculateLocationHitPoints(calculateTotalHitPoints(stats)),
  healingRate: calculateHealingRate(stats)
})
