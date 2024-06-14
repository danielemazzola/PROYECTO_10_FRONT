import { Profile } from '../../components/auth/profile/Profile'
import './dashboard.css'
import './helpers'

export const Dashboard = () => {
  const token = localStorage.getItem('__EVENT_ACCESS__')
  if (token) {
    Profile(token)
  }
}
