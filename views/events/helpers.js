const getEvents = async () => {
  try {
    const response = await fetch('http://192.168.100.135:4000/api/events')
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Hubo un problema con la solicitud fetch:', error)
    return
  }
}
export { getEvents }
