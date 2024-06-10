import { fetchLogin } from '../../services/fetchAuth'
import {
  btnCloseComponent,
  handleRegister,
  handleForgotPassword
} from '../templateNav/helpers'
import { Register, ForgotPassword } from '../templateNav/templatesAuth'

const header = document.querySelector('header')
const parentNav = document.querySelector('#containerNav')
const btns = parentNav.querySelectorAll('button')
const auth = document.createElement('div')

auth.id = 'auth'
let copyAttribute = ''

// RETURN BUTTOMS
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
const msgDiv = document.createElement('div')
const msgP = document.createElement('p')
formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  let jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })
  msgP.textContent = ''
  const data = await fetchLogin(jsonData)
  console.log(data)
  /* msgDiv.setAttribute(
        'style',
        'display:flex; justify-content:center; align-items:center; font-size:18px; font-weight:bold;'
      ) */
})
