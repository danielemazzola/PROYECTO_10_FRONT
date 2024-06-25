import { toggleForm, login } from './helpers'

import('./nav.css')
import('./helpers')

export const Nav = () => {
  const view = `
    <nav class='nav'>
      <div class='logo'>
        <a href="/" data-link class="link-home">Event's</a>
      </div>
      <div id="containerNav">
        <form id="formlogin">
          <input id="email" type="email" name="email" placeholder="example@example.com" required />
          <input id="password" type="password" name="password" placeholder="********" required />
          <input id="btn_login" class="btnLogin" type="submit" value="Login">
        </form>
        <div class="containerbtns">
          <button id='btn_register'>Register</button>
          <button id='btn_forgot'>Forgot password</button>
        </div>
      </div>
    </nav>
        `
  return view
}

const initializeToggleButtons = () => {
  const formLogin = document.querySelector('#formlogin')
  if (!formLogin) return
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault()
    await login(e)
  })

  const buttons = document.querySelectorAll('#btn_register, #btn_forgot')

  let activeButton = ''

  buttons.forEach((button) => {
    button.addEventListener('click', () =>
      handleButtonClick(
        button,
        activeButton,
        (newActiveButton) => (activeButton = newActiveButton)
      )
    )
  })
}

const handleButtonClick = (button, activeButton, setActiveButton) => {
  const formType = button.id
  const auth = document.querySelector('#auth')

  if (auth) {
    auth.classList.add('animate-close')
    setTimeout(() => {
      auth.remove()
      if (activeButton !== formType) {
        toggleForm(formType)
        setActiveButton(formType)
      } else {
        setActiveButton('')
      }
    }, 300)
  } else {
    toggleForm(formType)
    setActiveButton(formType)
  }
}

window.addEventListener('load', initializeToggleButtons)
