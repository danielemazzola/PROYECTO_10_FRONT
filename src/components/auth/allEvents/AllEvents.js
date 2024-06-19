import { CardEvent } from '../../cardEvent/CardEvent'
import { menuToggle } from '../profile/helpers'

export const AllEvents = (events) => {
  menuToggle()
  document.querySelector('#card-events').innerHTML = ``
  CardEvent(events)
}
