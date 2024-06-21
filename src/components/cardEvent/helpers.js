import { fetchRegisterEvent } from '../../services/fetchEvents'
import { Alert } from '../alert/Alert'
import { date } from '../../utils/date'
import { createEvent, getEvent, user } from '../../services/fetchIsAuth'
import { editEvent } from '../auth/createEvent/CreateEvent'

export const handleRegister = async (event, register) => {
  const formData = new FormData(register)
  let jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })
  let id = event._id
  const data = await fetchRegisterEvent({ jsonData, id })
  let error
  if (data.status === 409) error = true
  else if (data.status === 201) {
    error = true
    register.innerHTML = ``
  } else {
    error = false
    register.innerHTML = ``
  }
  Alert(error, data.data.message)
}

export const DescriptionEvent = (event) => {
  const app = document.querySelector('#app')
  const contentCard = document.querySelector('#contain-events')
  contentCard.setAttribute('style', 'display:none')
  const existContainer = document.querySelector('.container-info')
  if (existContainer) existContainer.remove()
  if (user.data.roles.includes('admin')) {
    const template = `
      <div id="container-info" class="container-info">
        <div class="container-description">
          <div class="banner-event"><img src=${event.image} /></div>
          <div><h3>${event.title} (${event.location})</h3></div>
          <div><p>Description: ${event.description}</p></div>
          <div><p id="date-event">Date: ${date(event.date)}</p></div>
          <div class="user-creator"><p>Created by "${event.creator.name}"</p>
            <img alt=${event.creator.name} src=${
      event.creator.avatar
    } width=20px loading="lazy" />
          </div>
          <div id="who"><p id="attendes-count">Attendees: ${
            event.attendees.length
          } <span class="more">¿WHO?</span></p></div>
          <div class="subscribe-btn">
            <div id="btn-options">
              <button id="subscribe-event">Subscribe</button>
              ${
                editEventAuthority(event)
                  ? '<button id="edit-event">Edit</button>'
                  : ''
              }
            </div>
            <button id="close-info">Close</button>
          </div>
        </div>
      </div>
    `
    app.insertAdjacentHTML('afterbegin', template)
  } else {
    const template = `
      <div class="container-info">
        <div class="container-description">
          <div class="banner-event"><img src=${event.image} /></div>
          <div><h3>${event.title} (${event.location})</h3></div>
          <div><p>Description: ${event.description}</p></div>
          <div><p>Date: ${date(event.date)}</p></div>
          <div><p>Created by ${event.creator.name}</p></div>
          <div><p id="attendes-count">Attendees: ${
            event.attendees.length
          }</p></div>
          <div class="subscribe-btn">
            <div id="btn-options">
              <button id="subscribe-event">Subscribe</button>
              ${
                editEventAuthority(event)
                  ? '<button id="edit-event">Edit</button>'
                  : ''
              }
            </div>
            <button id="close-info">Close</button>
          </div>
        </div>
      </div>
    `
    app.insertAdjacentHTML('beforeend', template)
  }
}

export const MoreInfo = async (token, event) => {
  const data = await getEvent(token, event)
  Alert(data === 200, data.data.message)
  DescriptionEvent(data.data.event)
  if (user.data.roles.includes('admin')) {
    const allAttendees = document.querySelector('.more')
    if (event.attendees.length > 0) {
      allAttendees.addEventListener('click', () => {
        let infoAttendees = document.querySelector('.info-attendees')
        if (!infoAttendees) {
          infoAttendees = document.createElement('div')
          infoAttendees.classList.add('info-attendees')
          infoAttendees.id = infoAttendees
          document
            .querySelector('.container-description')
            .appendChild(infoAttendees)
        }
        const attendeesList = event.attendees
          .map(
            (ele, index) =>
              `<li class="${index % 2 === 0 ? 'grey' : 'white'}">${ele.name} ${
                ele.lastName
              } - ${ele.email}</li>`
          )
          .join('')
        infoAttendees.innerHTML = `
          <ul>${attendeesList}</ul>
          <button class="close-attendees">Close List</button>
        `
        infoAttendees.scrollIntoView({ behavior: 'smooth', block: 'start' })
        const closeAttendees = document.querySelector('.close-attendees')
        closeAttendees.addEventListener('click', () => {
          infoAttendees.remove()
          document
            .querySelector('#header')
            .scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  //EDIT EVENT
  const btnEdit = document.querySelector('#edit-event')
  if (btnEdit) {
    btnEdit.addEventListener('click', () => {
      editEvent(event)
    })
  }

  const closeInfo = document.querySelector('#close-info')
  closeInfo.addEventListener('click', () => {
    const contentCard = document.querySelector('#contain-events')
    contentCard.setAttribute('style', 'display:inline-block')
    document.querySelector('.container-info').remove()
  })
}

const editEventAuthority = (event) => {
  const creator = user.data
  if (event.creator._id === creator._id || creator.roles.includes('admin'))
    return true
  else return false
}
