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
  const menu = document.createElement('img')
  const logout = document.createElement('img')

  divContentUser.classList.add('containerUser')
  containSettings.classList.add('containSettings')
  h3Title.classList.add('title-user')
  avatarImg.classList.add('avatarImg')
  config.classList.add('container-config')
  menu.classList.add('menu-icon')
  logout.classList.add('settings')

  h3Title.textContent = data.data.name
  avatarImg.id = 'avatar-img'
  avatarImg.setAttribute('loading', 'lazy')
  avatarImg.src = data.data.avatar
  avatarImg.alt = `avatar by ${data.data.name}`
  menu.alt = `Settings`
  menu.setAttribute('loading', 'lazy')
  logout.alt = `Logout`
  menu.src =
    'https://static.vecteezy.com/system/resources/previews/019/858/703/non_2x/menu-flat-color-outline-icon-free-png.png'
  menu.setAttribute('style', 'width:20px;')

  logout.src = 'https://cdn-icons-png.flaticon.com/512/4943/4943215.png'
  logout.setAttribute('style', 'width:20px;')
  logout.setAttribute('title', 'Close session')
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
  containSettings.append(menu, logout)
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

  let active
  menu.addEventListener('click', () => {
    if (active) {
      active = false

      const menuItems = document.querySelector('#menu-items')
      menuItems.removeAttribute('class')
      menuItems.classList.add('animate-close')
      setTimeout(() => {
        menuItems.remove()
      }, 300)
      return
    } else {
      active = true
      const itemsMenu = `
        <div id="menu-items" class="animate-init">
          <button>Create Event</button>
          <button>My Events</button>
          <button id="close-sesion">Close sesion</button>
        </div>
      `
      app.insertAdjacentHTML('afterbegin', itemsMenu)
      const closeSesion = document.querySelector('#close-sesion')
      closeSesion.addEventListener('click', () => {
        const menuItems = document.querySelector('#menu-items')
        menuItems.removeAttribute('class')
        menuItems.classList.add('animate-close')
        closeSession()
        setTimeout(() => {
          menuItems.remove()
        }, 300)
      })
      return
    }
  })

  logout.addEventListener('click', () => closeSession())
}
