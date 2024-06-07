const fetchRegister = async (jsonData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      }
    )
    const { status } = response
    const data = await response.json()
    return { data, status }
  } catch (error) {
    console.log(error)
  }
}

const fetchForgotPassword = async (jsonData) => {
  console.log(jsonData)
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/auth/recovery-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      }
    )
    const { status } = response
    const data = await response.json()
    return { data, status }
  } catch (error) {
    console.log(error)
  }
}

const fetchLogin = async () => {}

export { fetchRegister, fetchForgotPassword, fetchLogin }
