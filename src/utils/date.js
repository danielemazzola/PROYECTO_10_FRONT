export const getDate = (value, isForm = false) => {
  const date = new Date(value)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hour = date.getHours()
  const minute = date.getMinutes()

  if (!isForm) {
    const init =
      day.toString().padStart(2, '0') +
      '/' +
      month.toString().padStart(2, '0') +
      '/' +
      year +
      ' - ' +
      hour +
      ':' +
      minute.toString().padStart(2, '0')

    return init
  } else {
    const init =
      year +
      '-' +
      month.toString().padStart(2, '0') +
      '-' +
      day.toString().padStart(2, '0') +
      'T' +
      hour.toString().padStart(2, '0') +
      ':' +
      minute.toString().padStart(2, '0')

    return init
  }
}
