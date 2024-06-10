import '../events/events.css'
import { handleRegister } from './helpers'
import { getEvents, fetchRegisterEvent } from '../../services/fetchEvents'
import { Alert } from '../alert/Alert'
import { json } from 'express'

export const cardEvent = () => {
  getEvents().then((data) => {
    data.events?.map((event) => {
      const section = document.querySelector('#sectionEvents')
      const containerEvents = document.createElement('div')
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

      register.id = 'form-register-event'
      name.name = 'name'
      name.placeholder = 'Name: George'
      lastName.name = 'lastName'
      lastName.placeholder = 'Last name: Alvarez'
      email.type = 'email'
      email.name = 'email'
      email.placeholder = 'E-mail:george@email.com'
      btnRegisterEvent.type = 'submit'
      btnRegisterEvent.value = 'Register'
      btnRegisterEvent.id = 'btn-register-event'

      section.appendChild(containerEvents)
      containerEvents.appendChild(containerEventsWrapper)
      containerEventsWrapper.appendChild(containerEvent)
      containerEvent.append(bannerEvent, descriptionEvent)
      bannerEvent.appendChild(imgEvent)
      descriptionEvent.append(title, description, register)
      register.append(name, lastName, email, btnRegisterEvent)
      register.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(register)
        let jsonData = {}
        formData.forEach((value, key) => {
          jsonData[key] = value
        })

        let id = event._id
        const data = await fetchRegisterEvent({ jsonData, id })
        let error
        if (data.status === 201) error = true
        else error = false
        Alert(error, data.data.message)
      })
    })
  })
}
