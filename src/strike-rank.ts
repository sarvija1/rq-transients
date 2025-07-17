export const calculateDexStrikeRank = (dex: number) => {
  if (dex >= 1 && dex <= 5) return 5
  else if (dex >= 6 && dex <= 8) return 4
  else if (dex >= 9 && dex <= 12) return 3
  else if (dex >= 13 && dex <= 15) return 2
  else if (dex >= 16 && dex <= 18) return 1
  else return 0
}

export const calculateSizStrikeRank = (siz: number) => {
  if (siz >= 1 && siz <= 6) return 3
  else if (siz >= 7 && siz <= 14) return 2
  else if (siz >= 15 && siz <= 21) return 1
  else return 0
}
