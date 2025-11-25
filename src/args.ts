import { z } from 'zod'

const statLiteralSchema = z.literal(['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'])
const writeFlag = 'save'

export type StatLiteral = z.infer<typeof statLiteralSchema>

const singleStatRecordSchema = z.partialRecord(
  statLiteralSchema,
  z.int().min(1)
)

export const parseArgs = (args: string[]) => {
  const shouldSave = args.includes(writeFlag)
  const statArgs = args.filter(arg => arg !== writeFlag && arg.includes('='))
  const stats = statArgs.map(arg => {
    const split = arg.split('=')
    return singleStatRecordSchema.parse({ [split[0]]: Number(split[1]) })
  }).reduce((acc, stat) =>
    ({ ...acc, ...stat}), {})
  return { stats, shouldSave }
}