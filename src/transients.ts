import type { Stats } from './stats.ts'
import { calculateLocationHitPoints, calculateTotalHitPoints } from './hit-points.ts'
import { calculateHealingRate } from './healing-rate.ts'
import { calculateDamageBonus } from './damage-bonus.ts'
import { calculateSpiritCombatDamage } from './spirit-combat-damage.ts'
import { calculateMaximumEnc } from './maximum-enc.ts'
import { calculateDexStrikeRank, calculateSizStrikeRank } from './strike-rank.ts'
import { calculateAllSkillModifiers } from './skill-modifiers.ts'

const labels: Record<string, string> = {
  magicPoints: "Magic points",
  hitPoints: "Hit points, total",
  legs: "Hit points, legs",
  abdomen: "Hit points, abdomen",
  chest: "Hit points: chest",
  arms: "Hit points, arms",
  head: "Hit points, head",
  healingRate: "Healing rate",
  damageBonus: "Damage bonus",
  spiritCombatDamage: "Spirit combat damage",
  maximumEnc: "Maximum ENC",
  dexStrikeRank: "DEX strike rank",
  sizStrikeRank: "SIZ strike rank",
  agilitySkillModifier: "Agility skills category modifier",
  communicationSkillModifier: "Communication skills category modifier",
  knowledgeSkillModifier: "Knowledge skills category modifier",
  magicSkillModifier: "Magic skills category modifier",
  manipulationSkillModifier: "Manipulation skills category modifier",
  perceptionSkillModifier: "Perception skills category modifier",
  stealthSkillModifier: "Stealth skills category modifier"
}

export const labelTransient = (key: string): string => {
  const maybeLabel = labels[key]
  return maybeLabel !== undefined ? maybeLabel : key
}

export const calculateTransients = (stats: Stats): Record<string, number | string> => ({
  magicPoints: stats.pow,
  hitPoints: calculateTotalHitPoints(stats),
  ...calculateLocationHitPoints(calculateTotalHitPoints(stats)),
  healingRate: calculateHealingRate(stats),
  damageBonus: calculateDamageBonus(stats),
  spiritCombatDamage: calculateSpiritCombatDamage(stats),
  maximumEnc: calculateMaximumEnc(stats),
  dexStrikeRank: calculateDexStrikeRank(stats.dex),
  sizStrikeRank: calculateSizStrikeRank(stats.siz),
  ...calculateAllSkillModifiers(stats)
})
