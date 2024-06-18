import { fetchRegisterEvent } from '../../services/fetchEvents'
import { user } from '../../services/fetchIsAuth'
import { date } from '../../utils/date'
import { Alert } from '../alert/Alert'
import './card.css'
import './helpers'
import { DescriptionEvent, handleRegister } from './helpers'

export const CardEvent = async (events) => {
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
    const dateP = document.createElement('span')
    title.textContent = `${event.title}`
    dateP.textContent = `Location: ${event.location} - ${date(
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
      lastName.name = 'lastName'
      lastName.placeholder = 'Last name: Alvarez'
      email.type = 'email'
      email.name = 'email'
      email.placeholder = 'E-mail:george@email.com'
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
      //TEMPLATE USER AUTH
      const divBtn = document.createElement('div')
      const btnMoreInfo = document.createElement('button')
      divBtn.classList.add('event-more-information')
      btnMoreInfo.classList.add('btn-more-information')
      btnMoreInfo.textContent = 'More Information'
      descriptionEvent.append(divBtn)
      divBtn.append(btnMoreInfo)
      btnMoreInfo.addEventListener('click', () => {
        DescriptionEvent(event)
        if (user.data.roles.includes('admin')) {
          const allAttendees = document.querySelector('.more')
          if (event.attendees.length > 0) {
            allAttendees.addEventListener('click', () => {
              const attendeesList = event.attendees
                .map(
                  (ele, index) =>
                    `<li class="${index % 2 === 0 ? 'grey' : 'white'}">${
                      ele.name
                    } ${ele.lastName} - ${ele.email}</li>`
                )
                .join('')
              const template = `
                <div class="info-attendees">
                  <ul>${attendeesList}</ul>
                  <button class="close-attendees">X</button>
                </div>
              `
              app.insertAdjacentHTML('beforeend', template)
              const closeAttendees = document.querySelector('.close-attendees')
              closeAttendees.addEventListener('click', () => {
                document.querySelector('.info-attendees').remove()
              })
            })
          } else {
            Alert(true, 'There are not attendees to this event😑')
          }
        }
        const subscribeEvent = document.querySelector('#subscribe-event')
        subscribeEvent.addEventListener('click', async () => {
          let jsonData = {
            name: user.data.name,
            lastName: user.data.lastName,
            email: user.data.email
          }
          let id = event._id
          const data = await fetchRegisterEvent({ jsonData, id })
          if (data.status === 200) {
            const attendesCount = document.querySelector('#attendes-count')
            if (user.data.roles.includes('admin')) {
              event.attendees.push(jsonData)
              attendesCount.textContent = `Attendees: ${event.attendees.length}`
            } else {
              event.attendees += 1
              attendesCount.textContent = `Attendees: ${event.attendees}`
            }
          }
          Alert(data.status !== 200, data.data.message)
        })
        const closeInfo = document.querySelector('#close-info')
        closeInfo.addEventListener('click', () => {
          document.querySelector('.container-info').remove()
        })
      })
    }
    containerEvent.append(descriptionEvent)
  })
}
