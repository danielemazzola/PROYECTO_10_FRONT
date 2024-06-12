import { router } from '../../main'

export const parseLocation = () => {
  return window.location.pathname
}

export const navigateTo = (url) => {
  history.pushState(null, null, url)
  router()
}

export const findRoute = (routePath, routes) => {
  for (const route of routes) {
    const regex = new RegExp('^' + route.path.replace(/:\w+/g, '(.+)') + '$')
    const match = routePath.match(regex)
    if (match) {
      return { route, match }
    }
  }
  return null
}
