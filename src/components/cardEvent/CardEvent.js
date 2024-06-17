import './card.css'
import './helpers'
import { handleRegister } from './helpers'

export const CardEvent = async (events) => {
  console.log(events.events[0])
  if (!events) return null
  const section = document.querySelector('#card-events')
  if (!section) return null
  const pMessage = document.querySelector('#messageEvents')
  pMessage.textContent = events.message
  events.events.map((event, index) => {
    const containerEvents = document.createElement('div')
    containerEvents.id = event._id
    const containerEventsWrapper = document.createElement('div')
    const containerEvent = document.createElement('div')
    containerEvents.classList.add('containerEvents')
    containerEventsWrapper.classList.add('containerEventsWrapper')
    containerEvent.classList.add('containerEvent')
    const bannerEvent = document.createElement('div')
    const imgEvent = document.createElement('img')

    imgEvent.src = event.image
    imgEvent.alt = event.title
    bannerEvent.classList.add('bannerEvent')

    const descriptionEvent = document.createElement('div')
    const title = document.createElement('h2')
    title.textContent = event.title
    const description = document.createElement('p')
    description.textContent = event.description
    descriptionEvent.classList.add('descriptionEvent')
    const register = document.createElement('form')
    const name = document.createElement('input')
    const lastName = document.createElement('input')
    const email = document.createElement('input')
    const btnRegisterEvent = document.createElement('input')

    register.classList.add('form-register-event')
    name.name = 'name'
    name.placeholder = 'Name: George'
    lastName.name = 'lastName'
    lastName.placeholder = 'Last name: Alvarez'
    email.type = 'email'
    email.name = 'email'
    email.placeholder = 'E-mail:george@email.com'
    btnRegisterEvent.type = 'submit'
    btnRegisterEvent.value = 'Register'
    btnRegisterEvent.classList.add('btn-register-event')

    section.appendChild(containerEvents)
    containerEvents.appendChild(containerEventsWrapper)
    containerEventsWrapper.appendChild(containerEvent)
    containerEvent.append(bannerEvent)

    const attendees = events.events[0].attendees

    if (!attendees) {
      containerEvent.append(descriptionEvent)
    }

    if (typeof attendees === 'number') {
      //TEMPLATE USER AUTH
    } else if (Array.isArray(attendees)) {
      //TEMPLATE ADMIN
    }

    bannerEvent.appendChild(imgEvent)
    descriptionEvent.append(title, description, register)
    register.append(name, lastName, email, btnRegisterEvent)
    register.addEventListener('submit', async (e) => {
      e.preventDefault()
      handleRegister(event, register)
    })
  })
}
