import { getMyEvents } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { CardEvent } from '../../cardEvent/CardEvent'
import { Loader } from '../../loader/Loader'
import { menuToggle } from '../menu/helpers'
import { events } from '../profile/Profile'
import { myAttendances } from './helpers'

export const MyEvents = async () => {
  menuToggle()
  try {
    const getEventsMy = await getMyEvents()
    CardEvent(getEventsMy.data)
  } catch (error) {
    Alert(true, error)
  }
}

export const MyAttendances = async (user, events) => {
  Loader(true)
  const myAttendancesEvents = myAttendances(user, events)
  menuToggle()
  setTimeout(() => {
    Loader(false)
  }, 1500)
  CardEvent({ message: '❤️My Attendances❤️', events: myAttendancesEvents })
}
