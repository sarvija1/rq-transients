import { z } from 'zod'

const statLiteralSchema = z.literal(['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'])

export type StatLiteral = z.infer<typeof statLiteralSchema>

const singleStatRecordSchema = z.partialRecord(
  statLiteralSchema,
  z.int().min(1)
)

export const parseArgs = (args: string[]) => {
  const shouldSave = args.includes('save')
  const statArgs = args.filter(arg => arg !== '-s' && arg.includes('='))
  const stats = statArgs.map(arg => {
    const split = arg.split('=')
    return singleStatRecordSchema.parse({ [split[0]]: Number(split[1]) })
  }).reduce((acc, stat) =>
    ({ ...acc, ...stat}), {})
  return { stats, shouldSave }
}