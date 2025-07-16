import { describe, expect, it } from '@jest/globals'
import { calculateAllSkillModifiers } from '../skill-modifiers.ts'

describe('Skill modifiers', () => {
  it("matches Vasana's saga in the manual", () => {
    const vasana = { str: 16, con: 12, siz: 10, dex: 11, int: 15, pow: 15, cha: 19 }
    const mods = calculateAllSkillModifiers(vasana)
    expect(mods.agilitySkillModifier).toEqual('0%')
    expect(mods.communicationSkillModifier).toEqual('+10%')
    expect(mods.knowledgeSkillModifier).toEqual('+5%')
    expect(mods.magicSkillModifier).toEqual('+10%')
    expect(mods.manipulationSkillModifier).toEqual('+5%')
    expect(mods.perceptionSkillModifier).toEqual('+5%')
    expect(mods.stealthSkillModifier).toEqual('+5%')
  })
  // TODO needs more tests
})