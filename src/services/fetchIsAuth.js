import { Loader } from '../components/loader/Loader'

let user = {}
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
