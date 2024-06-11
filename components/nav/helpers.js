import { fetchLogin } from '../../services/fetchAuth'
import { Alert } from '../alert/Alert'
import {
  btnCloseComponent,
  handleRegister,
  handleForgotPassword
} from '../templateNav/helpers'
import { Register, ForgotPassword } from '../templateNav/templatesAuth'

const parentNav = document.querySelector('#containerNav')
const btns = parentNav.querySelectorAll('button')
const auth = document.createElement('div')

auth.id = 'auth'
let copyAttribute = ''

// RETURN BUTTONS ACTIONS
btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const btnAttribute = btn.getAttribute('id')
    if (copyAttribute === btnAttribute) {
      copyAttribute = ''
      auth.classList.add('animate-close')
      setTimeout(() => {
        auth.removeAttribute('class')
        auth.remove()
      }, 200)
    } else {
      copyAttribute = btnAttribute
      if (btnAttribute) {
        auth.classList.add('animate-init')
      }
      setTimeout(() => {
        auth.removeAttribute('class')
      }, 200)
      header.appendChild(auth)
      componentNav(btnAttribute)
      btnCloseComponent()
    }
  })
})

// RETURN ACTION - REGISTER - FORGOT PASSWORD

const componentNav = (btnAttribute) => {
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
const formLogin = document.querySelector('#formlogin')
formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  let jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })
  const data = await fetchLogin(jsonData)
  let error
  if (data.status === 200) {
    console.log(data)
    const token = data.data.token
    localStorage.setItem('__EVENT_ACCESS__', token)
    error = false
    document.querySelector('header').remove()
    Alert(error, `welcome ${data.data.user.name}, Please wait, redirecting...`)
    setTimeout(() => {
      window.location.assign('/dashboard')
    }, 3000)
  }
  if (data.status === 404 || data.status === 409) error = true
  Alert(error, data.data.message)
})
