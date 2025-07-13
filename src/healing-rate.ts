import type { Stats } from './stats.ts'

export const calculateHealingRate = (stats: Stats): number =>
  Math.floor((stats.con - 1) / 6) + 1