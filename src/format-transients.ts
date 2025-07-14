import { labelTransient } from './transients.ts'

export const formatDiff = (
  currentTransients: Record<string, number | string>,
  newTransients: Record<string, number | string>
): string[] =>
  Object.entries(currentTransients)
    .reduce<string[]>((acc, [currentKey, currentValue]) => {
      const maybeNewValue = newTransients[currentKey]
      return (maybeNewValue !== undefined && maybeNewValue !== currentValue)
        ? [...acc, `${labelTransient(currentKey)}: ${currentValue} → ${maybeNewValue}`]
        : acc
    }, [])

export const formatTransients = (currentTransients: Record<string, number | string>) =>
  Object.entries(currentTransients)
    .map(([key, value]) => `${labelTransient(key)}: ${value}`)
