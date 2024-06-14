import('./nav.css')
import('./helpers')

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
      <label for="email-forgot">Email:</label>
      <input type="email" id="email-forgot" name="email" required>
      <input type="submit" class="btn-form" value="Reset Password">
    </form>
  </div>
  <button class="closeContainer">Cerrar</button>
</div>
  `
  return template
}

export { Register, ForgotPassword }
