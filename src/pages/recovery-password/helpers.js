import { Alert } from '../../components/alert/Alert'
import { fetchRecoveryPassword } from '../../services/fetchAuth'
import { Home } from '../home/Home'

export const handleRecoveryPassword = async (e, token) => {
  const formData = new FormData(e.target)
  let jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })
  const data = await fetchRecoveryPassword(jsonData, token)
  let error
  if (data.status === 200) {
    error = false
    document.querySelector('.recovery-password-form').remove()
    window.history.replaceState({}, document.title, '/')
    document.querySelector('#app').innerHTML = Home()
  }
  if (data.status === 404 || data.status === 500) {
    error = true
  }
  Alert(error, data.data.message)
}
