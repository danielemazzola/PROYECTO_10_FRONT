import { CardEvent } from '../../cardEvent/CardEvent'
import { menuToggle } from '../profile/helpers'

export const AllEvents = (events) => {
  menuToggle()
  CardEvent(events)
}
