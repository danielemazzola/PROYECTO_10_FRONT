import { CardEvent } from '../../components/cardEvent/CardEvent'
import { getEvents } from '../../services/fetchEvents'

export const getAllEvents = () => {
  getEvents()
    .then((events) => {
      CardEvent(events)
    })
    .catch((error) => {
      console.log(error)
    })
}
