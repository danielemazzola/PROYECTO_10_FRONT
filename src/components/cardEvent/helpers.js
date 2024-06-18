import { fetchRegisterEvent } from '../../services/fetchEvents'
import { Alert } from '../alert/Alert'
import { date } from '../../utils/date'

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
  if (Array.isArray(event.attendees)) {
    const template = `
      <div class="container-info">
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
          <div><p id="attendes-count">Attendees: ${
            event.attendees.length
          } <span class="more">¿WHO?</span></p></div>
          <div class="subscribe-btn">
            <button id="subscribe-event">Subscribe</button>
            <button id="close-info">Close</button>
          </div>
        </div>
      </div>
    `
    app.insertAdjacentHTML('beforeend', template)

    return
  } else {
    const template = `
      <div class="container-info">
        <div class="container-description">
          <div class="banner-event"><img src=${event.image} /></div>
          <div><h3>${event.title} (${event.location})</h3></div>
          <div><p>Description: ${event.description}</p></div>
          <div><p>Date: ${date(event.date)}</p></div>
          <div><p>Created by ${event.creator.name}</p></div>
          <div><p id="attendes-count">Attendees: ${event.attendees}</p></div>
          <div class="subscribe-btn">
            <button id="subscribe-event">Subscribe</button>
            <button id="close-info">Close</button>
          </div>
        </div>
      </div>
    `
    app.insertAdjacentHTML('beforeend', template)

    return
  }
}
