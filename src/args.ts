import { z } from 'zod'

const statLiteralSchema = z.literal(['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'])

export type StatLiteral = z.infer<typeof statLiteralSchema>

const singleStatRecordSchema = z.partialRecord(
  statLiteralSchema,
  z.int().min(1)
)

export const argsToPartialStats = (args: string[]): Partial<Record<StatLiteral, number>> =>
  args.map(arg => {
    const split = arg.split('=')
    return singleStatRecordSchema.parse({ [split[0]]: Number(split[1]) })
  }).reduce((acc, stat) =>
    ({ ...acc, ...stat}), {})