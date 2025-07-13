import type { Stats } from './stats.ts'

const powModForHitPoints = (pow: number): number => {
  if (pow < 1) throw new Error("pow cannot be less than 1")
  else if (pow >= 1 && pow <= 4) return -1
  else if (pow >= 5 && pow <= 16) return 0
  else return Math.floor((pow - 13) / 4)
}

export const calculateHitPoints = (stats: Stats): number => {
  const conMod = stats.con
  const sizMod = Math.floor((stats.siz - 1) / 4) - 2
  const powMod = powModForHitPoints(stats.pow)

  return conMod + sizMod + powMod
}
