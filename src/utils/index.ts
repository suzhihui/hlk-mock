export const formatDays = data => {
  const year = data.getFullYear()
  const month = data.getMonth() + 1
  const day = data.getDate()
  return {
    year,
    month,
    day
  }
}