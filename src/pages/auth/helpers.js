import { Alert } from '../../components/alert/Alert'
import { CardEvent } from '../../components/cardEvent/CardEvent'
import { changeAvatar } from '../../services/fetchIsAuth'
import './dashboard.css'

//CLOSE SESION
export const closeSession = () => {
  localStorage.removeItem('__EVENT_ACCESS__')
  let error = false
  Alert(error, '❤️Thank you for visiting us❤️')
  setTimeout(() => {
    window.location.assign('/')
  }, 3000)
}
