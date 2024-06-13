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
    const data = await response.json()
    const { status } = response
    return { data, status }
  } catch (error) {
    console.log(error)
  }
}

const fetchForgotPassword = async (jsonData) => {
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
    const data = await response.json()
    const { status } = response
    return { data, status }
  } catch (error) {
    console.log(error)
  }
}

const fetchLogin = async (jsonData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    const data = await response.json()
    const { status } = response
    return { data, status }
  } catch (error) {
    console.log(error)
  }
}

const fetchRecoveryPassword = async (jsonData, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/auth/recovery-password/${token}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      }
    )
    const data = await response.json()
    const { status } = response
    return { data, status }
  } catch (error) {
    console.log(error)
  }
}

export { fetchRegister, fetchForgotPassword, fetchLogin, fetchRecoveryPassword }
