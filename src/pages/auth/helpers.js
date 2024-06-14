import { Alert } from '../../components/alert/Alert'
import { Nav } from '../../components/nav/Nav'
import { NavSearch } from '../../components/navEventsSearch/NavSearch'
import { isAuth } from '../../services/fetchIsAuth'
import { Home } from '../home/Home'

export const profile = async (token) => {
  const app = document.querySelector('#app')
  const header = document.querySelector('header')
  header.innerHTML += Nav()
  const containerNav = header.querySelector('#containerNav')
  containerNav.innerHTML = ``

  const data = await isAuth(token)

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
  avatarImg.setAttribute('loading', 'lazy')
  avatarImg.src = data.data.avatar
  avatarImg.alt = `avatar by ${data.data.name}`
  settings.alt = `Settings`
  logout.alt = `logout`
  settings.src =
    'https://static-00.iconduck.com/assets.00/settings-icon-2048x2046-cw28eevx.png'
  settings.setAttribute('style', 'width:20px;')

  logout.src =
    'https://static.vecteezy.com/system/resources/previews/032/058/220/original/exit-icon-logout-3d-illustration-rendering-transparent-png.png'
  logout.setAttribute('style', 'width:20px;')

  containerNav.append(divContentUser)
  divContentUser.append(avatarImg, containInfoUser)
  containInfoUser.append(h3Title, config)

  //AVATAR
  avatarImg.addEventListener('mouseenter', () => {
    const containImg = `
      <div id="avatarToggle">
        <img alt="avatar by ${data.data.name}" src=${data.data.avatar} loading:'lazy' />
      </div>
    `
    app.innerHTML += containImg
  })
  avatarImg.addEventListener('mouseleave', () => {
    const containImg = document.querySelector('#avatarToggle')
    containImg.remove()
  })

  //ADMIN
  if (data.data.roles.includes('admin')) {
    const adminTarget = document.createElement('span')
    adminTarget.classList.add('admin')
    adminTarget.textContent = data.data.roles[0]
    config.append(adminTarget)
  } else {
    config.innerHTML = `<div></div>`
  }
  config.append(containSettings)
  containSettings.append(settings, logout)

  logout.addEventListener('click', () => {
    localStorage.removeItem('__EVENT_ACCESS__')
    let error = false
    Alert(error, '❤️Thank you for visiting us❤️')
    setTimeout(() => {
      document.querySelector('header').innerHTML = Nav() + NavSearch()
      document.querySelector('#app').innerHTML = Home()
    }, 3000)
  })
}
