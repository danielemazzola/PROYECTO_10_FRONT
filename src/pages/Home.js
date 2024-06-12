import { Events } from '../components/events/Events'
import { Nav } from '../components/nav/Nav'
import { NavSearch } from '../components/navEventsSearch/NavSearch'
export const Home = () => {
  const view = Nav() + NavSearch() + Events()
  return view
}
