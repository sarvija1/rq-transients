import { readCurrentStats, writeCurrentStats } from './stats.ts'
import { parseArgs } from './args.ts'
import { calculateTransients } from './transients.ts'
import { formatDiff } from './format-transients.ts'
import { formatOutput } from './format-output.ts'

const filePath = process.env.STATS ?? './characters/.current.json'
const currentStats = await readCurrentStats(filePath)

const args = process.argv.slice(2)
const currentTransients = calculateTransients(currentStats)

if (args.length === 0) {
  console.log(formatOutput(currentTransients))
} else {
  const { stats: newStatChanges, shouldSave } = parseArgs(args)
  const newStats = { ...currentStats, ...newStatChanges }
  const newTransients = calculateTransients(newStats)
  
  const changes = formatDiff(currentTransients, newTransients)
  const output = formatOutput(changes)
  
  if (shouldSave) {
    await writeCurrentStats(filePath, newStats)
    console.log(`\nStats saved to ${filePath}`)
  }
  
  if (output.length === 0) {
    console.log("No changes\n")
  } else {
    console.log(output)
  }
}
