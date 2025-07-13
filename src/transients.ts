import type { Stats } from './stats.ts'
import { calculateHitPoints } from './hit-points.ts'

const labels: Record<string, string> = {
  magicPoints: "Magic points",
  hitPoints: "Hit points"
}

export const labelTransient = (key: string): string => {
  const maybeLabel = labels[key]
  return maybeLabel !== undefined ? maybeLabel : key
}

export const calculateTransients = (stats: Stats): Record<string, number> => ({
  magicPoints: stats.pow,
  hitPoints: calculateHitPoints(stats)
})
