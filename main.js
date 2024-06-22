import './src/assets/style.css'
import { Loader } from './src/components/loader/Loader'
import { Nav } from './src/components/nav/Nav'
import { NotFound } from './src/pages/404/NotFound'
import { Dashboard } from './src/pages/auth/Dashboard'
import { Home } from './src/pages/home/Home'
import { RecoveryPassword } from './src/pages/recovery-password/RecoveryPassword'

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('__EVENT_ACCESS__')
  const appElement = document.querySelector('#app')
  const headerElement = document.querySelector('header')
  const path = window.location.pathname

  if (!(path === '/' || path.startsWith('/recovery-password/'))) {
    headerElement.innerHTML = Nav()
    appElement.innerHTML = NotFound()
    return null
  }
  if (token) {
    Loader(true)
    appElement.innerHTML = Dashboard()
  } else {
    const recoveryPasswordMatch = path.match(/^\/recovery-password\/(.+)/)
    if (recoveryPasswordMatch) {
      const recoveryToken = recoveryPasswordMatch[1]
      headerElement.innerHTML = Nav()
      appElement.innerHTML = RecoveryPassword(recoveryToken)
    } else {
      headerElement.innerHTML = Nav()
      appElement.innerHTML = Home()
    }
  }
})
