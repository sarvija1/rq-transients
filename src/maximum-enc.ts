import type { Stats } from './stats.ts'

export const calculateMaximumEnc = (stats: Stats) =>
  Math.min(stats.str, Math.ceil((stats.str + stats.con) /2))