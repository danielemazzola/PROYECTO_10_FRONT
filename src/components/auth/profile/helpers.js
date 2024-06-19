import { closeSession } from '../../../pages/auth/helpers'
import { AllEvents } from '../allEvents/AllEvents'
import { CreateEvent } from '../createEvent/CreateEvent'
import { MyEvents } from '../myEvents/MyEvents'

let active = Boolean()
export const menuToggle = (events) => {
  if (active) {
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
        <button id="create-event">Create Event</button>
        <button id="my-events">My Events</button>
        <button id="close-sesion">Close sesion</button>
      </div>
    `
    app.insertAdjacentHTML('afterbegin', itemsMenu)

    //ALL EVENTS
    const allEvents = document.querySelector('#all-events')
    allEvents.addEventListener('click', () => AllEvents(events))
    //CREATE EVENT
    const createEvent = document.querySelector('#create-event')
    createEvent.addEventListener('click', () => CreateEvent(events))

    //MY EVENTS
    const myEvents = document.querySelector('#my-events')
    myEvents.addEventListener('click', () => MyEvents())

    //CLOSE
    const closeSesion = document.querySelector('#close-sesion')
    closeSesion.addEventListener('click', () => closeSesionMenu())
    return
  }
}

//CLOSE SESION
const closeSesionMenu = () => {
  const menuItems = document.querySelector('#menu-items')
  menuItems.removeAttribute('class')
  menuItems.classList.add('animate-close')
  closeSession()
  setTimeout(() => {
    menuItems.remove()
  }, 300)
}
