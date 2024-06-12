import './src/assets/style.css'
import { Nav } from './src/components/nav/Nav'
import { NavSearch } from './src/components/navEventsSearch/NavSearch'
import { Dashboard } from './src/pages/auth/Dashboard'
import { Home } from './src/pages/home/Home'

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('__EVENT_ACCESS__')
  if (token) {
    document.querySelector('#app').innerHTML += Dashboard()
  } else {
    document.querySelector('header').innerHTML += Nav() + NavSearch()
    document.querySelector('#app').innerHTML += Home()
  }
})
