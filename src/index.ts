import { readCurrentStats } from './stats.ts'
import { argsToPartialStats } from './args.ts'
import { calculateTransients } from './transients.ts'
import { diff } from './diff.ts'

const currentStats = await readCurrentStats('./.current.json')
const newStats = argsToPartialStats(process.argv.slice(2))

const currentTransients = calculateTransients(currentStats)
const newTransients = calculateTransients({ ...currentStats, ...newStats })

const changes = diff(currentTransients, newTransients)

if (changes.length === 0) {
  console.log('No changes')
} else {
  changes.forEach(change => console.log(change))
}
