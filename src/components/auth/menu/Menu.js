import { events } from '../profile/Profile'
import { menuToggle } from './helpers'
import './menu.css'

export const Menu = (events) => {
  const menu = document.createElement('img')
  menu.classList.add('menu-icon')
  menu.alt = `Settings`
  menu.setAttribute('loading', 'lazy')
  menu.src = '../../images/menu.png'
  document.querySelector('header').append(menu)
  menu.addEventListener('click', () => {
    menuToggle(events)
  })
}
