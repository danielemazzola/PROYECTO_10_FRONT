import { getMyEvent } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { CardEvent } from '../../cardEvent/CardEvent'
import { menuToggle } from '../profile/helpers'

export const MyEvents = async () => {
  menuToggle()

  document.querySelector('#card-events').innerHTML = ``
  await getMyEvent()
    .then((evs) => {
      CardEvent(evs.data)
    })
    .catch((error) => {
      Alert(true, error)
    })
}
