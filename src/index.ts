import { readCurrentStats } from './stats.ts'
import { argsToPartialStats } from './args.ts'
import { calculateTransients } from './transients.ts'
import { formatTransients, formatDiff } from './format-transients.ts'
import { formatOutput } from './format-output.ts'

const currentStats = await readCurrentStats('./.current.json')

const args = process.argv.slice(2)
const currentTransients = calculateTransients(currentStats)

if (args.length === 0) {
  console.log(formatOutput(currentTransients))
} else {
  const newStats = argsToPartialStats(args)
  const newTransients = calculateTransients({ ...currentStats, ...newStats })
  const changes = formatDiff(currentTransients, newTransients)

  if (changes.length === 0) {
    console.log('No changes')
  } else {
    changes.forEach(change => console.log(change))
  }
}
