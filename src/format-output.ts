const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  col: '\x1b[24G'  // Align values to col 24
}

interface Form {
    hitpoints: { // Hit points are outputted in their own section as key value pairs
        Total: number;
        Legs: number;
        Abdomen: number;
        Chest: number;
        Arms: number;
        Head: number;
    }
    modifiers: { // modifiers are outputted in separate section as key-value pairs
        Agility: string | number;
        Communication: string | number;
        Knowledge: string | number;
        Magic: string | number;
        Manipulation: string | number;
        Perception: string | number;
        Stealh: string | number;
    }
    // rest of the properties are outputted as key-value pairs line by line
    healingrate: number;
    dexsr: number;
    strsr: number;
    damagebonus: string;
    spiritcombatdamage: string;
    magicpoints: number; 
}

export const formatOutput = (transients: Record<string, number | string>): string => {
    // Create Form data structure from transients
    const formData: Form = {
        hitpoints: {
            Total: transients.hitPoints as number,
            Head: transients.head as number,
            Arms: transients.arms as number,   
            Chest: transients.chest as number,
            Abdomen: transients.abdomen as number,
            Legs: transients.legs as number,
        },
        modifiers: {
            Agility: transients.agilitySkillModifier,
            Communication: transients.communicationSkillModifier,
            Knowledge: transients.knowledgeSkillModifier,
            Magic: transients.magicSkillModifier,
            Manipulation: transients.manipulationSkillModifier,
            Perception: transients.perceptionSkillModifier,
            Stealh: transients.stealthSkillModifier,
        },
        healingrate: transients.healingRate as number,
        dexsr: transients.dexStrikeRank as number,
        strsr: transients.sizStrikeRank as number,
        damagebonus: transients.damageBonus as string,
        spiritcombatdamage: transients.spiritCombatDamage as string,
        magicpoints: transients.magicPoints as number,
    }

    // Format hit points section
    const hitPointsSection = [
        `${colors.bold}Hit Points:${colors.reset}`,
        ...Object.entries(formData.hitpoints)
            .map(([key, value]) => `  ${key}:${colors.col}${value}`)
    ].join('\n')

    // Format modifiers section
    const modifiersSection = [
        `${colors.bold}Skill Modifiers:${colors.reset}`,
        ...Object.entries(formData.modifiers)
            .map(([key, value]) => `  ${key}:${colors.col}${value}`)
    ].join('\n')

    // Format individual properties
    const individualProperties = [
        `Healing rate:${colors.col}${formData.healingrate}`,
        `DEX strike rank:${colors.col}${formData.dexsr}`,
        `SIZ strike rank:${colors.col}${formData.strsr}`,
        `Damage bonus:${colors.col}${formData.damagebonus}`,
        `Spirit combat damage:${colors.col}${formData.spiritcombatdamage}`,
        `Magic points:${colors.col}${formData.magicpoints}`,
    ].join('\n')

    // Combine all sections with spaces between them
    return [
        hitPointsSection,
        '',
        modifiersSection,
        '',
        individualProperties
    ].join('\n')
}

