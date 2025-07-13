import { readFile } from 'node:fs/promises'
import { z } from 'zod'

const statsSchema = z.object({
  str: z.int().min(1),
  con: z.int().min(1),
  siz: z.int().min(1),
  dex: z.int().min(1),
  int: z.int().min(1),
  pow: z.int().min(1),
  cha: z.int().min(1)
})

export type Stats = z.infer<typeof statsSchema>

export const readCurrentStats = async (
  filePath: string
): Promise<Stats> =>
  statsSchema.parse(
    JSON.parse(
      (await readFile(filePath)).toString('utf8')
    )
  )
