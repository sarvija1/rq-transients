import { labelTransient } from './transients.ts'
import type { AttributeLiteral } from './transients.ts'

const control = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  col: '\x1b[25G'  // Align values to col 25
}

const formatSection = (label: string, partial: Partial<Record<AttributeLiteral, unknown>>) => {
    const actual = Object.entries(partial)
      .filter(([_, value]) => value !== undefined)
    return actual.length > 0
      ? [
            `${control.bold}${label}:${control.reset}`,
            ...actual.map(([key, value]) => `  ${labelTransient(key)}:${control.col}${value}`)
        ].join('\n') + '\n'
      : ''
}

export const formatOutput = (transients: Record<AttributeLiteral, number | string>): string =>
  formatSection("Hit Points", {
      hitPoints: transients.hitPoints,
      head: transients.head,
      arms: transients.arms,
      chest: transients.chest,
      abdomen: transients.abdomen,
      legs: transients.legs
  }) +
  formatSection('Skill Modifiers', {
      agilitySkillModifier: transients.agilitySkillModifier,
      communicationSkillModifier: transients.communicationSkillModifier,
      knowledgeSkillModifier: transients.knowledgeSkillModifier,
      magicSkillModifier: transients.magicSkillModifier,
      manipulationSkillModifier: transients.manipulationSkillModifier,
      perceptionSkillModifier: transients.perceptionSkillModifier,
      stealthSkillModifier: transients.stealthSkillModifier
  }) +
  formatSection("Other", {
      healingRate: transients.healingRate,
      dexStrikeRank: transients.dexStrikeRank,
      sizStrikeRank: transients.sizStrikeRank,
      damageBonus: transients.damageBonus,
      spiritCombatDamage: transients.spiritCombatDamage,
      magicPoints: transients.magicPoints
  })
