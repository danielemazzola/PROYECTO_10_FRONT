import('./style.css')
import { Events } from './views/events/Events'
import { Nav } from './views/nav/Nav'
import { Search } from './views/navEventsSearch/NavSearch'

const header = document.querySelector('#header')
header.append(Nav(), Search())

const app = document.querySelector('#app')
app.appendChild(Events())
