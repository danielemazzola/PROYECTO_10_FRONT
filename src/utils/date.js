export const date = (value) => {
  const date = new Date(value)
  const day = date.getDay()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hour = date.getHours()
  const minute = date.getMinutes()

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
}

export const dateFormEdit = (value) => {
  const date = new Date(value)
  const day = date.getDay()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hour = date.getHours()
  const minute = date.getMinutes()

  const init =
    year +
    '-' +
    month.toString().padStart(2, '0') +
    '-' +
    day.toString().padStart(2, '0') +
    'T' +
    hour +
    ':' +
    minute.toString().padStart(2, '0')

  return init
}
