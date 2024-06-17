import { closeSession, openAvatar } from '../../../pages/auth/helpers'
import { getEvents } from '../../../services/fetchEvents'
import { isAuth } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { CardEvent } from '../../cardEvent/CardEvent'
import { Nav } from '../../nav/Nav'
import './profile.css'

export const Profile = async (token) => {
  document.querySelector('#app').innerHTML = ``
  const app = document.querySelector('#app')
  const header = document.querySelector('header')
  header.innerHTML += Nav()
  const containerNav = header.querySelector('#containerNav')
  containerNav.innerHTML = ``
  let error
  const data = await isAuth(token)
  if (!data) {
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
  const config = document.createElement('div')
  const containSettings = document.createElement('div')
  const settings = document.createElement('img')
  const logout = document.createElement('img')

  divContentUser.classList.add('containerUser')
  containSettings.classList.add('containSettings')
  h3Title.classList.add('title-user')
  avatarImg.classList.add('avatarImg')
  config.classList.add('container-config')
  settings.classList.add('settings')
  logout.classList.add('settings')

  h3Title.textContent = data.data.name
  avatarImg.id = 'avatar-img'
  avatarImg.setAttribute('loading', 'lazy')
  avatarImg.src = data.data.avatar
  avatarImg.alt = `avatar by ${data.data.name}`
  settings.alt = `Settings`
  settings.setAttribute('loading', 'lazy')
  logout.alt = `Logout`
  settings.src =
    'https://static-00.iconduck.com/assets.00/settings-icon-2048x2046-cw28eevx.png'
  settings.setAttribute('style', 'width:20px;')

  logout.src =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Human-gnome-logout.svg/1200px-Human-gnome-logout.svg.png'
  logout.setAttribute('style', 'width:20px;')
  logout.setAttribute('loading', 'lazy')

  containerNav.append(divContentUser)
  divContentUser.append(avatarImg, containInfoUser)
  containInfoUser.append(h3Title, config)

  //AVATAR
  avatarImg.addEventListener('click', () => openAvatar(data, token))

  //ADMIN
  if (data.data.roles.includes('admin')) {
    const adminTarget = document.createElement('span')
    adminTarget.classList.add('admin')
    adminTarget.textContent = 'Admin'
    config.append(adminTarget)
  } else {
    config.innerHTML = `<div></div>`
  }
  config.append(containSettings)
  containSettings.append(settings, logout)
  app.innerHTML = `
    <div id="contain-events">
        <p id="messageEvents"></p>
        <div id="card-events">
        </div>
      </div>
  `
  await CardEvent()
  const forms = document.querySelectorAll('.form-register-event')
  for (const form of forms) {
    form.remove()
  }

  logout.addEventListener('click', () => closeSession())
}
