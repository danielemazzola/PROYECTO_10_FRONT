import './style.css'
import { Home } from './pages/Home'
import { RecoveryPassword } from './pages/RecoveryPassword'
import { Dashboard } from './pages/Dashboard'
import { Nav } from './components/nav/Nav'
import { NavSearch } from './components/navEventsSearch/NavSearch'

const routes = [
  { path: '/', view: Home },
  { path: '/recovery-password/:token', view: RecoveryPassword },
  { path: '/dashboard', view: Dashboard }
]

const parseLocation = () => {
  return window.location.pathname
}

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
  const view = route.view(match[1])
  const token = localStorage.getItem('__EVENT_ACCESS__')
  if (token) {
    if (route.path !== '/dashboard') {
      navigateTo('/dashboard')
      return
    }
  } else {
    document.querySelector('#header').innerHTML = `
          ${Nav()}
          `
    if (route.path === '/dashboard') {
      navigateTo('/')
      return
    }
  }
  document.getElementById('app').innerHTML = `
            ${NavSearch()}
            ${view}
            `
}
export const navigateTo = (url) => {
  history.pushState(null, null, url)
  router()
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body')
  body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      navigateTo(e.target.href)
    }
  })
  router()
})
