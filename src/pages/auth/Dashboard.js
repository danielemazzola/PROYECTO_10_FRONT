import './dashboard.css'
import './helpers'
import { Profile } from '../../components/auth/profile/Profile'

export const Dashboard = () => {
  const token = localStorage.getItem('__EVENT_ACCESS__')
  if (token) {
    Profile(token)
  }
}
