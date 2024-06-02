import('./nav.css')
import('./helpers')

export const Nav = () => {
  const nav = document.createElement('nav')

  nav.innerHTML = `
    <nav class='nav'>
      <div class='logo'>
        <img src='../../images/E.png' alt='Logo de TOP EVENTS' loading="lazy" />
      </div>
      <div id='containerNav'>
        <form id="formlogin">
          <input type="email" placeholder="example@example.com" />
          <input type="password" placeholder="********" />
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
{
  /* <button id='btn_login'>Login</button> */
}
