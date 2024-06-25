import { getEventsisAuth, isAuth } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { CardEvent } from '../../cardEvent/CardEvent'
import { Nav } from '../../nav/Nav'
import { Menu } from '../menu/Menu'
import { openAvatar } from './helpers'
import './profile.css'

export let events = {}
export const Profile = async (token) => {
  const existingApp = document.querySelector('#app')
  if (existingApp) {
    existingApp.remove()
  }
  const app = document.createElement('div')
  app.id = 'app'
  document.querySelector('body').append(app)
  const header = document.querySelector('header')
  header.innerHTML += Nav()
  const containerNav = header.querySelector('#containerNav')
  containerNav.innerHTML = ``
  let error
  const data = await isAuth(token)
  if (!data || data.status === 401) {
    error = true
    Alert(error, 'there is a problem with the connection, redirecting...')
    setTimeout(() => {
      localStorage.removeItem('__EVENT_ACCESS__')
      window.location.assign('/')
    }, 2000)
    return
  }
  const divContentUser = document.createElement('div')
  const avatarImg = document.createElement('img')
  const containInfoUser = document.createElement('div')
  const h3Title = document.createElement('h3')
  const pEmail = document.createElement('email')
  const config = document.createElement('div')
  const containSettings = document.createElement('div')

  divContentUser.classList.add('containerUser')
  containSettings.classList.add('containSettings')
  h3Title.classList.add('title-user')
  pEmail.classList.add('title-user')
  avatarImg.classList.add('avatarImg')
  config.classList.add('container-config')

  h3Title.textContent = data.data.name
  pEmail.textContent = data.data.email
  avatarImg.id = 'avatar-img'
  avatarImg.setAttribute('loading', 'lazy')
  avatarImg.src = data.data.avatar
  avatarImg.alt = `avatar by ${data.data.name}`

  header.append(divContentUser)
  divContentUser.append(avatarImg, containInfoUser)
  containInfoUser.append(h3Title, pEmail)
  containerNav.append(config)
  containerNav

  //EVENTS
  try {
    const getEventAuth = await getEventsisAuth(token)
    events = { ...getEventAuth }
    CardEvent(events, token)
  } catch (error) {
    Alert(true, error)
  }

  //AVATAR
  avatarImg.addEventListener('click', () => {
    app.innerHTML = ``
    openAvatar(data, token, events)
  })

  //ADMIN
  const adminTarget = document.createElement('span')
  adminTarget.classList.add('admin')
  if (data.data.roles.includes('admin')) {
    adminTarget.textContent = 'Admin'
  } else {
    adminTarget.textContent = 'User'
  }

  Menu(events)
  containInfoUser.append(adminTarget)
  config.append(containSettings)
}
