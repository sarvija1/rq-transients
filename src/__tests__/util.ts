import type { Stats } from '../stats.ts'

export const range = (start: number, end: number): number[] =>
  Array.from({ length: (end - start)}, (_, k) => k + start);

export const createStatsForNumber = (stat: number): Stats =>
  ({ str: stat, con: stat, siz: stat, dex: stat, int: stat, pow: stat, cha: stat })
