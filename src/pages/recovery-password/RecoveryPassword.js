import './recovery.css'
import { handleRecoveryPassword } from './helpers'

export const RecoveryPassword = (token) => {
  const template = `
  <div class="form-group">
    <h1>Recovery password</h1>
    <form class="recovery-password-form">
      <label for="password">New password</label>
      <div>
        <input type="password" name="password" required />
        <input id="recovery-password" type="submit" value="Save" class="btn-form" />
      </div>
    </form>
  </div>
  `
  window.addEventListener('load', () => {
    const saveNewPassword = document.querySelector('.recovery-password-form')
    if (!saveNewPassword) return null
    saveNewPassword.addEventListener('submit', (e) => {
      e.preventDefault()
      handleRecoveryPassword(e, token)
    })
  })
  return template
}
