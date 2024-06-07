import('./nav.css')
import('./helpers')

export const Nav = () => {
  const nav = `
    <nav class='nav'>
      <div class='logo'>
        <a href="/" data-link class="linkHome">Events</a>
      </div>
      <div id='containerNav'>
        <form id="formlogin">
          <input id="email" type="email" placeholder="example@example.com" required />
          <input id="password" type="password" placeholder="********" required />
          <button type="submit">Login</button>
        </form>
        <div class="containerbtns">
          <button id='btn_register'>Register</button>
          <button id='btn_forgot'>Forgot password</button>
        </div>
      </div>
    </nav>
        `
  return nav
}
