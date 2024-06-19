import { closeSession, openAvatar } from '../../../pages/auth/helpers'
import { getEventsisAuth, isAuth } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { CardEvent } from '../../cardEvent/CardEvent'
import { Nav } from '../../nav/Nav'
import { menuToggle } from './helpers'
import './profile.css'

let events = {}
export const Profile = async (token) => {
  document.querySelector('#app').innerHTML = ``
  const app = document.querySelector('#app')
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
  const menu = document.createElement('img')

  divContentUser.classList.add('containerUser')
  containSettings.classList.add('containSettings')
  h3Title.classList.add('title-user')
  pEmail.classList.add('title-user')
  avatarImg.classList.add('avatarImg')
  config.classList.add('container-config')
  menu.classList.add('menu-icon')

  h3Title.textContent = data.data.name
  pEmail.textContent = data.data.email
  avatarImg.id = 'avatar-img'
  avatarImg.setAttribute('loading', 'lazy')
  avatarImg.src = data.data.avatar
  avatarImg.alt = `avatar by ${data.data.name}`
  menu.alt = `Settings`
  menu.setAttribute('loading', 'lazy')
  menu.src = '../../images/menu.png'

  header.append(divContentUser)
  divContentUser.append(avatarImg, containInfoUser)
  containInfoUser.append(h3Title, pEmail)
  containerNav.append(config)
  containerNav

  //AVATAR
  avatarImg.addEventListener('click', () => openAvatar(data, token))

  //ADMIN
  const adminTarget = document.createElement('span')
  adminTarget.classList.add('admin')
  if (data.data.roles.includes('admin')) {
    adminTarget.textContent = 'Admin'
  } else {
    adminTarget.textContent = 'User'
  }
  containInfoUser.append(adminTarget)
  config.append(containSettings)
  containSettings.append(menu)
  app.innerHTML = `
    <div id="contain-events">
        <p id="messageEvents"></p>
        <div id="card-events">
        </div>
      </div>
  `
  getEventsisAuth(token)
    .then((evs) => {
      events = { ...evs }
      CardEvent(events, token)
    })
    .catch((error) => {
      Alert(true, error)
    })

  menu.addEventListener('click', () => {
    menuToggle(events)
  })
}
