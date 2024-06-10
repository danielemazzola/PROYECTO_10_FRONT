import '../nav/nav.css'
import {
  fetchRegister,
  fetchForgotPassword,
  fetchLogin
} from '../../services/fetchAuth'
import { Alert } from '../alert/Alert'

export const btnCloseComponent = () => {
  const btnClose = document.querySelector('.closeContainer')
  btnClose.addEventListener('click', () => {
    auth.classList.add('animate-close')
    setTimeout(() => {
      auth.removeAttribute('class')
      auth.remove()
    }, 100)
  })
}

export const handleRegister = () => {
  const registerContainer = document.querySelector('.register-container')
  const formRegister = document.querySelector('#register-form')
  if (!formRegister) return
  formRegister.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    let jsonData = {}
    formData.forEach((value, key) => {
      jsonData[key] = value
    })
    const data = await fetchRegister(jsonData)
    if (data.status === 409) {
      const formlogin = document.querySelector('#formlogin')
      const btnLogin = formlogin.querySelector('.btnLogin')
      btnLogin.setAttribute('style', 'background-color:red;')
    }
    let error
    if (data.status === 409) error = true
    else error = false
    Alert(error, data.data.message)
  })
}

export const handleForgotPassword = () => {
  const forgotContainer = document.querySelector('.forgot-password-container')
  const formForgot = document.querySelector('.forgot-password-form')

  if (!formForgot) return
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
    else error = false
    Alert(error, data.data.message)
  })
}
