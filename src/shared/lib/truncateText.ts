export const truncateText = (text: string, maxLength: number): string => {
  const textArr = text.split(' ')
  if (textArr.length <= maxLength) return text
  return textArr.slice(0, maxLength).join(' ') + '...'
}
