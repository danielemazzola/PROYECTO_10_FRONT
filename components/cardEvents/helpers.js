import { fetchRegisterEvent } from '../../services/fetchEvents'
import { Alert } from '../alert/Alert'

export const handleRegister = async (event, register) => {
  const formData = new FormData(register)
  let jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })
  let id = event._id
  const data = await fetchRegisterEvent({ jsonData, id })
  let error
  if (data.status === 409) error = true
  else if (data.status === 201) {
    error = true
    register.innerHTML = ``
  } else {
    error = false
    register.innerHTML = ``
  }
  Alert(error, data.data.message)
}
