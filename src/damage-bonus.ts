import type { Stats } from './stats.ts'

export const calculateDamageBonus = (stats: Stats): string => {
  const total = stats.str + stats.siz
  if (total <= 12) return "-1d4"
  else if (total >= 13 && total <= 24) return "-"
  else if (total >= 25 && total <= 32) return "+1d4"
  else if (total >= 33 && total <= 40) return "+1d6"
  else {
    const times = Math.floor((total - 41) / 16) + 2
    return `+${times}d6`
  }
}