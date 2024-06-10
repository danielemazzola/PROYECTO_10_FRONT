import './style.css'
import { Home } from './pages/Home'
import { RecoveryPassword } from './pages/RecoveryPassword'
import { Error404 } from './pages/Error404'
import { Nav } from './components/nav/Nav'
import { NavSearch } from './components/navEventsSearch/NavSearch'
import { Alert } from './components/alert/Alert'

const routes = [
  { path: '/', view: Home },
  { path: '/recovery-password/:token', view: RecoveryPassword }
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
  document.querySelector('#header').innerHTML = `
  ${Nav()}
  ${NavSearch()}
  `
  document.getElementById('app').innerHTML = `
  ${view}
  ${Alert()}
  `
}
const navigateTo = (url) => {
  history.pushState(null, null, url)
  router()
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body')
  body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      /**e.preventDefault() */
      navigateTo(e.target.href)
    }
  })
  router()
})
