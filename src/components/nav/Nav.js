import { login } from './helpers'

import('./nav.css')
import('./helpers')

export const Nav = () => {
  const view = `
    <nav class='nav'>
      <div class='logo'>
        <a href="/" data-link class="link-home">Events</a>
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

window.addEventListener('load', () => {
  const formLogin = document.querySelector('#formlogin')
  if (!formLogin) return
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault()
    login(e)
  })
})
