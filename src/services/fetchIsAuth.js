import { Loader } from '../components/loader/Loader'

export let user = {}
export const isAuth = async (token) => {
  try {
    Loader(true)
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/auth/profile`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    const { status } = response
    Loader(false)
    user = { data, status }
    return user
  } catch (error) {
    Loader(false)
    console.log(error)
    return null
  }
}

export const changeAvatar = async (file, token) => {
  try {
    Loader(true)
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/auth/update-avatar`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    )
    const data = await response.json()
    const { status } = response
    Loader(false)
    user.data.avatar = data.updateAvatar.avatar
    return { data, status }
  } catch (error) {
    Loader(false)
    console.log(error)
    return null
  }
}

export const getEventsisAuth = async (token) => {
  try {
    Loader(true)
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/events/events-auth`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
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
export const getEvent = async (token, event) => {
  try {
    Loader(true)
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/events/${event._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }
    const data = await response.json()
    const { status } = response
    Loader(false)
    return { data, status }
  } catch (error) {
    Loader(false)
    console.log('Hubo un problema con la solicitud fetch:', error)
    return null
  }
}

export const createEvent = async (jsonData) => {
  const token = localStorage.getItem('__EVENT_ACCESS__')
  try {
    Loader(true)
    const formData = new FormData()
    for (const key in jsonData) {
      formData.append(key, jsonData[key])
    }
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/events/create-event`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    )
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }
    const data = await response.json()
    const { status } = response
    Loader(false)
    return { data, status }
  } catch (error) {
    Loader(false)
    console.log('Hubo un problema con la solicitud fetch:', error)
    return null
  }
}
