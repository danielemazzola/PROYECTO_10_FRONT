import './dashboard.css'
import './helpers'
import { profile } from './helpers'

export const Dashboard = () => {
  const token = localStorage.getItem('__EVENT_ACCESS__')
  if (token) {
    profile(token)
  }
}
