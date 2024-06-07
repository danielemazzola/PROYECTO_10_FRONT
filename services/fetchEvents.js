const getEvents = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/events`)
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
