import './template.css'
import { fetchRegister, fetchForgotPassword } from '../../services/fetchAuth'
import { Alert } from '../alert/Alert'
import { login } from '../nav/helpers'

export const btnCloseComponent = () => {
  const btnClose = document.querySelector('.closeContainer')
  const auth = document.querySelector('#auth')
  btnClose.addEventListener('click', () => {
    auth.classList.add('animate-close')
    setTimeout(() => {
      auth.removeAttribute('class')
      auth.remove()
    }, 100)
  })
}

export const handleRegister = () => {
  const formRegister = document.querySelector('#register-form')
  if (formRegister) {
    formRegister.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      let jsonData = {}
      formData.forEach((value, key) => {
        jsonData[key] = value
      })
      if (jsonData.password.length < 8) {
        Alert(true, 'The password must contain at least 8 characters😢')
        return
      }
      const data = await fetchRegister(jsonData)
      const formlogin = document.querySelector('#formlogin')
      const btnLogin = formlogin.querySelector('.btnLogin')
      let error
      if (data.status === 409) {
        btnLogin.setAttribute(
          'style',
          'background-color:var(--event-red-color);'
        )
        error = true
      } else {
        const emailInput = formlogin.querySelector('#email')
        const passwordInput = formlogin.querySelector('#password')
        const clickLogin = formlogin.querySelector('#btn_login')
        emailInput.value = jsonData.email
        passwordInput.value = jsonData.password
        Alert(false, 'Logging you in, please wait...')
        setTimeout(() => {
          clickLogin.click()
        }, 2000)

        error = false
        auth.remove()
      }
      Alert(error, data.data.message)
    })
  }
}

export const handleForgotPassword = () => {
  const formForgot = document.querySelector('.forgot-password-form')
  formForgot.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    let jsonData = {}
    formData.forEach((value, key) => {
      jsonData[key] = value
    })
    const data = await fetchForgotPassword(jsonData)
    let error
    if (data.status === 404) error = true
    else {
      error = false
      auth.remove()
    }
    Alert(error, data.data.message)
  })
}
