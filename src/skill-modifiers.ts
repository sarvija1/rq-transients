import type { Stats } from './stats.ts'

type StatBrackets = [ number, number, number, number, number, number ]

const skillModifier = (statValue: number, brackets: StatBrackets) => {
  if (statValue >= 1 && statValue <= 4) return brackets[0]
  else if (statValue >= 5 && statValue <= 8) return brackets[1]
  else if (statValue >= 9 && statValue <= 12) return brackets[2]
  else if (statValue >= 13 && statValue <= 16) return brackets[3]
  else if (statValue >= 17 && statValue <= 20) return brackets[4]
  else return brackets[4] + Math.ceil((statValue - 20) / 4) * brackets[5]
}

const sumAndFormat = (modifiers: number[]) => {
  const result = modifiers
    .reduce((acc, modifier) => acc + modifier, 0)
  return `${result > 0 ? '+' : ''}${result}%`
}

const minusFiveToFive = [ -5, 0, 0, 0, 5, 5 ] as StatBrackets
const minusTenToTen = [ -10, -5, 0, 5, 10, 5 ] as StatBrackets

export type SkillModifierLiteral = 'agilitySkillModifier' |
  'communicationSkillModifier' |
  'knowledgeSkillModifier' |
  'magicSkillModifier' |
  'manipulationSkillModifier' |
  'perceptionSkillModifier' |
  'stealthSkillModifier'

// Fun fact: CON is not used in any of these
export const calculateAllSkillModifiers = (
  { str, siz, dex, int, pow, cha }: Stats
): Record<SkillModifierLiteral, string> =>
  ({
    agilitySkillModifier: sumAndFormat([
      skillModifier(str, minusFiveToFive),
      skillModifier(siz, [ 5, 0, 0, 0, -5, -5 ]),
      skillModifier(dex, minusTenToTen),
      skillModifier(pow, minusFiveToFive)
    ]),
    communicationSkillModifier: sumAndFormat([
      skillModifier(int, minusFiveToFive),
      skillModifier(pow, minusFiveToFive),
      skillModifier(cha, minusTenToTen),
    ]),
    knowledgeSkillModifier: sumAndFormat([
      skillModifier(int, minusTenToTen),
      skillModifier(pow, minusFiveToFive),
    ]),
    magicSkillModifier: sumAndFormat([
      skillModifier(pow, minusTenToTen),
      skillModifier(cha, minusFiveToFive)
    ]),
    manipulationSkillModifier: sumAndFormat([
      skillModifier(str, minusFiveToFive),
      skillModifier(dex, minusTenToTen),
      skillModifier(int, minusTenToTen),
      skillModifier(pow, minusFiveToFive)
    ]),
    perceptionSkillModifier: sumAndFormat([
      skillModifier(int, minusTenToTen),
      skillModifier(pow, minusFiveToFive)
    ]),
    stealthSkillModifier: sumAndFormat([
      skillModifier(siz, [ 10, 5, 0, -5, -10, -5 ]),
      skillModifier(dex, minusTenToTen),
      skillModifier(int, minusTenToTen),
      skillModifier(pow, [ 5, 0, 0, 0, -5, -5 ])
    ])
  })
