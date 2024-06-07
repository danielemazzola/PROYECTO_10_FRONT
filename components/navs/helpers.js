import {
  btnCloseComponent,
  handleRegister,
  handleForgotPassword
} from '../nav/helpers'
import { Login, Register, ForgotPassword } from '../nav/templatesAuth'

const header = document.querySelector('header')
const parentNav = document.querySelector('#containerNav')
const btns = parentNav.querySelectorAll('button')
const auth = document.createElement('div')
auth.id = 'auth'
let copyAttribute = ''
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

const componentNav = (btnAttribute) => {
  if (btnAttribute === 'btn_login') auth.innerHTML = Login()
  if (btnAttribute === 'btn_register') {
    auth.innerHTML = Register()
    handleRegister()
  }
  if (btnAttribute === 'btn_forgot') {
    auth.innerHTML = ForgotPassword()
    handleForgotPassword()
  }
}
