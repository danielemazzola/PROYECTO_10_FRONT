import { Loader } from '../components/loader/Loader'

export const isAuth = async (token) => {
  try {
    Loader(true)
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/auth/profile`,
      {
        headers: {
          'Content-Type': 'application/json', // Asegúrate de establecer los headers correctos
          Authorization: `Bearer ${token}` // Si se usa token en la cabecera, ajusta según tu API
        }
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
