import { getMyEvents } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { CardEvent } from '../../cardEvent/CardEvent'
import { Loader } from '../../loader/Loader'
import { menuToggle } from '../profile/helpers'
import { myAttendances } from './helpers'

export const MyEvents = async () => {
  menuToggle()
  document.querySelector('#card-events').innerHTML = ``
  await getMyEvents()
    .then((evs) => {
      CardEvent(evs.data)
    })
    .catch((error) => {
      Alert(true, error)
    })
}

export const MyAttendances = async (user, events) => {
  Loader(true)
  const myAttendancesEvents = myAttendances(user, events)
  menuToggle()
  setTimeout(() => {
    Loader(false)
  }, 1500)
  document.querySelector('#card-events').innerHTML = ``
  CardEvent({ message: '❤️My Attendances❤️', events: myAttendancesEvents })
}
