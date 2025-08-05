import type { AttributeLiteral } from './transients.ts'

export const formatDiff = (
  currentTransients: Record<AttributeLiteral, number | string>,
  newTransients: Record<AttributeLiteral, number | string>
) =>
  Object.entries(currentTransients)
    .reduce((acc, [currentKey, currentValue]) => {
      const maybeNewValue = newTransients[currentKey as AttributeLiteral]
      return (maybeNewValue !== undefined && maybeNewValue !== currentValue)
        ? { ...acc, [currentKey]: `${currentValue} → ${maybeNewValue}` }
        : acc
    }, {} as Record<AttributeLiteral, string>)
