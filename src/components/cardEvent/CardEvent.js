import './card.css'
import './helpers'
import { date } from '../../utils/date'
import { user } from '../../services/fetchIsAuth'
import { MoreInfo, handleRegister } from './helpers'

export const CardEvent = async (events, token) => {
  const reversedEvents = [...events.events].reverse()
  if (!events) return null
  const section = document.querySelector('#card-events')
  if (!section) return null
  const pMessage = document.querySelector('#messageEvents')
  const pEventsLength = document.querySelector('#events-lenght')
  pMessage.textContent = events.message
  pEventsLength.textContent = `Total events: ${reversedEvents.length}`
  reversedEvents.forEach((event) => {
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
    const dateP = document.createElement('span')
    title.textContent = `${event.title}`
    dateP.textContent = `Location: ${event.location} | ${date(
      event.date
    )} hours`
    const description = document.createElement('p')
    description.textContent = event.description
    descriptionEvent.classList.add('descriptionEvent')

    const register = document.createElement('form')
    const name = document.createElement('input')
    const lastName = document.createElement('input')
    const email = document.createElement('input')
    const btnRegisterEvent = document.createElement('input')

    section.appendChild(containerEvents)
    containerEvents.appendChild(containerEventsWrapper)
    containerEventsWrapper.appendChild(containerEvent)
    containerEvent.append(bannerEvent)

    const attendees = events.events[0].attendees

    bannerEvent.appendChild(imgEvent)
    descriptionEvent.append(title, dateP, description)
    if (Object.keys(user).length === 0) {
      register.classList.add('form-register-event')
      name.name = 'name'
      name.placeholder = 'Name: George'
      name.required = true
      lastName.name = 'lastName'
      lastName.required = true
      lastName.placeholder = 'Last name: Alvarez'
      email.type = 'email'
      email.required = true
      email.name = 'email'
      email.placeholder = 'E-mail: george@email.com'
      btnRegisterEvent.type = 'submit'
      btnRegisterEvent.value = 'Register'
      btnRegisterEvent.classList.add('btn-register-event')
      descriptionEvent.append(register)
      register.append(name, lastName, email, btnRegisterEvent)
      register.addEventListener('submit', async (e) => {
        e.preventDefault()
        handleRegister(event, register)
      })
    } else {
      // TEMPLATE USER AUTH
      const divBtn = document.createElement('div')
      const btnMoreInfo = document.createElement('button')
      divBtn.classList.add('event-more-information')
      btnMoreInfo.classList.add('btn-more-information')
      btnMoreInfo.textContent = 'More Information'
      descriptionEvent.append(divBtn)
      divBtn.append(btnMoreInfo)
      btnMoreInfo.addEventListener('click', () => {
        MoreInfo(token, event)
      })
    }
    containerEvent.append(descriptionEvent)
  })
}
