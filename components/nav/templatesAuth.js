import('./nav.css')

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
    <div class="form-group">
      <form id="register-form" class="register-form">
        <label for="name">Name</label>
        <input id="name" name="name" required>
        <label for="lastName">Last Name</label>
        <input id="lastName" name="lastName" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <input type="submit" class="btn-form" value="Register">
      </form>
    </div>
    <button class="closeContainer">Cerrar</button>
  </div>
  `
  return template
}
const ForgotPassword = () => {
  const template = `
<div class="forgot-password-container animate-rebote">
  <div class="form-group">
    <form class="forgot-password-form">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <input type="submit" class="btn-form" value="Reset Password">
    </form>
  </div>
  <button class="closeContainer">Cerrar</button>
</div>
  `
  return template
}

export { Login, Register, ForgotPassword }
