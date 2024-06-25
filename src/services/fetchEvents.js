import { Loader } from '../components/loader/Loader'

const getEvents = async () => {
  try {
    Loader(true)
    const response = await fetch(`${import.meta.env.VITE_URL_API}/events`)
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }
    const data = await response.json()
    Loader(false)
    return data
  } catch (error) {
    Loader(false)
    console.log('Hubo un problema con la solicitud fetch:', error)
    return null
  }
}
const fetchRegisterEvent = async (values) => {
  try {
    Loader(true)
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/attendees/${values.id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(values.jsonData)
      }
    )
    const data = await response.json()
    const { status } = response
    Loader(false)
    return { data, status }
  } catch (error) {
    Loader(false)
    console.log(error)
    return null
  }
}

export { getEvents, fetchRegisterEvent }
