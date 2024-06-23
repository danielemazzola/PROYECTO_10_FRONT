import { Alert } from '../../components/alert/Alert'
import { CardEvent } from '../../components/cardEvent/CardEvent'
import { getEvents } from '../../services/fetchEvents'

export const getAllEvents = async () => {
  try {
    const events = await getEvents()
    CardEvent(events)
  } catch (error) {
    Alert(true, error)
  }
}
