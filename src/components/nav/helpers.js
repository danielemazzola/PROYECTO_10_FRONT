import { Dashboard } from '../../pages/auth/Dashboard'
import { Home } from '../../pages/home/Home'
import { fetchLogin } from '../../services/fetchAuth'
import { Alert } from '../alert/Alert'
import {
  btnCloseComponent,
  handleRegister,
  handleForgotPassword
} from '../templateNav/helpers'
import { Register, ForgotPassword } from '../templateNav/templatesAuth'

/* const parentNav = document.querySelector('.containerbtns')
const btns = parentNav.querySelectorAll('button') */

export const toggleForm = (btn) => {
  const auth = document.createElement('div')
  auth.id = 'auth'
  auth.classList.add('animate-init')
  setTimeout(() => {
    auth.removeAttribute('class')
  }, 200)
  document.querySelector('header').appendChild(auth)
  componentNav(btn)
  btnCloseComponent()
}

// RETURN ACTION - REGISTER - FORGOT PASSWORD
const componentNav = (btnAttribute) => {
  const auth = document.querySelector('#auth')
  if (!auth) return
  if (btnAttribute === 'btn_register') {
    auth.innerHTML = Register()
    handleRegister()
  }
  if (btnAttribute === 'btn_forgot') {
    auth.innerHTML = ForgotPassword()
    handleForgotPassword()
  }
}

// LOGIN
export const login = async (e) => {
  const formData = new FormData(e.target)
  let jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })
  const data = await fetchLogin(jsonData)
  let error
  if (data.status === 200) {
    const token = data.data.token
    localStorage.setItem('__EVENT_ACCESS__', token)
    error = false
    Alert(error, `welcome ${data.data.user.name}, Please wait, redirecting...`)
    setTimeout(() => {
      document.querySelector('header').innerHTML = ``
      document.querySelector('#app').innerHTML = Dashboard()
    }, 3000)
  }
  if (data.status === 404 || data.status === 409) error = true
  Alert(error, data.data.message)
}
