import { router } from '../../main'

export const parseLocation = () => {
  return window.location.pathname
}

export const navigateTo = (url) => {
  history.pushState(null, null, url)
  router()
}
