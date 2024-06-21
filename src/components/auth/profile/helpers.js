import { closeSession } from '../../../pages/auth/helpers'
import { user } from '../../../services/fetchIsAuth'
import { AllEvents } from '../allEvents/AllEvents'
import { CreateEvent } from '../createEvent/CreateEvent'
import { MyEvents } from '../myEvents/MyEvents'
import { MyAttendances } from '../myEvents/MyEvents'

let active = Boolean()
export const menuToggle = (events) => {
  if (active) {
    const menu = document.querySelector('#menu-icon')
    if (menu) menu.setAttribute('style', 'background-color:white')
    active = false
    const menuItems = document.querySelector('#menu-items')
    menuItems.removeAttribute('class')
    menuItems.classList.add('animate-close')
    setTimeout(() => {
      menuItems.remove()
    }, 300)
    return
  } else {
    active = true
    const itemsMenu = `
      <div id="menu-items" class="animate-init">
        <button id="all-events">All Event</button>
        <button id="my-attendances">My Attendances</button>
        <button id="create-event">Create Event</button>
        <button id="my-events">My Events</button>
        <button id="close-sesion">Close sesion</button>
      </div>
    `
    header.insertAdjacentHTML('afterbegin', itemsMenu)

    //ALL EVENTS
    const allEvents = document.querySelector('#all-events')
    if (allEvents)
      allEvents.addEventListener('click', () => {
        app.innerHTML = ``
        AllEvents(events)
      })

    const myAttendances = document.querySelector('#my-attendances')
    if (myAttendances)
      myAttendances.addEventListener('click', () => {
        app.innerHTML = ``
        MyAttendances(user, events)
      })

    //CREATE EVENT
    const createEvent = document.querySelector('#create-event')
    if (createEvent)
      createEvent.addEventListener('click', () => {
        app.innerHTML = ``
        CreateEvent(events)
      })

    //MY EVENTS
    const myEvents = document.querySelector('#my-events')
    if (myEvents)
      myEvents.addEventListener('click', () => {
        app.innerHTML = ``
        MyEvents()
      })

    //CLOSE
    const closeSesion = document.querySelector('#close-sesion')
    if (closeSesion)
      closeSesion.addEventListener('click', () => closeSesionMenu())
    return
  }
}

//CLOSE SESION
const closeSesionMenu = () => {
  const menuItems = document.querySelector('#menu-items')
  menuToggle()
  closeSession()
  setTimeout(() => {
    menuItems.remove()
  }, 300)
}
