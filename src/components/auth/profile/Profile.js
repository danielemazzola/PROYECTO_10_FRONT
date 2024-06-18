import { closeSession, openAvatar } from '../../../pages/auth/helpers'
import { getEventsisAuth, isAuth } from '../../../services/fetchIsAuth'
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

  divContentUser.classList.add('containerUser')
  containSettings.classList.add('containSettings')
  h3Title.classList.add('title-user')
  avatarImg.classList.add('avatarImg')
  config.classList.add('container-config')
  menu.classList.add('menu-icon')

  h3Title.textContent = data.data.name
  avatarImg.id = 'avatar-img'
  avatarImg.setAttribute('loading', 'lazy')
  avatarImg.src = data.data.avatar
  avatarImg.alt = `avatar by ${data.data.name}`
  menu.alt = `Settings`
  menu.setAttribute('loading', 'lazy')
  menu.src = 'https://cdn-icons-png.flaticon.com/512/8212/8212731.png'
  menu.setAttribute('style', 'width:20px;')

  header.append(divContentUser)
  divContentUser.append(avatarImg, containInfoUser)
  containInfoUser.append(h3Title)
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
    .then((events) => {
      CardEvent(events)
    })
    .catch((error) => {
      console.log(error)
    })

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
}
