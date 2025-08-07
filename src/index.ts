import { readCurrentStats } from './stats.ts'
import { argsToPartialStats } from './args.ts'
import { calculateTransients } from './transients.ts'
import { formatDiff } from './format-transients.ts'
import { formatOutput } from './format-output.ts'

const filePath = process.env.STATS ?? './.current.json'
const currentStats = await readCurrentStats(filePath)

const args = process.argv.slice(2)
const currentTransients = calculateTransients(currentStats)

if (args.length === 0) {
  console.log(formatOutput(currentTransients))
} else {
  const newStats = argsToPartialStats(args)
  const newTransients = calculateTransients({ ...currentStats, ...newStats })
  const changes = formatDiff(currentTransients, newTransients)

  const output = formatOutput(changes)
  if (output.length === 0) {
    console.log("No changes\n")
  } else {
    console.log(output)
  }
}
