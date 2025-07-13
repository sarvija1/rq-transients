import { labelTransient } from './transients.ts'

export const diff = (
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
