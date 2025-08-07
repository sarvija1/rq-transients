import type { Stats } from './stats.ts'
import { calculateLocationHitPoints, calculateTotalHitPoints } from './hit-points.ts'
import type { HitLocationLiteral } from './hit-points.ts'
import { calculateHealingRate } from './healing-rate.ts'
import { calculateDamageBonus } from './damage-bonus.ts'
import { calculateSpiritCombatDamage } from './spirit-combat-damage.ts'
import { calculateMaximumEnc } from './maximum-enc.ts'
import { calculateDexStrikeRank, calculateSizStrikeRank } from './strike-rank.ts'
import { calculateAllSkillModifiers } from './skill-modifiers.ts'
import type { SkillModifierLiteral } from './skill-modifiers.ts'

export type AttributeLiteral = 'magicPoints' |
  'hitPoints' |
  'healingRate' |
  'damageBonus' |
  'spiritCombatDamage' |
  'maximumEnc' |
  'dexStrikeRank' |
  'sizStrikeRank' |
  HitLocationLiteral |
  SkillModifierLiteral

const labels: Record<AttributeLiteral, string> = {
  magicPoints: "Magic points",
  hitPoints: "Total",
  legs: "Legs",
  abdomen: "Abdomen",
  chest: "Chest",
  arms: "Arms",
  head: "Head",
  healingRate: "Healing rate",
  damageBonus: "Damage bonus",
  spiritCombatDamage: "Spirit combat damage",
  maximumEnc: "Maximum ENC",
  dexStrikeRank: "DEX strike rank",
  sizStrikeRank: "SIZ strike rank",
  agilitySkillModifier: "Agility",
  communicationSkillModifier: "Communication",
  knowledgeSkillModifier: "Knowledge",
  magicSkillModifier: "Magic",
  manipulationSkillModifier: "Manipulation",
  perceptionSkillModifier: "Perception",
  stealthSkillModifier: "Stealth"
}

export const labelTransient = (key: string): string => {
  const maybeLabel = labels[key as AttributeLiteral]
  return maybeLabel !== undefined ? maybeLabel : key
}

export const calculateTransients = (stats: Stats): Record<AttributeLiteral, number | string> => ({
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
