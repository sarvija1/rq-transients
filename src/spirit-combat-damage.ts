import type { Stats } from './stats.ts'

interface SpiritCombatDamageTable {
    powcha: number;
    dice: string;
}

 const spiritCombatDamageFixed: SpiritCombatDamageTable[] = [
    { powcha: 2, dice: '1d3' },
    { powcha: 13, dice: '1d6' },
    { powcha: 25, dice: '1d6+1' },
    { powcha: 33, dice: '1d6+3' },
    { powcha: 41, dice: '2d6+3' },
];

const powchaThreshold = 56 // damage starts to increase linearly after this point

export function calculateSpiritCombatDamage(stats: { pow: number; cha: number }): string {
    // Calculate damage based on POW and CHA
    // Under powchaThreshold damage is fixed, after that +d6+1 for each 16 (cha+pow)points over powchaThreshold
    const powcha = stats.pow + stats.cha
    
    if (powcha < 2) {
        return 'no damage'
    }
    else if (powcha <= powchaThreshold) {
        const row = spiritCombatDamageFixed.findLast(d => d.powcha <= powcha);
        if (!row) {
            throw new Error('No matching entry found in fixed spirit combat damage table');
        }
        return row.dice
    }
    else {
        const step = Math.floor((powcha - powchaThreshold)/16)
        return `${step+2}d6+${step*1+3}`    // +2 and +3 because the last fixed damage is 2d6+3
    }
}
