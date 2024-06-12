import './style.css'
import { Home } from './pages/Home'
import { RecoveryPassword } from './pages/RecoveryPassword'
import { Dashboard } from './pages/Dashboard'
import { Nav } from './components/nav/Nav'
import { NavSearch } from './components/navEventsSearch/NavSearch'
import { Error404 } from './pages/Error404'
import { parseLocation } from './utils/helpers'

const routes = [
  { path: '/', view: Home },
  {
    path: '/recovery-password/:token',
    view: RecoveryPassword
  },
  { path: '/dashboard', view: Dashboard }
]

const findRoute = (routePath) => {
  for (const route of routes) {
    const regex = new RegExp('^' + route.path.replace(/:\w+/g, '(.+)') + '$')
    const match = routePath.match(regex)
    if (match) {
      return { route, match }
    }
  }
  return null
}

const router = () => {
  const path = parseLocation()
  const matchResult = findRoute(path)
  if (!matchResult) {
    document.getElementById('app').innerHTML = Error404()
    return
  }

  const { route, match } = matchResult
  const view = route.view(match.slice(1)) // Pass all matches to the view
  const token = localStorage.getItem('__EVENT_ACCESS__')
  if (token) {
    if (route.path !== '/dashboard') {
      navigateTo('/dashboard')
      return
    }
  } else {
    if (route.path === '/dashboard') {
      navigateTo('/')
      return
    }
  }
  document.querySelector('#app').innerHTML = `${view}`
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body')

  body.addEventListener('click', (e) => {
    const target = e.target.closest('[data-link]')
    if (target) {
      e.preventDefault()
      navigateTo(target.href)
    }
  })

  router()
})
