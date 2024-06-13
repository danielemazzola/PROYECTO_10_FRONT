import './src/assets/style.css'
import { Nav } from './src/components/nav/Nav'
import { NavSearch } from './src/components/navEventsSearch/NavSearch'
import { Dashboard } from './src/pages/auth/Dashboard'
import { Home } from './src/pages/home/Home'
import { RecoveryPassword } from './src/pages/recovery-password/RecoveryPassword'

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('__EVENT_ACCESS__')
  const appElement = document.querySelector('#app')
  const headerElement = document.querySelector('header')

  const path = window.location.pathname
  const recoveryPasswordMatch = path.match(/^\/recovery-password\/(.+)/)

  if (token) {
    appElement.innerHTML = Dashboard()
  } else {
    if (recoveryPasswordMatch) {
      const recoveryToken = recoveryPasswordMatch[1]
      appElement.innerHTML =
        Nav() + NavSearch() + RecoveryPassword(recoveryToken)
    } else {
      headerElement.innerHTML = Nav() + NavSearch()
      appElement.innerHTML = Home()
    }
  }
})
