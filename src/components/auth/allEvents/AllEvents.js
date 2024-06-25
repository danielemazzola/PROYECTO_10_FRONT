import { CardEvent } from '../../cardEvent/CardEvent'
import { menuToggle } from '../menu/helpers'

export const AllEvents = (events) => {
  menuToggle()
  CardEvent(events)
}
