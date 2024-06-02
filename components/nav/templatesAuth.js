import('./nav.css')
import('../../views/nav/helpers')

const Login = () => {
  const template = `
  <div class="login-container">
    <form class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" required>
      </div>
      <button type="submit" class="btn-form">Login</button>
    </form>
    <button class="closeContainer">Cerrar</button>
  </div>
  `
  return template
}
const Register = () => {
  const template = `
  <div class="register-container animate-rebote">
    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" required>
        <label for="last-name">Last Name</label>
        <input id="last-name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" required>
      </div>
      <button type="submit" class="btn-form">Register</button>
    </form>
    <button class="closeContainer">Cerrar</button>
  </div>
  `
  return template
}
const ForgotPassword = () => {
  const template = `
  <div class="forgot-password-container animate-rebote">
    <form @submit.prevent="handleSubmit" class="forgot-password-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" required>
      </div>
      <button type="submit" class="btn-form">Reset Password</button>
    </form>
    <button class="closeContainer">Cerrar</button>
</div>
  `
  return template
}

export { Login, Register, ForgotPassword }
